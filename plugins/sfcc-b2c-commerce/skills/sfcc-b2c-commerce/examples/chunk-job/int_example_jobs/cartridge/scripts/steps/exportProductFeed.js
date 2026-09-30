'use strict';

/**
 * Chunk-oriented job step: export online products to CSV.
 *
 * Resource-safety contract:
 *  - every resource opened in beforeStep is released by closeResources(), which is idempotent;
 *  - closeResources() runs in afterStep AND in the catch block of read/process/write before rethrowing,
 *    because Salesforce documents afterStep as running after a *successful* step;
 *  - output goes to a .tmp file that is renamed only on success, so consumers never see a partial feed.
 */
var ProductMgr = require('dw/catalog/ProductMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('jobs', 'ExportProductFeed');

var products = null; // dw.util.SeekableIterator
var fileWriter = null; // dw.io.FileWriter
var csvWriter = null; // dw.io.CSVStreamWriter
var tmpFile = null;
var finalFile = null;

/**
 * Releases every open resource. Safe to call more than once.
 * @param {boolean} keepOutput - false deletes the partial temp file
 */
function closeResources(keepOutput) {
    try {
        if (products) {
            products.close();
        }
    } catch (e) {
        log.error('Closing product iterator failed: {0}', e.message);
    }
    products = null;

    try {
        if (csvWriter) {
            csvWriter.close();
        } else if (fileWriter) {
            fileWriter.close();
        }
    } catch (e) {
        log.error('Closing feed writer failed: {0}', e.message);
    }
    csvWriter = null;
    fileWriter = null;

    if (!keepOutput && tmpFile && tmpFile.exists()) {
        tmpFile.remove();
    }
}

/**
 * Runs fn; on any exception releases resources, then rethrows so the step ends in ERROR.
 * @param {Function} fn - step body
 * @returns {*} fn's return value
 */
function guarded(fn) {
    try {
        return fn();
    } catch (e) {
        log.error('Step failed, releasing resources: {0}', e.message);
        closeResources(false);
        throw e;
    }
}

exports.beforeStep = function (parameters) {
    return guarded(function () {
        var dir = new File(File.IMPEX + '/src/feeds');
        if (!dir.exists()) {
            dir.mkdirs();
        }
        var baseName = parameters.FileNamePrefix + '_' + Date.now() + '.csv';
        finalFile = new File(dir, baseName);
        tmpFile = new File(dir, baseName + '.tmp');

        fileWriter = new FileWriter(tmpFile, 'UTF-8');
        csvWriter = new CSVStreamWriter(fileWriter);
        csvWriter.writeNext('productID', 'name', 'metalPurity'); // varargs: one argument per column

        products = ProductMgr.queryAllSiteProducts();
    });
};

exports.getTotalCount = function () {
    return products ? products.getCount() : 0;
};

exports.read = function () {
    return guarded(function () {
        return products.hasNext() ? products.next() : undefined;
    });
};

exports.process = function (product) {
    return guarded(function () {
        if (!product.isOnline() || product.isMaster()) {
            return undefined; // filtered out of the chunk
        }
        return [product.getID(), product.getName() || '', product.custom.metalPurity ? String(product.custom.metalPurity.getValue()) : ''];
    });
};

exports.write = function (rows) {
    guarded(function () {
        for (var i = 0; i < rows.size(); i++) {
            // writeNext is varargs (String...), so spread the row array into arguments
            csvWriter.writeNext.apply(csvWriter, rows.get(i));
        }
    });
};

exports.afterStep = function (success) {
    closeResources(!!success);
    if (success && tmpFile && tmpFile.exists()) {
        if (!tmpFile.renameTo(finalFile)) {
            throw new Error('Could not rename ' + tmpFile.getName() + ' to ' + finalFile.getName());
        }
        log.info('Feed written: {0}', finalFile.getFullPath());
    }
};

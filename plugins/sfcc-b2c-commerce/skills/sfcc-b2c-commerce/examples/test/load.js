'use strict';
// Loads cartridge modules under Node for unit tests: dw/* and */cartridge/* requires get stubs.
var Module = require('module');
var path = require('path');
var originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
    if (request.indexOf('dw/') === 0) {
        return {};
    }
    if (request.indexOf('*/cartridge/') === 0) {
        return {};
    }
    return originalLoad.call(this, request, parent, isMain);
};
module.exports = function load(relativePath) {
    return require(path.join(__dirname, '..', relativePath));
};

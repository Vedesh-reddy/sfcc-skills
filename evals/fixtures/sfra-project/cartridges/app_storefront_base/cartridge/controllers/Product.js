'use strict';
// Stub of the SFRA base controller (the real one ships with app_storefront_base).
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Show', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct(req.querystring.pid);
    res.render('product/productDetails', { product: product });
    next();
});

module.exports = server.exports();

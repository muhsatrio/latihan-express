const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {products: products, pageTitle: 'My Shop', path: '/'});
});

module.exports = router;
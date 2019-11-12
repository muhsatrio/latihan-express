const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/product', (req, res, next) => {
    // console.log(req.body.title);
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;

// module.exports = router;
const Product = require('../models/product');

exports.getProducts =  (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {products: products, pageTitle: 'All Products', path: '/products'});
    });
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {products: products, pageTitle: 'My Shop', path: '/'});
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart'});
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'});
};
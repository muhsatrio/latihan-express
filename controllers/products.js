const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts =  (req, res, next) => {
    const products = Product.fetchAll();
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {products: products, pageTitle: 'My Shop', path: '/'});
};
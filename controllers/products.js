const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body.title);
    products.push({title: req.body.title});
    res.redirect('/');
};

exports.getProducts =  (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {products: products, pageTitle: 'My Shop', path: '/', hasProducts: products.length > 0});
};
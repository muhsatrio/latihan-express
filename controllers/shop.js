const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts =  (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                products: rows, 
                pageTitle: 'All Products', 
                path: '/products'
            });
        })
        .catch();
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(([product]) => {
        res.render('shop/product-detail', {product: product[0], pageTitle: product[0].title, path: ''});
    })
    .catch(err => {
        console.log(err);
    });
    
    // res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll().
        then(([rows, fieldData]) => {
            console.log('test');
            res.render('shop/index', {
                products: rows, 
                pageTitle: 'My Shop', 
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {pageTitle: 'Your Cart', path: '/cart', products: cartProducts});
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path: '/orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'});
};
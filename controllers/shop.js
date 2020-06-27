const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts =  (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                products: products, 
                pageTitle: 'All Products', 
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    // With findAll where ways
    Product.findAll({where: {id: prodId}})
        .then(products => {
            res.render('shop/product-detail', {product: products[0], pageTitle: products[0].title, path: ''});    
        })
        .catch(err => {
            console.log(err);
        })

    // With findByPk way
    // Product.findByPk(prodId)
    // .then(product => {
    //     res.render('shop/product-detail', {product: product, pageTitle: product.title, path: ''});
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    
    // res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                products: products, 
                pageTitle: 'My Shop', 
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
    // Product.fetchAll().
    //     then(([rows, fieldData]) => {
    //         console.log('test');
    //         res.render('shop/index', {
    //             products: rows, 
    //             pageTitle: 'My Shop', 
    //             path: '/'
    //         });
    //     })
    //     .catch(err => console.log(err));
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
    Product.findByPk(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDelete = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId, product => {
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
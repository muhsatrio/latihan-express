const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');
const products = [];
const productController = require('../controllers/products');

router.get('/add-product', productController.getAddProduct);

router.post('/product', productController.postAddProduct);

module.exports = router;
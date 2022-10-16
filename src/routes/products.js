const express = require('express');
const router = express.Router();
const { addProduct ,searchProduct} = require('../controller/products')
const {requireSignin,adminMiddleware}=require('../common-middleware/middleware')
const Products=require('../models/products');
const { productValidation, isProductValidate } = require('../validator/admin/products');
const multer =require('multer')


router.get('/category', async (req, res) => {
    const products = await Products.findOne({category:req.params.category})
    return res.status(201).json(products)
});

router.get('/:slug',searchProduct)

router.post('/addproduct',requireSignin,adminMiddleware,productValidation,isProductValidate,addProduct);

module.exports = router;
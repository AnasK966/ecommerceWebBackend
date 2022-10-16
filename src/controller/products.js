const Products = require('../models/products');
const shortid = require("shortid");
const slugify = require('slugify');



exports.addProduct = async (req, res) => {
    const prod = await Products.findOne({ slug: req.body.slug })
    if (prod) {
        res.json({ message: 'Product already exist' })
        
    }
   
    else {
        let productPictures = [];
        if (req.files.length > 0) {
            productPictures = req.files.map((file) => {
              return { img: file.location }; //since img is an object in DB.
            });
          }
        const Product = new Products({
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${shortid.generate()}`,
            // image: `/public/images/${req.body.name}`,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            createdBy: req.admin._id,
            images:productPictures
        })
        Product.save((err, data) => {
            if (err) {
                res.status(500).json({
                    message: "Something went wrong",
                    error:err
                })
            }
            if (data) {
                res.status(201).json({message:'product added'})
                
            }
        })
    }
}
exports.searchProduct = async (req, res) => {
    const product = await Products.findOne({ slug: req.params.slug })
    if (product) {
        res.send(product)
    }
    else {
        res.status(400).json({ message: 'product not found' })
    }
}

exports.getProducts = async (req, res) => {
    const products = await Product.find({ createdBy: req.user._id })
      .select("_id name price quantity slug description productPictures category")
      .populate({ path: "category", select: "_id name" })
      .exec();
  
    res.status(200).json({ products });
  };

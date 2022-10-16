const Category = require('../models/category');
const slug=require('slugify');
const shortid = require('shortid');

exports.addCategory = (req, res) => {
    const catObj = {
        name: req.name,
        slug: `${slugify(req.name)}-${shortid.generate()}`,
        createdBy: req.admin._id
    }

    if (req.body.parentId) {
        catObj.parentId = req.body.parentId
        
    }
    if (req.file) {
        catObj.categoryImage = "/public/" + req.file.filename;
      }
    const cat = new Category(catyObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({ error });
        }
        
        if (category) {
            return res.status(201).json({ category });
        }
    });
};
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    name: {
        unique:true,
        required: true,
        type:String
    },
    slug: {
        unique:true,
        required: true,
        type:String
    },

    category: {
        required: true,
        type:String
    },
    desc: {
        required: true,
        type:String
    },
    price: {
        required: true,
        type:Number
    },
    stock: {
        required: true,
        type:Number
    },
    reviews:[
    {
            userId: { type:mongoose.Schema.Types.ObjectId, ref: 'User', },
            review:{type:String}
        }],
    
    images: [
        { img: { type: String } }
    ],
    pinned: {
        type: Boolean,
        default:false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    updatedAt: Date,
    

    
    
},{timestamps:true});

module.exports = mongoose.model('Products', productSchema);
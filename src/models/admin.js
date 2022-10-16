const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 10
        },
        hash_password: {
            type: String,
            required: true,
            trim: true,
            min: 6,
            
        },
        email: {
            type: String,
            required: true,
            trim: true,
            
        },
        role: {
            type: String,
            default: "admin"
        }
            
            
    });

module.exports=mongoose.model('Admin',adminSchema)    
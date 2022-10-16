const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max:10
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max:10
            
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique:true
            
            
        },
        contact: {
            type: String,
            required: true,
            trim: true,
            min:11,
            max: 11,
            unique:true

        },
        userName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 10,
            lowercase: true,
            index:true
            
        },
        hash_password: {
            type: String,
            required: true,
            trim: true,
            
        },
        address: {
            country: { required: true, type: String },
            city: { required: true, type: String },
            area: { required: true, type: String }
        },
        role: {
            type: String,
            default:"user"
        }
    
    },{timestamps:true}
);


module.exports = mongoose.model('User', userSchema);
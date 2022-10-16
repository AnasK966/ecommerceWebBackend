const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.adminSignin = async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
        if (bcrypt.compareSync(req.body.hash_password, admin.hash_password)) {
            const token = jwt.sign({ _id: admin._id, role:admin.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
            res.send({
                token: token,
                email: req.body.email,
                name: admin.userName,
                role:admin.role
            })
            
        }
    }
    else {
        res.status(401).json({message:'Invalid email and password'})
    }
    
}

exports.adminSignup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(async (error, admin) => {
        if(admin) return res.status(400).json({
            message: 'User already registered'
        });

        const password = await bcrypt.hashSync(req.body.hash_password, 10); 
        const admin = new Admin({ 
            email:req.body.email,
            userName:req.body.userName,
            hash_password: password,
            
        
        });

        admin.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong',
                    error:error
                });
            }

            if(data){
                return res.status(201).json({
                    message: 'Admin created Successfully..!'
                })
            }
        });



    });
}

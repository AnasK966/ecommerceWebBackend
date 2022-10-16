const User = require('../models/users');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

exports.userSignup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const { firstName, lastName, email, contact, userName, hash_password, address } = req.body;
        const { country,city, area } = address;
        const password = await bcrypt.hashSync(hash_password, 10); 
        const _user = new User({ 
            firstName, 
            lastName, 
            email, 
            contact,
            userName,
            hash_password: password,
            address:{country,city,area}
        
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong',
                    error:error
                });
            }

            if(data){
                return res.status(201).json({
                    message: 'User created Successfully..!'
                })
            }
        });



    });
}


exports.userSignin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.hash_password, user.hash_password)) {
            const token = jwt.sign({ _id: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: '12h' });
            res.send({
                token: token,
                email: req.body.email,
                name: user.userName,
                role:user.role
            })
            
        }
    }
    else {
        res.status(401).json({message:'Invalid email and password'})
    }
    
}


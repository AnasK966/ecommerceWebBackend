const express = require('express')
const app = express()
const env =require('dotenv')

const mongoose = require('mongoose');
const cors=require('cors')
const userRoutes = require('../src/routes/users');
const productRoutes = require('../src/routes/products');
// const orderRoutes = require('../src/routes/order');
const adminRoutes=require('..src/routes/admin')
const { urlencoded } = require('express');

env.config();
const uri = 'mongodb+srv://Anas:anas2002@cluster0.kpwbvvt.mongodb.net/ecommerce?retryWrites=true&w=majority';
mongoose.connect(uri).then(() => {
        console.log("Database connected")
    }).catch((err)=>console.log(err));

app.use(cors()); //for frontend and backend connection
app.use(express.json()); // encoded urls json
app.use(express.urlencoded({extended:true}))
app.use('/user', userRoutes);
app.use('admin', adminRoutes);
app.use('/product', productRoutes);
// app.use('/order', orderRoutes);

app.use((err, req, res, next) => {
    res.status(500).send({error:err.message})
})
app.listen(process.env.PORT, () => {
    console.log("server listening")
});
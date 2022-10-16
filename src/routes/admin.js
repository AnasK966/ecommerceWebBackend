const express = require('express');
const { adminSignin, adminSignup } = require('../controller/admin');
const {adminSignupValidation,signinValidation}=require('../validator/admin/auth')
const router = express.Router()


router.post('/signup', adminSignupValidation,adminSignup)
router.post('/sigin', signinValidation,adminSignin)

module.exports=router
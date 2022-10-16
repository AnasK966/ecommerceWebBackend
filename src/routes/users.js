const express = require('express');
const { signin, signup } = require('../controller/users.js');
const router = express.Router()
const {signinValidation,signupValidation,isRequestValidate }=require('../validator/admin/auth.js');


router.post('/signin', signinValidation,isRequestValidate,signin);

router.post('/signup', signupValidation, isRequestValidate, signup);




module.exports = router;
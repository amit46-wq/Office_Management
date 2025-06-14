const express=require("express")
const router=express.Router();
const User = require('../models/user');
const { createToken } = require('../utils/jwt');
const cookieParser = require('cookie-parser');
const Dept = require('../models/dept'); 
const signUpController = require("../Controllers/signup");


router
    .route("/")
    .get(signUpController.renderSignUpForm)
    .post(signUpController.signUp);

module.exports=router;
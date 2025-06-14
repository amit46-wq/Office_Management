const express=require("express")
const router=express.Router();
const loginController=require("../Controllers/login")

router
    .route("/")
    .get(loginController.renderLoginForm )
    .post(loginController.userLogin);

module.exports=router;
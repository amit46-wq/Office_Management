const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync")
const ExpressError=require("../utils/expressError.js")
const dept=require("../models/dept.js")
const Employee=require("../models/employee")
const { verifyToken, isAdmin } = require('../middleware/auth.js')
const deptController=require("../Controllers/dept.js")

router
    .route("/")
    .get(deptController.showDept)
    .delete(verifyToken,isAdmin,wrapAsync(deptController.deleteDept))
    .post(wrapAsync(deptController.addDept));

router.get("/new",wrapAsync(deptController.renderDeptForm));

module.exports=router;
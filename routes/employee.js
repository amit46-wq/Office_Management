const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync")
const ExpressError=require("../utils/expressError.js")
const{employeeSchema}=require("../schema.js")
const Employee=require("../models/employee")
const dept=require("../models/dept.js")
const { verifyToken, isAdmin } = require('../middleware/auth.js')
const employeeController=require("../Controllers/employee.js")
const {validateEmployee: empMiddleware}=require("../middleware/emp.js");

router
    .route("/")
    .get(wrapAsync(employeeController.index))
    .post(empMiddleware,wrapAsync(employeeController.createEmployee));

router.get("/new",verifyToken,isAdmin,employeeController.renderNewForm)

router
    .route("/:id")
    .get(wrapAsync(employeeController.showEmployee))
    .put(empMiddleware,wrapAsync(employeeController.editEmployee))
    .delete(verifyToken,isAdmin,wrapAsync(employeeController.deleteEmployee));



router.get("/:id/edit" ,verifyToken,isAdmin,wrapAsync(employeeController.renderEditForm));

module.exports=router;
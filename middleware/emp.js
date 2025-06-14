const{employeeSchema}=require("../schema.js")
const ExpressError=require("../utils/expressError.js")

const validateEmployee=(req,res,next)=>{
    let {err}=employeeSchema.validate(req.body);
        if(err){
            let errMsg=err.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg)
        }else{
            next();
        }
}

module.exports={validateEmployee};
const { required } = require("joi");
const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const deptSchema=new Schema({
    name:{type:String,required:true},
    hod:{type:String,required:true},
    employee_count:{type:Number}
})

module.exports=mongoose.model("dept",deptSchema)
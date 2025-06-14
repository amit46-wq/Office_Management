const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const employeeSchema=new Schema({
    f_name: {type:String, required: true},
    l_name: {type:String, required: true},
    email: {type:String, required: true},
    job_title: {type:String, required: true},
    dept: String,
    supervisor: String,
    country: {type:String, required: true},
    state: {type:String, required: true},
    city: {type:String, required: true},
    department:[
        {
            type:Schema.Types.ObjectId,
            ref:"dept",
        },
    ],

});
const Employee=mongoose.model("Employee",employeeSchema)
module.exports=Employee;
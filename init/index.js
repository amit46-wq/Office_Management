const mongoose=require("mongoose")
const initData=require("./data.js")
const Employee=require("../models/employee.js")

main().then(()=>{
    console.log("connected to DB");

}).catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
}

const initDB= async()=>{
    await Employee.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
const Employee=require("../models/employee")
const dept=require("../models/dept.js")
const { verifyToken, isAdmin } = require('../middleware/auth.js')


module.exports.index=async (req, res) => {
  const perPage = 6;
  const page = parseInt(req.query.page) || 1;

  const searchTerm = req.query.search?.trim();
  const selectedDept = req.query.department?.trim();
  const selectedJob = req.query.job?.trim();

  // Build dynamic query
  const filter = {};

  if (searchTerm) {
    filter.$or = [
      { f_name: new RegExp(searchTerm, "i") },
      { l_name: new RegExp(searchTerm, "i") },
      { email: new RegExp(searchTerm, "i") }
    ];
  }

  if (selectedDept && selectedDept !== "all") {
    filter.department = selectedDept;
  }

  if (selectedJob && selectedJob !== "all") {
    filter.job_title = selectedJob;
  }

  const departments = await dept.find({});
  const jobTitles = await Employee.distinct("job_title");

  const totalEmployees = await Employee.countDocuments(filter);
  const allEmployees = await Employee.find(filter)
    .populate("department") // in case you want to show department name
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.render("employees/index.ejs", {
    allEmployees,
    departments,
    jobTitles,
    currentPage: page,
    totalPages: Math.ceil(totalEmployees / perPage),
    searchTerm,
    selectedDept,
    selectedJob
  });
};

module.exports.renderNewForm=(req,res)=>{
    res.render("employees/new.ejs")
};

module.exports.showEmployee=async (req,res)=>{
    let {id}=req.params;
    const employee=await Employee.findById(id)
    res.render("employees/show.ejs",{employee})
};

module.exports.createEmployee=async(req,res)=>{
        
        const newEmployee= new Employee(req.body.employee);
        await newEmployee.save();
        console.log(newEmployee);
        res.redirect("/employees")
    
};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const employee=await Employee.findById(id)
    res.render("employees/edit.ejs",{employee})
};

module.exports.editEmployee=async(req,res)=>{
    let {id}=req.params;
    await Employee.findByIdAndUpdate(id,{...req.body.employee})
    res.redirect(`/employees/${id}`);
};

module.exports.deleteEmployee=async (req,res)=>{
    let {id}=req.params;
    let deletedEmployee=await Employee.findByIdAndDelete(id);
    console.log(deletedEmployee);
    res.redirect("/employees");
};
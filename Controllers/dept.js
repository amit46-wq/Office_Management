const Employee=require("../models/employee")
const dept=require("../models/dept.js")

module.exports.showDept=async(req,res)=>{
    const allDept= await dept.find({});
    res.render("department/index1.ejs",{allDept});
};

module.exports.deleteDept=async (req, res) => {
  const { id } = req.body;

  await Employee.updateMany(
    { department: id },
    { $unset: { department: 1 } } // or { department: null }
  );

  const deletedDept = await dept.findByIdAndDelete(id);
  console.log("Deleted Dept:", deletedDept);

  res.redirect("/dept");
}

module.exports.renderDeptForm=async (req, res) => {
  const allEmployees = await Employee.find({});
  console.log(allEmployees);
  res.render("department/new1.ejs", { allEmployees });
};

module.exports.addDept=async (req, res) => {
  const newDept = new dept(req.body.dept);
  await newDept.save();

  const { employeeIds } = req.body;

  const employeesToUpdate = Array.isArray(employeeIds) ? employeeIds : [employeeIds];

  await Employee.updateMany(
    { _id: { $in: employeesToUpdate } },
    { department: newDept._id }
  );

  console.log(`Created dept: ${newDept.name} and updated employees: ${employeeIds}`);
  res.redirect("/dept");
};

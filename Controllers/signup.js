const User = require('../models/user');
const { createToken } = require('../utils/jwt');
const Dept = require('../models/dept'); 

module.exports.renderSignUpForm=(req, res) => res.render('auth/signup');

module.exports.signUp=async (req, res) => {
  const { fullName, email, password } = req.body;

  //Check if this name is a registered HOD
  const isHOD = await Dept.findOne({ hod: new RegExp(`^${fullName}$`, 'i') });

  if (!isHOD) {
    return res.status(403).send("⚠️ Only Department HODs can sign up.");
  }

  const user = new User({ fullName, email, password, role: 'admin' });
  await user.save();

  const token = createToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/employees');
};
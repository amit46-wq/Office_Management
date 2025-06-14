const User = require('../models/user');
const { createToken } = require('../utils/jwt');

module.exports.renderLoginForm=(req, res) => res.render('auth/login');

module.exports.userLogin=async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = createToken(user);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/employees');
};
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).send("Access denied: Admins only.");
};



module.exports={verifyToken,isAdmin};
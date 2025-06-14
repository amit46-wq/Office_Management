
require('dotenv').config();
const express=require("express")
const app=express();
const mongoose=require("mongoose")
const path=require("path");
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const employee=require("./routes/employee.js")
const department=require("./routes/dept.js")
const signUp=require("./routes/signup.js")
const login=require("./routes/login.js")
const session=require("express-session")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB");

}).catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs")
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static("public"));
app.use(cookieParser());

const sessionOptions={
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now()+7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,   //cross scrypting attacks k liye use hota hai
  },
};

app.use(session(sessionOptions))

app.use((req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.locals.currentUser = decoded;
    } catch (e) {
      res.locals.currentUser = null;
    }
  } else {
    res.locals.currentUser = null;
  }

  next();
});

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
})

app.use("/employees",employee); 

app.use("/dept",department);

app.use("/signup",signUp);

app.use("/login",login);

// Logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

app.use((err,req,res,next)=>{
    let {statusCode=400,message="page not found!!"}=err;
    res.status(statusCode).render("error.ejs",{message})
    
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");   //importing userSchema defined 
const { SECRET } = require("../config");  

//To register the user (ADMIN, SUPER_ADMIN, USER)

const userRegister = async (userDetails, res) => {
 //use a try catch method
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDetails.username);
    if (usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDetails.email);
    if (emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDetails.password, 12);
    // create a new user
    const newUser = new User({
      ...userDetails,
      password
     
    });
    //userdetails saving to the database using mongoose schema already generated
    await newUser.save();
    return res.status(201).json({message: " Now you are successfully registred. Please nor login."});
  } 
  catch (err) {
    return res.status(500).json({message: "Unable to create your account."});
  }
};


 // To Login the user (ADMIN, SUPER_ADMIN, USER)
 
const userLogin = async (userlogindetails, res) => {
  let { username, password } = userlogindetails;
  // First Check if the username is present in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Username is not found. Invalid login details."});
  }

//if above condition satisfies password bcryption occurs

  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        name:user.name,
        role: user.role,
        username: user.username,
        email: user.email
      },SECRET,{ expiresIn: "7 days" });

    //payload of the token  
    let result = {
      username: user.username,
      name:user.name,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,message: "Hurray! You are now logged in."});
  } 
  else {
    return res.status(403).json({message: "Incorrect password."});
  }
};

//to validate username  if it is already taken returns true value 

const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? true : false;
};

//passport middleware

const userAuth = passport.authenticate("jwt", { session: false });

//finding the members that are belongs to the superadmin/admins to list the table uising query method

const subUserList= async(data,res)=>{
  let query =  {  reportingto : data.username }
  let users =await User.find(query);
  return res.status(200).json({
    users,message: data});
}

//to validate email if it is already taken returns true value 

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? true : false;
};


//export using module.exports 
module.exports = {
  userAuth,
  subUserList,
  userLogin,
  userRegister,
};

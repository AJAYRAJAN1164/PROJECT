const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const { success, error } = require("consola");
const path=require("path");
const session=require('express-session');
const cors=require('cors');

// Bring in the app constants
const { DB, PORT } = require("./config");


// Initialize the application
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true
}))


//intializing passport
app.use(passport.initialize());
require("./middlewares/passport")(passport);



//loading static file
app.use("/static",express.static(path.join(__dirname,"public")))


// User Router Middleware
app.use("/", require("./routes/users"));

const startApp = async () => {
  try {   
    // Connection With DB
    await mongoose.connect(DB,{
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

startApp(); //call for the connection

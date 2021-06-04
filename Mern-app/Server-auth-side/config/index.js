require("dotenv").config();

module.exports = {   
  DB: process.env.APP_DB,           //database connection path
  PORT: process.env.APP_PORT,      //server running port
  SECRET: process.env.APP_SECRET  //secret key  for the token generation
};

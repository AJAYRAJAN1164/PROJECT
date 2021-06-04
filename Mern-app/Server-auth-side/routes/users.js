const router = require("express").Router();
const {userAuth,userLogin,userRegister,subUserList} = require("../utils/Auth"); //importing userdefinded functions



// Registeration  Route for admin and user
router.post("/user-register", async (req, res) => {
  await userRegister(req.body, res);
});




//Login Route for superadmin,admin,users
router.post("/user-login", async (req, res) => {
  await userLogin(req.body,res)
});


//to fetch data from database to list tables
router.post("/getSubUsers",async(req,res)=>{
  await subUserList(req.body,res);

});


module.exports = router;

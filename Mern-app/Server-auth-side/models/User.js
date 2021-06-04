const { Schema, model } = require("mongoose");

// user schema is generated using mongoose

const UserSchema = new Schema(
  {
   
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"]
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    reportingto:{
      type:String,
      required:false
    }
  },
  { timestamps: true }
);

//defining the collection name and exporting the model

module.exports = model("users", UserSchema);

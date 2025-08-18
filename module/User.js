const mongoose = require("mongoose");

const userSchema = new mongoose.Schema
({
  name: {
    type: String,
  
  },
  email: {
    type: String,
    
    
  },
  password: {
    
    type: String,
  
  },
  contact: {
    type:Number
  },
  city:{
    type:String
  },
  state:{
    type:String
  }

});

module.exports = mongoose.model("Users", userSchema);

const mongoose = require('mongoose');
const Role = require('./role.model');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
     // id: Number,
     email:  { type: "String", unique: true, required: true },
     password: { type: "String", required: true },
     firstName: { type: "String", required: true },
     lastName: { type: "String", required: true },
     gender: { type: "String", required: true },
     enabled: { type: "Boolean", required: true },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
   };
   
   userSchema.pre("save", async function (next) {
     if (!this.isModified) {
       next();
     }
   
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
   });
const User = mongoose.model("User",userSchema) 
module.exports = User;
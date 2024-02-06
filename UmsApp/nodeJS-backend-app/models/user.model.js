const mongoose = require('mongoose');
const Role = require('./role.model');

const userSchema = new mongoose.Schema({
     // id: Number,
     email:  { type: "String", unique: true, required: true },
     password: { type: "String", required: true },
     firstName: { type: "String", required: true },
     lastName: { type: "String", required: true },
     gender: { type: "String", required: true },
     enabled: { type: "Boolean", required: true },
     role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Role', // Reference the Role model
        },
});
const User = mongoose.model("User",userSchema) 
module.exports = User;
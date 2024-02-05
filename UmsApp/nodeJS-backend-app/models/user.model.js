const mongoose = require('mongoose');
const Role = require('./role.model');

const userSchema = new mongoose.Schema({
     id: Number,
     email: String,
     password: String,
     firstName: String,
     lastName: String,
     gender: String,
     enabled: Boolean,
     role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Role', // Reference the Role model
        },
});
const User = mongoose.model("User",userSchema) 
module.exports = User;
const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
     id: Number,
     name: String,
     description: String
})
const Role = mongoose.model("Role",roleSchema) 
module.exports = Role;
const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
     // id: Number,
     name: { type: "String", required: true },
     description: { type: "String", required: true }
})
const Role = mongoose.model("Role",roleSchema) 
module.exports = Role;
const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})
 module.exports = Admin;

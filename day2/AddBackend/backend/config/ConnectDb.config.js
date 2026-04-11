const mongoose = require('mongoose');
const ConnectDb = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
        console.log("data base is connected")
    } catch (error) {
        console.log("database is not connect... ")
    }
}
module.exports = ConnectDb ; 
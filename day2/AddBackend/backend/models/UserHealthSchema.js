const mongoose = require("mongoose");
const UserHelthSchema = new mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    age: Number,
    weight: Number,
    height: Number,
    goal: String
})
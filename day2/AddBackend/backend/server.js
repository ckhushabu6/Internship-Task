const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const ConnectDb = require('./config/ConnectDb.config');
const authRoute = require('./routes/authRoutes');
const planRoute = require('./routes/planRoutes')
ConnectDb();
//calling express application
const app = express();


//responsiable to read json data
app.use(express.json());
app.use(cors());
console.log(cors)
//user route
app.use('/api/user' , authRoute);

// role based controlle
app.use('/api/access' , planRoute)



//For undefine page is 
app.use((req, res)=>{
    res.status(400).json({msg : "Page is not found..."})
})

//assign port to server 
app.listen(3000 , ()=>{
    console.log("server is running on port number 3000")
})


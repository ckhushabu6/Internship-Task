const express = require("express");
const   mongoose = require("mongoose");
const AdminData = require('../models/Admin');
const Admin = require("../models/Admin");
const Adminrouter = express.Router();
 Adminrouter.post('/signup', async(req , res)=>{
    try{
    const {name , email , password} = req.body;
    const emailExist = await AdminData.fidOne({email});
    if(emailExist){
        return res.status(400).json({'message': "Admin already exist.."})
    }

    const hashedPassword = await bcrypt.hash(password , 10);
    const admin = new AdminData({
        name,
        email,
        password : hashedPassword
    })
    res.status(200).json({'message': "Admin Signup successfully.."})
    admin.save();

}catch(err){
    res.status(500).json({error : err.message})
    console.log(err)
}
 })

Adminrouter.post('/login', (req , res)=>{
    try{
        const {email , password } = req.body;
        const admin = AdminData.findOne({email});
        if(!admin){
            return res.status(400).json({message: "Admin not found.."});
        
        const isMatch = bcrypt.compare(password , admin.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid password.."});
        }
        res.status(200).json({message: "Admin login successfully..", admin});
        }
    
}catch(err){
        res.status(500).json({message: err.message});
        console.log(err);
    }
})



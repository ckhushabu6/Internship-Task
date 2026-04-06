//STEP 2

const express = require("express");
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require("bcrypt");

// SIGNUP

router.post('/register' , async(req , res)=>{
    try{
        const { name , email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exist"});

        }
        // hash password
        const hashedPassword = await bcrypt.hash(password , 10 );

        //sav user

        const user = new User({
            name , 
            email,
            password: hashedPassword
        });

        await user.save()

        res.json({message : "Signup successful 💹"})
    } catch(err){
        res.status(500).json({error : err.message})
        console.log(err)
    }
    
})



//LOGIN

router.post('/login' , async(req , res)=>{
    try{
        const {email , password} = req.body;
        //check user existes
        const user = await User.findOne({ email });
         if(!user){
            return res.status(400).json({message : "User not found"});
         }

         //compare password
         const isMatch = await bcrypt.compare(password , user.password);

         if(!isMatch){
            return res.status(400).json({message : 'Invalid password'})
         }

         res.json({message : "Login successful ✅" , user})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : err.message });
    }

})
 module.exports = router ; 
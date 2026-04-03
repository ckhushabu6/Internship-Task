const express = require("express");
const router = express.Router();
const generatePlan = require("../utils/generatePlan.js")

router.post("/generate" , (req , res)=>{
    try{
        const data = req.body; //full data
        const plan = generatePlan(data);
        res.json(plan);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error : err.message});
    }
});

module.exports = router;
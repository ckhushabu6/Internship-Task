const express = require("express");
const fs = require("fs");
const products = require("products")
const app = express();
app.use(express.json());

app.get('/' , (req ,res)=>{
    res.status(200).json({msg : "testing API"})
})

app.get('/search' , (req , res)=>{

    const data = [...products];
    console.log(data);

    const {q , category , minPrice , maxPrice} = req.query;
    if(q){
        data = data.filter((item)=>{
            item.name.toLowerCase().includes(q.toLowerCase())
        })
    }
    if(category ){
        data = data.filter((item)=>{
            item.name.toLowerCase().includes(category.toLowerCase())
        })

    }
    if(minPrice){
        data = data.filter((item)=>{
            item.price 
        })
    }
    if(maxPrice ){

    }

    res.status(200).json({msg : "Searched Successfully..."})
        

})



app.use((req, res)=>{
    res.status(404).json({
        "msg" : "Not Found..."
    })
});

app.listen(3000 , ()=>{
    console.log("server is running on port number 3000...");
})
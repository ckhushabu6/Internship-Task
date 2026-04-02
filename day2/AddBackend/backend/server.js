// require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/Project1")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("DB Error:", err.message));

// test route
app.get('/', (req, res) => {
    res.send("<h1>This is test route</h1>");
});

const authRoutes = require("./routes/auth")
app.use("/api/auth" , authRoutes)

// server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
const express = require("express");
const cors = require("cors");
const ConnectDb = require('./config/ConnectDb.config');

const authRoute = require('./routes/authRoutes');
const dietplanRoute = require('./routes/dietPlanRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();



const app = express();

// DB connect
ConnectDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);     // ✅ FIXED
app.use('/api/plan', dietplanRoute); // ✅ FIXED
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes );

// Static (for images)
app.use('/uploads', express.static('uploads'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
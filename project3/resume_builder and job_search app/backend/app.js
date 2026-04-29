const express = require('express');
const cors = require('cors');
const dotevn = require('dotenv');
const errorHandler = require('./middleware/error.middleware');
dotevn.config();
const app = express();

//middleware

app.use(cors());
app.use(express.json());
// routes
app.use('/api/auth', require('./routes/auth.routes'));

// error middleware
app.use(errorHandler);

module.exports = app;
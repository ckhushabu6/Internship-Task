const dotevn = require('dotenv');
dotevn.config();
const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/error.middleware');

const app = express();

//middleware

app.use(cors());
app.use(express.json());
// routes
app.use('/api/auth', require('./routes/auth.routes'));

app.use('/api/admin', require('./routes/admin.routes'));

app.use('/api/user', require('./routes/user.routes'));

app.use('/api/resume', require('./routes/resume.routes'));

app.use('/api/jobs', require('./routes/job.routes'));

app.use('/api/applications', require('./routes/application.routes'));

// error middleware
app.use(errorHandler);

module.exports = app;
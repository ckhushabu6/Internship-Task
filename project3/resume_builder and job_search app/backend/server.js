const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// DB connect
connectDB();

// server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
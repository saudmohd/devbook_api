require('dotenv').config();
const connectDB = require('./config/db')
const express = require('express');
const errorHandler = require('./middleware/errorHandler');

//Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

//Error handling middleware
app.use(errorHandler);

// Handle 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 3000;

// Only start server if not in test environment
if(process.env.NODE_ENV !== 'test'){
  const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port: ${PORT}`)
  });
  
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

module.exports = app;
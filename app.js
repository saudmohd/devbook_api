import 'dotenv/config';
import connectDB from './config/db.js';
import express from 'express';
import errorHandler from './middleware/errorHandler.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
// import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Get __dirname equivalent in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(helmet());
// app.use(xss());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Static files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Error handling middleware
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 3000;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port: ${PORT}`);
  });
  
  process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

export default app;
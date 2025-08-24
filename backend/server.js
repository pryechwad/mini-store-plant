const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const plantRoutes = require('./routes/plantRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/plants', plantRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🌿 Green Paradise API is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🌿 Welcome to Green Paradise API',
    version: '1.0.0',
    endpoints: {
      plants: '/api/plants',
      health: '/api/health'
    }
  });
});

// Error handler middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
  console.log(`🌱 Plants endpoint: http://localhost:${PORT}/api/plants`);
});
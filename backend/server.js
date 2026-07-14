import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

// Load Environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://dhyanesh-portfolio.netlify.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];

    if (process.env.CLIENT_URL) {
      const clientUrl = process.env.CLIENT_URL.replace(/[\[\]"']/g, '').trim();
      if (!allowedOrigins.includes(clientUrl)) {
        allowedOrigins.push(clientUrl);
      }
    }

    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy and running.' });
});

// Routes
app.use('/api/contact', contactRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong on the server.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

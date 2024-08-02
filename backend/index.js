import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/auth.route.js';
import TaskRoute from './routes/task.route.js';
import PasswordRoute from './routes/password.route.js';

dotenv.config();

mongoose.connect('mongodb+srv://merntutorial:Kalaivani22@cluster0.qco5vc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });

const app = express();

try {
  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  // Routes
  app.use('/api/auth', AuthRoute);
  app.use('/api/task', TaskRoute);
  app.use('/api/password', PasswordRoute);

  // Global Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error("An error occurred:", {
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode || 500,
    });

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    // Send JSON response with error details
    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    });
  });

  // Fallback Route for Unmatched Endpoints
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: "API endpoint not found"
    });
  });

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });

} catch (err) {
  console.error("An error occurred during app initialization:", err.message);
  process.exit(1); // Exit process with failure
}

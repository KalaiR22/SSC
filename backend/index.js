import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/auth.route.js';
import TaskRoute from './routes/task.route.js';
import PasswordRoute from './routes/password.route.js';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3000;
const uri = process.env.MONGO; // Ensure this environment variable is set

if (!uri) {
  console.error('MongoDB URI is not set. Please check your environment variables.');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message, error.stack);
    process.exit(1); // Exit the process if connection fails
  }
}

run().catch(console.dir);

// Define routes
app.use('/api/auth', AuthRoute);
app.use('/api/task', TaskRoute);
app.use('/api/password', PasswordRoute);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

// Health check route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Handle process termination signals
process.on('SIGINT', async () => {
  console.log('SIGINT signal received. Closing MongoDB connection...');
  await client.close();
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Closing MongoDB connection...');
  await client.close();
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

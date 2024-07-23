import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/auth.route.js'
import TaskRoute from './routes/task.route.js'
import PasswordRoute from './routes/password.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', AuthRoute );
app.use('/api/task', TaskRoute);
app.use('/api/password', PasswordRoute)

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

})


app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

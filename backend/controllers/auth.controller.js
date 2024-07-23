import Auth from "../models/auth.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../Utils/error.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

let otpStore = {};


const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const user = await Auth.findOne({ email });

        if (!user) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        const userData = {
            ...user.toJSON(),
            password: undefined
        };

        const token = generateToken(user);
        res.json({ user: userData, token });
    } catch (error) {
        next(error);
    }
};

const userExists = async (phoneNumber, email) => {
    const user = await Auth.findOne({ $or: [{ phoneNumber }, { email }] });
    return user !== null;
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(errorHandler(400, 'Email is required'));
  }

  try {
    const exists = await userExists(email);
    if (exists) {
      return next(errorHandler(400, 'Email already exists'));
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP temporarily
    otpStore[email] = otp;

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code for SSC',
      text: `Your OTP code  for Sustainability summer challenge is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return next(errorHandler(500, 'Failed to send OTP'));
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    next(error);
  }
}; 



export const verifyOtp = async (req, res, next) => {
  const { otp, username, email, password } = req.body;

  console.log('Request Body:', req.body); // Log request data

  if (!otp || !username || !email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    // Verify OTP
    if (otpStore[email] !== otp) {
      return next(errorHandler(400, 'Invalid OTP'));
    }

    // Remove the OTP from the store after verification
    delete otpStore[email];

    const hashedPassword = await bcryptjs.hash(password, 10);

    let user = await Auth.findOne({ email });

    if (user) {
      user.username = username;
      user.password = hashedPassword;
      user.isemailverified = true;
      await user.save();
    } else {
      user = new Auth({
        username,
        email,
        password: hashedPassword,
        isemailverified: true
      });
      await user.save();
    }

    res.json({ message: 'email verified' });
  } catch (error) {
    console.error('Error:', error); // Log the error
    next(error);
  }
};


export const signout = (req, res, next) =>{
   try{
      res.clearCookie('access_token').status(200).json('User has been signed out ');
   }
   catch(error){
      next(error);
   }
};
import Auth from "../models/auth.model.js";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { errorHandler } from '../Utils/error.js';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const otpStore = {};

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
    const { phoneNumber, email } = req.body;

    if (!phoneNumber) {
        return next(errorHandler(400, 'Phone number is required'));
    }

    try {
        const exists = await userExists(phoneNumber, email);
        if (exists) {
            return next(errorHandler(400, 'Phone number or email already exists'));
        }

        const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore[formattedPhoneNumber] = otp;

        console.log(`Stored OTP for ${formattedPhoneNumber}: ${otp}`); // Debug log

        await client.messages.create({
            body: `Your OTP code for SSC is ${otp}`,
            from: process.env.NUMBER,
            to: formattedPhoneNumber
        });

        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req, res, next) => {
    const { phoneNumber, otp, username, email, password } = req.body;

    console.log('Request Body:', req.body); // Log request data

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    console.log('Stored OTP:', otpStore[formattedPhoneNumber]); // Log stored OTP
    console.log('Received OTP:', otp); // Log received OTP

    if (!phoneNumber || !otp || !username || !email || !password) {
        return next(errorHandler(400, 'All fields are required'));
    }

    if (otpStore[formattedPhoneNumber] !== otp) {
        console.log('OTP does not match'); // Debug message
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    delete otpStore[formattedPhoneNumber];

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);

        let user = await Auth.findOne({ phoneNumber: formattedPhoneNumber });

        if (user) {
            user.username = username;
            user.email = email;
            user.password = hashedPassword;
            user.ismobileverified = true;
            await user.save();
        } else {
            user = new Auth({
                phoneNumber: formattedPhoneNumber,
                username,
                email,
                password: hashedPassword,
                ismobileverified: true
            });
            await user.save();
        }

        res.json({ message: 'Phone number verified and user data updated' });
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
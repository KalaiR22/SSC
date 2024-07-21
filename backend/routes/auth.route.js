import express from 'express';
import { login, sendOtp,  signout,  verifyOtp } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login',login);
router.post('/sendotp', sendOtp);
router.post('/verifyuser', verifyOtp)
router.post('/signout', signout);


export default router;
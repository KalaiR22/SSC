import express from 'express';
import { resetpassword, verifyemail } from '../controllers/password.controller.js';



const router = express.Router();

// Generate a reset password token and send email
router.post('/resetpassword', verifyemail);

// Verify the reset password token and reset the password
router.post('/resetpassword/:token', resetpassword);

export default router;

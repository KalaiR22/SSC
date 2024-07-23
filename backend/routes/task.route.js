import express from 'express';
import { addChallengeToUser, AllChallenges, AllChallengesByEmail } from '../controllers/task.controller.js';


const router = express.Router();

router.get('/allchallenge', AllChallenges);
router.post('/addChallenge', addChallengeToUser);
router.get('/challenge/:email', AllChallengesByEmail)


export default router;
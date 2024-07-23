import Task from "../models/task.model.js";
import Auth from "../models/auth.model.js";
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import dotenv from 'dotenv';
import { errorHandler } from "../Utils/error.js";

dotenv.config();

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for credentials
    pass: process.env.EMAIL_PASS
  }
});

// Function to send an email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent: ' + info.response);
  });
};

// Function to get task details by taskId
const getTaskDetails = async (taskId, taskIndex) => {
  console.log(`Fetching task details for taskId: ${taskId}, taskIndex: ${taskIndex}`);
  const challenge = await Task.findOne({ "_id": taskId });
  if (!challenge) {
    console.error(`No challenge found for taskId: ${taskId}`);
    return null;
  }
  const task = challenge.tasks.find(task => task.id === taskIndex.toString());
  if (!task) {
    console.error(`No task found with id: ${taskIndex} for taskId: ${taskId}`);
    return null;
  }
  return task;
};

// Function to schedule emails for tasks
const scheduleEmails = (userId, userEmail, challengeId, startIndex = 0) => {
  cron.schedule(`0 0 * * *`, async () => {
    console.log(`Running cron job for user: ${userId}, challenge: ${challengeId}, startIndex: ${startIndex}`);
    const user = await Auth.findById(userId);
    if (!user) return;

    const challenge = user.challengesJoined.find(challenge => challenge.taskId === challengeId);
    if (!challenge) return;

    const taskDetails = await getTaskDetails(challengeId, challenge.lastSentIndex);
    if (!taskDetails) return;

    sendEmail(
      userEmail,
      `Task: ${taskDetails.title} from SSC`,
      `Here is your task: ${taskDetails.title}`,
      `<h1>Here is your task: ${taskDetails.title}</h1><p>Video: <a href="${taskDetails.videoUrl}">${taskDetails.videoUrl}</a></p><p><img src="${taskDetails.imageUrl}" alt="${taskDetails.title}" /></p>`
    );

    challenge.lastSent = new Date();
    challenge.lastSentIndex += 1;
    await user.save();

    if (challenge.lastSentIndex >= challenge.tasks.length) {
      console.log(`All tasks sent for challenge: ${challengeId}`);
      cron.stop();
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata" // India timezone
  });
};


export const addChallengeToUser = async (req, res, next) => {
  const { userId, taskId, taskTitle } = req.body;
  console.log(userId, taskId, taskTitle);

  if (!userId || !taskId || !taskTitle) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const user = await Auth.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the user has already joined the challenge
    const challengeExists = user.challengesJoined.some(challenge => challenge.taskId === taskId);

    if (challengeExists) {
      return res.status(400).json({ success: false, message: 'User has already joined this challenge' });
    }

    // Add the new challenge to the user's challengesJoined
    const challenge = { taskId, taskTitle, lastSent: null, lastSentIndex: 1 };
    user.challengesJoined.push(challenge);
    await user.save();

    // Fetch the first task of the challenge
    const taskDetails = await getTaskDetails(taskId, 1);
    if (taskDetails) {
      console.log('Sending initial task email...');
      sendEmail(
        user.email,
        `Task: ${taskDetails.title}`,
        `Here is your first task: ${taskDetails.title}`,
        `<p>Here is your first task: ${taskDetails.title}</p><p>Video: <a href="${taskDetails.videoUrl}">${taskDetails.videoUrl}</a></p><p><img src="${taskDetails.imageUrl}" alt="${taskDetails.title}" /></p>`
      );

      // Schedule subsequent tasks to be sent every 24 hours
      scheduleEmails(userId, user.email, taskId);
    } else {
      console.error('First task details not found');
    }

    res.json({ success: true, message: 'Challenge added', user });
  } catch (error) {
    console.error('Error adding challenge:', error);
    res.status(500).json({ success: false, message: 'Failed to add challenge' });
  }
};



export const taskcreate = async (req, res, next) => {
    const {title,videoUrl, imageUrl,day, challengeno} = req.body;

   let task;

    try {
        task = new Task({
       title,videoUrl, imageUrl,day, challengeno
        })
        await task.save();
        res.json({ msg:"ok" });
    } catch (error) {
        next(error);
    }
};

export const AllChallenges = async (req, res, next) => {
    try {
        const challenges = await Task.find({});
        res.json(challenges);
    } catch (error) {
        next(errorHandler(500, 'Failed to fetch challenges'));
    }
};

export const AllChallengesByEmail = async (req, res, next) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    

    const { challengesJoined } = user;

    res.json({ success: true, challenges: challengesJoined });
  } catch (error) {
    console.error('Error fetching challenges:', error); // Log the error for debugging
    next(errorHandler(500, 'Failed to fetch challenges'));
  }
};






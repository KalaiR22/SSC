import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
    taskId: {
        type: String,
    },
    taskTitle: {
        type: String,
    },
    lastSent: {
        type: Date,
        default: null,
    },
    lastSentIndex: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        isemailverified: {
            type: Boolean,
            required: true,
        },
        challengesJoined: [challengeSchema],
    },
    { timestamps: true }
);

const Auth = mongoose.model('Auth', authSchema);

export default Auth;

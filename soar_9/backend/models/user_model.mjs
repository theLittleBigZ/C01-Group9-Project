import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    },
    password: {
    type: String,
    required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    language: {
        type: String,
        required: false,
        default: 'English',
    },
    fontSize: {
        type: String,
        required: true,
        default: 'Medium',
    },
    brightness: {
        type: Number,
        required: true,
        default: 50,
    },
    speechToText: {
        type: Boolean,
        required: false,
        default: false,
    },
    selectedApps: {
        type: [String],
        required: false,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
export default User;
  

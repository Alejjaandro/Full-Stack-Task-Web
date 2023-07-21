import mongoose from "mongoose";

// Creating a model with the info that will be require the database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);
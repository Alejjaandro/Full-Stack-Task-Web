import mongoose from 'mongoose';

// Connecting to the database
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/final_project');
        console.log('-> DB connected');
    } catch (error) {
        console.log(error);
    }
}
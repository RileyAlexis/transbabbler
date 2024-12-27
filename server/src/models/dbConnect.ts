import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

export const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        if (process.env.NODE_ENV === 'production') {
            mongoose.set('autoIndex', false);
        }
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.log("Error Connecting to Mongo DB", error);
        process.exit(1);
    }
}
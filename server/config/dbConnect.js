import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL;

async function connectDB() {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Databse connected successfully")
    } catch (error) {
        throw new Error(`Database connection failed: ${error.message}`);
    }
}

export default connectDB;
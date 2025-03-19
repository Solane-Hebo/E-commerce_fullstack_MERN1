
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 2222;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () =>
            console.log(`Server is running on http://localhost:${PORT}`)
        );
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

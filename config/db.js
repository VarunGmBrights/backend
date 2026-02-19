import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
    // Skip if already connected
    if (mongoose.connection.readyState === 1) {
        console.log('DB already connected');
        return;
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://VarunFoods:BlackBeast7022@cluster0.zlybm4i.mongodb.net/varunFoods', {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`DB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Error: ${error.message}`);
    }
}

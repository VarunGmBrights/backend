import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://VarunFoods:BlackBeast7022@cluster0.zlybm4i.mongodb.net/varunFoods');
        console.log(`DB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Error: ${error.message}`);
        // Don't exit on Vercel - continue anyway
    }
}

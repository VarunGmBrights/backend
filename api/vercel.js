import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import foodRouter from '../routes/foodRoute.js'
import userRouter from '../routes/userRoute.js'
import cartRouter from '../routes/cartRoute.js'
import orderRouter from '../routes/orderRoute.js'
import cookieParser from 'cookie-parser'

const app = express()

// Middleware
app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Cookie parser
app.use(cookieParser())

// CORS configuration
app.use(cors({
  origin: [
    'https://frontend-sigma-henna-94.vercel.app', 
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('uploads'))

// Database connection
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://VarunFoods:BlackBeast7022@cluster0.zlybm4i.mongodb.net/varunFoods';
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('DB Connected on Vercel');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
    }
}

// Initialize DB connection
connectDB();

// API Routes
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// Root endpoint
app.get("/", (req, res) => {
    res.send("API Working")
})

export default app


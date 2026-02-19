import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://VarunFoods:BlackBeast7022@cluster0.zlybm4i.mongodb.net/varunFoods');
    console.log("DB Connected");
}

import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://tusharraj_db_user:kaySMdN8Pa59Z2CS@cluster0.96nkebx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{})
       console.log("MongoDB Connected");
       
    } catch (error) {
        console.error(error, "DB issue");
    }
}
connectDB();
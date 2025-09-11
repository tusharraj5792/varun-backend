import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
import './configs/db.config.js'
import router from './routes/index.js';
const app = express();

app.use(express.json())
app.use(cors({origin:'*'}))
app.use('/api/v1',router)


app.use("/", (req,res)=>{
    res.send("Working")
})


app.use((error, req,res,next)=>{
    return res.status(error.status || 500).json({
        success: false,
        status:error.status || 500,
        message:error.message || "Something went wrong"
    })
})
app.listen(8000,()=>{
    console.log('Server started at 8000 port');
    
})
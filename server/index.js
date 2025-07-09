import express from "express"
import 'dotenv/config'
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import authMiddleware from "./middlewares/authMiddleware.js";

const app=express();
const PORT=process.env.PORT||3000;

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send('NeoBank API runnning');
})

app.get('/api/protected',authMiddleware,(req,res)=>{
    res.json({msg:`Hello secure user ${req.user}`});
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running at port ${PORT}`);
    });
});
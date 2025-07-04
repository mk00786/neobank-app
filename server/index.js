import express from "express"
import 'dotenv/config'
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import jwt from 'jsonwebtoken'

const app=express();
const PORT=process.env.PORT||3000;

const requireAuth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({msg:'No token'});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded.id;
        next();
    }catch(err){
        res.status(401).json({msg:'Invalid token'});
    }
}

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send('NeoBank API runnning');
})

app.get('/api/protected',requireAuth,(req,res)=>{
    res.json({msg:`Hello secure user ${req.user}`});
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running at port ${PORT}`);
    });
});
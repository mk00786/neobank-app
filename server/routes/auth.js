import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const router=express.Router();

router.post('/login', async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({msg:'Invalid Credentials'});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)  return res.status(404).json({msg:'Invalid Credentials'});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d',
        });

        res.json({token,user:{id:user._id,email:user.email}})
    }catch(err){
        res.status(500).json({msg:'Server error'});
    }
});

export default router;
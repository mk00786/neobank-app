import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router=express.Router();

router.get('/me',authMiddleware,async(req,res)=>{
    try{
        const user= await User.findById(req.user).select('-password');
        if(!user) return res.status(404).json({msg:'User not found'});
        res.json({user});
    }catch(err){
        console.error('Error in /me',err);
        res.status(500).json({msg:'Server error'});
    }
})

//register
router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;

    try{
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(400).json({msg:'User already exists'});

        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1d'
        });

        res.status(201).json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },
        });

    }catch(err){
        return res.status(500).json({msg:'Server Error'});
    }
})

//Login
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
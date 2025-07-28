import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler';

export const registerUser=asyncHandler( async (req,res)=>{
    const {name,email,password}=req.body;

    if(!name||!email||!password){
        throw new Error('Please fill all fields');
    }

    if(password.length<6){
       throw new Error('Password must be of atleast 6 characters');
    }

    const UserExists=await User.findOne({email});
    if(UserExists) throw new Error('User already exists');

    const user=await User.create({name,email,password});
    const token=generateToken(user._id);
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:24*60*60*1000,
    }).status(200)
    .json({user:{id:user._id,name:user.name},email:user.email,
        msg:'Register succuessfull',
    });
});

export const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    if(!email||!password){
        throw new Error('Please fill all fields');
    }

    const user=await User.findOne({email});
    if(!user) throw new Error('Invalid Credentials');
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error ('Invalid Credentials');
    const token=generateToken(user._id);
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:24*60*60*1000
    }).status(200)
    .json({user:{id:user._id,name:user.name,email:user.email,
        msg:'Login Successfull',
    }});
});

export const getProfile=asyncHandler( async (req,res)=>{
        const user= await User.findById(req.user).select('-password');
        if(!user) throw new Error('User not found');
        res.json({user});
});
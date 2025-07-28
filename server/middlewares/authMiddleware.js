import jwt from 'jsonwebtoken';
import User from '../models/User.js'

export const protect = async (req,res,next) => {
    const token=req.cookies.token;
    if(!token){
        res.status(401);
        throw new Error('Not authorized,token missing');
    }
    
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded.id;
        next();
    }catch(err){
        res.status(401);
        throw new Error('Not authorized,invalid token');
    }
}

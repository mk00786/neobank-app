import express from 'express';
import { getProfile,loginUser,registerUser } from '../controllers/authController.js';
import {protect} from '../middlewares/authMiddleware.js'
import rateLimit from 'express-rate-limit'

const router=express.Router();

const authLimit=rateLimit({
    windowMs:1000*60*15,
    max:10,
    message:{msg:'Too many requests,try again later'}
});

router.post('/register',registerUser);
router.post('/login',authLimit,loginUser);
router.get('/profile',protect,getProfile);

router.post('/logout',(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV==='production'
    })
    res.status(200).json({msg:'Logged Out successfully'});
})

export default router;
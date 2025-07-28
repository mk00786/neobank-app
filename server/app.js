import express from "express"
import 'dotenv/config'
import cors from 'cors';
import connectDB from "./config/db.js";
import {errorHandler} from './middlewares/errorHandler.js'
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app=express();

//DB
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use('/api/auth',authRoutes);

//Error handler after routes
app.use(errorHandler);

export default app;
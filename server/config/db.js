import mongoose from "mongoose";

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected:${conn.connection.host}`)
    }catch(err){
        console.error('DB connection error:',err);
        process.exit(1);
    }
}

export default connectDB;
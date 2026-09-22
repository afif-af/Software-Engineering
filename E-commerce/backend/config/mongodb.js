import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI)
{
    throw new Error(
        "MongoDB URI is required. Please use MongoDB."

    )
}

async function connectDb()
{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}

export default connectDb;

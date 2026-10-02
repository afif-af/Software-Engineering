import userModel from "../models/userModel.js";


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size} =req.body;
        const userData = await userModel.findById(userId);
        
    }
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);

}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user =await userModel.findOne({email});
        if(!user){
            return res.json({
                success: false, 
                message: "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({
                success: false, 
                message: "Invalid Password"
            })
        }
        else{
            const token = createToken(user._id);
            return res.json({
                success: true, 
                message: "Login Success",
                token,
            
            })
        }

    }
    catch(e){
        console.error(e);
        return res.json({
            success: false,
            message: e.message
        })
    }

}


const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({
                success: false,
                message: "User Already Exists"
            })
        }
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Invalid Email"
            })
        }   
        if(password.length < 8){
            return res.json({
                success: false, 
                message: "Password must be at least 8 characters"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword   
        })
        const user =await newUser.save();
        const token = createToken(user._id);
        return res.json({
            success: true,
            message: "User Registered Successfully",
            token
        })
    }
    catch(e){
        console.error(e);
        return res.json({  
            success: false,
            message: e.message
        })
    }
}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            return res.json({
                success: true,
                message: "Admin Login Success",
                token
            });
        }
        else {
            return res.json({
                success: false,
                message: "Invalid Admin email or password"
            });
        }
    }
    catch (e) {
        console.error(e);
        return res.json({
            success: false,
            message: e.message
        });
    }
}


const userList = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");

        res.json({
            success: true,
            users
        });
    }
    catch (e) {
        console.error(e);

        res.status(500).json({
            success: false,
            message: e.message
        });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password -cartData");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.json({ success: true, user });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !email || !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Valid name and email are required" });
        }
        const existingUser = await userModel.findOne({ email, _id: { $ne: req.userId } });
        if (existingUser) return res.status(409).json({ success: false, message: "Email is already in use" });
        const user = await userModel.findByIdAndUpdate(
            req.userId,
            { $set: { name, email, phone: phone || "", address: address || {} } },
            { new: true, runValidators: true }
        ).select("-password -cartData");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.json({ success: true, user, message: "Profile updated" });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};
export { loginUser, registerUser, adminLogin, userList, getUserProfile, updateUserProfile };

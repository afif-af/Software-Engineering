import userModel from "../models/userModel";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);

}

const Loginuser = async (req, res) => {
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
        const newuser = await userModel.create({
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


export { Loginuser, registerUser, adminLogin };

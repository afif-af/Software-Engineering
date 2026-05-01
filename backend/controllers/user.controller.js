import UserModel from '../models/user.model.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmailFun from '../utils/sendEmail.js';
import verifEmailTemplate from '../utils/verifEmailTemplate.js';
// import {usr} from "express/lib/application.js";

export async  function registerUserController(req, res) {
    try {
        let user;
        const { name, email, password } = req.body;

        if(!name || !email || !password ) {
            return res.status(400).json({
                message: 'Please provide name, email, and password',
                error: true,
                success: false
            });
        }

        user = await UserModel.findOne({ email:email });

        if(user) {
            return res.status(400).json({
                message: 'Email already registered',
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const verifyCode=Math.floor(100000 + Math.random() * 900000).toString();


        user = new UserModel({
            name:name,
            email:email,
            password: hashPassword,
            verification_otp:verifyCode,
            verification_otp_expire: new Date(Date.now() + 10 * 60 * 1000)

        });
         await user.save();
        // const save = await user.save();

        const verifyEmail=await sendEmailFun({
            sendTo: email,
            subject: 'Verify Email',
            text:"",
            html: verifEmailTemplate(name, verifyCode,)
        });

        if (!verifyEmail) {
            return res.status(500).json({
                message: "Email sending failed",
                error: true,
                success: false
            });
        }


        const token =jwt.sign({
          email: user.email, id:user._id
        }, process.env.JWT_SECRET,);

        return res.status(200).json({
            message: "User registered successfully. Please check your email to verify.",
            error: false,
            success: true,
            token: token,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email:email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        if(!user.status !=="Active")
        {
            return res.status(400).json({
                messages : "Contract to admin",
                error: true,
                success: false
            })
        }

        // if (!user.verify_email) {
        //     return res.status(400).json({
        //         message: "Please verify your email first",
        //         error: true,
        //         success: false
        //     });
        // }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: 'Incorrect password',
                error: true,
                success: false
            });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        await UserModel.findByIdAndUpdate(user._id, { refresh_token: refreshToken, last_login_data: new Date() });

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        res.cookie('accessToken', accessToken, cookieOption);
        res.cookie('refreshToken', refreshToken, cookieOption);

        return res.json({
            message: 'Login successful',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { email, verification_otp } = req.body;

        if (!email || !verification_otp) {
            return res.status(400).json({
                message: 'Please provide email and verification code',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({
            email: email,
            verification_otp: verification_otp,
            verification_otp_expire: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or verification code',
                error: true,
                success: false
            });
        }

        await UserModel.findByIdAndUpdate(user._id, {
            verify_email: true,
            verification_otp: null,
            verification_otp_expire: null
        });

        return res.json({
            message: 'Email verified successfully',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//  export async function verifyEmailController(req, res) {
//     try {
//         const { code } = req.body;
//
//         if (!code) {
//             return res.status(400).json({
//                 message: 'Please provide verification code',
//                 error: true,
//                 success: false
//             });
//         }
//
//         // const user = await UserModel.findById(code);
//         const user = await UserModel.findOne({
//             verification_otp: code,
//             verification_otp_expire: { $gt: new Date() }
//         });
//         if (!user) {
//             return res.status(400).json({
//                 message: 'Invalid verification code',
//                 error: true,
//                 success: false
//             });
//         }
//
//         // await UserModel.findByIdAndUpdate(user._id, { verify_email: true });
//         await UserModel.findByIdAndUpdate(user._id, {
//             verify_email: true,
//             verification_otp: null,
//             verification_otp_expire: null
//         });
//
//         return res.json({
//             message: 'Email verified successfully',
//             error: false,
//             success: true
//         });
//
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         });
//     }
// }
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Please provide email',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expireTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expire: expireTime
        });

        // Send email with OTP
        await sendEmailFun({
            sendTo: email,
            subject: "Forgot Password OTP",
            text: "",
            html: `<p>Your OTP is ${otp}</p>`
        });
        // Assuming sendEmail is imported

        return res.json({
            message: 'OTP sent to your email',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function resetPasswordController(req, res) {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: 'Please provide email, OTP, and new password',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                error: true,
                success: false
            });
        }

        // if (new Date() > user.forgot_password_expire) {
        //     return res.status(400).json({
        //         message: 'OTP expired',
        //         error: true,
        //         success: false
        //     });
        // }

        if (!user.forgot_password_expire || new Date() > user.forgot_password_expire) {
            return res.status(400).json({
                message: "OTP expired",
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        await UserModel.findByIdAndUpdate(user._id, {
            password: hashPassword,
            forgot_password_otp: null,
            forgot_password_expire: null
        });

        return res.json({
            message: 'Password reset successfully',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function logoutController(req, res) {
    try {
        const userId = req.userId; // Assuming middleware sets req.userId

        await UserModel.findByIdAndUpdate(userId, { refresh_token: '' });

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        res.clearCookie('accessToken', cookieOption);
        res.clearCookie('refreshToken', cookieOption);

        return res.json({
            message: 'Logout successful',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function userDetailsController(req, res) {
    try {
        const userId = req.userId; // Assuming middleware sets req.userId

        const user = await UserModel.findById(userId).select('-password -refresh_token -forgot_password_otp -forgot_password_expire');

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'User details fetched successfully',
            error: false,
            success: true,
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

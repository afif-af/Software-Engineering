import express from "express";
import authUser from "../middleware/auth.js";
import {loginUser,registerUser,adminLogin,userList,getUserProfile,updateUserProfile} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.put("/profile", authUser, updateUserProfile);
userRouter.get("/list", userList);

export default userRouter;

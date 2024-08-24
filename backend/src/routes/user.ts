import { googleSingup, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { Router } from "express";
import { authenticateUser } from "../middleware/auth";

const userRouter = Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(authenticateUser,logoutUser)
userRouter.route('/signinwithgoogle').post(googleSingup)

export {userRouter}
import { googleSingup, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { Router } from "express";
import { authenticateUser } from "../middleware/auth";

const router = Router()

router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(authenticateUser,logoutUser)
router.route('/signinwithgoogle').post(googleSingup)

export {router}
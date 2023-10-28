import express from "express";
import { loginController, signupController , forgotPassword, resetPassword } from "../controllers/authController.js";



const router = express.Router();



router.post("/signup",signupController)

router.post("/login",loginController)

router.post("/password/reset", forgotPassword)

router.patch("/password/reset/:token", resetPassword)

export default router;
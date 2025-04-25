import express from 'express'
import { getUserProfile, loginUser, registerUser, resendOtp, resetPassword, updateUserProfile, verifyOtp , savePurchasedCourses } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/reset-password', resetPassword) 
userRouter.put('/update-profile/:userid', updateUserProfile)
userRouter.get('/get-profile/:userId', getUserProfile) 
userRouter.post('/verify-otp', verifyOtp);
userRouter.post("/resend-otp", resendOtp);
userRouter.post("/purchase/:userid", savePurchasedCourses); // Route to save purchased courses

export default userRouter;
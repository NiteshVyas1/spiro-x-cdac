import express from 'express'
import { getUserProfile, loginUser, registerUser, resetPassword, updateUserProfile } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/reset-password', resetPassword) 
userRouter.put('/update-profile/:userid', updateUserProfile)
userRouter.get('/get-profile/:userId', getUserProfile) 


export default userRouter;
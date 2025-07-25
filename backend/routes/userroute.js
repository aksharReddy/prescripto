import express from 'express';
import { registerUser,loginUser,getUserData,updateUserProfile,bookAppointment, listAppointment,cancelAppointment,paymentrazorpay,verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/getuserdata',authUser, getUserData);
userRouter.post('/update-profile',  upload.single('image'),authUser, updateUserProfile);
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser, cancelAppointment);
userRouter.post('/payment-razorpay',authUser, paymentrazorpay);
userRouter.post('/verifyRazorpay',authUser, verifyRazorpay);


export default userRouter;
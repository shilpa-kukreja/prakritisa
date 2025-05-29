import express from 'express'
import { adminLogin, alluser, deleteUser, facebookLoginUser, forgotPassword, GoggleloginUser, guestLoginUser, loginUser, registerUser, resetPassword } from '../controllers/authController.js'



const authRouter=express.Router()

authRouter.post('/admin',adminLogin)
authRouter.post('/login',loginUser)
authRouter.post('/guest',guestLoginUser)
authRouter.post('/register',registerUser)
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);
authRouter.post('/gogglelogin',GoggleloginUser)
authRouter.post('/facebooklogin', facebookLoginUser);
authRouter.get('/alluser',alluser);
authRouter.delete('/delete/:id',deleteUser);

export default authRouter;
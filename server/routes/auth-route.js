import express from 'express'
import { adminLogin, clientLogin, clientRegister, forgotPassword, resetPassword, userLogin, userRegister } from '../controllers/auth-controller.js'

import upload from '../middlewares/multer.js'

const authRouter = express.Router()

// routes
authRouter.post('/user/register', userRegister)
authRouter.post('/client/register',  upload.single('image'), clientRegister)
authRouter.post('/user/login', userLogin)
authRouter.post('/client/login', clientLogin)
authRouter.post('/admin/login', adminLogin)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)

export default authRouter
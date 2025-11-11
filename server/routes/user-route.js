import express from 'express'

import authUser from '../middlewares/auth-user.js'
import upload from '../middlewares/multer.js'
import { addToCart, getUserProfile, updateUserProfile } from '../controllers/user-controller.js'

const userRouter = express.Router()

userRouter.get('/get-profile', authUser, getUserProfile)
userRouter.patch('/update-profile', upload.single('image'), authUser, updateUserProfile)
userRouter.patch("/add-cart", authUser, addToCart);

export default userRouter
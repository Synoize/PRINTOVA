import express from 'express'

import authUser from '../middlewares/auth-user.js'
import upload from '../middlewares/multer.js'
import { getUserProfile, updateUserProfile } from '../controllers/user-controller.js'

const userRouter = express.Router()

userRouter.get('/get-profile', authUser, getUserProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserProfile)

export default userRouter
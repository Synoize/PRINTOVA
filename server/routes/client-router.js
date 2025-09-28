import express from 'express'

import authClient from '../middlewares/auth-client.js'
import upload from '../middlewares/multer.js'
import { getUserProfile, updateUserProfile } from '../controllers/user-controller.js'

const clientRouter = express.Router()

clientRouter.get('/get-profile', authClient, getUserProfile)
clientRouter.post('/update-profile', upload.single('image'), authClient, updateUserProfile)

export default clientRouter

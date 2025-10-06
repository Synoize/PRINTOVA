import express from 'express'

import authUser from '../middlewares/auth-user.js'
const orderRouter = express.Router()

orderRouter.get('/add', authUser )

export default orderRouter

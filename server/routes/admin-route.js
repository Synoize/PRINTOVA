import express from 'express'

import { adminDashboard, adminLogin, allClients, allOrders, allProducts, allUsers, registerClient } from '../controllers/admin-controller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/auth-admin.js';


const adminRouter = express.Router();

adminRouter.post('/register-client', authAdmin, upload.single('image'), registerClient);
adminRouter.post('/login', adminLogin)
adminRouter.get('/all-clients', authAdmin, allClients)
adminRouter.get('/all-users', authAdmin, allUsers)
adminRouter.get('/all-orders', authAdmin, allOrders)
adminRouter.get('/all-products', authAdmin, allProducts)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter
import express from 'express'

import authUser from '../middlewares/auth-user.js'
import { createOrder, deleteOrder, getAllOrders, getOrderById, getOrdersByClient, getOrdersByUser, updateOrder, updateOrderStatus } from '../controllers/order-controller.js';
const orderRouter = express.Router()

orderRouter.post("/", authUser, createOrder);
orderRouter.get("/", authUser, getAllOrders);
orderRouter.get("/:id", authUser, getOrderById);
orderRouter.get("/user/:userId", authUser, getOrdersByUser);
orderRouter.get("/client/:clientId", getOrdersByClient);
orderRouter.patch("/:id", updateOrder);
orderRouter.patch("/:id/status", updateOrderStatus);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter

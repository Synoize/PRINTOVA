import express from "express";
import authUser from '../middlewares/auth-user.js'
import { addToCart, getCartItems, removeCartItem, updateCartQuantity } from "../controllers/cart-controller.js";

const userRouter = express.Router();

userRouter.post("/add", authUser, addToCart);
userRouter.get("/", authUser, getCartItems);
userRouter.patch("/update/:cartId", authUser, updateCartQuantity);
userRouter.delete("/remove/:cartId", authUser, removeCartItem);

export default userRouter;

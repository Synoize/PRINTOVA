import CartModel from "../models/cart-model.js";

// ADD TO CART
export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity, price } = req.body;

        if (!productId || !quantity || !price) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // Check if item already exists in cart
        const existingItem = await CartModel.findOne({ userId, productId });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.json({ success: true, message: "Quantity updated", cart: existingItem });
        }

        const newCartItem = await CartModel.create({
            userId,
            productId,
            quantity,
            price
        });

        return res.json({
            success: true,
            message: "Added to cart",
            cart: newCartItem
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET USER CART ITEMS
export const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;

        const cartItems = await CartModel.find({ userId }).populate("productId");

        return res.json({ success: true, cart: cartItems });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// UPDATE CART ITEM QUANTITY
export const updateCartQuantity = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            });
        }

        const updatedItem = await CartModel.findByIdAndUpdate(
            cartId,
            { quantity },
        );

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        return res.json({
            success: true,
            message: "Quantity updated"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {
    try {
        const { cartId } = req.params;

        const deletedItem = await CartModel.findByIdAndDelete(cartId);

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        return res.json({
            success: true,
            message: "Item removed"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

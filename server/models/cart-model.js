import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, ref: 'user', required: true },
    productId: { type: String, ref: 'product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Object, required: true },
    date: {
        type: Date,
        default: Date.now
    },
}, {minimize: false})

const CarttModel = mongoose.models.cart || mongoose.model('cart', cartSchema)

export default CarttModel

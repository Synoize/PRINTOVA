import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String, ref: "user", required: true },
    clientId: { type: String, ref: "client", required: true },
    productId: {type: String, ref: "product", required: true},
    productData: { type: Object, required: true },
    userData: { type: Object, required: true },
    clientData: { type: Object, required: true },
    payment: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["pending", "confirmed", "dispatch", "completed", "cancelled"],
        default: "pending"
    },
    date: { type: Date, default: Date.now },
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)

export default orderModel
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, ref: "user", required: true },
    clientId: { type: String, ref: "client", required: true },
    productId: { type: String, ref: "product", required: true },
    productData: { type: Object, required: true },
    userData: { type: Object, required: true },
    clientData: { type: Object, required: true },
    customProduct: {
        type: Object, default: {
            uploaded_design: '',
            color: '',
            type: '',
            quality: '',
            size: '',
            other: ''
        }
    },
    quantity: { type: Number, default: 1 },
    address: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "dispatch", "completed", "cancelled"],
        default: "pending"
    },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

const OrderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default OrderModel;

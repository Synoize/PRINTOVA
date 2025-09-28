import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    clientId: { type: String, ref: "Client", required: true },
    clientData: { type: Object, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
    date: {
        type: Date,
        default: Date.now
    },
}, {minimize: false})

const productModel = mongoose.models.product || mongoose.model('product', productSchema)

export default productModel

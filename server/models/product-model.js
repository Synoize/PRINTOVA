import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: String, default: '' },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
    date: {
        type: Date,
        default: Date.now
    },
}, {minimize: false})

const ProductModel = mongoose.models.product || mongoose.model('product', productSchema)

export default ProductModel

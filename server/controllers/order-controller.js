import OrderModel from "../models/order-model.js";


export const createOrder = async (req, res) => {
  try {
    const { userId, productId, productData, userData, customProduct, quantity, address, totalPrice } = req.body;

    if (!userId || !clientId || !productId || !address || !totalPrice) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new OrderModel({
      userId,
      productId,
      productData,
      userData,
      customProduct,
      quantity,
      address, 
      totalPrice,
    });

    const order = await newOrder.save();
    return res.status(201).json({ success: true, order: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().sort({ date: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get orders by user ID
export const getOrdersByUser = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.params.userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get orders by client ID
export const getOrdersByClient = async (req, res) => {
    try {
        const orders = await OrderModel.find({ clientId: req.params.clientId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update order (e.g., change status or payment)
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update order status only
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["pending", "confirmed", "dispatch", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete order
export const deleteOrder = async (req, res) => {
    try {
        const deleted = await OrderModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Order not found" });
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

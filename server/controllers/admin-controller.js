import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import userModel from '../models/user-model.js';
import clientModel from '../models/client-model.js';
import orderModel from '../models/order-model.js';
import productModel from '../models/product-model.js';

import UserModel from '../models/user-model.js';


// Add Client API : /api/admin/add-client
export const addNewClient = async (req, res) => {
    try {
        const { name, email, phone, password, gender, dob, address, aadharNumber, accountNumber, ifscCode, panNumber } = req.body;
        const imageFile = req.file;

        // Validate required fields
        if (!name || !email || !phone || !password || !gender || !dob || !address || !aadharNumber || !accountNumber || !ifscCode || !panNumber) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email address" });
        }

        // Validate password
        if (password.length < 6) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Validate phone
        if (!phone || !/^\+\d{1,3}\d{7,14}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid phone number with country code"
            });
        }

        // Check image file
        if (!imageFile) {
            return res.json({ success: false, message: "Profile image is required" });
        }

        // Prevent duplicate email
        const existingClient = await UserModel.findOne({ email });
        if (existingClient) {
            return res.json({ success: false, message: "Client already exists" });
        }

        // validating strong password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const clientData = {
            name,
            email,
            phone,
            password: hashedPassword,
            image: imageUrl,
            gender,
            dob,
            address: JSON.parse(address),
            aadharNumber,
            accountNumber,
            ifscCode,
            panNumber,
            isClient: true,
            clientVerificationStatus: "confirmed"
        };

        const newClient = new UserModel(clientData);
        await newClient.save();

        return res.json({ success: true, message: "Client Added" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Admin login API : /api/admin/login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_ADMIN_SECRET_KEY)

            return res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Get All Clients List API : /api/admin/all-clients
const allClients = async (req, res) => {
    try {
        const clients = await clientModel.find({}).select('-password')
        return res.json({ success: true, clients });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Get All Users List API : /api/admin/all-users
const allUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password')
        return res.json({ success: true, users });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Get All Orders List API : /api/admin/all-orders
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Get All Products List API : /api/admin/all-products
const allProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({ success: true, products });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// API to get dashboard data for admin panel: /api/admin/dashboard
const adminDashboard = async (req, res) => {
    try {
        const clients = await clientModel.find({});
        const users = await userModel.find({});
        const orders = await orderModel.find({});

        const dashboardData = {
            clients: clients.length,
            orders: orders.length,
            users: users.length,
            lastestOrders: orders.reverse().slice(0, 7)
        }

        return res.json({ success: true, dashboardData });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export { registerClient, adminLogin, allClients, allUsers, allOrders, allProducts, adminDashboard };

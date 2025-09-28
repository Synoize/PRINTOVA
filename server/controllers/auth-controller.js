import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import nodemailer from "nodemailer";
import UserModel from "../models/user-model.js"

// Register API POST : /api/auth/user/register
export const userRegister = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body

        if (!name || !phone || !email || !password) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email address" });
        }

        // Validate password
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Enter a strong password" });
        }

        // Validate phone
        if (!phone || !/^\+\d{1,3}\d{7,14}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid phone number with country code"
            });
        }

        // Prevent duplicate email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "user already exists" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            phone,
            email,
            password: hashedPassword
        }

        const newUser = new UserModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET_KEY, {
            expiresIn: "1d",
        })

        return res.status(200).json({ success: true, token })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Register Client API : /api/auth/client/register
export const clientRegister = async (req, res) => {
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
            clientVerificationStatus: "requested"
        };

        const newClient = new UserModel(clientData);
        await newClient.save();

        const token = jwt.sign({ id: newClient._id }, process.env.JWT_CLIENT_SECRET_KEY, {
            expiresIn: "1d",
        });

        return res.json({ success: true, cToken: token, message: "You will be verified under 24 hours" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Login User POST API : /api/auth/user/login
export const userLogin = async (req, res) => {
    try {
        const { phone, password } = req.body

        if (!phone || !password) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const user = await UserModel.findOne({ phone });

        if (user.isAdmin || user.isClient) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        if (!user) {
            return res.json({ success: false, message: "user not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET_KEY);
            return res.json({ success: true, token, user: user });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

// Login Client POST API : /api/auth/client/login
export const clientLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const user = await UserModel.findOne({ email });

        if (!user || !user.isClient) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_CLIENT_SECRET_KEY);
            return res.json({ success: true, cToken: token, client: user });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

// Login Admin POST API : /api/auth/admin/login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate credentials against environment variables
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid admin credentials" });
        }

        // Generate token with admin details
        const token = jwt.sign(
            { email: process.env.ADMIN_EMAIL, role: "admin" },
            process.env.JWT_ADMIN_SECRET_KEY,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "Loggedin successfully",
            aToken: token
        });
    } catch (error) {
        console.error("Admin Login Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Forgot Password POST API : /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        // generate token
        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        });

        return res.json({ success: true, message: "Password reset link sent to email" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}

// Reset Password POST API : /api/auth/reset-password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.json({ success: false, message: "Invalid or expired token" });

        user.password = password; // hash with bcrypt in real apps
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        return res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
}


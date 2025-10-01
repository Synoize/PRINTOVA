import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import clientModel from '../models/client-model.js';

// Get Client Profile API : /api/client/get-profile 
const getClientProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId).select('-password');

        return res.json({ success: true, userData });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export {getClientProfile }
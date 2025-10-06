import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import UserModel from '../models/user-model.js';

// Get Client Profile API : /api/client/get-profile 
export const getClientProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await UserModel.findById(userId).select('-password');

        return res.json({ success: true, client: userData });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

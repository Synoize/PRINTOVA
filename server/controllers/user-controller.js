import UserModel from '../models/user-model.js';
import { v2 as cloudinary } from 'cloudinary';


// Get User Profile API : /api/user/get-profile 
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing in request" });
        }

        const userData = await UserModel.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, userData });
    } catch (error) {
        console.error("Error in getUserProfile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update User Profile API : /api/user/update-profile 
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const updatedFields = {
            name,
            phone,
            dob,
            gender,
        };

        if (address) {
            updatedFields.address = JSON.parse(address);
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image', });
            updatedFields.image = imageUpload.secure_url;
        }

        await UserModel.findByIdAndUpdate(userId, updatedFields);

        return res.status(200).json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};


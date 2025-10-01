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



// // Book Appointment API : /api/user/book-appointment
// const bookAppointment = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { docId, slotDate, slotTime } = req.body;

//         const docData = await doctorModel.findById(docId).select('-password');
//         if (!docData) {
//             return res.json({ success: false, message: "Doctor not found" });
//         }

//         if (!docData.available) {
//             return res.json({ success: false, message: "Doctor not available" });
//         }

//         let slots_booked = docData.slots_booked || {};

//         if (slots_booked[slotDate]) {
//             if (slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({ success: false, message: "Slot not available" });
//             } else {
//                 slots_booked[slotDate].push(slotTime);
//             }
//         } else {
//             slots_booked[slotDate] = [slotTime];
//         }

//         const userData = await userModel.findById(userId).select('-password');
//         if (!userData) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         delete docData.slots_booked;

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now(),
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: "Appointment Booked" });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Book Appointment API : /api/user/appointments
// const userAppointments = async (req, res) => {
//     try {
//         const userId = req.userId
//         const appointments = await appointmentModel.find({ userId })

//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// // Cancel Appointment API : /api/user/cancel-appointment
// const cancelAppointment = async (req, res) => {
//     try {
//         const userId = req.userId
//         const { appointmentId } = req.body

//         const appointmentData = await appointmentModel.findById(appointmentId)

//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: "Not authorized" });
//         }

//         await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

//         const { docId, slotDate, slotTime } = appointmentData

//         const doctorData = await doctorModel.findById(docId)

//         let slots_booked = doctorData.slots_booked

//         slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked })

//         res.json({ success: true, message: "Appointment Cancelled" });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// // Make Payment Using Razorpay API : /api/user/payment-razorpay
// const paymentRazorpay = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;

//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (!appointmentData || appointmentData.cancelled) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Appointment cancelled or not found",
//             });
//         }

//         const options = {
//             amount: appointmentData.amount * 100, // Convert to paisa
//             currency: process.env.CURRENCY || "INR",
//             receipt: appointmentId,
//         };

//         const order = await razorpayInstance.orders.create(options);

//         return res.status(200).json({
//             success: true,
//             order,
//         });

//     } catch (error) {
//         console.error("Razorpay Payment Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Payment initiation failed",
//             error: error.message,
//         });
//     }
// };

// // API to verify payment of Razorpay : /api/user/verify-razorpay
// const verifyRazorpay = async (req, res) => {
//     try {
//         const { razorpay_order_id } = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         if (orderInfo.status === 'paid') {
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//             res.json({ success: true, message: "Payment successful" });
//         } else {
//             res.json({ success: false, message: "Payment failed" })
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }

// // Search doctor on the basis of speciality or description : /api/user/search-doctor
// const searchDoctor = async (req, res) => {
//     try {
//         const { keyword } = req.query;

//         if (!keyword) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Search keyword is required.',
//             });
//         }

//         // Case-insensitive search in speciality or description fields
//         const doctors = await doctorModel.find({
//             $or: [
//                 { speciality: { $regex: keyword, $options: 'i' } },
//                 { about: { $regex: keyword, $options: 'i' } },
//                 { name: { $regex: keyword, $options: 'i' } },
//                 { degree: { $regex: keyword, $options: 'i' } },
//                 { experience: { $regex: keyword, $options: 'i' } },
//             ]
//         });

//         res.status(200).json({
//             success: true,
//             doctors
//         });
//     } catch (error) {
//         console.error('Search Doctor Error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

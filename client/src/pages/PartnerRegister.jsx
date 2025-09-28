import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import ButtonLoader from "../components/ButtonLoader";
import { useNavigate } from "react-router-dom";
import { ImageUp } from 'lucide-react';

const PartnerRegister = () => {
    const { backendUrl, axios } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "+91",
        password: "",
        gender: "",
        dob: "",
        address: { street: "", city: "", state: "", zip: "" },
        aadharNumber: "",
        accountNumber: "",
        ifscCode: "",
        panNumber: "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle text input
    const handleChange = (e) => {
        const { name, value } = e.target;

        // For nested address
        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            toast.error("Please fill all required fields");
            return;
        }
        if (!image) {
            toast.error("Profile image is required");
            return;
        }

        setLoading(true);
        try {
            const fd = new FormData();
            for (let key in formData) {
                if (key === "address") {
                    fd.append("address", JSON.stringify(formData.address));
                } else {
                    fd.append(key, formData[key]);
                }
            }
            fd.append("image", image);

            const { data } = await axios.post(`${backendUrl}/api/auth/client/register`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-[90vh] flex flex-col items-center p-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-auto w-full sm:w-11/12 lg:w-3/4 border rounded-xl shadow-lg p-6 md:p-10 text-zinc-600">

                <div className="col-span-full flex flex-col space-y-2 mb-4">
                    <p className="text-2xl font-semibold">Client Registration</p>
                    <p>Please sign up as a client to continue</p>
                </div>

                {/* Left Column */}
                <div className="flex flex-col gap-3">

                    <div className='flex items-center gap-4 mb-2 text-gray-500'>
                        <label htmlFor="client-img">
                            {image ? <img className='w-24 h-24 object-contain bg-gray-100 rounded-full cursor-pointer' src={image && URL.createObjectURL(image)} alt="" /> : (
                                <div className='w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer'>
                                    <ImageUp />
                                </div>
                            )}
                        </label>
                        <input type="file"
                            accept="image/*"
                            id='client-img'
                            hidden
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                        <p>Upload client <br /> picture</p>
                    </div>
                    <div>
                        <label>Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="border border-zinc-300 rounded w-full p-2 mt-1"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-blue text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label>Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-3">
                    <div>
                        <label>Address</label>
                        <input
                            name="address.street"
                            placeholder="Street"
                            value={formData.address.street}
                            onChange={handleChange}
                            className="border border-zinc-300 rounded w-full p-2 mt-1 mb-2"
                        />
                        <input
                            name="address.city"
                            placeholder="City"
                            value={formData.address.city}
                            onChange={handleChange}
                            className="border border-zinc-300 rounded w-full p-2 mt-1 mb-2"
                        />
                        <input
                            name="address.state"
                            placeholder="State"
                            value={formData.address.state}
                            onChange={handleChange}
                            className="border border-zinc-300 rounded w-full p-2 mt-1 mb-2"
                        />
                        <input
                            name="address.zip"
                            placeholder="ZIP Code"
                            value={formData.address.zip}
                            onChange={handleChange}
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>Aadhar Number</label>
                        <input
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>PAN Number</label>
                        <input
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>Account Number</label>
                        <input
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                    <div>
                        <label>IFSC Code</label>
                        <input
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleChange}
                            required
                            className="border border-zinc-300 rounded w-full p-2 mt-1"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="col-span-full bg-blue text-white w-full py-2 rounded-md text-base disabled:opacity-50"
                >
                    {loading ? <ButtonLoader /> : "Register as Client"}
                </button>
            </div>
        </form>
    );
};

export default PartnerRegister;

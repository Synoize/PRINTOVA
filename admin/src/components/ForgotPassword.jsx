// ForgotPassword.jsx
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { X } from 'lucide-react';
import { AdminContext } from "../context/AdminContext";

const ForgotPassword = ({ action }) => {
  const {setOpenForgot} = action;
  const { axios, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/forgot-password`, { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center fixed backdrop-blur-sm top-0 left-0 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full sm:w-96 m-auto p-6 border border-gray-400 rounded-xl shadow bg-white/80">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Forgot Password</h2>
          <span className="cursor-pointer" onClick={() => setOpenForgot(false)}><X /></span>
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

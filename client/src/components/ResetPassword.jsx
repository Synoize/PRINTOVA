// ResetPassword.jsx
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const ResetPassword = ({ action }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { axios, backendUrl } = useContext(AppContext);
  const { setOpenReset } = action;

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password/${token}`, { password });
      if (data.success) {
        toast.success("Password reset successfully");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center fixed backdrop-blur-sm top-0 left-0 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full sm:w-96 m-auto p-6 border rounded-xl shadow">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Reset Password</h2>
          <span className="cursor-pointer" onClick={() => setOpenReset(false)}><X /></span>
        </div>
        <input
          type="password"
          placeholder="New password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

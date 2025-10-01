import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { ClientContext } from '../context/ClientContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonLoader from '../components/ButtonLoader';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

const Login = () => {
  const [state, setState] = useState('Client'); // Client or Admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setCToken } = useContext(ClientContext);
  const navigate = useNavigate();

  // ✅ validation function
  const validateForm = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  // ✅ handler of login client or admin
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/admin/login`,
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('aToken', data.aToken);
          setAToken(data.aToken);
          toast.success('Admin login successful');
          navigate('/admin');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/client/login`,
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('cToken', data.cToken);
          setCToken(data.cToken);
          toast.success('Client login successful');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center p-4"
    >
      <div className="flex flex-col gap-3 m-auto items-start md:p-8 p-6 w-full sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          <span className="text-primary">{state}</span> Login
        </p>
        <p className="w-full">
          Please login as {state.toLowerCase()} to continue
        </p>

        <div className="w-full">
          <label>Email</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <label>Password</label>
          <div className="relative">
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>


        <div className='w-full flex justify-between mt-1'>
          <p onClick={() => setOpenForgot(true)} className='hover:underline text-blue cursor-pointer'>forgot password</p>
          <p onClick={() => setOpenReset(true)} className='hover:underline text-blue cursor-pointer'>reset password</p>
        </div>

        {
          openForgot && (
            <ForgotPassword action={{ setOpenForgot }} />
          )
        }

        {
          openReset && (
            <ResetPassword action={{ setOpenReset }} />
          )
        }

        <button
          type="submit"
          disabled={loading}
          className="bg-blue text-white w-full py-2 rounded-md text-base disabled:opacity-50"
        >
          {loading ? <ButtonLoader /> : 'Login'}
        </button>

        {state === 'Admin' ? (
          <p className="text-center w-full">
            Login as client?{' '}
            <span
              onClick={() => setState('Client')}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center w-full">
            Login as admin?{' '}
            <span
              onClick={() => setState('Admin')}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

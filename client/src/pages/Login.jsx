import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonLoader from '../components/ButtonLoader';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { backendUrl, token, setToken, axios } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const validateForm = () => {
    if (state === 'Sign Up') {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast.error('Invalid email format');
        return false;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }
      if (phone.length < 10) {
        toast.error('Phone number must be at least 10 digits');
        return false;
      }
    }
    return true;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/auth/user/register`, {
          name,
          phone,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Successfully registered');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/user/login`, {
          phone,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login successful');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center p-4">
      <div className="flex flex-col gap-3 m-auto items-start md:p-8 p-6 w-full sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book instant orders</p>

        {state === 'Sign Up' && (
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full">
              <label htmlFor="name">Full Name</label>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
        )}

        <div className="w-full">
          <label htmlFor="phone">Phone</label>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="password">Password</label>
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
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-blue"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        {state === 'Login' && (
          <div className='w-full flex justify-between mt-1'>
            <p onClick={() => setOpenForgot(true)} className='hover:underline text-blue cursor-pointer'>forgot password</p>
            <p onClick={() => setOpenReset(true)} className='hover:underline text-blue cursor-pointer'>reset password</p>
          </div>
        )}

        {
          openForgot && (
            <ForgotPassword action={{setOpenForgot}}/>
          )
        }

        {
          openReset && (
            <ResetPassword action={{setOpenReset}}/>
          )
        }

        <button
          type="submit"
          disabled={loading}
          className="bg-blue text-white w-full py-2 rounded-md text-base cursor-pointer disabled:opacity-50"
        >
          {loading ? <ButtonLoader /> : state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-blue underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue underline cursor-pointer"
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

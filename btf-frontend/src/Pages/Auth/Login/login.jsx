import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Dumbbell, LogIn } from 'lucide-react';
import Model from '../../../Components/Model/model';
import ForgotPassword from '../../../Components/ForgotPassword/forgotPassword';
import { API_BASE } from '../../../api/base';

// Shared login for both admin and member accounts - the backend tells us
// the role, and we route to the right dashboard from there.
const Login = () => {
  const [loginField, setLoginField] = useState({ "email": "", "password": "" })
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleForgotClose = () => {
    setForgotPassword(prev => !prev);
  }

  const handleLogin = async () => {
    setLoggingIn(true);
    await axios.post(`${API_BASE}/auth/login`, loginField, { withCredentials: true }).then(async (response) => {
      const user = response.data.data;

      localStorage.setItem('isLogin', true);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userPic', user.profilePhoto);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('mustChangePassword', user.mustChangePassword ? 'true' : 'false');

      if (user.role === 'admin') {
        await axios.get(`${API_BASE}/gym-info`).then((infoResp) => {
          localStorage.setItem('gymName', infoResp.data.data.gymName);
        }).catch(err => {
          console.log(err)
        })
        navigate('/admin/dashboard');
      } else if (user.mustChangePassword || !user.isProfileCompleted) {
        navigate('/member/setup');
      } else {
        navigate('/member/dashboard');
      }

    }).catch(err => {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage)
    })
    setLoggingIn(false);
  }

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  }

  return (
    <div className='w-full min-h-screen flex bg-ink-950'>
      {/* brand panel */}
      <div
        className='hidden lg:flex w-1/2 relative items-center justify-center p-16 bg-cover bg-center'
        style={{ backgroundImage: `linear-gradient(rgba(10,10,12,0.75),rgba(10,10,12,0.9)), url("https://imgs.search.brave.com/rtCUUpbRSh-bGBT7R6uJkMJMsNpj0Yl0p7_TSBjxQ4A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDk0ODQ5/MTcuanBn")` }}
      >
        <div className='max-w-md animate-fadeUp'>
          <span className='w-14 h-14 rounded-xl bg-crimson-500 flex items-center justify-center mb-8'>
            <Dumbbell size={26} className='text-white' strokeWidth={2.5} />
          </span>
          <h1 className='font-display text-4xl uppercase tracking-tight text-bone-50 leading-tight'>
            Run The BTF from anywhere.
          </h1>
          <p className='text-bone-300 mt-5 leading-relaxed'>
            Members and admins both sign in here - you'll land on the right dashboard automatically.
          </p>
        </div>
      </div>

      {/* form panel */}
      <div className='w-full lg:w-1/2 flex items-center justify-center px-6 py-16'>
        <div className='w-full max-w-sm animate-fadeUp'>
          <div className='lg:hidden flex justify-center mb-8'>
            <span className='w-12 h-12 rounded-xl bg-crimson-500 flex items-center justify-center'>
              <Dumbbell size={22} className='text-white' strokeWidth={2.5} />
            </span>
          </div>

          <span className='eyebrow'>Account Access</span>
          <h2 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-3'>Log In</h2>
          <p className='text-bone-400 text-sm mt-2'>Enter your credentials to reach your dashboard.</p>

          <div className='mt-8 flex flex-col gap-5'>
            <div>
              <label className='field-label'>Email</label>
              <input
                value={loginField.email}
                onChange={(event) => { handleOnChange(event, "email") }}
                type="text"
                className="input"
                placeholder="Enter Email"
              />
            </div>

            <div>
              <label className='field-label'>Password</label>
              <input
                value={loginField.password}
                onChange={(event) => { handleOnChange(event, "password") }}
                type="password"
                className="input"
                placeholder="Enter Password"
                onKeyDown={(e) => { if (e.key === 'Enter') handleLogin() }}
              />
            </div>

            <button type='button' disabled={loggingIn} onClick={() => { handleLogin() }} className="btn-primary w-full mt-2">
              <LogIn size={16} /> {loggingIn ? 'Logging In...' : 'Log In'}
            </button>

            <button type='button' onClick={() => { handleForgotClose() }} className="text-sm text-bone-400 hover:text-bone-100 text-center transition-colors">
              Forgot Password?
            </button>
          </div>

          {forgotPassword && <Model header="Forgot Password" handleClose={handleForgotClose} content={<ForgotPassword />} />}
        </div>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default Login;

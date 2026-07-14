import React, { useState } from "react";
import axios from 'axios'
import { API_BASE } from '../../api/base'
import { KeyRound } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contentValue, setContentValue] = useState("Submit Email ID");
  const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" })


  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    } else {
      changePassword()
    }
  };

  const changePassword = async () => {
    setLoader(true);
    await axios.post(`${API_BASE}/auth/forgot-password/reset`, { email: inputField.email, newPassword: inputField.newPassword }).then((response) => {
      toast.success(response.data.message);
      setLoader(false);

    }).catch(err => {
      toast.error("Some technical issue while sending mail")
      console.log(err)
      setLoader(false);
    })
  }

  const verifyOtp = async () => {
    setLoader(true);
    await axios.post(`${API_BASE}/auth/forgot-password/verify-otp`, { email: inputField.email, otp: inputField.otp }).then((response) => {
      setOtpValidate(true);
      setContentValue("Submit your new Password");
      toast.success(response.data.message);
      setLoader(false);

    }).catch(err => {
      toast.error("Some technical issue while sending mail")
      console.log(err)
      setLoader(false);
    })
  }

  const sendOtp = async () => {
    setLoader(true);
    await axios.post(`${API_BASE}/auth/forgot-password/send-otp`, { email: inputField.email }).then((response) => {
      setEmailSubmit(true);
      setContentValue("Submit your OTP");
      toast.success(response.data.message);
      setLoader(false);
    }).catch(err => {
      toast.error("Some technical issue while sending mail")
      console.log(err)
      setLoader(false);
    })
  }

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }


  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <label className='field-label'>Email</label>
        <input
          value={inputField.email}
          onChange={(event) => { handleOnChange(event, "email") }}
          type="text"
          className="input"
          placeholder="Enter Email"
        />
      </div>

      {emailSubmit && (
        <div className="w-full mb-5">
          <label className='field-label'>OTP</label>
          <input
            value={inputField.otp}
            onChange={(event) => { handleOnChange(event, "otp") }}
            type="text"
            className="input"
            placeholder="Enter Your OTP"
          />
        </div>
      )}

      {otpValidate && (
        <div className="w-full mb-5">
          <label className='field-label'>New Password</label>
          <input
            value={inputField.newPassword}
            onChange={(event) => { handleOnChange(event, "newPassword") }}
            type="password"
            className="input"
            placeholder="Enter Your new Password"
          />
        </div>
      )}

      <button
        type='button'
        className="btn-primary w-full"
        disabled={loader}
        onClick={() => handleSubmit()}
      >
        <KeyRound size={16} /> {loader ? 'Please wait...' : contentValue}
      </button>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default ForgotPassword;

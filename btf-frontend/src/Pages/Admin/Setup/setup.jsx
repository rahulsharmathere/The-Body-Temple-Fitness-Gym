import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Dumbbell, UserPlus } from 'lucide-react';
import ProgressBar from '../../../Components/UI/ProgressBar';
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base';

const Setup = () => {

  const navigate = useNavigate();
  const [inputField, setInputField] = useState({ name: "", email: "", password: "", profilePhoto: "https://imgs.search.brave.com/jSvkIwAJy59aUEQ_eTg1N7OK0SV8FfQq32ThaG5p_Wo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci82Mzgv/ODkvSEQtd2FsbHBh/cGVyLWd5bS1ibGFj/ay1ib2R5LWd5bS1s/aWZlLW1vdGl2YXRp/b24tcGFuZGEtc3Ry/dWdnbGUtdGhlbWUu/anBn" })
  const [loaderImage, setLoaderImage] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  const uploadImage = async (e) => {

    setLoaderImage(true)

    //syntax for cloudinary 
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);

    // dtrgiq72j cloud name on cloudinary
    data.append('upload_preset', 'gym-management');

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dtrgiq72j/image/upload", data)
      // in the response ,cloudinary has saved the photo on a global URL that is visible in reponse->data->url
      const imageurl = response.data.url;
      setLoaderImage(false)
      setInputField({ ...inputField, ['profilePhoto']: imageurl })

    } catch (err) {
      console.log(err)
      setLoaderImage(false)

    }

  }

  const handleRegister = async () => {
    setRegistering(true);
    await axios.post(`${API_BASE}/auth/register`, inputField).then((resp) => {
      const successMsg = resp.data.message;
      toast.success(successMsg);
      setTimeout(() => {
        navigate('/login');
      }, 1500)
    }).catch(err => {
      const errorMessage = err.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage)
    })
    setRegistering(false);
  }

  return (
    <div className='w-full min-h-screen bg-ink-950 flex flex-col justify-center items-center px-6 py-16'>
      <div className="w-full max-w-md animate-fadeUp">
        <div className='flex justify-center mb-6'>
          <span className='w-12 h-12 rounded-xl bg-crimson-500 flex items-center justify-center'>
            <Dumbbell size={22} className='text-white' strokeWidth={2.5} />
          </span>
        </div>

        <div className="panel">
          <div className="text-center">
            <span className='eyebrow justify-center'>One-Time Setup</span>
            <h1 className="font-display text-2xl uppercase tracking-tight text-bone-50 mt-3">Set Up Admin Account</h1>
            <p className="text-bone-400 text-sm mt-2">This runs only once - the first admin account for the gym.</p>
          </div>

          <div className='flex flex-col gap-5 mt-8'>
            <div>
              <label className='field-label'>Name</label>
              <input
                type="text"
                value={inputField.name}
                onChange={(event) => { handleOnChange(event, "name") }}
                className="input"
                placeholder="Enter Name"
              />
            </div>

            <div>
              <label className='field-label'>Email</label>
              <input
                type="text"
                value={inputField.email}
                onChange={(event) => { handleOnChange(event, "email") }}
                className="input"
                placeholder="Enter Email"
              />
            </div>

            <div>
              <label className='field-label'>Password</label>
              <input
                type="password"
                value={inputField.password}
                onChange={(event) => { handleOnChange(event, "password") }}
                className="input"
                placeholder="Create Password"
              />
            </div>

            <div>
              <label className='field-label'>Profile Photo</label>
              <input
                type="file"
                onChange={(e) => { uploadImage(e) }}
                className="file-input"
              />
              {loaderImage && <div className='mt-3'><ProgressBar /></div>}
            </div>

            <div className="flex justify-center">
              <img
                src={inputField.profilePhoto}
                className="h-32 w-28 object-cover rounded-xl border border-ink-500"
              />
            </div>

            <button type='button' onClick={() => handleRegister()} disabled={registering} className="btn-primary w-full">
              <UserPlus size={16} /> {registering ? 'Creating...' : 'Create Admin Account'}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default Setup;

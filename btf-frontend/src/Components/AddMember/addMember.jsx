import React, { useState } from 'react'
import axios from 'axios';
import { UserPlus, Copy } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE } from '../../api/base';

const AddMember = () => {

  const [inputField, setInputField] = useState({ name: "", email: "", phone: "" })
  const [registering, setRegistering] = useState(false);
  const [created, setCreated] = useState(null); // { name, email, tempPassword }

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  const handleRegisterButton = async () => {
    setRegistering(true);
    await axios.post(`${API_BASE}/members`, inputField, { withCredentials: true }).then((response) => {
      const { member, tempPassword } = response.data.data;
      setCreated({ name: member.name, email: member.email, tempPassword });
      toast.success("Member added successfully");
    }).catch(err => {
      console.log(err)
      toast.error(err.response?.data?.message || "Something wrong happened")
    })
    setRegistering(false);
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(created.tempPassword);
    toast.success("Temporary password copied");
  }

  if (created) {
    return (
      <div>
        <p className='text-bone-300 text-sm'>
          <span className='text-bone-50 font-semibold'>{created.name}</span> has been added.
          Share this temporary password with them - they'll be asked to change it and
          complete their profile on first login.
        </p>

        <div className='card mt-5 p-5 flex items-center justify-between gap-4'>
          <div>
            <div className='text-xs uppercase tracking-wider text-bone-400'>Login Email</div>
            <div className='text-bone-50 font-medium mt-1'>{created.email}</div>
            <div className='text-xs uppercase tracking-wider text-bone-400 mt-4'>Temporary Password</div>
            <div className='text-crimson-400 font-display text-xl tracking-widest mt-1'>{created.tempPassword}</div>
          </div>
          <button type='button' onClick={copyPassword} className='icon-btn shrink-0'>
            <Copy size={16} />
          </button>
        </div>

        <button type='button' onClick={() => window.location.reload()} className='btn-secondary mt-6'>
          Done
        </button>

        <ToastContainer theme="dark" position="bottom-right" />
      </div>
    )
  }

  return (
    <div>
      <div className='grid gap-5 sm:grid-cols-2'>
        <div>
          <label className='field-label'>Name</label>
          <input value={inputField.name} onChange={(event) => { handleOnChange(event, "name") }} type="text" placeholder='Name of the Joinee' className='input' />
        </div>
        <div>
          <label className='field-label'>Email</label>
          <input value={inputField.email} onChange={(event) => { handleOnChange(event, "email") }} type="email" placeholder='Email' className='input' />
        </div>
        <div className='sm:col-span-2'>
          <label className='field-label'>Phone Number</label>
          <input value={inputField.phone} onChange={(event) => { handleOnChange(event, "phone") }} type="text" placeholder='Phone Number' className='input' />
        </div>
      </div>

      <p className='text-bone-400 text-xs mt-4'>
        A temporary password is generated automatically - membership plans are assigned
        from the member's profile page after they're added.
      </p>

      <button type='button' onClick={() => handleRegisterButton()} disabled={registering} className='btn-primary mt-6'>
        <UserPlus size={16} /> {registering ? 'Registering...' : 'Register'}
      </button>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default AddMember

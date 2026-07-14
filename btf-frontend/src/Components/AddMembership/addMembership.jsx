import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus } from 'lucide-react';
import EmptyState from '../UI/EmptyState';
import { toast, ToastContainer } from 'react-toastify'
import { API_BASE } from '../../api/base';

const AddMembership = ({ handleClose }) => {

  const [inputField, setInputField] = useState({ name: "", price: "", durationInMonths: "" })

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    setLoading(true);
    await axios.get(`${API_BASE}/plans`, { withCredentials: true }).then((res) => {
      setPlans(res.data.data)
    }).catch(err => {
      console.log(err)
      toast.error("Something wrong happened")
    })
    setLoading(false);
  }

  const handleAddPlan = async () => {
    await axios.post(`${API_BASE}/plans`, inputField, { withCredentials: true }).then((response) => {
      toast.success(response.data.message)
      handleClose();
    }).catch((err) => {
      toast.error(err.response?.data?.message || "Something wrong happened")
    })
  }
  return (
    <div>
      {loading ? (
        <div className='flex flex-wrap gap-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='w-32 h-20 skeleton rounded-xl' />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <EmptyState title='No plans yet' description='Add your first plan below.' />
      ) : (
        <div className='flex flex-wrap gap-3'>
          {
            plans.map((item, index) => {
              return (
                <div key={item._id || index} className='card px-5 py-3 text-center'>
                  <div className='font-display uppercase text-bone-50'>{item.name}</div>
                  <div className='text-bone-400 text-xs mt-0.5'>{item.durationInMonths} Month{item.durationInMonths > 1 ? 's' : ''}</div>
                  <div className='text-crimson-400 font-semibold mt-1'>₹{item.price}</div>
                </div>
              )
            })
          }
        </div>
      )}

      <div className='divider my-6' />

      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <label className='field-label'>Plan Name</label>
          <input type="text" value={inputField.name} onChange={(event) => handleOnChange(event, "name")} className='input' placeholder='e.g. Quarterly' />
        </div>
        <div>
          <label className='field-label'>Duration (Months)</label>
          <input type="number" value={inputField.durationInMonths} onChange={(event) => handleOnChange(event, "durationInMonths")} className='input' placeholder='e.g. 3' />
        </div>
        <div>
          <label className='field-label'>Price (₹)</label>
          <input type="number" value={inputField.price} onChange={(event) => handleOnChange(event, "price")} className='input' placeholder='e.g. 1500' />
        </div>
      </div>

      <button type='button' onClick={() => { handleAddPlan() }} className='btn-primary mt-6'>
        <Plus size={16} /> Add Plan
      </button>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default AddMembership

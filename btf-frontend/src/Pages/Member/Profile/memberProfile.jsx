import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Save } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base'

const MemberProfile = () => {
  const [field, setField] = useState({
    age: '', gender: '', height: '', currentWeight: '', goal: '', maintenanceCalories: '', targetCalories: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [])

  const fetchProfile = async () => {
    await axios.get(`${API_BASE}/profile/me`, { withCredentials: true }).then((response) => {
      const profile = response.data.data;
      setField({
        age: profile.age ?? '',
        gender: profile.gender ?? '',
        height: profile.height ?? '',
        currentWeight: profile.currentWeight ?? '',
        goal: profile.goal ?? '',
        maintenanceCalories: profile.maintenanceCalories ?? '',
        targetCalories: profile.targetCalories ?? ''
      });
    }).catch(err => {
      console.log(err)
      toast.error('Something went wrong')
    })
    setLoading(false);
  }

  const handleChange = (event, name) => {
    setField({ ...field, [name]: event.target.value });
  }

  const handleSave = async () => {
    setSaving(true);
    await axios.patch(`${API_BASE}/profile/me`, field, { withCredentials: true }).then((response) => {
      toast.success(response.data.message);
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    })
    setSaving(false);
  }

  if (loading) {
    return <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'><div className='card h-64 skeleton rounded-2xl' /></div>
  }

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <span className='eyebrow'>Member</span>
      <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>My Profile</h1>

      <div className='panel mt-6 max-w-2xl'>
        <div className='grid gap-5 sm:grid-cols-2'>
          <div>
            <label className='field-label'>Age</label>
            <input type='number' value={field.age} onChange={(e) => handleChange(e, 'age')} className='input' />
          </div>
          <div>
            <label className='field-label'>Gender</label>
            <select value={field.gender} onChange={(e) => handleChange(e, 'gender')} className='select'>
              <option value=''>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div>
            <label className='field-label'>Height (cm)</label>
            <input type='number' value={field.height} onChange={(e) => handleChange(e, 'height')} className='input' />
          </div>
          <div>
            <label className='field-label'>Current Weight (kg)</label>
            <input type='number' value={field.currentWeight} onChange={(e) => handleChange(e, 'currentWeight')} className='input' />
          </div>
          <div>
            <label className='field-label'>Maintenance Calories</label>
            <input type='number' value={field.maintenanceCalories} onChange={(e) => handleChange(e, 'maintenanceCalories')} className='input' />
          </div>
          <div>
            <label className='field-label'>Target Calories</label>
            <input type='number' value={field.targetCalories} onChange={(e) => handleChange(e, 'targetCalories')} className='input' />
          </div>
          <div className='sm:col-span-2'>
            <label className='field-label'>Goal</label>
            <input type='text' value={field.goal} onChange={(e) => handleChange(e, 'goal')} className='input' placeholder='e.g. Fat loss, Muscle gain' />
          </div>
        </div>

        <button type='button' onClick={handleSave} disabled={saving} className='btn-primary mt-8'>
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default MemberProfile

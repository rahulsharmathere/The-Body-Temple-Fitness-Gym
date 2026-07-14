import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, ArrowRight, KeyRound } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base'

// First-login flow: change the temporary password, then fill in the
// fitness profile. Only after both steps does the member reach their
// normal dashboard.
const MemberSetup = () => {
  const navigate = useNavigate();
  const mustChangePassword = localStorage.getItem('mustChangePassword') !== 'false';
  const [step, setStep] = useState(mustChangePassword ? 'password' : 'profile');
  const [saving, setSaving] = useState(false);

  const [passwordField, setPasswordField] = useState({ oldPassword: '', newPassword: '' });
  const [profileField, setProfileField] = useState({
    age: '', gender: '', height: '', currentWeight: '', goal: ''
  });

  const handlePasswordChange = (event, name) => {
    setPasswordField({ ...passwordField, [name]: event.target.value });
  }

  const handleProfileChange = (event, name) => {
    setProfileField({ ...profileField, [name]: event.target.value });
  }

  const submitPassword = async () => {
    setSaving(true);
    await axios.patch(`${API_BASE}/auth/change-password`, passwordField, { withCredentials: true }).then(() => {
      toast.success('Password changed');
      localStorage.setItem('mustChangePassword', 'false');
      setStep('profile');
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    })
    setSaving(false);
  }

  const submitProfile = async () => {
    setSaving(true);
    await axios.patch(`${API_BASE}/profile/complete`, profileField, { withCredentials: true }).then(() => {
      toast.success('Profile completed');
      navigate('/member/dashboard');
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    })
    setSaving(false);
  }

  return (
    <div className='w-full min-h-screen bg-ink-950 flex flex-col justify-center items-center px-6 py-16'>
      <div className='w-full max-w-md animate-fadeUp'>
        <div className='flex justify-center mb-6'>
          <span className='w-12 h-12 rounded-xl bg-crimson-500 flex items-center justify-center'>
            <Dumbbell size={22} className='text-white' strokeWidth={2.5} />
          </span>
        </div>

        <div className='panel'>
          <div className='text-center'>
            <span className='eyebrow justify-center'>Welcome to The BTF</span>
            <h1 className='font-display text-2xl uppercase tracking-tight text-bone-50 mt-3'>
              {step === 'password' ? 'Set a New Password' : 'Complete Your Profile'}
            </h1>
            <p className='text-bone-400 text-sm mt-2'>
              {step === 'password'
                ? 'You are logging in with a temporary password - set your own to continue.'
                : 'A few fitness details so we can track your progress.'}
            </p>
          </div>

          {step === 'password' ? (
            <div className='flex flex-col gap-5 mt-8'>
              <div>
                <label className='field-label'>Temporary Password</label>
                <input type='password' value={passwordField.oldPassword} onChange={(e) => handlePasswordChange(e, 'oldPassword')} className='input' placeholder='Enter the password you were given' />
              </div>
              <div>
                <label className='field-label'>New Password</label>
                <input type='password' value={passwordField.newPassword} onChange={(e) => handlePasswordChange(e, 'newPassword')} className='input' placeholder='At least 6 characters' />
              </div>
              <button type='button' onClick={submitPassword} disabled={saving} className='btn-primary w-full'>
                <KeyRound size={16} /> {saving ? 'Saving...' : 'Set Password'}
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-5 mt-8'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='field-label'>Age</label>
                  <input type='number' value={profileField.age} onChange={(e) => handleProfileChange(e, 'age')} className='input' placeholder='24' />
                </div>
                <div>
                  <label className='field-label'>Gender</label>
                  <select value={profileField.gender} onChange={(e) => handleProfileChange(e, 'gender')} className='select'>
                    <option value=''>Select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='field-label'>Height (cm)</label>
                  <input type='number' value={profileField.height} onChange={(e) => handleProfileChange(e, 'height')} className='input' placeholder='170' />
                </div>
                <div>
                  <label className='field-label'>Weight (kg)</label>
                  <input type='number' value={profileField.currentWeight} onChange={(e) => handleProfileChange(e, 'currentWeight')} className='input' placeholder='68' />
                </div>
              </div>
              <div>
                <label className='field-label'>Goal</label>
                <input type='text' value={profileField.goal} onChange={(e) => handleProfileChange(e, 'goal')} className='input' placeholder='e.g. Fat loss, Muscle gain' />
              </div>
              <button type='button' onClick={submitProfile} disabled={saving} className='btn-primary w-full'>
                {saving ? 'Saving...' : 'Finish Setup'} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default MemberSetup

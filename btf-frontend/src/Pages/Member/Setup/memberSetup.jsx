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

  const [photoPreview, setPhotoPreview] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [photoError, setPhotoError] = useState('');

  const handlePhotoCapture = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  setPhotoError('');

  if (!file.type.startsWith('image/')) {
    setPhotoError('Please select a valid image');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    setPhotoError('Image is too large (max 5MB)');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    setPhotoBase64(reader.result);
    setPhotoPreview(reader.result);
  };
  reader.onerror = () => setPhotoError('Could not read the image, please try again');
  reader.readAsDataURL(file);
}

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
    const payload = photoBase64 ? { ...profileField, profilePhoto: photoBase64 } : profileField;
    await axios.patch(`${API_BASE}/profile/complete`, payload, { withCredentials: true }).then(() => {
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
              <div className='flex flex-col items-center gap-3'>
                <label htmlFor='profile-photo-input' className='w-24 h-24 rounded-full border-2 border-dashed border-bone-600 flex items-center justify-center overflow-hidden cursor-pointer bg-ink-900'>
                  {photoPreview ? (
                    <img src={photoPreview} alt='Your photo' className='w-full h-full object-cover' />
                  ) : (
                    <span className='text-xs text-bone-400 text-center px-2'>Tap to<br />take photo</span>
                  )}
                </label>
                <input
                  id='profile-photo-input'
                  type='file'
                  accept='image/*'
                  capture='user'
                  onChange={handlePhotoCapture}
                  className='hidden'
                />
                {photoError && <p className='text-crimson-400 text-xs'>{photoError}</p>}
              </div>
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

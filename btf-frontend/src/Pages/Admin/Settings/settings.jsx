import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from '../../../Components/UI/ProgressBar';
import EmptyState from '../../../Components/UI/EmptyState';
import { Trash2, Image as ImageIcon, Save } from 'lucide-react';
import { API_BASE } from '../../../api/base';

const SettingsSection = ({ title, description, children }) => (
  <div className='panel mt-6'>
    <div className='mb-6'>
      <div className='font-display text-xl uppercase tracking-wide text-bone-50'>{title}</div>
      {description && <p className='text-bone-400 text-sm mt-1'>{description}</p>}
    </div>
    {children}
  </div>
)

const Settings = () => {

  const [infoField, setInfoField] = useState({
    gymName: "", tagline: "", description: "", address: "", phone: "", email: "", timings: "", instagram: "", facebook: "", heroImage: ""
  })
  const [gallery, setGallery] = useState([]);
  const [imageLoader, setImageLoader] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, [])

  const fetchInfo = async () => {
    await axios.get(`${API_BASE}/gym-info`).then((response) => {
      const info = response.data.data;
      setInfoField({
        gymName: info.gymName || "",
        tagline: info.tagline || "",
        description: info.description || "",
        address: info.address || "",
        phone: info.phone || "",
        email: info.email || "",
        timings: info.timings || "",
        instagram: info.instagram || "",
        facebook: info.facebook || "",
        heroImage: info.heroImage || ""
      })
      setGallery(info.gallery || []);
    }).catch(err => {
      console.log(err)
      toast.error("Something went wrong")
    })
  }

  const handleOnChange = (event, name) => {
    setInfoField({ ...infoField, [name]: event.target.value });
  }

  const handleSaveInfo = async () => {
    setSaving(true);
    await axios.patch(`${API_BASE}/gym-info`, infoField, { withCredentials: true }).then((response) => {
      toast.success(response.data.message);
      localStorage.setItem('gymName', infoField.gymName);
    }).catch(err => {
      console.log(err)
      toast.error("Something went wrong")
    })
    setSaving(false);
  }

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'gym-management');
    const response = await axios.post("https://api.cloudinary.com/v1_1/dtrgiq72j/image/upload", data)
    return response.data.url;
  }

  const handleHeroImageUpload = async (e) => {
    setImageLoader(true)
    try {
      const url = await uploadImageToCloudinary(e.target.files[0]);
      setInfoField({ ...infoField, heroImage: url });
    } catch (err) {
      console.log(err)
    }
    setImageLoader(false)
  }

  const handleAddGalleryImage = async (e) => {
    setImageLoader(true)
    try {
      const url = await uploadImageToCloudinary(e.target.files[0]);
      await axios.post(`${API_BASE}/gym-info/gallery`, { image: url }, { withCredentials: true }).then((response) => {
        setGallery(response.data.data.gallery);
        toast.success("Image added");
      })
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    }
    setImageLoader(false)
  }

  const handleRemoveGalleryImage = async (index) => {
    await axios.delete(`${API_BASE}/gym-info/gallery/${index}`, { withCredentials: true }).then((response) => {
      setGallery(response.data.data.gallery);
      toast.success("Image removed");
    }).catch(err => {
      console.log(err)
      toast.error("Something went wrong")
    })
  }

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-16'>
      <span className='eyebrow'>Admin</span>
      <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>Website Settings</h1>
      <p className='text-bone-400 text-sm mt-2'>Everything here feeds directly into the public site.</p>

      {/* about / contact block */}
      <SettingsSection title='About & Contact' description='Core details shown across the public site.'>
        <div className='grid gap-5 sm:grid-cols-2'>
          <input value={infoField.gymName} onChange={(e) => handleOnChange(e, "gymName")} type="text" placeholder='Gym Name' className='input' />
          <input value={infoField.tagline} onChange={(e) => handleOnChange(e, "tagline")} type="text" placeholder='Tagline' className='input' />
          <input value={infoField.address} onChange={(e) => handleOnChange(e, "address")} type="text" placeholder='Address' className='input' />
          <input value={infoField.timings} onChange={(e) => handleOnChange(e, "timings")} type="text" placeholder='Timings' className='input' />
          <input value={infoField.phone} onChange={(e) => handleOnChange(e, "phone")} type="text" placeholder='Phone Number' className='input' />
          <input value={infoField.email} onChange={(e) => handleOnChange(e, "email")} type="text" placeholder='Public Contact Email' className='input' />
          <input value={infoField.instagram} onChange={(e) => handleOnChange(e, "instagram")} type="text" placeholder='Instagram URL' className='input' />
          <input value={infoField.facebook} onChange={(e) => handleOnChange(e, "facebook")} type="text" placeholder='Facebook URL' className='input' />
        </div>
        <textarea value={infoField.description} onChange={(e) => handleOnChange(e, "description")} placeholder='About your gym' className='textarea w-full mt-5 h-32' />

        <div className='mt-6'>
          <label className='field-label'>Hero Image</label>
          <input type="file" onChange={(e) => handleHeroImageUpload(e)} className='file-input' />
          {imageLoader && <div className='mt-3 max-w-xs'><ProgressBar /></div>}
          {infoField.heroImage && <img src={infoField.heroImage} className='w-40 h-40 object-cover rounded-xl mt-4 border border-ink-500' />}
        </div>

        <button type='button' onClick={handleSaveInfo} disabled={saving} className='btn-primary mt-8'>
          <Save size={16} /> {saving ? 'Saving...' : 'Save'}
        </button>
      </SettingsSection>

      {/* gallery block */}
      <SettingsSection title='Gallery' description='Photos shown in the public gallery section.'>
        <input type="file" onChange={(e) => handleAddGalleryImage(e)} className='file-input' />
        {imageLoader && <div className='mt-3 max-w-xs'><ProgressBar /></div>}

        {gallery.length === 0 ? (
          <div className='mt-6'>
            <EmptyState icon={ImageIcon} title='No photos yet' description='Upload a photo to start building your gallery.' />
          </div>
        ) : (
          <div className='mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
            {gallery.map((img, index) => (
              <div key={index} className='relative group rounded-xl overflow-hidden'>
                <img src={img} className='w-full h-32 object-cover' />
                <button
                  type='button'
                  onClick={() => handleRemoveGalleryImage(index)}
                  className='absolute top-2 right-2 w-8 h-8 rounded-lg bg-ink-950/80 text-crimson-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  aria-label='Remove image'
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </SettingsSection>

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default Settings

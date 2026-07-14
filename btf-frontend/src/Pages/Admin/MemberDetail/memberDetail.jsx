import React, { useState, useEffect } from 'react'
import { ArrowLeft, Mail, Phone, Ruler, Weight, Target, RotateCcw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE } from '../../../api/base';

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className='flex items-start gap-3'>
    <div className='w-9 h-9 rounded-lg bg-ink-700 flex items-center justify-center shrink-0'>
      <Icon size={16} className='text-crimson-400' />
    </div>
    <div>
      <div className='text-xs uppercase tracking-wider text-bone-400'>{label}</div>
      <div className='text-bone-50 font-medium mt-0.5'>{value ?? '—'}</div>
    </div>
  </div>
)

const formatDate = (date) => date ? date.slice(0, 10).split('-').reverse().join('-') : '—';

const MemberDetail = () => {

  const [member, setMember] = useState(null)
  const [profile, setProfile] = useState(null)
  const [history, setHistory] = useState([])
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState("")
  const [showPlanPicker, setShowPlanPicker] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchMember();
    fetchHistory();
    fetchPlans();
  }, [])

  const fetchMember = async () => {
    await axios.get(`${API_BASE}/members/${id}`, { withCredentials: true }).then((response) => {
      setMember(response.data.data.member)
      setProfile(response.data.data.profile)
    }).catch(err => {
      console.log(err)
      toast.error("Something went wrong");
    })
  }

  const fetchHistory = async () => {
    await axios.get(`${API_BASE}/memberships/member/${id}`, { withCredentials: true }).then((response) => {
      setHistory(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const fetchPlans = async () => {
    await axios.get(`${API_BASE}/plans`, { withCredentials: true }).then((response) => {
      setPlans(response.data.data);
      if (response.data.data.length) setSelectedPlan(response.data.data[0]._id);
    }).catch(err => {
      console.log(err)
    })
  }

  const current = history[0];
  const isExpired = current && new Date(current.endDate) < new Date();

  const handleSavePlan = async () => {
    if (!selectedPlan) return;
    try {
      if (current) {
        const response = await axios.patch(`${API_BASE}/memberships/member/${id}/renew`, { plan: selectedPlan }, { withCredentials: true });
        toast.success(response.data.message);
      } else {
        const response = await axios.post(`${API_BASE}/memberships`, { user: id, plan: selectedPlan }, { withCredentials: true });
        toast.success(response.data.message);
      }
      setShowPlanPicker(false);
      fetchHistory();
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <button type='button' onClick={() => { navigate(-1) }} className='btn-secondary btn-sm'>
        <ArrowLeft size={15} /> Go Back
      </button>

      {member && (
        <div className='mt-6 card p-6 md:p-10 flex flex-col md:flex-row gap-10'>
          <div className='shrink-0 mx-auto md:mx-0'>
            <img
              className='w-40 h-40 rounded-2xl object-cover border border-ink-500'
              src={member?.profilePhoto}
              alt={member?.name}
            />
            <span className={member?.isProfileCompleted ? 'badge-success w-full justify-center mt-4' : 'badge-danger w-full justify-center mt-4'}>
              {member?.isProfileCompleted ? 'Profile Complete' : 'Setup Pending'}
            </span>
          </div>

          <div className='flex-1 min-w-0'>
            <div className='font-display text-3xl uppercase tracking-tight text-bone-50'>{member?.name}</div>

            <div className='grid sm:grid-cols-2 gap-6 mt-6'>
              <InfoItem icon={Mail} label='Email' value={member?.email} />
              <InfoItem icon={Phone} label='Phone' value={member?.phone} />
              <InfoItem icon={Ruler} label='Height' value={profile?.height ? `${profile.height} cm` : null} />
              <InfoItem icon={Weight} label='Current Weight' value={profile?.currentWeight ? `${profile.currentWeight} kg` : null} />
              <InfoItem icon={Target} label='Goal' value={profile?.goal} />
              <InfoItem icon={Target} label='BMI' value={profile?.bmi} />
            </div>

            <div className='divider my-6' />

            <div className='flex items-center justify-between flex-wrap gap-4'>
              <div>
                <span className='text-sm font-semibold uppercase tracking-wider text-bone-300'>Membership</span>
                {current ? (
                  <div className='mt-2 text-bone-50'>
                    {current.plan?.name} · {formatDate(current.startDate)} to {formatDate(current.endDate)}
                    <span className={isExpired ? 'badge-danger ml-3' : 'badge-success ml-3'}>
                      {isExpired ? 'Expired' : 'Active'}
                    </span>
                  </div>
                ) : (
                  <div className='mt-2 text-bone-400'>No membership assigned yet</div>
                )}
              </div>

              <button
                type='button'
                onClick={() => { setShowPlanPicker(prev => !prev) }}
                className={showPlanPicker ? 'btn-primary' : 'btn-secondary'}
              >
                <RotateCcw size={15} /> {current ? 'Renew Membership' : 'Assign Membership'}
              </button>
            </div>

            {showPlanPicker && (
              <div className='panel mt-5 max-w-sm'>
                <label className='field-label'>Plan</label>
                <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className='select'>
                  {plans.map((item, index) => (
                    <option key={item._id || index} value={item._id}>{item.name} · {item.durationInMonths} Month{item.durationInMonths > 1 ? 's' : ''}</option>
                  ))}
                </select>
                <button type='button' onClick={handleSavePlan} className='btn-primary w-full mt-4'>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default MemberDetail

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CheckCircle2, CreditCard, TrendingUp, User, ArrowRight, CalendarCheck } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base'

const QUICK_LINKS = [
  { to: '/member/profile', icon: User, label: 'My Profile' },
  { to: '/member/membership', icon: CreditCard, label: 'My Membership' },
  { to: '/member/progress', icon: TrendingUp, label: 'My Progress' },
]

const MemberDashboard = () => {
  const [membership, setMembership] = useState(null);
  const [marking, setMarking] = useState(false);
  const [markedToday, setMarkedToday] = useState(false);

  useEffect(() => {
    fetchMembership();
    checkTodayAttendance();
  }, [])

  const fetchMembership = async () => {
    await axios.get(`${API_BASE}/memberships/me`, { withCredentials: true }).then((response) => {
      setMembership(response.data.data);
    }).catch(err => console.log(err))
  }

  const checkTodayAttendance = async () => {
    await axios.get(`${API_BASE}/attendance/me`, { withCredentials: true }).then((response) => {
      const today = new Date().toDateString();
      const already = response.data.data.some(a => new Date(a.date).toDateString() === today);
      setMarkedToday(already);
    }).catch(err => console.log(err))
  }

  const handleMarkAttendance = async () => {
    setMarking(true);
    await axios.post(`${API_BASE}/attendance`, {}, { withCredentials: true }).then(() => {
      toast.success('Attendance marked for today');
      setMarkedToday(true);
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    })
    setMarking(false);
  }

  const isExpired = membership && new Date(membership.endDate) < new Date();

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <span className='eyebrow'>Member</span>
      <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>
        Welcome, {localStorage.getItem('userName') || 'Member'}
      </h1>

      <div className='grid gap-5 sm:grid-cols-2 mt-8'>
        {/* attendance card */}
        <div className='card p-6'>
          <div className='w-12 h-12 rounded-xl bg-crimson-500/10 text-crimson-400 flex items-center justify-center'>
            <CalendarCheck size={22} />
          </div>
          <p className='font-display text-lg uppercase tracking-wide text-bone-50 mt-4'>Today's Attendance</p>
          {markedToday ? (
            <div className='flex items-center gap-2 text-emerald-400 mt-3'>
              <CheckCircle2 size={18} /> Marked for today
            </div>
          ) : (
            <button type='button' onClick={handleMarkAttendance} disabled={marking} className='btn-primary mt-4'>
              {marking ? 'Marking...' : 'Mark Attendance'}
            </button>
          )}
        </div>

        {/* membership card */}
        <div className='card p-6'>
          <div className='w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center'>
            <CreditCard size={22} />
          </div>
          <p className='font-display text-lg uppercase tracking-wide text-bone-50 mt-4'>Membership</p>
          {membership ? (
            <>
              <p className='text-bone-300 text-sm mt-2'>{membership.plan?.name} · valid till {membership.endDate?.slice(0, 10).split('-').reverse().join('-')}</p>
              <span className={isExpired ? 'badge-danger mt-3' : 'badge-success mt-3'}>{isExpired ? 'Expired' : 'Active'}</span>
            </>
          ) : (
            <p className='text-bone-400 text-sm mt-2'>No membership assigned yet - check with the front desk.</p>
          )}
        </div>
      </div>

      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8'>
        {QUICK_LINKS.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} className='card-hover group p-6 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='w-11 h-11 rounded-xl bg-white/5 text-bone-300 flex items-center justify-center group-hover:bg-crimson-500 group-hover:text-white transition-colors duration-300'>
                <Icon size={20} />
              </div>
              <span className='font-display uppercase tracking-wide text-bone-50'>{label}</span>
            </div>
            <ArrowRight size={18} className='text-bone-500 group-hover:text-bone-100 group-hover:translate-x-1 transition-all duration-300' />
          </Link>
        ))}
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default MemberDashboard

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle2, Flame, Trophy, CalendarDays } from 'lucide-react'
import EmptyState from '../../../Components/UI/EmptyState'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base'

const StatTile = ({ icon: Icon, label, value }) => (
  <div className='card p-5 flex items-center gap-4'>
    <div className='w-11 h-11 rounded-xl bg-crimson-500/10 text-crimson-400 flex items-center justify-center shrink-0'>
      <Icon size={20} />
    </div>
    <div>
      <div className='font-display text-2xl text-bone-50'>{value}</div>
      <div className='text-xs uppercase tracking-wider text-bone-400'>{label}</div>
    </div>
  </div>
)

const MemberAttendance = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ currentStreak: 0, longestStreak: 0, totalDays: 0 });
  const [marking, setMarking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, [])

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchHistory(), fetchStats()]);
    setLoading(false);
  }

  const fetchHistory = async () => {
    await axios.get(`${API_BASE}/attendance/me`, { withCredentials: true }).then((response) => {
      setHistory(response.data.data);
    }).catch(err => console.log(err))
  }

  const fetchStats = async () => {
    await axios.get(`${API_BASE}/attendance/me/stats`, { withCredentials: true }).then((response) => {
      setStats(response.data.data);
    }).catch(err => console.log(err))
  }

  const markedToday = history.some(a => new Date(a.date).toDateString() === new Date().toDateString());

  const handleMark = async () => {
    setMarking(true);
    await axios.post(`${API_BASE}/attendance`, {}, { withCredentials: true }).then(() => {
      toast.success('Attendance marked for today');
      fetchAll();
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    })
    setMarking(false);
  }

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <span className='eyebrow'>Member</span>
          <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>Attendance</h1>
        </div>

        {markedToday ? (
          <div className='flex items-center gap-2 text-emerald-400 badge-success'>
            <CheckCircle2 size={16} /> Marked for today
          </div>
        ) : (
          <button type='button' onClick={handleMark} disabled={marking} className='btn-primary'>
            {marking ? 'Marking...' : 'Mark Attendance'}
          </button>
        )}
      </div>

      <div className='grid gap-5 sm:grid-cols-3 mt-8'>
        <StatTile icon={Flame} label='Current Streak' value={`${stats.currentStreak} day${stats.currentStreak === 1 ? '' : 's'}`} />
        <StatTile icon={Trophy} label='Longest Streak' value={`${stats.longestStreak} day${stats.longestStreak === 1 ? '' : 's'}`} />
        <StatTile icon={CalendarDays} label='Total Days' value={stats.totalDays} />
      </div>

      <div className='panel mt-8'>
        <div className='font-display text-lg uppercase tracking-wide text-bone-50 mb-5'>History</div>

        {loading ? (
          <div className='space-y-3'>
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className='h-10 skeleton rounded-lg' />)}
          </div>
        ) : history.length === 0 ? (
          <EmptyState title='No attendance marked yet' description="Mark today's attendance to start your streak." />
        ) : (
          <div className='divide-y divide-ink-600'>
            {history.map((item) => (
              <div key={item._id} className='flex items-center justify-between py-3 text-sm'>
                <span className='text-bone-200'>{new Date(item.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <CheckCircle2 size={16} className='text-emerald-400' />
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default MemberAttendance

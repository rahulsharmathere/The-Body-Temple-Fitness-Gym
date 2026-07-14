import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import EmptyState from '../../../Components/UI/EmptyState'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base'

const MemberProgress = () => {
  const [history, setHistory] = useState([]);
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [])

  const fetchHistory = async () => {
    await axios.get(`${API_BASE}/progress/me`, { withCredentials: true }).then((response) => {
      setHistory(response.data.data);
    }).catch(err => {
      console.log(err)
      toast.error('Something went wrong')
    })
    setLoading(false);
  }

  const handleAddWeight = async () => {
    if (!weight) return;
    setSaving(true);
    await axios.post(`${API_BASE}/progress`, { weight }, { withCredentials: true }).then(() => {
      toast.success('Weight logged');
      setWeight("");
      fetchHistory();
    }).catch(err => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    })
    setSaving(false);
  }

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];
  const trend = latest && previous ? latest.weight - previous.weight : 0;

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <span className='eyebrow'>Member</span>
      <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>My Progress</h1>

      <div className='panel mt-6 max-w-lg'>
        <div className='font-display text-lg uppercase tracking-wide text-bone-50 mb-4'>Log Today's Weight</div>
        <div className='flex gap-3'>
          <input type='number' value={weight} onChange={(e) => setWeight(e.target.value)} className='input' placeholder='Weight in kg' />
          <button type='button' onClick={handleAddWeight} disabled={saving} className='btn-primary shrink-0'>
            <Plus size={16} /> {saving ? 'Saving...' : 'Log'}
          </button>
        </div>

        {latest && (
          <div className='flex items-center gap-2 mt-5 text-sm'>
            <span className='text-bone-400'>Latest:</span>
            <span className='text-bone-50 font-semibold'>{latest.weight} kg</span>
            {trend !== 0 && (
              <span className={`flex items-center gap-1 ${trend > 0 ? 'text-crimson-400' : 'text-emerald-400'}`}>
                {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(trend).toFixed(1)} kg
              </span>
            )}
            {trend === 0 && previous && <Minus size={14} className='text-bone-500' />}
          </div>
        )}
      </div>

      <div className='panel mt-6'>
        <div className='font-display text-lg uppercase tracking-wide text-bone-50 mb-5'>History</div>

        {loading ? (
          <div className='space-y-3'>
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className='h-10 skeleton rounded-lg' />)}
          </div>
        ) : history.length === 0 ? (
          <EmptyState title='No weight logged yet' description='Log your weight above to start tracking progress.' />
        ) : (
          <div className='divide-y divide-ink-600'>
            {[...history].reverse().map((item) => (
              <div key={item._id} className='flex items-center justify-between py-3 text-sm'>
                <span className='text-bone-200'>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className='text-bone-50 font-semibold'>{item.weight} kg</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default MemberProgress

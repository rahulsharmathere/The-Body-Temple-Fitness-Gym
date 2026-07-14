import React, { useState, useEffect, useRef } from 'react'
import { Info, Users, AlarmClock, AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const STAT_CARDS = [
  { to: '/admin/member', func: null, icon: Users, label: 'All Members', tone: 'crimson' },
  { to: '/admin/specific/expiring-soon', func: 'expiringSoon', icon: AlarmClock, label: 'Expiring within 7 Days', tone: 'amber' },
  { to: '/admin/specific/expired', func: 'expired', icon: AlertTriangle, label: 'Expired Memberships', tone: 'crimson' },
]

const TONE_STYLES = {
  crimson: 'text-crimson-400 bg-crimson-500/10 group-hover:bg-crimson-500 group-hover:text-white',
  amber: 'text-amber-400 bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-white',
}

const Dashboard = () => {

  const [tipOpen, setTipOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (tipOpen && ref.current && !ref.current.contains(e.target)) {
        setTipOpen(false);
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [tipOpen])

  const handleOnClickMenu = (value) => {
    if (value) sessionStorage.setItem('func', value);
  }

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <div className='flex items-center justify-between'>
        <div>
          <span className='eyebrow'>Admin</span>
          <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>Dashboard</h1>
        </div>

        <div className='relative' ref={ref}>
          <button type='button' className='icon-btn' onClick={() => setTipOpen(prev => !prev)} aria-label='Tips'>
            <Info size={18} />
          </button>
          {tipOpen && (
            <div className='absolute right-0 mt-3 w-64 card p-4 z-10 animate-scaleIn'>
              <div className='font-semibold text-bone-50 text-sm'>Hi, welcome to The BTF.</div>
              <p className='text-bone-400 text-xs mt-1'>Feel free to ask any queries.</p>
            </div>
          )}
        </div>
      </div>

      <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8'>
        {STAT_CARDS.map(({ to, func, icon: Icon, label, tone }) => (
          <Link
            key={label}
            to={to}
            onClick={() => handleOnClickMenu(func)}
            className='card-hover group p-6 flex items-center justify-between'
          >
            <div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${TONE_STYLES[tone]}`}>
                <Icon size={22} />
              </div>
              <p className='font-display text-lg uppercase tracking-wide text-bone-50 mt-4'>{label}</p>
            </div>
            <ArrowRight size={18} className='text-bone-500 group-hover:text-bone-100 group-hover:translate-x-1 transition-all duration-300 shrink-0' />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

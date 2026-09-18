import React, { useState, useEffect, useRef } from 'react'
import { Info, Users, AlarmClock, AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HERO_IMAGE } from '../../../constants/heroimage'

const STAT_CARDS = [
  {
    to: '/admin/member',
    func: null,
    icon: Users,
    label: 'All Members',
    description: 'Browse, search and manage every registered member.',
    tone: 'crimson',
  },
  {
    to: '/admin/specific/expiring-soon',
    func: 'expiringSoon',
    icon: AlarmClock,
    label: 'Expiring within 7 Days',
    description: 'Memberships that need a renewal reminder soon.',
    tone: 'amber',
  },
  {
    to: '/admin/specific/expired',
    func: 'expired',
    icon: AlertTriangle,
    label: 'Expired Memberships',
    description: 'Members whose plans have already lapsed.',
    tone: 'crimson',
  },
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
      {/* hero banner - same photo + scrim treatment as the public landing page */}
      <div
        className='relative rounded-2xl overflow-hidden h-56 md:h-72 bg-cover bg-center'
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/30' />
        <div className='absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent' />

        <div className='relative h-full flex flex-col justify-end p-6 md:p-8'>
          <span className='eyebrow'>Admin</span>
          <h1 className='font-display text-3xl md:text-4xl uppercase tracking-tight text-bone-50 mt-2'>
            Dashboard
          </h1>
        </div>

        <div className='absolute top-5 right-5' ref={ref}>
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

      <div className='grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto mt-10'>
        {STAT_CARDS.map(({ to, func, icon: Icon, label, description, tone }) => (
          <Link
            key={label}
            to={to}
            onClick={() => handleOnClickMenu(func)}
            className='card-hover group p-7 md:p-8 flex flex-col items-center text-center gap-4'
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${TONE_STYLES[tone]}`}>
              <Icon size={28} />
            </div>
            <div>
              <p className='font-display text-xl uppercase tracking-wide text-bone-50'>{label}</p>
              <p className='text-bone-400 text-sm leading-relaxed mt-2'>{description}</p>
            </div>
            <span className='flex items-center gap-1 text-xs font-semibold uppercase tracking-widest2 text-bone-500 group-hover:text-bone-100 transition-colors duration-300'>
              View <ArrowRight size={14} className='group-hover:translate-x-1 transition-transform duration-300' />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
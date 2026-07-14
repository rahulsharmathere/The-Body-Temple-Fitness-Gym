import React from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, CreditCard } from 'lucide-react'

// Tile for a Membership record (used on the expiring-soon / expired admin
// lists) - distinct from MemberCard since it's plan + date focused.
const MembershipCard = ({ item }) => {
  const isExpired = new Date(item?.endDate) < new Date()

  return (
    <Link
      to={`/admin/member/${item?.user?._id}`}
      className='card-hover group flex flex-col items-center text-center p-6'
    >
      <img
        className='w-20 h-20 rounded-full object-cover border-2 border-ink-500 group-hover:border-crimson-500 transition-colors duration-300 mb-4'
        src={item?.user?.profilePhoto}
        alt={item?.user?.name || 'member'}
      />

      <div className='font-display text-lg uppercase tracking-wide text-bone-50'>{item?.user?.name}</div>

      <div className='flex items-center gap-1.5 text-bone-400 text-sm mt-2'>
        <CreditCard size={14} />
        <span>{item?.plan?.name}</span>
      </div>

      <div className='flex items-center gap-1.5 text-bone-400 text-sm mt-1.5'>
        <CalendarClock size={14} />
        <span>{item?.endDate?.slice(0, 10).split('-').reverse().join('-')}</span>
      </div>

      <span className={isExpired ? 'badge-danger mt-4' : 'badge-success mt-4'}>
        {isExpired ? 'Expired' : 'Expiring Soon'}
      </span>
    </Link>
  )
}

export default MembershipCard

import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'

// Single member tile used across the member list and dashboard drill-downs.
const MemberCard = ({ item }) => {
  const isComplete = item?.isProfileCompleted

  return (
    <Link
      to={`/admin/member/${item?._id}`}
      className='card-hover group flex flex-col items-center text-center p-6'
    >
      <div className='relative w-24 h-24 mb-4'>
        <img
          className='w-full h-full rounded-full object-cover border-2 border-ink-500 group-hover:border-crimson-500 transition-colors duration-300'
          src={item?.profilePhoto}
          alt={item?.name || 'member'}
        />
      </div>

      <div className='font-display text-lg uppercase tracking-wide text-bone-50'>{item?.name}</div>

      <div className='flex items-center gap-1.5 text-bone-400 text-sm mt-2'>
        <Mail size={14} />
        <span className='truncate max-w-[10rem]'>{item?.email}</span>
      </div>

      {item?.phone && (
        <div className='flex items-center gap-1.5 text-bone-400 text-sm mt-1.5'>
          <Phone size={14} />
          <span>{item.phone}</span>
        </div>
      )}

      <span className={isComplete ? 'badge-success mt-4' : 'badge-danger mt-4'}>
        {isComplete ? 'Profile Complete' : 'Setup Pending'}
      </span>
    </Link>
  )
}

export default MemberCard

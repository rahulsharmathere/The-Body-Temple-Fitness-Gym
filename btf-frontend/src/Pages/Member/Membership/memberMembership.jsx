import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CreditCard } from 'lucide-react'
import EmptyState from '../../../Components/UI/EmptyState'
import { ToastContainer, toast } from 'react-toastify'
import { API_BASE } from '../../../api/base'

const formatDate = (date) => date ? date.slice(0, 10).split('-').reverse().join('-') : '—';

const MemberMembership = () => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembership();
  }, [])

  const fetchMembership = async () => {
    await axios.get(`${API_BASE}/memberships/me`, { withCredentials: true }).then((response) => {
      setMembership(response.data.data);
    }).catch(err => {
      console.log(err)
      toast.error('Something went wrong')
    })
    setLoading(false);
  }

  const isExpired = membership && new Date(membership.endDate) < new Date();

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <span className='eyebrow'>Member</span>
      <h1 className='font-display text-3xl uppercase tracking-tight text-bone-50 mt-2'>My Membership</h1>

      <div className='mt-6 max-w-xl'>
        {loading ? (
          <div className='card h-40 skeleton rounded-2xl' />
        ) : !membership ? (
          <div className='card'>
            <EmptyState icon={CreditCard} title='No membership yet' description='Check with the front desk to get a plan assigned.' />
          </div>
        ) : (
          <div className='card p-6'>
            <div className='flex items-center justify-between'>
              <div className='font-display text-xl uppercase tracking-wide text-bone-50'>{membership.plan?.name}</div>
              <span className={isExpired ? 'badge-danger' : 'badge-success'}>{isExpired ? 'Expired' : 'Active'}</span>
            </div>
            <div className='divider my-5' />
            <div className='grid grid-cols-2 gap-5 text-sm'>
              <div>
                <div className='text-xs uppercase tracking-wider text-bone-400'>Start Date</div>
                <div className='text-bone-50 font-medium mt-1'>{formatDate(membership.startDate)}</div>
              </div>
              <div>
                <div className='text-xs uppercase tracking-wider text-bone-400'>End Date</div>
                <div className='text-bone-50 font-medium mt-1'>{formatDate(membership.endDate)}</div>
              </div>
              <div>
                <div className='text-xs uppercase tracking-wider text-bone-400'>Duration</div>
                <div className='text-bone-50 font-medium mt-1'>{membership.plan?.durationInMonths} Month{membership.plan?.durationInMonths > 1 ? 's' : ''}</div>
              </div>
              <div>
                <div className='text-xs uppercase tracking-wider text-bone-400'>Price</div>
                <div className='text-bone-50 font-medium mt-1'>₹{membership.plan?.price}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default MemberMembership

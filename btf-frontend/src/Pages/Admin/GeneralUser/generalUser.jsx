import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom';
import MembershipCard from '../../../Components/MembershipCard/membershipCard';
import EmptyState from '../../../Components/UI/EmptyState';
import { expiringSoon, expired } from './data';

const GeneralUser = () => {

  const [header, setHeader] = useState("")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = sessionStorage.getItem('func');
    functionCall(func)
  }, [])

  const functionCall = async (func) => {
    setLoading(true);
    switch (func) {
      case "expiringSoon": {
        setHeader("Expiring within 7 Days")
        const result = await expiringSoon();
        setData(result.data);
        break;
      }
      case "expired": {
        setHeader("Expired Memberships")
        const result = await expired();
        setData(result.data);
        break;
      }
    }
    setLoading(false);
  }

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      <div className='card p-4'>
        <Link to={'/admin/dashboard'} className='btn-secondary btn-sm'>
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>
      </div>

      <h1 className='font-display text-2xl uppercase tracking-tight text-bone-50 mt-6'>{header}</h1>

      <div className='mt-6'>
        {loading ? (
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='card p-6 h-52 skeleton rounded-2xl' />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className='card'>
            <EmptyState title='No members in this list' description='There is currently nobody matching this filter.' />
          </div>
        ) : (
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {data.map((item, index) => (
              <MembershipCard key={item._id || index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneralUser

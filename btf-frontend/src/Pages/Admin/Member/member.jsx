import React, { useState, useEffect } from 'react'
import { Dumbbell, CreditCard, ArrowLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MemberCard from '../../../Components/MemberCard/memberCard'
import Model from '../../../Components/Model/model'
import AddMembership from '../../../Components/AddMembership/addMembership'
import AddMember from '../../../Components/AddMember/addMember'
import EmptyState from '../../../Components/UI/EmptyState'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { API_BASE } from '../../../api/base';

const LIMIT = 9;

const Member = () => {

  const [addMembership, setAddMembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(1, "");
  }, [])

  const fetchData = async (page, searchTerm) => {
    setLoading(true);
    const skip = (page - 1) * LIMIT;
    await axios.get(`${API_BASE}/members?skip=${skip}&limit=${LIMIT}&search=${searchTerm}`, { withCredentials: true }).then((response) => {
      setData(response.data.data.members)
      setTotalData(response.data.data.totalMembers)
    }).catch(err => {
      console.log(err)
      toast.error("Something went wrong")
    })
    setLoading(false);
  }

  const handleMembership = () => {
    setAddMembership(prev => !prev);
  }
  const handleMember = () => {
    setAddMember(prev => !prev);
  }

  const noOfPage = Math.max(1, Math.ceil(totalData / LIMIT));

  const handlePrev = () => {
    if (currentPage > 1) {
      const page = currentPage - 1;
      setCurrentPage(page);
      fetchData(page, search);
    }
  }

  const handleNext = () => {
    if (currentPage < noOfPage) {
      const page = currentPage + 1;
      setCurrentPage(page);
      fetchData(page, search);
    }
  }

  const handleSearchData = () => {
    setCurrentPage(1);
    fetchData(1, search);
  }

  const startFrom = totalData === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const endTo = Math.min(currentPage * LIMIT, totalData);

  return (
    <div className='flex-1 min-w-0 pt-20 md:pt-8 px-5 md:px-10 pb-10'>
      {/* page header */}
      <div className='card flex flex-wrap gap-3 justify-between items-center p-4'>
        <Link to={'/admin/dashboard'} className='btn-secondary btn-sm'>
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        <div className='flex flex-wrap gap-3'>
          <button type='button' onClick={handleMember} className='btn-secondary btn-sm'>
            Add Member <Dumbbell size={15} />
          </button>
          <button type='button' onClick={handleMembership} className='btn-secondary btn-sm'>
            Membership Plans <CreditCard size={15} />
          </button>
        </div>
      </div>

      {/* search */}
      <div className='mt-6 flex gap-3 max-w-xl'>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearchData() }}
          className='input'
          placeholder='Search by name, phone or email'
        />
        <button type='button' onClick={handleSearchData} className='icon-btn shrink-0 !w-12 !h-12'>
          <Search size={18} />
        </button>
      </div>

      {/* count + pagination */}
      <div className='mt-6 flex flex-wrap gap-4 justify-between items-center text-sm text-bone-300'>
        <div className='text-bone-400'>{startFrom}-{endTo} of {totalData} Members</div>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={handlePrev}
            disabled={currentPage === 1}
            className='icon-btn !w-9 !h-9 disabled:opacity-30 disabled:cursor-not-allowed'
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type='button'
            onClick={handleNext}
            disabled={currentPage === noOfPage}
            className='icon-btn !w-9 !h-9 disabled:opacity-30 disabled:cursor-not-allowed'
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* member grid */}
      <div className='mt-6'>
        {loading ? (
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='card p-6 h-52 skeleton rounded-2xl' />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className='card'>
            <EmptyState title='No members found' description='Try a different search term, or add a new member to get started.' />
          </div>
        ) : (
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {data.map((item, index) => (
              <MemberCard key={item._id || index} item={item} />
            ))}
          </div>
        )}
      </div>

      {addMembership && <Model header="Membership Plans" handleClose={handleMembership} content={<AddMembership handleClose={handleMembership} />} />}
      {addMember && <Model header="Add New Member" handleClose={handleMember} content={<AddMember />} />}

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default Member

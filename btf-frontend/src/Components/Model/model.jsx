import React, { useEffect } from 'react'
import { X } from 'lucide-react'

// Generic dialog shell used for "Add Member", "Add Membership", "Forgot
// Password", etc. Centralising it here means every modal in the app shares
// the same backdrop, spacing, and close behaviour.
const Model = ({ handleClose, content, header }) => {

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleClose])

  return (
    <div
      className='fixed inset-0 z-[90] flex items-start md:items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8 overflow-y-auto animate-fadeIn'
      onClick={handleClose}
    >
      <div
        className='w-full max-w-xl bg-ink-800 border border-ink-500 rounded-2xl shadow-card-hover my-auto animate-scaleIn'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center px-6 py-5 border-b border-ink-600'>
          <div className='font-display text-xl uppercase tracking-wide text-bone-50'>{header}</div>
          <button
            type='button'
            onClick={handleClose}
            className='icon-btn'
            aria-label='Close dialog'
          >
            <X size={18} />
          </button>
        </div>
        <div className='p-6 max-h-[75vh] overflow-y-auto themed-scroll'>
          {content}
        </div>
      </div>
    </div>
  )
}

export default Model

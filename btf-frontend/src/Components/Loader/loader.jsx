import React from 'react'

// Full-screen loading state shown while the public site's data is fetched.
// A simple two-ring spinner in the brand crimson keeps it premium without
// pulling in a whole UI kit for one shape.
const Loader = () => {
  return (
    <div className='fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-ink-950'>
      <div className='relative w-16 h-16'>
        <div className='absolute inset-0 rounded-full border-2 border-ink-600' />
        <div className='absolute inset-0 rounded-full border-2 border-transparent border-t-crimson-500 animate-spin' />
      </div>
      <div className='font-display text-sm tracking-widest2 uppercase text-bone-400'>Loading</div>
    </div>
  )
}

export default Loader

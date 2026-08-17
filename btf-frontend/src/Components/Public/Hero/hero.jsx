import React from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

const Hero = ({ gymName, tagline, heroImage }) => {
  const bgImage =  "https://imgs.search.brave.com/rtCUUpbRSh-bGBT7R6uJkMJMsNpj0Yl0p7_TSBjxQ4A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDk0ODQ5/MTcuanBn"

  return (
    <div
      id='top'
      className='relative w-full min-h-[92vh] flex items-center bg-cover bg-center overflow-hidden'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* layered scrim: keeps the photo but guarantees text contrast */}
      <div className='absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40' />
      <div className='absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30' />

      <div className='relative container-max w-full px-6 md:px-12 pt-24'>
        <div className='max-w-2xl animate-fadeUp'>
          <span className='eyebrow'>Strength &amp; Conditioning</span>

          <h1 className='font-display text-5xl sm:text-6xl md:text-7xl font-semibold uppercase leading-[0.95] tracking-tight text-bone-50 mt-5'>
            {gymName || 'My Gym'}
          </h1>

          <p className='text-lg md:text-xl text-bone-200 mt-6 max-w-lg leading-relaxed'>
            {tagline || 'Strength. Discipline. Results.'}
          </p>

          <div className='flex flex-wrap items-center gap-4 mt-10'>
            <a href='#plans' className='btn-primary'>
              View Membership Plans
              <ArrowRight size={16} />
            </a>
            <a href='#gallery' className='btn-ghost'>
              See the Gym
            </a>
          </div>
        </div>
      </div>

      <a
        href='#about'
        className='hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-bone-400 hover:text-bone-100 transition-colors duration-200'
        aria-label='Scroll to About section'
      >
        <span className='text-[11px] uppercase tracking-widest2'>Scroll</span>
        <ChevronDown size={18} className='animate-bounce' />
      </a>
    </div>
  )
}

export default Hero

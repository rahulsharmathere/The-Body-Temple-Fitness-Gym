import React from 'react'
import { Quote } from 'lucide-react'
import ownerPhoto from '../../../assets/owner.png'

const OWNER = {
  name: 'Rahul Sharma',
  title: 'Founder & Head Coach',
  photo: ownerPhoto,
  quote: "This gym isn't a side project - it's the place I wanted to train in and couldn't find, so I built it.",
  bio: 'Started coaching out of a single rented hall with a handful of regulars. Years later, the goal is the same: honest training, real attention on form, and no gimmicks sold at the front desk.',
  stats: [
    { label: 'Years Coaching', value: '8+' },
    { label: 'Members Trained', value: '500+' },
  ],
}

const Owner = () => {
  return (
    <div id='owner' className='section bg-ink-900'>
      <div className='container-max grid md:grid-cols-[2fr_3fr] gap-14 items-center'>
        <div className='relative animate-fadeUp order-2 md:order-1 max-w-[280px] md:max-w-none mx-auto md:mx-0 w-full'>
          <div className='relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card-hover border border-ink-700'>
            <img
              src={OWNER.photo}
              alt={OWNER.name}
              className='w-full h-full object-cover grayscale-[50%] contrast-[0.9] brightness-[0.85]'
            />
            {/* heavier, hero-style overlay so the photo sits back instead of dominating */}
            <div className='absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-ink-950/20' />
            <div className='absolute inset-0 bg-ink-950/10' />

            <span className='absolute top-4 left-4 px-3 py-1 rounded-full bg-crimson-600 text-white text-[10px] font-semibold uppercase tracking-widest2'>
              Founder
            </span>
          </div>

          <div className='absolute -bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-5 flex bg-ink-950 border border-ink-700 rounded-xl shadow-card-hover px-5 py-3 gap-5 items-center'>
            {OWNER.stats.map((s) => (
              <div key={s.label} className='text-center px-1'>
                <div className='font-display text-xl text-crimson-400'>{s.value}</div>
                <div className='text-[9px] uppercase tracking-widest2 text-bone-400 mt-1 whitespace-nowrap'>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='animate-fadeUp order-1 md:order-2'>
          <span className='eyebrow'>Meet The Owner</span>
          <h2 className='section-heading'>{OWNER.name}</h2>
          <div className='text-crimson-400 text-sm uppercase tracking-wider font-semibold mt-2'>
            {OWNER.title}
          </div>

          <div className='flex gap-3 mt-6 bg-ink-800/60 border border-ink-600 border-l-4 border-l-crimson-500 rounded-xl p-5'>
            <Quote size={20} className='text-crimson-400 shrink-0 mt-1' />
            <p className='text-bone-100 italic leading-relaxed'>{OWNER.quote}</p>
          </div>

          <p className='text-bone-300 leading-relaxed mt-6'>{OWNER.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default Owner
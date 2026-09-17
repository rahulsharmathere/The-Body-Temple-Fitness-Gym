import React from 'react'
import { Quote } from 'lucide-react'

// Static placeholder profile - swap the details and photo URL for the real
// owner whenever you have them. No backend field for this yet, so it lives
// here as plain data rather than coming from gym-info.
const OWNER = {
  name: 'Rahul Sharma',
  title: 'Founder & Head Coach',
  photo: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=A8203A&color=fff&size=480&bold=true',
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
      <div className='container-max grid md:grid-cols-2 gap-14 items-center'>
        <div className='relative animate-fadeUp order-2 md:order-1'>
          <div className='relative rounded-2xl overflow-hidden aspect-[4/5] shadow-card-hover'>
            <img src={OWNER.photo} alt={OWNER.name} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent' />
          </div>

          <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-6 flex card px-6 py-4 gap-6 items-center'>
            {OWNER.stats.map((s) => (
              <div key={s.label} className='text-center px-1'>
                <div className='font-display text-2xl text-crimson-400'>{s.value}</div>
                <div className='text-[10px] uppercase tracking-widest2 text-bone-400 mt-1 whitespace-nowrap'>{s.label}</div>
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
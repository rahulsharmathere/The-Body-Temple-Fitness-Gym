import React from 'react'
import { BadgeCheck, Check } from 'lucide-react'

const PERKS = ['Full gym access', 'Locker & showers', 'Trainer check-ins']

const Plans = ({ plans }) => {
  const highlightIndex = plans && plans.length >= 3 ? Math.floor(plans.length / 2) : -1

  return (
    <div id='plans' className='section bg-ink-900'>
      <div className='container-max'>
        <div className='text-center mb-16'>
          <span className='eyebrow justify-center'>Membership</span>
          <h2 className='section-heading'>Plans That Fit Your Grind</h2>
          <p className='section-sub mx-auto text-center'>
            Simple, transparent pricing. Pick a term and start training - no hidden fees.
          </p>
        </div>

        {plans && plans.length > 0 ? (
          <div className='flex flex-wrap justify-center gap-8'>
            {plans.map((item, index) => {
              const isHighlighted = index === highlightIndex
              return (
                <div
                  key={item._id || index}
                  className={`relative w-72 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    isHighlighted
                      ? 'bg-gradient-to-b from-crimson-600 to-crimson-800 text-white shadow-glow'
                      : 'card-hover text-bone-100'
                  }`}
                >
                  {isHighlighted && (
                    <span className='absolute -top-3 left-1/2 -translate-x-1/2 badge bg-brass-400 text-ink-950 flex items-center gap-1'>
                      <BadgeCheck size={13} /> Most Popular
                    </span>
                  )}

                  <div className={`text-xs uppercase tracking-widest2 ${isHighlighted ? 'text-white/70' : 'text-bone-400'}`}>
                    {item.name} · {item.durationInMonths} Month{item.durationInMonths > 1 ? 's' : ''}
                  </div>

                  <div className='flex items-end gap-1 mt-4'>
                    <span className='font-display text-4xl font-semibold'>₹{item.price}</span>
                  </div>

                  <div className={`divider my-6 ${isHighlighted ? 'via-white/30' : ''}`} />

                  <ul className='space-y-3 mb-8 flex-1'>
                    {PERKS.map((perk) => (
                      <li key={perk} className='flex items-center gap-2.5 text-sm'>
                        <Check size={16} className={isHighlighted ? 'text-white' : 'text-crimson-400'} />
                        <span className={isHighlighted ? 'text-white/90' : 'text-bone-300'}>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href='#about'
                    className={isHighlighted ? 'btn bg-white text-crimson-700 hover:bg-bone-100' : 'btn-secondary'}
                  >
                    Get Started
                  </a>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='text-center text-bone-400'>Membership plans coming soon.</div>
        )}
      </div>
    </div>
  )
}

export default Plans

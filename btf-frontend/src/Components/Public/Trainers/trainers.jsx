import React from 'react'

// Static placeholder roster - swap names/roles/bios for the real trainers.
// There's no backend collection for this yet (see note in gymInfoController
// if that gets added later); for now this mirrors how PERKS works in Plans.
const TRAINERS = [
  {
    name: 'Rohan Malhotra',
    role: 'Strength & Conditioning',
    bio: 'Powerlifting-focused coaching for people chasing real numbers, not just a sweat.',
    color: 'A8203A',
  },
  {
    name: 'Priya Nair',
    role: 'Functional Training',
    bio: 'Mobility, form correction, and building training habits that actually stick.',
    color: 'B08A34',
  },
  {
    name: 'Karan Sethi',
    role: 'Nutrition & Conditioning',
    bio: 'Pairs a training plan with practical, no-nonsense diet coaching.',
    color: '8E1730',
  },
]

const Trainers = () => {
  return (
    <div id='trainers' className='section bg-ink-950'>
      <div className='container-max'>
        <div className='text-center mb-16'>
          <span className='eyebrow justify-center'>Our Coaches</span>
          <h2 className='section-heading'>Trainers</h2>
          <p className='section-sub mx-auto text-center'>
            Every plan comes with access to coaches who actually watch your form.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {TRAINERS.map((t) => (
            <div key={t.name} className='card-hover p-6 text-center flex flex-col items-center'>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=${t.color}&color=fff&size=200&bold=true`}
                alt={t.name}
                className='w-24 h-24 rounded-full object-cover border-2 border-ink-500'
              />
              <h3 className='font-display text-lg uppercase tracking-wide text-bone-50 mt-5'>{t.name}</h3>
              <div className='text-crimson-400 text-xs uppercase tracking-widest2 font-semibold mt-1'>
                {t.role}
              </div>
              <p className='text-bone-300 text-sm leading-relaxed mt-4'>{t.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trainers
import React from 'react'
import { MapPin, Clock, Phone } from 'lucide-react'

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className='flex items-start gap-4 py-4 border-b border-ink-600 last:border-b-0'>
    <div className='w-10 h-10 rounded-lg bg-ink-700 flex items-center justify-center shrink-0'>
      <Icon size={18} className='text-crimson-400' />
    </div>
    <div>
      <div className='text-xs uppercase tracking-wider text-bone-400'>{label}</div>
      <div className='text-bone-100 mt-1'>{value}</div>
    </div>
  </div>
)

const About = ({ description, address, timings, phone }) => {
  const hasInfo = address || timings || phone

  return (
    <div id='about' className='section bg-ink-950'>
      <div className='container-max grid md:grid-cols-2 gap-14 items-start'>
        <div className='animate-fadeUp'>
          <span className='eyebrow'>Who We Are</span>
          <h2 className='section-heading'>About the Gym</h2>
          <p className='text-bone-300 text-base md:text-lg leading-relaxed mt-6'>
            {description || 'A dedicated space built for people serious about their training - clean equipment, a focused atmosphere, and coaching that actually pays attention.'}
          </p>
        </div>

        {hasInfo && (
          <div className='panel animate-fadeUp'>
            {address && <InfoRow icon={MapPin} label='Location' value={address} />}
            {timings && <InfoRow icon={Clock} label='Hours' value={timings} />}
            {phone && <InfoRow icon={Phone} label='Phone' value={phone} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default About

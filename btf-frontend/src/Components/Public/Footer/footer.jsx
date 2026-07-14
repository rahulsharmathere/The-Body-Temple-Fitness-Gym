import React from 'react'
import { Phone, Mail, Dumbbell } from 'lucide-react'

// lucide-react no longer ships brand marks, so these two are tiny inline
// SVGs kept local to the footer rather than pulling in a whole icon pack.
const InstagramIcon = (props) => (
  <svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' {...props}>
    <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
  </svg>
)
const FacebookIcon = (props) => (
  <svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' {...props}>
    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
  </svg>
)

// The contact form page was removed per the redesign brief; the essential
// reach-out details (phone / email / socials) now live here so that
// information isn't lost, it's just no longer a dedicated form/page.
const Footer = ({ gymName, phone, email, instagram, facebook }) => {
  const hasContact = phone || email || instagram || facebook

  return (
    <footer className='w-full bg-ink-950 border-t border-ink-600'>
      <div className='container-max px-6 md:px-12 py-14'>
        <div className='flex flex-col md:flex-row md:justify-between gap-10'>
          <div>
            <div className='flex items-center gap-2.5'>
              <span className='w-9 h-9 rounded-lg bg-crimson-500 flex items-center justify-center'>
                <Dumbbell size={18} className='text-white' strokeWidth={2.5} />
              </span>
              <span className='font-display text-lg uppercase tracking-wide text-bone-50'>
                {gymName || 'The BTF'}
              </span>
            </div>
            <p className='text-bone-400 text-sm mt-4 max-w-xs leading-relaxed'>
              Strength and conditioning, built for people serious about the work.
            </p>
          </div>

          {hasContact && (
            <div className='flex flex-col gap-3'>
              <div className='text-xs uppercase tracking-widest2 text-bone-400 mb-1'>Get In Touch</div>
              {phone && (
                <a href={`tel:${phone}`} className='flex items-center gap-2.5 text-bone-200 hover:text-white text-sm transition-colors'>
                  <Phone size={15} className='text-crimson-400' /> {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className='flex items-center gap-2.5 text-bone-200 hover:text-white text-sm transition-colors'>
                  <Mail size={15} className='text-crimson-400' /> {email}
                </a>
              )}
              {(instagram || facebook) && (
                <div className='flex items-center gap-3 mt-1'>
                  {instagram && (
                    <a href={instagram} target='_blank' rel='noreferrer' className='icon-btn' aria-label='Instagram'>
                      <InstagramIcon />
                    </a>
                  )}
                  {facebook && (
                    <a href={facebook} target='_blank' rel='noreferrer' className='icon-btn' aria-label='Facebook'>
                      <FacebookIcon />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className='divider my-10' />

        <div className='text-center text-bone-500 text-xs'>
          © {new Date().getFullYear()} {gymName || 'My Gym'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

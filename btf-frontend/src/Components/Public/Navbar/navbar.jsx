import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Dumbbell } from 'lucide-react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#plans', label: 'Plans' },
  { href: '#gallery', label: 'Gallery' },
]

const Navbar = ({ gymName }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink-950/85 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className='container-max flex justify-between items-center px-6 md:px-12'>
        <a href='#top' className='flex items-center gap-2.5 shrink-0'>
          <span className='w-9 h-9 rounded-lg bg-crimson-500 flex items-center justify-center'>
            <Dumbbell size={18} className='text-white' strokeWidth={2.5} />
          </span>
          <span className='font-display text-lg md:text-xl uppercase tracking-wide text-bone-50'>
            {gymName || 'The BTF'}
          </span>
        </a>

        <div className='hidden md:flex items-center gap-10'>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='text-sm font-medium uppercase tracking-wide text-bone-300 hover:text-white transition-colors duration-200'
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className='hidden md:block'>
          <Link to='/login' className='btn-secondary btn-sm'>
            Log In
          </Link>
        </div>

        <button
          type='button'
          className='md:hidden text-bone-100 icon-btn'
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className='md:hidden mt-4 mx-4 rounded-2xl glass px-6 py-6 flex flex-col gap-5 animate-fadeUp'>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className='text-base font-medium uppercase tracking-wide text-bone-200 hover:text-white'
            >
              {link.label}
            </a>
          ))}
          <div className='divider' />
          <Link to='/login' onClick={() => setMenuOpen(false)} className='btn-primary w-full'>
            Log In
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar

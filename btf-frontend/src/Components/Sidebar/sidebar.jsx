import React, { useState, useEffect } from 'react'
import { LayoutDashboard, Users, Settings, LogOut, Dumbbell, Menu, X, User, CreditCard, CalendarCheck, TrendingUp } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ADMIN_NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/member', label: 'Members', icon: Users },
  { to: '/admin/settings', label: 'Website Settings', icon: Settings },
]

const MEMBER_NAV_ITEMS = [
  { to: '/member/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/member/profile', label: 'My Profile', icon: User },
  { to: '/member/membership', label: 'My Membership', icon: CreditCard },
  { to: '/member/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/member/progress', label: 'My Progress', icon: TrendingUp },
]

// hoisted out of Sidebar so it isn't re-created on every render
const NavLinks = ({ items, currentPath, onNavigate }) => (
  <nav className='mt-8 flex flex-col gap-1.5'>
    {items.map(({ to, label, icon: Icon }) => {
      const active = currentPath === to;
      return (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            active
              ? 'bg-crimson-500 text-white shadow-card'
              : 'text-bone-300 hover:bg-ink-800 hover:text-white'
          }`}
        >
          <Icon size={18} />
          {label}
        </Link>
      )
    })}
  </nav>
)

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  if (currentHour < 18) return "Good Afternoon";
  if (currentHour < 21) return "Good Evening";
  return "Good Night";
}

const Sidebar = () => {

  const [greeting] = useState(getGreeting);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem('role') || 'admin';
  const navItems = role === 'member' ? MEMBER_NAV_ITEMS : ADMIN_NAV_ITEMS;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname])

  const handleLogOut = async () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <>
      {/* mobile top bar */}
      <div className='md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-ink-900 border-b border-ink-600'>
        <Link to='/' className='flex items-center gap-2.5'>
          <span className='w-8 h-8 rounded-lg bg-crimson-500 flex items-center justify-center'>
            <Dumbbell size={16} className='text-white' strokeWidth={2.5} />
          </span>
          <span className='font-display text-base uppercase tracking-wide text-bone-50 truncate'>
            {localStorage.getItem('gymName') || 'The BTF'}
          </span>
        </Link>
        <button type='button' className='icon-btn' onClick={() => setMobileOpen(true)} aria-label='Open menu'>
          <Menu size={18} />
        </button>
      </div>

      {mobileOpen && (
        <div className='md:hidden fixed inset-0 z-50 flex'>
          <div className='absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn' onClick={() => setMobileOpen(false)} />
          <div className='relative w-72 max-w-[80%] bg-ink-900 border-r border-ink-600 h-full p-6 animate-fadeUp'>
            <div className='flex items-center justify-between'>
              <span className='font-display text-base uppercase tracking-wide text-bone-50'>Menu</span>
              <button type='button' className='icon-btn' onClick={() => setMobileOpen(false)} aria-label='Close menu'>
                <X size={18} />
              </button>
            </div>
            <NavLinks items={navItems} currentPath={location.pathname} onNavigate={() => setMobileOpen(false)} />
            <button
              type='button'
              onClick={handleLogOut}
              className='mt-6 flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-bone-300 hover:bg-crimson-900/30 hover:text-crimson-300 transition-all duration-200 w-full'
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* desktop sidebar */}
      <div className='hidden md:flex flex-col w-72 shrink-0 bg-ink-900 border-r border-ink-600 h-screen sticky top-0 p-6'>
        <Link to='/' className='flex items-center gap-2.5'>
          <span className='w-9 h-9 rounded-lg bg-crimson-500 flex items-center justify-center'>
            <Dumbbell size={18} className='text-white' strokeWidth={2.5} />
          </span>
          <span className='font-display text-lg uppercase tracking-wide text-bone-50 truncate'>
            {localStorage.getItem('gymName') || 'The BTF'}
          </span>
        </Link>

        <div className='flex items-center gap-4 mt-8 p-4 rounded-xl bg-ink-800 border border-ink-600'>
          <img
            className='w-12 h-12 rounded-full object-cover border border-ink-500'
            alt='profile'
            src={localStorage.getItem("userPic")}
          />
          <div className='min-w-0'>
            <div className='text-xs text-bone-400 truncate'>{greeting}</div>
            <div className='text-sm font-semibold text-bone-50 truncate'>{localStorage.getItem('userName') || (role === 'admin' ? 'Admin' : 'Member')}</div>
          </div>
        </div>

        <NavLinks items={navItems} currentPath={location.pathname} onNavigate={undefined} />

        <button
          type='button'
          onClick={handleLogOut}
          className='mt-auto flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-bone-300 hover:bg-crimson-900/30 hover:text-crimson-300 transition-all duration-200'
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </>
  )
}

export default Sidebar

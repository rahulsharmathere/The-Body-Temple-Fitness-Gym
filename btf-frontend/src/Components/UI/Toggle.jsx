import React from 'react'

// Small, accessible on/off switch that follows the site's design tokens.
// Replaces react-switch so the control matches the rest of the UI exactly.
const Toggle = ({ checked, onChange, onLabel = 'Active', offLabel = 'Pending' }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-200 shrink-0
        ${checked ? 'bg-emerald-500/90' : 'bg-ink-500'}`}
    >
      <span
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200 ease-out
          ${checked ? 'translate-x-8' : 'translate-x-0'}`}
      />
      <span className="sr-only">{checked ? onLabel : offLabel}</span>
    </button>
  )
}

export default Toggle

import React from 'react'

// Indeterminate loading bar, used under image uploads etc. Keeps a single
// consistent loading affordance instead of mixing in MUI's default styling.
const ProgressBar = () => {
  return (
    <div className="w-full h-1.5 rounded-full bg-ink-700 overflow-hidden">
      <div className="h-full w-1/3 bg-crimson-500 rounded-full animate-loadingSlide" />
    </div>
  )
}

export default ProgressBar

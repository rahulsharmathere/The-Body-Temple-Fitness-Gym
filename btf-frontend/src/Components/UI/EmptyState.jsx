import React from 'react'
import { Inbox } from 'lucide-react'

// A single, consistent "nothing here" treatment used anywhere a list or
// grid can come back empty (member search, filtered dashboard views, etc).
const EmptyState = ({ icon: Icon = Inbox, title = 'Nothing here yet', description }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl bg-ink-700 border border-ink-500 flex items-center justify-center mb-5">
        <Icon size={26} strokeWidth={1.5} className="text-bone-400" />
      </div>
      <div className="font-display text-xl uppercase tracking-wide text-bone-100">{title}</div>
      {description && <div className="text-bone-400 text-sm mt-2 max-w-sm">{description}</div>}
    </div>
  )
}

export default EmptyState

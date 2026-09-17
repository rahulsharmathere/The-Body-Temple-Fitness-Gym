import React, { useState, useEffect, useCallback } from 'react'
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Every 5th tile is given extra room so the grid reads as an editorial
// mosaic instead of a flat sheet of identical squares.
const isFeatured = (index) => index % 5 === 0

const Gallery = ({ gallery }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const isOpen = activeIndex !== null

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }, [gallery?.length])

  const showNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % gallery.length)
  }, [gallery?.length])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, showPrev, showNext])

  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <div id='gallery' className='section bg-ink-900'>
      <div className='container-max'>
        <div className='text-center mb-16'>
          <span className='eyebrow justify-center'>Inside The BTF</span>
          <h2 className='section-heading'>Gallery</h2>
          <p className='section-sub mx-auto text-center'>
            A look at the floor, the equipment, and the people who show up for it.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[170px] md:auto-rows-[190px] gap-3 md:gap-4 grid-flow-dense'>
          {gallery.map((img, index) => {
            const featured = isFeatured(index)
            return (
              <button
                key={index}
                type='button'
                onClick={() => setActiveIndex(index)}
                className={`group relative rounded-xl overflow-hidden focus-visible:outline-none ${
                  featured ? 'row-span-2 md:col-span-2 md:row-span-2' : ''
                }`}
                aria-label={`Open gym photo ${index + 1}`}
              >
                <img
                  src={img}
                  loading='lazy'
                  className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                  alt={`gym photo ${index + 1}`}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <span className='w-10 h-10 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm flex items-center justify-center'>
                    <Expand size={16} className='text-white' />
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4 py-10 animate-fadeIn'
          onClick={() => setActiveIndex(null)}
        >
          <button
            type='button'
            onClick={() => setActiveIndex(null)}
            className='absolute top-5 right-5 icon-btn bg-ink-900/80'
            aria-label='Close gallery'
          >
            <X size={20} />
          </button>

          {gallery.length > 1 && (
            <button
              type='button'
              onClick={(e) => { e.stopPropagation(); showPrev() }}
              className='hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 icon-btn bg-ink-900/80'
              aria-label='Previous photo'
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <img
            src={gallery[activeIndex]}
            alt={`gym photo ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className='max-w-full max-h-full rounded-xl object-contain shadow-card-hover animate-scaleIn'
          />

          {gallery.length > 1 && (
            <button
              type='button'
              onClick={(e) => { e.stopPropagation(); showNext() }}
              className='hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 icon-btn bg-ink-900/80'
              aria-label='Next photo'
            >
              <ChevronRight size={20} />
            </button>
          )}

          {gallery.length > 1 && (
            <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-bone-300 text-xs tracking-widest2 uppercase'>
              {activeIndex + 1} / {gallery.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Gallery
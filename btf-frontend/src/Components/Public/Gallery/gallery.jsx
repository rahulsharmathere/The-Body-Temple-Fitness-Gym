import React from 'react'

const Gallery = ({ gallery }) => {
  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <div id='gallery' className='section bg-ink-900'>
      <div className='container-max'>
        <div className='text-center mb-16'>
          <span className='eyebrow justify-center'>Inside The BTF</span>
          <h2 className='section-heading'>Gallery</h2>
        </div>

        <div className='grid gap-4 grid-cols-2 md:grid-cols-4'>
          {gallery.map((img, index) => (
            <div key={index} className='group relative rounded-xl overflow-hidden aspect-square'>
              <img
                src={img}
                className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                alt={`gym photo ${index + 1}`}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery

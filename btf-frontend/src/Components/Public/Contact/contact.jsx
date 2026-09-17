import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Send, Phone, Mail } from 'lucide-react'
import { sendContactMessage } from '../../../Pages/Public/Home/data'

const Contact = ({ phone, email }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      toast.error('Name and message are required')
      return
    }

    setSending(true)
    try {
      await sendContactMessage(form)
      toast.success("Message sent - we'll get back to you soon")
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Could not send message, please try again'
      toast.error(errorMessage)
    }
    setSending(false)
  }

  return (
    <div id='contact' className='section bg-ink-900'>
      <div className='container-max grid md:grid-cols-2 gap-14 items-start'>
        <div className='animate-fadeUp'>
          <span className='eyebrow'>Get In Touch</span>
          <h2 className='section-heading'>Have A Question?</h2>
          <p className='section-sub'>
            Ask about plans, trial sessions, or anything else - we usually reply within a day.
          </p>

          <div className='flex flex-col gap-4 mt-8'>
            {phone && (
              <a href={`tel:${phone}`} className='flex items-center gap-3 text-bone-200 hover:text-white text-sm transition-colors'>
                <span className='icon-btn'><Phone size={16} /></span> {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className='flex items-center gap-3 text-bone-200 hover:text-white text-sm transition-colors'>
                <span className='icon-btn'><Mail size={16} /></span> {email}
              </a>
            )}
          </div>
        </div>

        <div className='panel animate-fadeUp'>
          <div className='flex flex-col gap-5'>
            <div>
              <label className='field-label'>Name</label>
              <input
                value={form.name}
                onChange={handleChange('name')}
                type='text'
                className='input'
                placeholder='Your name'
              />
            </div>

            <div className='grid sm:grid-cols-2 gap-5'>
              <div>
                <label className='field-label'>Email</label>
                <input
                  value={form.email}
                  onChange={handleChange('email')}
                  type='email'
                  className='input'
                  placeholder='you@email.com'
                />
              </div>
              <div>
                <label className='field-label'>Phone</label>
                <input
                  value={form.phone}
                  onChange={handleChange('phone')}
                  type='text'
                  className='input'
                  placeholder='Optional'
                />
              </div>
            </div>

            <div>
              <label className='field-label'>Message</label>
              <textarea
                value={form.message}
                onChange={handleChange('message')}
                className='textarea'
                rows={4}
                placeholder='What do you want to know?'
              />
            </div>

            <button type='button' disabled={sending} onClick={handleSubmit} className='btn-primary w-full'>
              <Send size={16} /> {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer theme='dark' position='bottom-right' />
    </div>
  )
}

export default Contact
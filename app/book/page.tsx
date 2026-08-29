'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function BookPage() {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    service_type: '',
    requested_date: '',
    requested_time: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const inputStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--foreground)',
    fontSize: '14px',
    outline: 'none',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.from('bookings').insert([formData])

    if (error) {
      setError('Something went wrong. Please try again.')
      console.error(error)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <main style={{ maxWidth: '500px', margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '0.75rem' }}>Thank you!</h1>
        <p style={{ color: 'var(--muted)' }}>Your booking request has been submitted. I&apos;ll get back to you soon.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--foreground)', fontSize: '14px' }}>
          ← Back home
        </Link>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <Link href="/" style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'none' }}>
        ← Back home
      </Link>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 500, margin: '1rem 0 2rem', letterSpacing: '-0.02em' }}>
        Book a session
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="client_name" placeholder="Your name" value={formData.client_name} onChange={handleChange} required style={inputStyle} />
        <input name="client_email" type="email" placeholder="Your email" value={formData.client_email} onChange={handleChange} required style={inputStyle} />
        <input name="service_type" placeholder="What service are you booking?" value={formData.service_type} onChange={handleChange} required style={inputStyle} />
        <input name="requested_date" type="date" value={formData.requested_date} onChange={handleChange} required style={inputStyle} />
        <input name="requested_time" type="time" value={formData.requested_time} onChange={handleChange} required style={inputStyle} />
        <textarea name="notes" placeholder="Anything else I should know?" value={formData.notes} onChange={handleChange} rows={4} style={inputStyle} />

        {error && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{error}</p>}

        <button
          type="submit"
          style={{
            padding: '0.85rem',
            borderRadius: '999px',
            background: 'var(--accent)',
            color: 'var(--background)',
            border: 'none',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          Submit booking request
        </button>
      </form>
    </main>
  )
}
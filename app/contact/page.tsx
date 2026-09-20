'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import ThemeToggle from '../components/ThemeToggle'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    project_type: '',
    budget: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        <p style={{ color: 'var(--muted)' }}>I&apos;ll get back to you soon.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--foreground)', fontSize: '14px' }}>
          ← Back home
        </Link>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: 'var(--muted)',
          marginBottom: '2rem',
        }}
      >
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
          ← Home
        </Link>
        <ThemeToggle />
      </div>

      <h1 style={{ fontSize: '2.25rem', fontWeight: 500, margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>
        Contact
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '2rem' }}>
        If you prefer not to fill out this form, feel free to email me directly and let&apos;s talk about the next big thing!
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="client_name" placeholder="Full name" value={formData.client_name} onChange={handleChange} required style={inputStyle} />
        <input name="client_email" type="email" placeholder="Email" value={formData.client_email} onChange={handleChange} required style={inputStyle} />

        <select name="project_type" value={formData.project_type} onChange={handleChange} required style={inputStyle}>
          <option value="">What&apos;s your project about?</option>
          <option value="Photography">Photography</option>
          <option value="Video">Video</option>
          <option value="Branding">Branding</option>
          <option value="Web Design">Web Design</option>
        </select>

        <select name="budget" value={formData.budget} onChange={handleChange} required style={inputStyle}>
          <option value="">Project budget</option>
          <option value="$1k - $5k">$1k – $5k</option>
          <option value="$5k - $10k">$5k – $10k</option>
          <option value="$10k - $20k">$10k – $20k</option>
          <option value="$20k+">$20k+</option>
        </select>

        <textarea name="notes" placeholder="Share more details about your project..." value={formData.notes} onChange={handleChange} rows={4} style={inputStyle} />

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
          Submit
        </button>
      </form>
    </main>
  )
}
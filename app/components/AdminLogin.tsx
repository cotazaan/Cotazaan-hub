'use client'

import { useState } from 'react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.reload()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <main style={{ maxWidth: '360px', margin: '4rem auto', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1.5rem' }}>Admin login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--foreground)',
          }}
        />
        {error && <p style={{ color: '#ff6b6b', fontSize: '13px' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            borderRadius: '999px',
            background: 'var(--accent)',
            color: 'var(--background)',
            border: 'none',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Log in
        </button>
      </form>
    </main>
  )
}
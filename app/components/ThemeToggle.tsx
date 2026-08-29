'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        border: '1px solid var(--border)',
        borderRadius: '999px',
        padding: '6px 14px',
        background: 'transparent',
        color: 'var(--foreground)',
        cursor: 'pointer',
        fontSize: '13px',
      }}
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
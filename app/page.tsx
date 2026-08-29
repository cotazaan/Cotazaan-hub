import { supabase } from '@/lib/supabase'
import ThemeToggle from './components/ThemeToggle'
import Link from 'next/link'
import PortfolioGrid from './components/PortfolioGrid'

export default async function Home() {
  const { data: portfolioItems, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching portfolio items:', error)
  }

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
        }}
      >
        <span style={{ fontWeight: 500, fontSize: '16px' }}>COTAZAAN</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link href="/book" style={{ fontSize: '14px', color: 'var(--foreground)', textDecoration: 'none' }}>
            Book
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <section style={{ padding: '3rem 0 2.5rem' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            margin: '0 0 1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          Every frame
          <br />
          tells a story.
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '380px', margin: '0 0 1.5rem' }}>
          Portfolio, booking, and social publishing — all in one place.
        </p>
        <Link
          href="/book"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--background)',
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Book a session
        </Link>
      </section>

      <PortfolioGrid items={portfolioItems || []} />
    </main>
  )
}
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '../components/ThemeToggle'

export default async function PortfolioPage() {
  const { data: items } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
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

      <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, margin: '0 0 2.5rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
        Dive into a few projects that represent my most fulfilling design experiences
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {items?.map((item) => (
          <Link
            key={item.id}
            href={item.slug ? `/portfolio/${item.slug}` : '#'}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'var(--foreground)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 1rem' }}>
              <span style={{ fontSize: '14px' }}>{item.title}</span>
              <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{item.category}</span>
            </div>
          </Link>
        ))}
        {(!items || items.length === 0) && (
          <p style={{ color: 'var(--muted)' }}>No portfolio items yet.</p>
        )}
      </div>
    </main>
  )
}
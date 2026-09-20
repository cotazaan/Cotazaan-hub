import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '../../components/ThemeToggle'
import { notFound } from 'next/navigation'

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: item } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!item) {
    notFound()
  }

  const { data: media } = await supabase
    .from('portfolio_media')
    .select('*')
    .eq('portfolio_item_id', item.id)
    .order('sort_order', { ascending: true })

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
        <Link href="/portfolio" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
          ← Portfolio
        </Link>
        <ThemeToggle />
      </div>

      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 500, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
        {item.title}
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '2.5rem' }}>{item.category}</p>

      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.title}
          style={{ width: '100%', borderRadius: '16px', marginBottom: '2rem' }}
        />
      )}

      <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--foreground)', marginBottom: '2.5rem' }}>
        {item.description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {media?.map((m) => (
          <div key={m.id}>
            {m.media_type === 'video' ? (
              <video src={m.media_url} controls style={{ width: '100%', borderRadius: '16px' }} />
            ) : (
              <img src={m.media_url} alt="" style={{ width: '100%', borderRadius: '16px' }} />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
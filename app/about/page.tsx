import Link from 'next/link'
import ThemeToggle from '../components/ThemeToggle'

export default function AboutPage() {
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
        <span>AI Design Engineer</span>
        <ThemeToggle />
      </div>

      <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 500, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
        About
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--foreground)' }}>
          I&apos;m Your Name — a designer who believes the best work lives at the intersection of clarity and craft.
          I specialize in product experiences that feel considered from every angle, the layout, the type, the small
          details most people scroll past without noticing. Consistency matters to me, not as a rule, but because
          it&apos;s what makes a product feel trustworthy.
        </p>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            aspectRatio: '3/4',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {testimonials.map((t, i) => (
          <div key={i}>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--foreground)', marginBottom: '0.75rem' }}>
              {t.quote}
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{t.author}</p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', marginBottom: '3rem' }}>
        {workHistory.map((job, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 2fr',
              gap: '1rem',
              padding: '1.25rem 0',
              borderBottom: i < workHistory.length - 1 ? '1px solid var(--border)' : 'none',
              fontSize: '14px',
            }}
          >
            <span style={{ color: 'var(--muted)' }}>{job.years}</span>
            <span>{job.title}</span>
            <span style={{ color: 'var(--muted)' }}>{job.company}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Digital Design — Art Direction — Framer</p>
    </main>
  )
}

const testimonials = [
  { quote: 'Working with them changed how I think about creative direction.', author: 'Jane Doe, Design Director' },
  { quote: 'One of those creatives who makes everyone around them better.', author: 'John Smith, Product Lead' },
  { quote: 'Brings a kind of quiet confidence to every brief.', author: 'Alex Kim, Founder' },
]

const workHistory = [
  { years: '2026 – Present', title: 'Design Director', company: 'Studio Name' },
  { years: '2023 – 2026', title: 'Design Lead', company: 'Company Name' },
  { years: '2020 – 2023', title: 'Senior Designer', company: 'Previous Co' },
]
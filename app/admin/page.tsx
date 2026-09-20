import Link from 'next/link'
import ThemeToggle from './components/ThemeToggle'

export default function Home() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
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
        <span>Home</span>
        <span>AI Design Engineer</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Windhoek</span>
          <ThemeToggle />
        </div>
      </div>

      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 500, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
        Your Name
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
        <BentoCard href="/about" label="About" />
        <BentoCard href="/portfolio" label="Portfolio" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <BentoCard href="/contact" label="Contact" />
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            aspectRatio: '1',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1rem',
            flex: 1,
            display: 'flex',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Instagram</span>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Facebook</span>
          <span style={{ fontSize: '13px', color: 'var(--muted)' }}>WhatsApp</span>
        </div>
        
          href="/resume.pdf"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1rem',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--foreground)',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          Resume
        </a>
      </div>
    </main>
  )
}

function BentoCard({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.25rem',
        color: 'var(--foreground)',
        textDecoration: 'none',
        fontSize: '15px',
        minHeight: '140px',
        display: 'flex',
        alignItems: 'flex-end',
        transition: 'background 0.2s ease',
      }}
    >
      {label}
    </Link>
  )
}
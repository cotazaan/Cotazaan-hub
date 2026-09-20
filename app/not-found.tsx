import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', fontWeight: 500, margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
        404
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '2rem', maxWidth: '320px' }}>
        It seems like this page doesn&apos;t exist, or it&apos;s gone. But don&apos;t worry, I&apos;ll get you back on track :)
      </p>
      <Link
        href="/"
        style={{
          background: 'var(--accent)',
          color: 'var(--background)',
          padding: '0.75rem 1.5rem',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Back to Home
      </Link>
    </main>
  )
}
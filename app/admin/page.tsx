import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import AdminLogin from '../components/AdminLogin'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthed = cookieStore.get('admin_auth')?.value === process.env.ADMIN_PASSWORD

  if (!isAuthed) {
    return <AdminLogin />
  }

  const { data: bookings } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '1.5rem' }}>Bookings</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
        {bookings?.map((b) => (
          <div
            key={b.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '1rem',
            }}
          >
            <p style={{ fontWeight: 500, fontSize: '15px', margin: '0 0 4px' }}>{b.client_name}</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 8px' }}>{b.client_email}</p>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              {b.project_type && (
                <span
                  style={{
                    fontSize: '12px',
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    padding: '2px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {b.project_type}
                </span>
              )}
              {b.budget && (
                <span
                  style={{
                    fontSize: '12px',
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted)',
                    padding: '2px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {b.budget}
                </span>
              )}
            </div>

            {b.notes && (
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{b.notes}</p>
            )}
          </div>
        ))}

        {bookings?.length === 0 && <p style={{ color: 'var(--muted)' }}>No bookings yet.</p>}
      </div>
    </main>
  )
}
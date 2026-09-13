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
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '1.5rem' }}>Bookings</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {bookings?.map((b) => (
          <div
            key={b.id}
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              borderRadius: '10px',
              padding: '1rem',
            }}
          >
            <p style={{ fontWeight: 500, margin: '0 0 4px' }}>{b.client_name} — {b.service_type}</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 4px' }}>
              {b.client_email} • {b.requested_date} at {b.requested_time}
            </p>
            <p style={{ fontSize: '13px', margin: '0 0 4px' }}>Status: {b.status}</p>
            {b.notes && <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>{b.notes}</p>}
          </div>
        ))}
        {bookings?.length === 0 && <p style={{ color: 'var(--muted)' }}>No bookings yet.</p>}
      </div>
    </main>
  )
}
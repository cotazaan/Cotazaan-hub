'use client'

import { motion } from 'framer-motion'

type PortfolioItem = {
  id: number
  title: string
  description: string
  image_url: string | null
  category: string
}

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) {
    return (
      <p style={{ color: 'var(--muted)', padding: '2rem 0' }}>
        No portfolio items yet. Add some in Supabase to see them here.
      </p>
    )
  }

  return (
    <section style={{ padding: '1rem 0 4rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '1rem' }}>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 4px' }}>{item.category}</p>
              <h3 style={{ fontSize: '16px', fontWeight: 500, margin: '0 0 6px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
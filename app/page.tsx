'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './components/ThemeToggle'

const glassCard = {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
}

export default function Home() {
  const [heading, setHeading] = useState('Your Name')
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Africa/Windhoek',
          hour: 'numeric',
          minute: '2-digit',
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <main style={{ width: '100%', padding: '1.4rem 16px 3rem' }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '17px',
          color: 'var(--muted)',
          marginBottom: '0.6rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <span style={{ color: 'var(--foreground)' }}>Your Name</span>
          <span>AI Design Engineer</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span>Windhoek{time ? ` • ${time}` : ''}</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Heading — centered like the reference */}
      <div style={{ height: 'clamp(4.8rem, 14vw, 13.2rem)', overflow: 'visible', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.h1
            key={heading}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 24 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -24 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              fontSize: 'clamp(3.6rem, 12vw, 12rem)',
              fontWeight: 500,
              margin: 0,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              position: 'absolute',
              left: 0,
              width: '100%',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {heading}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* -7.2vw instead of -9vw: pushes the grid down ~31px so the heading shows like the reference */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: 'clamp(-6.5rem, -7.2vw, -3.5rem)' }}>
        {/* Row 1: About + Portfolio */}
        <div style={{ display: 'grid', gridTemplateColumns: '489fr 1503fr', gap: '16px', marginBottom: '16px', alignItems: 'start' }}>
          <BentoCard href="/about" label="About" aspectRatio="489/474" onHover={setHeading} defaultHeading="Your Name" />
          <BentoCard href="/portfolio" label="Portfolio" aspectRatio="1503/474" onHover={setHeading} defaultHeading="Your Name" />
        </div>

        {/* Row 2: Contact + Portrait + (Socials / Resume) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2.04fr 1fr 1fr', gap: '16px', alignItems: 'start' }}>
          <BentoCard href="/contact" label="Contact" aspectRatio="996/433" onHover={setHeading} defaultHeading="Your Name" />

          <div
            onMouseEnter={() => setHeading('Hey 👋')}
            onMouseLeave={() => setHeading('Your Name')}
            style={{
              ...glassCard,
              borderRadius: '24px',
              aspectRatio: '489/433',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Socials: horizontal row, looping highlight left to right */}
            <div
              style={{
                ...glassCard,
                borderRadius: '24px',
                aspectRatio: '489/174',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              {[
                { name: 'Instagram', svg: <InstagramIcon /> },
                { name: 'Facebook', svg: <FacebookIcon /> },
                { name: 'WhatsApp', svg: <WhatsAppIcon /> },
              ].map(({ name, svg }, i) => (
                <motion.a
                  key={name}
                  href="#"
                  aria-label={name}
                  animate={{
                    backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.16)', 'rgba(255,255,255,0.05)'],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 3.6,
                    delay: i * 0.8,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'grid',
                    placeItems: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {svg}
                </motion.a>
              ))}
            </div>

            {/* Resume */}
            <motion.a
              href="/resume.pdf"
              onMouseEnter={() => setHeading('Resume')}
              onMouseLeave={() => setHeading('Your Name')}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              transition={{ duration: 0.2 }}
              style={{
                ...glassCard,
                borderRadius: '24px',
                aspectRatio: '489/240',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--foreground)',
                textDecoration: 'none',
                fontSize: '18px',
              }}
            >
              Resume
            </motion.a>
          </div>
        </div>
      </div>
    </main>
  )
}

function BentoCard({
  href,
  label,
  aspectRatio,
  onHover,
  defaultHeading,
}: {
  href: string
  label: string
  aspectRatio: string
  onHover: (text: string) => void
  defaultHeading: string
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <motion.div
        onMouseEnter={() => onHover(label)}
        onMouseLeave={() => onHover(defaultHeading)}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        transition={{ duration: 0.2 }}
        style={{
          ...glassCard,
          borderRadius: '24px',
          padding: '1.8rem',
          color: 'var(--foreground)',
          fontSize: '22px',
          aspectRatio,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        {label}
        <span style={{ fontSize: '22px' }}>↗</span>
      </motion.div>
    </Link>
  )
}

/* Brand icons */
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#f58529" />
          <stop offset="0.5" stopColor="#dd2a7b" />
          <stop offset="1" stopColor="#8134af" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="7" fill="url(#ig)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="#fff" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        fill="#1877F2"
        d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15L2.5 22l5.1-1.34A9.93 9.93 0 1 0 12.04 2zm0 1.5a8.43 8.43 0 1 1-4.3 15.7l-.31-.18-3 .79.8-2.93-.2-.31a8.43 8.43 0 0 1 7.01-13.07z" />
      <path d="M8.1 7.6c-.2 0-.5.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35l-1.76-.87c-.3-.15-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51H8.1z" />
    </svg>
  )
}
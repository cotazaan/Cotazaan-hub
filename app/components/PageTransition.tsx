'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      {children}
      <motion.div
        key={pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  )
}
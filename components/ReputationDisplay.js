'use client'
/**
 * ReputationDisplay — Shows business reputation as hearts
 * Animates heart loss on wrong answers
 */
import { motion, AnimatePresence } from 'framer-motion'

export default function ReputationDisplay({ reputation, maxReputation = 3 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxReputation }).map((_, i) => {
        const isFull = i < reputation
        return (
          <motion.span
            key={i}
            initial={{ scale: 1 }}
            animate={isFull ? { scale: 1 } : { scale: 0.85, filter: 'grayscale(1)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-2xl select-none"
          >
            {isFull ? '❤️' : '🖤'}
          </motion.span>
        )
      })}
    </div>
  )
}

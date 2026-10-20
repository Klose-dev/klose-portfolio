import { motion } from 'framer-motion'

export default function HighlightCard({ title, items, index = 0, inView }) {
  return (
    <motion.div
      className="highlight-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
    >
      <h4 className="highlight-title">{title}</h4>
      <ul className="highlight-items" aria-label={title}>
        {items.map((item, i) => (
          <li key={i} className="highlight-item">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
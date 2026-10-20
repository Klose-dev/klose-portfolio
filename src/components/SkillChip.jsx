import { motion } from 'framer-motion'

export default function SkillChip({ name, index = 0, inView }) {
  return (
    <motion.span
      className="skill-chip"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.03, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
    >
      {name}
    </motion.span>
  )
}
import { useEffect, useState } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '../lib/utils'
import styles from './TextGenerateEffect.module.css'

export default function TextGenerateEffect({
  words,
  className,
  textClassName,
  filter   = true,
  duration = 0.5,
  loop = false,
  loopDelay = 3000,
}) {
  const [scope, animate] = useAnimate()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  // Handle both string and array inputs
  const textsArray = Array.isArray(words) ? words : [words]
  const currentWords = textsArray[currentTextIndex]
  const wordsArray = currentWords.split(' ')

  useEffect(() => {
    const playAnimation = async () => {
      // Write effect
      await animate(
        'span',
        { opacity: 1, filter: filter ? 'blur(0px)' : 'none' },
        { duration, delay: stagger(0.12) }
      )

      if (loop) {
        // Wait before erasing
        await new Promise(resolve => setTimeout(resolve, loopDelay))

        // Erase effect
        await animate(
          'span',
          { opacity: 0, filter: filter ? 'blur(8px)' : 'none' },
          { duration: duration * 0.7, delay: stagger(0.08, { from: 'last' }) }
        )

        // Wait for erase to complete smoothly
        await new Promise(resolve => setTimeout(resolve, 800))

        // Move to next text
        setCurrentTextIndex((prev) => (prev + 1) % textsArray.length)

        // Small delay before starting new text animation
        await new Promise(resolve => setTimeout(resolve, 300))

        // Restart loop
        playAnimation()
      }
    }

    playAnimation()
  }, [loop, loopDelay, duration, filter, textsArray.length])

  return (
    <div className={cn(styles.wrapper, className)}>
      <motion.div ref={scope} className={cn(styles.text, textClassName)}>
        {wordsArray.map((word, i) => (
          <motion.span
            key={word + i + currentTextIndex}
            className={styles.word}
            style={{ filter: filter ? 'blur(8px)' : 'none', opacity: 0 }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

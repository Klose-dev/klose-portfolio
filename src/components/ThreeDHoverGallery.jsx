import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './ThreeDHoverGallery.module.css'

const cn = (...classes) => classes.filter(Boolean).join(' ')

const ThreeDHoverGallery = ({
  images = [
    '/images/image%206.jpeg',
    '/images/img.jpeg',
  ],
  itemWidth = 12,
  itemHeight = 20,
  gap = 1.2,
  perspective = 50,
  hoverScale = 15,
  transitionDuration = 1.25,
  backgroundColor = 'transparent',
  grayscaleStrength = 1,
  brightnessLevel = 0.5,
  activeWidth = 45,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3000,
  className,
  style,
  onImageClick,
  onImageHover,
  onImageFocus,
}) => {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const [focusedIndex, setFocusedIndex] = useState(null)
  const autoPlayRef = useRef(null)
  const galleryRef = useRef(null)
  const inView = useInView(galleryRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (autoPlay && images.length > 0) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }

      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? 0 : (prev + 1) % images.length
          return nextIndex
        })
      }, autoPlayDelay)

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }

    if (!autoPlay && autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [autoPlay, autoPlayDelay, images.length])

  const handleImageClick = (index, image) => {
    setActiveIndex(activeIndex === index ? null : index)
    onImageClick?.(index, image)
  }

  const handleImageHover = (index, image) => {
    if (!autoPlay) {
      setActiveIndex(index)
    }
    onImageHover?.(index, image)
  }

  const handleImageLeave = () => {
    if (!autoPlay) {
      setActiveIndex(null)
    }
  }

  const handleImageFocus = (index, image) => {
    setFocusedIndex(index)
    onImageFocus?.(index, image)
  }

  const handleKeyDown = (event, index) => {
    if (!enableKeyboardNavigation) return

    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault()
        handleImageClick(index, images[index])
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : images.length - 1
        const prevEl = containerRef.current?.children[prevIndex]
        prevEl?.focus()
        break
      }
      case 'ArrowRight': {
        event.preventDefault()
        const nextIndex = index < images.length - 1 ? index + 1 : 0
        const nextEl = containerRef.current?.children[nextIndex]
        nextEl?.focus()
        break
      }
      default:
        break
    }
  }

  const getItemStyle = (index) => {
    const isActive = activeIndex === index
    const isFocused = focusedIndex === index
    const baseWidthPx = 10
    const defaultZoom = 1.3

    return {
      width: `calc(${itemWidth}vw + ${baseWidthPx}px)`,
      minWidth: '12rem',
      height: `calc(${itemHeight}vw + ${itemHeight}vh)`,
      minHeight: '18rem',
      backgroundImage: `url(${images[index]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor,
      cursor: 'pointer',
      filter: isActive || isFocused ? 'inherit' : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
      transform: isActive
        ? `perspective(${perspective}px) rotateY(0deg) scale(1) translateZ(0)`
        : `scale(${defaultZoom})`,
      transition: `transform ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.8s ease, width ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
      willChange: 'transform, filter, width',
      zIndex: isActive ? 100 : 'auto',
      margin: isActive ? '0 0.45vw' : '0',
      outline: isFocused ? '2px solid rgba(80,200,120,0.9)' : 'none',
      outlineOffset: '4px',
      borderRadius: '1rem',
      boxShadow: isActive
        ? '0 28px 60px rgba(0,0,0,0.3)'
        : '0 16px 40px rgba(0,0,0,0.18)',
      transformOrigin: 'center center',
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] },
    }),
  }

  return (
    <motion.div
      ref={galleryRef}
      className={cn(styles.galleryWrap, className)}
      style={backgroundColor ? { backgroundColor, ...style } : style}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.galleryViewport}
        ref={containerRef}
        style={{ perspective: `calc(${perspective}vw + ${perspective}vh)`, gap: `${gap}rem` }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={styles.galleryItem}
            style={getItemStyle(index)}
            tabIndex={enableKeyboardNavigation ? 0 : -1}
            onClick={() => handleImageClick(index, image)}
            onMouseEnter={() => handleImageHover(index, image)}
            onMouseLeave={handleImageLeave}
            onFocus={() => handleImageFocus(index, image)}
            onBlur={() => setFocusedIndex(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            aria-label={`Image ${index + 1} of ${images.length}`}
            aria-pressed={activeIndex === index}
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ThreeDHoverGallery

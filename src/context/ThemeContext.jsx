import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

const TRANSITION_STYLES = [
  'fade-scale',
  'rotate-flip',
  'slide-reveal',
  'ripple-wave',
  'particle-burst',
]

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const [transitionStyle, setTransitionStyle] = useState(TRANSITION_STYLES[0])
  const [transitionIndex, setTransitionIndex] = useState(0)

  const toggle = () => {
    setIsDark(prev => !prev)
    const nextIndex = (transitionIndex + 1) % TRANSITION_STYLES.length
    setTransitionIndex(nextIndex)
    setTransitionStyle(TRANSITION_STYLES[nextIndex])
  }

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark)
    document.body.dataset.themeTransition = transitionStyle
  }, [isDark, transitionStyle])

  return (
    <ThemeContext.Provider value={{ isDark, toggle, transitionStyle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

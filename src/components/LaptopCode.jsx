import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const codeLines = [
  'const developer = {',
  '  name: "Akongseh Klose",',
  '  role: "Full-Stack Developer",',
  '  stack: ["React", "Node.js", "Python", "Laravel"],',
  '  focus: "AI-Powered Web Products",',
  '};',
  '',
  'function build(product) {',
  '  return cleanCode(product)',
  '    .withTests()',
  '    .deploy();',
  '}',
  '',
  'build(developer.dreamProject);',
  '// █ Running...',
]

export default function LaptopCode({ inView }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    if (!inView) return

    const typeLine = () => {
      if (lineIndex >= codeLines.length) return

      const line = codeLines[lineIndex]
      if (currentChar < line.length) {
        setCurrentChar(prev => prev + 1)
        setTimeout(typeLine, line.startsWith('  ') ? 15 : 30)
      } else {
        setVisibleLines(prev => prev + 1)
        setLineIndex(prev => prev + 1)
        setCurrentChar(0)
        setTimeout(typeLine, 200)
      }
    }

    const delay = setTimeout(typeLine, 800)
    return () => clearTimeout(delay)
  }, [inView, lineIndex, currentChar])

  return (
    <motion.div
      className="laptop"
      initial={{ opacity: 0, y: 30, rotateY: 15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      animate={{ y: [0, -8, 0] }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {/* Laptop Screen */}
      <div className="laptop-screen">
        <div className="laptop-camera" />
        <div className="laptop-display">
          <div className="terminal-header">
            <div className="traffic-lights">
              <span className="light red" />
              <span className="light yellow" />
              <span className="light green" />
            </div>
            <div className="terminal-title">terminal.tsx</div>
          </div>
          <div className="code-container">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className="code-line"
                initial={{ opacity: 0, x: -20 }}
                animate={visibleLines > i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <span className="line-number">{i + 1}</span>
                <span className="code-text">
                  {visibleLines > i
                    ? line
                    : lineIndex === i
                      ? line.slice(0, currentChar) + '▋'
                      : ''}
                </span>
              </motion.div>
            ))}
            {lineIndex < codeLines.length && (
              <motion.div className="code-line cursor-line">
                <span className="line-number">{lineIndex + 1}</span>
                <span className="code-text">
                  {codeLines[lineIndex]?.slice(0, currentChar)}▋
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Laptop Base */}
      <div className="laptop-base">
        <div className="keyboard">
          <div className="key-row">
            {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map(k => (
              <span key={k} className="key">{k}</span>
            ))}
          </div>
          <div className="key-row">
            {['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map(k => (
              <span key={k} className="key">{k.length > 1 ? k : k}</span>
            ))}
          </div>
          <div className="key-row">
            {['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'].map(k => (
              <span key={k} className="key">{k}</span>
            ))}
          </div>
          <div className="key-row">
            {['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'].map(k => (
              <span key={k} className="key">{k}</span>
            ))}
          </div>
          <div className="key-row space-row">
            <span className="key space" />
          </div>
        </div>
        <div className="trackpad" />
      </div>
    </motion.div>
  )
}
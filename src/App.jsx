import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import WhatsappFloatingButton from './components/WhatsappFloatingButton'
import Loader from './components/Loader'
import ThemeTransitionOverlay from './components/ThemeTransitionOverlay'

const Experience = lazy(() => import('./components/Experience'))
const TechStackConvergence = lazy(() => import('./components/TechStackConvergence'))
const CaseStudy = lazy(() => import('./components/CaseStudy'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))
const ParticleShowcase = lazy(() => import('./components/ParticleShowcase'))
const FAQ = lazy(() => import('./components/FAQ'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const finishLoading = () => {
      window.setTimeout(() => setIsLoading(false), 450)
    }

    if (document.readyState === 'complete') {
      finishLoading()
      return
    }

    window.addEventListener('load', finishLoading)
    return () => window.removeEventListener('load', finishLoading)
  }, [])

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <>
            <ThemeTransitionOverlay />
            <Header />
            <main>
              <Hero />
              <About />
              <Suspense fallback={null}>
                <Experience />
              </Suspense>
              <Services />
              <Skills />
              <Suspense fallback={null}>
                <TechStackConvergence />
              </Suspense>
              <Suspense fallback={null}>
                <CaseStudy />
              </Suspense>
              <Suspense fallback={null}>
                <Portfolio />
              </Suspense>
              <Suspense fallback={null}>
                <Testimonials />
              </Suspense>
              <Suspense fallback={null}>
                <FAQ />
              </Suspense>
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
              <Suspense fallback={null}>
                <ParticleShowcase />
              </Suspense>
            </main>
            <WhatsappFloatingButton />
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </>
        )}
        </AnimatePresence>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App

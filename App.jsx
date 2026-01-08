import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustIndicators from './components/TrustIndicators'
import Capabilities from './components/Capabilities'
import Industries from './components/Industries'
import SupplyChain from './components/SupplyChain'
import Footer from './components/Footer'
import ScrollReveal from './components/ScrollReveal'

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-brand-navy text-white">
      <Header />
      
      <main>
        <Hero />
        <TrustIndicators />
        <Capabilities />
        <Industries />
        <SupplyChain />
      </main>

      <Footer />

      {/* Scroll Reveal Observer */}
      <ScrollReveal />
    </div>
  )
}

export default App

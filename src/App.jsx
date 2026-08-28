import Navbar from './components/Navbar/Navbar'
import Galaxy from './components/Galaxy/Galaxy'
import GiveawayHero from './components/GiveawayHero/GiveawayHero'
import GiveawayStats from './components/GiveawayStats/GiveawayStats'
import FeaturedGiveaways from './components/FeaturedGiveaways/FeaturedGiveaways'
import HowItWorks from './components/HowItWorks/HowItWorks'
import GiveawayRules from './components/GiveawayRules/GiveawayRules'
import Winners from './components/Winners/Winners'
import WinnerSlider from './components/WinnerSlider/WinnerSlider'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app-shell">
      <div className="galaxy-background" aria-hidden="true">
        <Galaxy
          starSpeed={0.5}
          density={1}
          hueShift={140}
          speed={1}
          glowIntensity={0.3}
          saturation={0}
          mouseRepulsion
          mouseInteraction
          repulsionStrength={2}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          transparent
        />
      </div>

      <div className="app-content">
      <Navbar />

      <main>
        <GiveawayHero />
        <GiveawayStats />
        <FeaturedGiveaways />
        <HowItWorks />
        <GiveawayRules />
        <Winners />
        <WinnerSlider />
        <FAQ />
      </main>

      <Footer />
      </div>
    </div>
  )
}

export default App
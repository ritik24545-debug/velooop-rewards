import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import GiveawayDetails from './pages/GiveawayDetails/GiveawayDetails'
import Signup from './pages/Signup/Signup'
import ErrorState from './components/ErrorState/ErrorState'
import { clearAuthSession, getAuthenticatedUser, getAuthToken } from './services/api'

const loggedOutUser = {
  loggedIn: false,
  userId: null,
  name: '',
  email: '',
  balances: { VEs: 0, SVEs: 0, Tokens: 0 },
  participations: [],
  winnerProfile: null,
}

function HomePage() {
  return (
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
  )
}

function NotFoundPage() {
  return (
    <main>
      <ErrorState
        title="Giveaway not found."
        message="The giveaway you’re looking for isn’t available or may have moved."
      />
    </main>
  )
}

function App() {
  const [user, setUser] = useState(loggedOutUser)

  useEffect(() => {
    const token = getAuthToken()

    if (!token) {
      return undefined
    }

    let isActive = true

    getAuthenticatedUser(token)
      .then((response) => {
        if (!isActive || !response?.data?.user) {
          return
        }

        setUser((previousUser) => ({
          ...previousUser,
          ...response.data.user,
          loggedIn: true,
        }))
      })
      .catch(() => {
        clearAuthSession()
        if (isActive) {
          setUser(loggedOutUser)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <BrowserRouter>
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
          <Navbar user={user} setUser={setUser} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/giveaway/:slug"
              element={<GiveawayDetails user={user} setUser={setUser} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
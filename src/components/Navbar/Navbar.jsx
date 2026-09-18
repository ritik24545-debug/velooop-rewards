import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  FaBars,
  FaTimes,
  FaGift,
  FaTrophy,
  FaUser,
} from 'react-icons/fa'
import { clearAuthSession, loginUser, storeAuthSession } from '../../services/api'
import styles from './Navbar.module.css'

function Navbar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openSignIn = () => {
    closeMenu()
    setIsAccountMenuOpen(false)
    setLoginError('')
    setIsSignInOpen(true)
  }

  const toggleAccountMenu = () => {
    closeMenu()
    setIsAccountMenuOpen((previousIsOpen) => !previousIsOpen)
  }

  const closeSignIn = () => {
    setIsSignInOpen(false)
  }

  const handleLogout = () => {
    clearAuthSession()
    setUser((previousUser) => ({
      ...previousUser,
      loggedIn: false,
      userId: null,
      name: '',
      email: '',
      balances: { VEs: 0, SVEs: 0, Tokens: 0 },
      participations: [],
      winnerProfile: null,
    }))
    setIsAccountMenuOpen(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previousFormData) => ({ ...previousFormData, [name]: value }))
    setLoginError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = formData.email.trim().toLowerCase()

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setLoginError('Please enter a valid email address.')
      return
    }

    if (!formData.password) {
      setLoginError('Please enter your password.')
      return
    }

    setIsLoading(true)
    setLoginError('')

    try {
      const response = await loginUser({ email, password: formData.password })
      const session = response?.data

      if (!session?.token || !session.user) {
        throw new Error('Login response was incomplete')
      }

      storeAuthSession(session)
      setUser((previousUser) => ({
        ...previousUser,
        ...session.user,
        loggedIn: true,
      }))
      setFormData({ email: '', password: '' })
      closeSignIn()
    } catch (error) {
      if (error.statusCode === 401) {
        setLoginError('The email or password is incorrect.')
      } else if (error.statusCode === 400) {
        setLoginError('Please check your email and password and try again.')
      } else if (error.statusCode >= 500) {
        setLoginError('The service is unavailable right now. Please try again later.')
      } else if (error.statusCode === 0) {
        setLoginError('Unable to reach the service. Please check that the backend is running.')
      } else {
        setLoginError('We could not sign you in. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isSignInOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSignIn()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSignInOpen])

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return undefined
    }

    const handleDocumentMouseDown = (event) => {
      if (!event.target.closest(`.${styles.accountMenu}`)) {
        setIsAccountMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentMouseDown)
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown)
  }, [isAccountMenuOpen])

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoMark}>
            <FaGift size={18} />
          </span>

          <span className={styles.logoText}>
            VELOOP<span>Rewards</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <a href="#featured-giveaways">Giveaways</a>
          <a href="#winners">Winners</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <a href="#giveaways" className={styles.giveawayButton}>
            <FaGift size={14} />
            Browse Giveaways
          </a>

          {user?.loggedIn ? (
            <div className={styles.accountMenu}>
              <button className={styles.profileButton} type="button" onClick={toggleAccountMenu}>
                <FaUser size={14} />
                <span>Profile</span>
              </button>
              {isAccountMenuOpen && <AccountMenu user={user} onLogout={handleLogout} />}
            </div>
          ) : (
            <button className={styles.profileButton} type="button" onClick={openSignIn}>
              <FaUser size={14} />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuButton}
          type="button"
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <FaTimes size={20} />
          ) : (
            <FaBars size={20} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          <a href="#featured-giveaways" onClick={closeMenu}>
            <FaGift size={15} />
            Giveaways
          </a>

          <a href="#winners" onClick={closeMenu}>
            <FaTrophy size={15} />
            Winners
          </a>

          <a href="#how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <a href="#faq" onClick={closeMenu}>
            FAQ
          </a>

          <div className={styles.mobileActions}>
            <a href="#giveaways" className={styles.giveawayButton}>
              <FaGift size={14} />
              Browse Giveaways
            </a>

            {user?.loggedIn ? (
              <div className={styles.accountMenu}>
                <button className={styles.profileButton} type="button" onClick={toggleAccountMenu}>
                  <FaUser size={14} />
                  Profile
                </button>
                {isAccountMenuOpen && <AccountMenu user={user} onLogout={handleLogout} />}
              </div>
            ) : (
              <button className={styles.profileButton} type="button" onClick={openSignIn}>
                <FaUser size={14} />
                Sign In
              </button>
            )}
          </div>
        </nav>
      )}

      {isSignInOpen && createPortal((
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSignIn()
            }
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-in-title"
          >
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalEyebrow}>VELOOP REWARDS</span>
                <h2 id="sign-in-title">Welcome Back</h2>
              </div>

              <button
                className={styles.closeButton}
                type="button"
                aria-label="Close sign in dialog"
                onClick={closeSignIn}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <form
              className={styles.signInForm}
              onSubmit={handleSubmit}
            >
              {loginError && <div className={styles.errorMessage} role="alert">{loginError}</div>}
              <label htmlFor="sign-in-email">Email</label>
              <input
                id="sign-in-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                autoFocus
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                aria-invalid={!!loginError}
              />

              <label htmlFor="sign-in-password">Password</label>
              <input
                id="sign-in-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                aria-invalid={!!loginError}
              />

              <button className={styles.submitButton} type="submit" disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              <Link className={styles.createAccount} to="/signup" onClick={closeSignIn}>
                Don&apos;t have an account? Create one
              </Link>
            </form>
          </div>
        </div>
      ), document.body)}
    </header>
  )
}

export default Navbar

function AccountMenu({ user, onLogout }) {
  return (
    <div className={styles.accountDropdown} role="menu">
      <strong>{user.name || 'VELOOP member'}</strong>
      <span>{user.email || 'Authenticated account'}</span>
      <button type="button" className={styles.logoutButton} onClick={onLogout} role="menuitem">
        Log out
      </button>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  FaBars,
  FaTimes,
  FaGift,
  FaTrophy,
  FaUser,
} from 'react-icons/fa'
import styles from './Navbar.module.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const openSignIn = () => {
    closeMenu()
    setIsSignInOpen(true)
  }

  const closeSignIn = () => {
    setIsSignInOpen(false)
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

          <button
            className={styles.profileButton}
            type="button"
            onClick={openSignIn}
          >
            <FaUser size={14} />
            <span>Sign In</span>
          </button>
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

            <button
              className={styles.profileButton}
              type="button"
              onClick={openSignIn}
            >
              <FaUser size={14} />
              Sign In
            </button>
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
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="sign-in-email">Email</label>
              <input
                id="sign-in-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                autoFocus
              />

              <label htmlFor="sign-in-password">Password</label>
              <input
                id="sign-in-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button className={styles.submitButton} type="submit">
                Sign In
              </button>

              <button className={styles.createAccount} type="button">
                Don&apos;t have an account? Create one
              </button>
            </form>
          </div>
        </div>
      ), document.body)}
    </header>
  )
}

export default Navbar
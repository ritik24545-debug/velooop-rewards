import { useEffect, useState } from 'react'
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrophy,
} from 'react-icons/fa'
import { winnerAnnouncements } from '../../data/giveawayData'
import styles from './WinnerSlider.module.css'

function WinnerSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      return undefined
    }

    const rotation = window.setInterval(() => {
      setActiveIndex((currentIndex) => (
        (currentIndex + 1) % winnerAnnouncements.length
      ))
    }, 4500)

    return () => window.clearInterval(rotation)
  }, [isPaused])

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (
      (currentIndex - 1 + winnerAnnouncements.length) % winnerAnnouncements.length
    ))
  }

  const showNext = () => {
    setActiveIndex((currentIndex) => (
      (currentIndex + 1) % winnerAnnouncements.length
    ))
  }

  const activeWinner = winnerAnnouncements[activeIndex]

  return (
    <section className={styles.section} aria-labelledby="winner-slider-title">
      <div className={styles.container}>
        <div className={styles.slider}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>WINNER ANNOUNCEMENTS</span>
            <h2 id="winner-slider-title">Rewards worth celebrating.</h2>
            <span className={styles.demoLabel}>Demo feed</span>
          </div>

          <div
            className={styles.announcement}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false)
              }
            }}
          >
            <div
              className={styles.message}
              key={activeWinner.maskedUserId}
              aria-live="polite"
            >
              <div className={styles.icon} aria-hidden="true">
                <FaTrophy />
              </div>
              <p>
                <strong>{activeWinner.maskedUserId}</strong>
                <span>was rewarded with</span>
                <strong>{activeWinner.prize}</strong>
              </p>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                aria-label="Previous winner announcement"
                onClick={showPrevious}
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <span className={styles.counter}>
                {activeIndex + 1} / {winnerAnnouncements.length}
              </span>
              <button
                type="button"
                aria-label="Next winner announcement"
                onClick={showNext}
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WinnerSlider

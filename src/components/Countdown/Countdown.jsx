import { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import LoadingState from '../LoadingState/LoadingState'
import styles from './Countdown.module.css'

const activeStatuses = new Set(['ACTIVE', 'UPCOMING'])

function calculateTimeLeft(status, startAt, endAt, currentTime) {
  const targetAt = status === 'UPCOMING' ? startAt : endAt
  const targetTime = Date.parse(targetAt ?? '')

  if (!activeStatuses.has(status) || Number.isNaN(targetTime)) {
    return null
  }

  const difference = targetTime - currentTime

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function Countdown({ status, startAt, endAt, dataState = 'success' }) {
  const [currentTime, setCurrentTime] = useState(() => Date.now())

  useEffect(() => {
    if (dataState === 'loading' || !activeStatuses.has(status)) {
      return undefined
    }

    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [dataState, status, startAt, endAt])

  const timeLeft = calculateTimeLeft(status, startAt, endAt, currentTime)

  if (dataState === 'loading') {
    return <LoadingState label="Loading giveaway timing..." />
  }

  if (status === 'ENDED') {
    return (
      <div className={styles.expired} role="status">
        <FaClock aria-hidden="true" />
        Giveaway ended
      </div>
    )
  }

  if (!timeLeft) {
    return (
      <div className={styles.expired} role="status">
        <FaClock aria-hidden="true" />
        Giveaway timing unavailable.
      </div>
    )
  }

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  if (isExpired) {
    return (
      <div className={styles.expired} role="status">
        <FaClock aria-hidden="true" />
        {status === 'UPCOMING' ? 'Starting soon' : 'Giveaway ended'}
      </div>
    )
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownHeader}>
        <span>
          <FaClock aria-hidden="true" />
          {status === 'UPCOMING' ? 'Starts in' : 'Ends in'}
        </span>
      </div>

      <div className={styles.units}>
        <div>
          <strong>{String(timeLeft.days).padStart(2, '0')}</strong>
          <span>Days</span>
        </div>

        <b>:</b>

        <div>
          <strong>{String(timeLeft.hours).padStart(2, '0')}</strong>
          <span>Hrs</span>
        </div>

        <b>:</b>

        <div>
          <strong>{String(timeLeft.minutes).padStart(2, '0')}</strong>
          <span>Min</span>
        </div>

        <b>:</b>

        <div>
          <strong>{String(timeLeft.seconds).padStart(2, '0')}</strong>
          <span>Sec</span>
        </div>
      </div>
    </div>
  )
}

export default Countdown
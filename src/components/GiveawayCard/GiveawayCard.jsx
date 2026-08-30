import {
  FaArrowRight,
  FaClock,
  FaUsers,
  FaTrophy,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Countdown from '../Countdown/Countdown'
import { mockDataStates } from '../../data/mockDataStates'
import styles from './GiveawayCard.module.css'

const statusPresentation = {
  ACTIVE: {
    label: 'Live Now',
    badgeClass: styles.active,
    metaLabel: 'Giveaway is live',
    actionLabel: 'Enter Now',
  },
  UPCOMING: {
    label: 'Coming Soon',
    badgeClass: styles.upcoming,
    metaLabel: 'Starts soon',
    actionLabel: 'Coming Soon',
  },
  ENDED: {
    label: 'Ended',
    badgeClass: styles.ended,
    metaLabel: 'Giveaway has ended',
    actionLabel: 'View Winners',
  },
}

function GiveawayCard({ giveaway }) {
  const presentation = statusPresentation[giveaway.status]
    ?? statusPresentation.ENDED
  const isActive = giveaway.status === 'ACTIVE'

  const progress = Math.min(
    (giveaway.participants / giveaway.maxEntries) * 100,
    100
  )

  return (
    <article className={styles.card}>
      <div className={styles.imageArea}>
        <div className={styles.imageFrame}>
          <img
            className={styles.prizeImage}
            src={giveaway.image}
            alt={`${giveaway.title} prize`}
          />
        </div>

        <div className={styles.status}>
          <span className={presentation.badgeClass}>
            {presentation.label}
          </span>
        </div>

        {giveaway.featured && (
          <div className={styles.featured}>
            Featured
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>
          {giveaway.category}
        </span>

        <h3>{giveaway.title}</h3>

        <p>{giveaway.description}</p>

        <div className={styles.prizeRow}>
          <div>
            <span>Prize Value</span>
            <strong>{giveaway.prizeValue}</strong>
          </div>

          <div>
            <span>Winners</span>
            <strong>
              <FaTrophy />
              {giveaway.winners}
            </strong>
          </div>
        </div>

        <div className={styles.meta}>
          <div>
            <FaUsers />
            <span>
              {giveaway.participants.toLocaleString()} participants
            </span>
          </div>

          <div>
            <FaClock />
            <span>
              {presentation.metaLabel}
            </span>
          </div>
        </div>

        {isActive && (
          <div className={styles.progressSection}>
            <div className={styles.progressInfo}>
              <span>Entry progress</span>
              <strong>{Math.round(progress)}%</strong>
            </div>

            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className={styles.entryCount}>
              {giveaway.participants.toLocaleString()} /{' '}
              {giveaway.maxEntries.toLocaleString()} entries
            </span>
          </div>
        )}

        <Countdown
          status={giveaway.status}
          startAt={giveaway.startAt}
          endAt={giveaway.endAt}
          dataState={mockDataStates.countdown}
        />

        <div className={styles.footer}>
          <div className={styles.entry}>
            <span>Entry</span>
            <strong>
              {giveaway.entryFee} {giveaway.currency}
            </strong>
          </div>

          <Link
            to={`/giveaway/${giveaway.slug}`}
            className={styles.joinButton}
            aria-disabled={giveaway.status === 'UPCOMING'}
          >
            {presentation.actionLabel}
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default GiveawayCard
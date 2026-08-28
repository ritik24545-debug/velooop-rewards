import { useState } from 'react'
import { FaGift, FaUsers, FaTrophy } from 'react-icons/fa'
import { giveawayStats } from '../../data/giveawayData'
import { mockDataStates } from '../../data/mockDataStates'
import ErrorState from '../ErrorState/ErrorState'
import styles from './GiveawayStats.module.css'

function GiveawayStats() {
  const [dataState, setDataState] = useState(mockDataStates.statistics)
  const stats = [
    {
      icon: FaGift,
      value: giveawayStats.totalGiveaways,
      label: 'Active Giveaways',
    },
    {
      icon: FaUsers,
      value: giveawayStats.participants,
      label: 'Community Members',
    },
    {
      icon: FaTrophy,
      value: giveawayStats.prizesWon,
      label: 'Prizes Won',
    },
  ]

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        {dataState === 'loading' && Array.from({ length: 3 }, (_, index) => (
          <div className={styles.stat} key={`stat-skeleton-${index}`} aria-label="Loading statistic" aria-busy="true">
            <div className={`${styles.icon} ${styles.skeletonBlock}`} />
            <div className={styles.info}>
              <div className={styles.skeletonValue} />
              <div className={styles.skeletonLabel} />
            </div>
          </div>
        ))}
        {dataState === 'error' && (
          <ErrorState
            className={styles.state}
            onRetry={() => setDataState('success')}
          />
        )}
        {dataState === 'empty' && (
          <div className={styles.emptyStats}>
            No statistics available right now.
          </div>
        )}
        {dataState === 'success' && stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div className={styles.stat} key={stat.label}>
              <div className={styles.icon}>
                <Icon />
              </div>

              <div className={styles.info}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default GiveawayStats
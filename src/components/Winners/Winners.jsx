import {
  FaGift,
  FaTrophy,
  FaUsers,
} from 'react-icons/fa'
import { giveawayStats } from '../../data/giveawayData'
import WinnersTabs from '../WinnersTabs/WinnersTabs'
import styles from './Winners.module.css'

const trustStats = [
  {
    icon: FaTrophy,
    value: giveawayStats.prizesWon,
    label: 'Prizes Won',
  },
  {
    icon: FaUsers,
    value: giveawayStats.participants,
    label: 'Community Members',
  },
  {
    icon: FaGift,
    value: giveawayStats.totalGiveaways,
    label: 'Active Giveaways',
  },
]

function Winners() {
  return (
    <section className={styles.section} id="winners">
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>RECENT WINNERS</span>
            <h2>Celebrating members who turned their entries into rewards.</h2>
          </div>
          <span className={styles.demoLabel}>Demo examples</span>
        </div>

        <WinnersTabs />

        <div className={styles.trustBar} aria-label="VELOOP Rewards community statistics">
          {trustStats.map((stat) => {
            const Icon = stat.icon

            return (
              <div className={styles.trustStat} key={stat.label}>
                <Icon aria-hidden="true" />
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Winners

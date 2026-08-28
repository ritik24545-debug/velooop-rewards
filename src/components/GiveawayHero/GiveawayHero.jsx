import {
  FaArrowRight,
  FaBolt,
  FaGift,
  FaMobileAlt,
  FaShieldAlt,
} from 'react-icons/fa'
import { featuredGiveaways } from '../../data/giveawayData'
import styles from './GiveawayHero.module.css'

const statusLabels = {
  ACTIVE: 'Active',
  UPCOMING: 'Coming Soon',
  ENDED: 'Ended',
}

function GiveawayHero() {
  const featuredGiveaway = featuredGiveaways[0]
  const heroStatus = statusLabels[featuredGiveaway.status] ?? 'Status unavailable'

  return (
    <section className={styles.hero} id="giveaways">
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Status */}
          <div className={styles.status}>
            <span className={styles.statusDot} />
            {heroStatus.toUpperCase()} GIVEAWAY
          </div>

          {/* Main Heading */}
          <h1 className={styles.title}>
            Something valuable
            <span> could be yours.</span>
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Complete eligible activities, collect entries and get a chance
            to win exciting rewards through VELOOP Rewards.
          </p>

          {/* CTA */}
          <div className={styles.actions}>
            <a href="#featured-giveaways" className={styles.primaryButton}>
              Join Giveaway
              <FaArrowRight />
            </a>

            <a href="#how-it-works" className={styles.secondaryButton}>
              How It Works
            </a>
          </div>

          {/* Trust indicators */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <FaShieldAlt />
              <span>Transparent Rules</span>
            </div>

            <div className={styles.trustDivider} />

            <div className={styles.trustItem}>
              <FaBolt />
              <span>Fair Participation</span>
            </div>
          </div>
        </div>

        {/* Reward Visual */}
        <div className={styles.visual}>
          <div className={styles.visualGlow} />

          <div className={styles.rewardCard}>
            <div className={styles.rewardTop}>
              <div className={styles.rewardBadge}>
                <FaGift />
                Exclusive
              </div>

              <span className={styles.rewardStatus}>
                {heroStatus}
              </span>
            </div>

            <div className={styles.productVisual}>
              <div className={styles.productShadow} />

              <div className={styles.phone}>
                <div className={styles.phoneScreen}>
                  <div className={styles.screenCamera} />

                  <div className={styles.screenContent}>
                    <span>VELOOP</span>
                    <strong>15</strong>
                    <small>PRO</small>
                  </div>
                </div>
              </div>

              <div className={styles.floatingIcon}>
                <FaGift />
              </div>
            </div>

            <div className={styles.rewardInfo}>
              <span>Featured Reward</span>
              <h2>iPhone 15 Pro</h2>
              <p>One lucky participant will win.</p>
            </div>

            <div className={styles.rewardFooter}>
              <div>
                <span>Entry From</span>
                <strong>50 VEs</strong>
              </div>

              <div className={styles.mobileIcon}>
                <FaMobileAlt />
              </div>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.cardOne}`}>
            <span>Participants</span>
            <strong>2,847+</strong>
          </div>

          <div className={`${styles.floatingCard} ${styles.cardTwo}`}>
            <span>Prize Value</span>
            <strong>Premium</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiveawayHero
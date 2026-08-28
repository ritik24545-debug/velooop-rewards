import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { featuredGiveaways } from '../../data/giveawayData'
import { mockDataStates } from '../../data/mockDataStates'
import GiveawayCard from '../GiveawayCard/GiveawayCard'
import GiveawayCardSkeleton from '../GiveawayCard/GiveawayCardSkeleton'
import EmptyState from '../EmptyState/EmptyState'
import ErrorState from '../ErrorState/ErrorState'
import styles from './FeaturedGiveaways.module.css'

function FeaturedGiveaways() {
  const [dataState, setDataState] = useState(mockDataStates.featuredGiveaways)
  const giveaways = featuredGiveaways.filter((giveaway) => giveaway.featured)

  const renderContent = () => {
    if (dataState === 'loading') {
      return Array.from({ length: 2 }, (_, index) => (
        <GiveawayCardSkeleton key={`giveaway-skeleton-${index}`} />
      ))
    }

    if (dataState === 'error') {
      return (
        <ErrorState
          className={styles.state}
          onRetry={() => setDataState('success')}
        />
      )
    }

    if (dataState === 'empty' || giveaways.length === 0) {
      return (
        <EmptyState
          className={styles.state}
          title="No active giveaways right now."
          message="Check back soon for new rewards."
        />
      )
    }

    return giveaways.map((giveaway) => (
      <GiveawayCard
        giveaway={giveaway}
        key={giveaway.id}
      />
    ))
  }

  return (
    <section className={styles.section} id="featured-giveaways">
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>EXPLORE REWARDS</span>

            <h2>Featured Giveaways</h2>

            <p>
              Discover the rewards currently available in the VELOOP
              community.
            </p>
          </div>

          <a href="#featured-giveaways" className={styles.viewAll}>
            View All
            <FaArrowRight />
          </a>
        </div>

        <div className={styles.grid}>
          {renderContent()}
        </div>
      </div>
    </section>
  )
}

export default FeaturedGiveaways
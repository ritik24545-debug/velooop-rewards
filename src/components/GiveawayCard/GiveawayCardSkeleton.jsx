import styles from './GiveawayCard.module.css'

function GiveawayCardSkeleton() {
  return (
    <article className={`${styles.card} ${styles.skeletonCard}`} aria-label="Loading giveaway" aria-busy="true">
      <div className={styles.imageArea}>
        <div className={styles.skeletonBlock} />
      </div>
      <div className={styles.body}>
        <div className={`${styles.skeletonLine} ${styles.skeletonCategory}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonTextShort}`} />
        <div className={styles.skeletonStats} />
        <div className={styles.skeletonCountdown} />
        <div className={styles.skeletonFooter} />
      </div>
    </article>
  )
}

export default GiveawayCardSkeleton

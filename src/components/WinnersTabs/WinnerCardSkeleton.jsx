import styles from './WinnersTabs.module.css'

function WinnerCardSkeleton() {
  return (
    <article className={`${styles.winnerCard} ${styles.skeletonCard}`} aria-label="Loading winner" aria-busy="true">
      <div className={styles.cardHeader}>
        <div className={styles.skeletonAvatar} />
        <div className={styles.skeletonStatus} />
      </div>
      <div className={styles.winnerInfo}>
        <div className={styles.skeletonLine} />
        <div className={`${styles.skeletonLine} ${styles.skeletonPrize}`} />
        <div className={`${styles.skeletonLine} ${styles.skeletonCategory}`} />
      </div>
    </article>
  )
}

export default WinnerCardSkeleton

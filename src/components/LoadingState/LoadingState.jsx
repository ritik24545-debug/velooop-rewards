import styles from './LoadingState.module.css'

function LoadingState({ label = 'Loading...', className = '' }) {
  return (
    <div className={`${styles.loading} ${className}`} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default LoadingState

import styles from './EmptyState.module.css'

function EmptyState({ title, message, className = '' }) {
  return (
    <div className={`${styles.empty} ${className}`} role="status">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}

export default EmptyState

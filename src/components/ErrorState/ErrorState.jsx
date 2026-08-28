import styles from './ErrorState.module.css'

function ErrorState({
  title = 'Something went wrong.',
  message = "We couldn't load the information right now. Please try again.",
  onRetry,
  className = '',
}) {
  return (
    <div className={`${styles.error} ${className}`} role="alert">
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorState

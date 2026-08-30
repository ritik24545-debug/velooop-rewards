import styles from './JoinConfirmationModal.module.css'

function JoinConfirmationModal({
  isOpen,
  isLoginRequired,
  isJoining,
  onClose,
  onConfirm,
  giveaway,
  balance,
  afterBalance,
}) {
  if (!isOpen || !giveaway) {
    return null
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-confirmation-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="join-confirmation-title">
            {isLoginRequired ? 'Login required' : 'Confirm your entry'}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>

        {isLoginRequired ? (
          <div className={styles.loginPanel}>
            <p>
              You need to be logged in to participate in this giveaway.
            </p>
            <button type="button" className={styles.primaryAction} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.summaryCard}>
              <span className={styles.label}>Prize</span>
              <strong>{giveaway.title}</strong>
            </div>

            <div className={styles.summaryGrid}>
              <div>
                <span className={styles.label}>Entry Fee</span>
                <strong>
                  {giveaway.entryFee} {giveaway.currency}
                </strong>
              </div>

              <div>
                <span className={styles.label}>Current Balance</span>
                <strong>
                  {balance} {giveaway.currency}
                </strong>
              </div>

              <div>
                <span className={styles.label}>After Joining</span>
                <strong>
                  {afterBalance} {giveaway.currency}
                </strong>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.secondaryAction} onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.primaryAction}
                onClick={onConfirm}
                disabled={isJoining}
              >
                {isJoining ? 'Joining Giveaway...' : 'Confirm & Join'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default JoinConfirmationModal

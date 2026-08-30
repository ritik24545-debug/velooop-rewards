import styles from './BalanceSummary.module.css'

function BalanceSummary({ balance, entryFee, afterBalance, currency }) {
  return (
    <div className={styles.summary} aria-live="polite">
      <div className={styles.row}>
        <span>Your Balance</span>
        <strong>
          {balance} {currency}
        </strong>
      </div>

      <div className={styles.row}>
        <span>Entry Fee</span>
        <strong>
          {entryFee} {currency}
        </strong>
      </div>

      <div className={styles.row}>
        <span>Balance After Joining</span>
        <strong>
          {afterBalance} {currency}
        </strong>
      </div>
    </div>
  )
}

export default BalanceSummary

import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaTrophy,
  FaUsers,
  FaWallet,
} from 'react-icons/fa'
import BalanceSummary from '../../components/BalanceSummary/BalanceSummary'
import Countdown from '../../components/Countdown/Countdown'
import EmptyState from '../../components/EmptyState/EmptyState'
import GiveawayRules from '../../components/GiveawayRules/GiveawayRules'
import JoinConfirmationModal from '../../components/JoinConfirmationModal/JoinConfirmationModal'
import { featuredGiveaways } from '../../data/giveawayData'
import styles from './GiveawayDetails.module.css'

const statusPresentation = {
  ACTIVE: {
    label: 'Active',
    toneClass: styles.activeBadge,
  },
  UPCOMING: {
    label: 'Upcoming',
    toneClass: styles.upcomingBadge,
  },
  ENDED: {
    label: 'Ended',
    toneClass: styles.endedBadge,
  },
}

function getBalanceForCurrency(user, currency) {
  if (!user?.balances || !currency) {
    return 0
  }

  return user.balances[currency] ?? 0
}

function GiveawayDetails({ user, setUser }) {
  const { slug } = useParams()

  const giveaway = useMemo(
    () => featuredGiveaways.find((item) => item.slug === slug) ?? null,
    [slug]
  )

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isLoginRequired, setIsLoginRequired] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!slug || !giveaway) {
    return (
      <main className={styles.pageShell}>
        <EmptyState
          title="Giveaway not found."
          message="This giveaway may have expired or the link is invalid."
          className={styles.emptyFallback}
        />
      </main>
    )
  }

  const presentation = statusPresentation[giveaway.status] ?? statusPresentation.ENDED
  const balance = getBalanceForCurrency(user, giveaway.currency)
  const afterBalance = balance - giveaway.entryFee
  const isAlreadyJoined = user.participations.includes(giveaway.slug)
  const isInsufficientBalance = user.loggedIn && balance < giveaway.entryFee
  const showJoinButton = giveaway.status === 'ACTIVE' && !isAlreadyJoined && !showSuccess
  const showStatusAction = giveaway.status === 'UPCOMING' || giveaway.status === 'ENDED'

  const handleJoinAttempt = () => {
    if (!user.loggedIn) {
      setIsLoginRequired(true)
      setIsConfirmationOpen(true)
      return
    }

    if (giveaway.status !== 'ACTIVE') {
      return
    }

    if (isAlreadyJoined) {
      return
    }

    setIsConfirmationOpen(true)
  }

  const handleConfirmJoin = () => {
    if (!user.loggedIn || giveaway.status !== 'ACTIVE') {
      return
    }

    setIsJoining(true)

    window.setTimeout(() => {
      setUser((previousUser) => ({
        ...previousUser,
        balances: {
          ...previousUser.balances,
          [giveaway.currency]: previousUser.balances[giveaway.currency] - giveaway.entryFee,
        },
        participations: [...previousUser.participations, giveaway.slug],
      }))

      setIsJoining(false)
      setIsConfirmationOpen(false)
      setShowSuccess(true)
    }, 900)
  }

  const toggleDemoLogin = () => {
    setUser((previousUser) => ({
      ...previousUser,
      loggedIn: !previousUser.loggedIn,
    }))
  }

  return (
    <main className={styles.pageShell}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.backLink}>
            <FaArrowLeft />
            Back to giveaways
          </Link>

          <button type="button" className={styles.demoToggle} onClick={toggleDemoLogin}>
            {user.loggedIn ? 'Demo: Logged In' : 'Demo: Logged Out'}
          </button>
        </div>

        {showSuccess && (
          <section className={styles.successBanner} aria-live="polite">
            <div className={styles.successIcon} aria-hidden="true">
              <FaCheckCircle />
            </div>

            <div>
              <h2>You&apos;re In!</h2>
              <p>
                Your participation has been successfully recorded for {giveaway.title}.
              </p>
              <div className={styles.successMeta}>
                <span>{giveaway.title}</span>
                <span>{giveaway.entryFee} {giveaway.currency}</span>
              </div>
            </div>

            <Link to="/" className={styles.successButton}>
              View Giveaway
            </Link>
          </section>
        )}

        <article className={styles.layout}>
          <div className={styles.imagePanel}>
            <div className={styles.imageWrap}>
              <img
                src={giveaway.image}
                alt={`${giveaway.title} prize`}
                className={styles.prizeImage}
              />
            </div>

            <div className={styles.badgeRow}>
              <span className={`${styles.badge} ${presentation.toneClass}`}>
                {presentation.label}
              </span>
              <span className={styles.categoryBadge}>{giveaway.category}</span>
            </div>
          </div>

          <div className={styles.contentPanel}>
            <div className={styles.headerBlock}>
              <span className={styles.eyebrow}>VELOOP Rewards</span>
              <h1>{giveaway.title}</h1>
              <p>{giveaway.description}</p>
            </div>

            <div className={styles.metricRow}>
              <div>
                <FaUsers />
                <span>{giveaway.participants.toLocaleString()} participants</span>
              </div>

              <div>
                <FaTrophy />
                <span>{giveaway.winners} winner{giveaway.winners > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span>Status</span>
                <strong>{presentation.label}</strong>
              </div>

              <div className={styles.detailItem}>
                <span>Prize Value</span>
                <strong>{giveaway.prizeValue}</strong>
              </div>

              <div className={styles.detailItem}>
                <span>Entry Fee</span>
                <strong>
                  {giveaway.entryFee} {giveaway.currency}
                </strong>
              </div>

              <div className={styles.detailItem}>
                <span>Eligibility</span>
                <strong>{giveaway.eligibilitySummary}</strong>
              </div>
            </div>

            <div className={styles.countdownWrap}>
              <Countdown
                status={giveaway.status}
                startAt={giveaway.startAt}
                endAt={giveaway.endAt}
              />
            </div>

            <div className={styles.balanceWrap}>
              <BalanceSummary
                balance={balance}
                entryFee={giveaway.entryFee}
                afterBalance={afterBalance}
                currency={giveaway.currency}
              />

              {user.loggedIn && isInsufficientBalance && (
                <div className={styles.warning} role="alert">
                  <FaExclamationTriangle aria-hidden="true" />
                  <span>
                    Insufficient balance. You need {giveaway.entryFee - balance}{' '}
                    {giveaway.currency} more to join this giveaway.
                  </span>
                </div>
              )}
            </div>

            <div className={styles.ctaGroup}>
              {isAlreadyJoined ? (
                <div className={styles.stateBox}>
                  <FaShieldAlt aria-hidden="true" />
                  <div>
                    <strong>You&apos;re Already Participating</strong>
                    <span>Your entry has already been recorded.</span>
                  </div>
                </div>
              ) : showJoinButton ? (
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={handleJoinAttempt}
                  disabled={isInsufficientBalance || isJoining}
                >
                  {isJoining ? 'Joining Giveaway...' : 'Join Giveaway'}
                </button>
              ) : showStatusAction ? (
                <button type="button" className={styles.secondaryAction} disabled>
                  {giveaway.status === 'UPCOMING' ? 'Coming Soon' : 'View Winners'}
                </button>
              ) : null}

              {!user.loggedIn && !isAlreadyJoined && giveaway.status === 'ACTIVE' && (
                <p className={styles.loginPrompt}>Login required to participate in this giveaway.</p>
              )}
            </div>

            <div className={styles.eligibilityBox}>
              <div className={styles.eligibilityHeader}>
                <FaWallet aria-hidden="true" />
                <h2>Eligibility</h2>
              </div>
              <p>
                {giveaway.eligibilitySummary || 'Eligibility rules are being finalized for this reward.'}
              </p>
            </div>
          </div>
        </article>

        <div className={styles.rulesWrap}>
          <GiveawayRules compact />
        </div>
      </div>

      <JoinConfirmationModal
        isOpen={isConfirmationOpen}
        isLoginRequired={isLoginRequired}
        isJoining={isJoining}
        onClose={() => {
          setIsConfirmationOpen(false)
          setIsLoginRequired(false)
        }}
        onConfirm={handleConfirmJoin}
        giveaway={giveaway}
        balance={balance}
        afterBalance={balance - giveaway.entryFee}
      />
    </main>
  )
}

export default GiveawayDetails

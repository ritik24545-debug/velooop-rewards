import { useRef, useState } from 'react'
import { FaCheckCircle, FaMedal } from 'react-icons/fa'
import {
  currentWinners as defaultCurrentWinners,
  previousWinners as defaultPreviousWinners,
} from '../../data/giveawayData'
import { mockDataStates } from '../../data/mockDataStates'
import EmptyState from '../EmptyState/EmptyState'
import ErrorState from '../ErrorState/ErrorState'
import PrizeClaimModal from '../PrizeClaimModal/PrizeClaimModal'
import WinnerCardSkeleton from './WinnerCardSkeleton'
import styles from './WinnersTabs.module.css'

const tabs = [
  { id: 'current-winners', label: 'Current Winners' },
  { id: 'previous-winners', label: 'Previous Winners' },
]

function WinnerCard({ winner, onClaim }) {
  return (
    <article className={styles.winnerCard}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar} aria-hidden="true">
          {winner.displayName
            .split(' ')
            .map((namePart) => namePart[0])
            .join('')}
        </div>
        <span className={styles.status}>
          <FaCheckCircle aria-hidden="true" />
          {winner.status}
        </span>
      </div>

      <div className={styles.winnerInfo}>
        <div className={styles.identity}>
          <h3>{winner.displayName}</h3>
          <span>{winner.maskedUserId}</span>
        </div>
        <p>Won {winner.prize}</p>
        <span className={styles.category}>
          <FaMedal aria-hidden="true" />
          {winner.giveaway}
        </span>
        {winner.isWinner && (
          <button
            className={styles.claimButton}
            type="button"
            onClick={() => onClaim(winner)}
          >
            Claim Prize
          </button>
        )}
      </div>
    </article>
  )
}

function WinnersTabs({
  currentWinners = defaultCurrentWinners,
  previousWinners = defaultPreviousWinners,
  currentDataState = mockDataStates.currentWinners,
  previousDataState = mockDataStates.previousWinners,
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [currentState, setCurrentState] = useState(currentDataState)
  const [previousState, setPreviousState] = useState(previousDataState)
  const [selectedWinner, setSelectedWinner] = useState(null)
  const tabRefs = useRef([])
  const activeWinners = activeTab === tabs[0].id
    ? currentWinners
    : previousWinners
  const activeDataState = activeTab === tabs[0].id
    ? currentState
    : previousState

  const selectTab = (tabId) => {
    setActiveTab(tabId)
  }

  const handleTabKeyDown = (event, tabIndex) => {
    let nextIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (tabIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (tabIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === undefined) {
      return
    }

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    selectTab(nextTab.id)
    tabRefs.current[nextIndex]?.focus()
  }

  const renderPanel = () => {
    if (activeDataState === 'loading') {
      return Array.from({ length: 3 }, (_, index) => (
        <WinnerCardSkeleton key={`winner-skeleton-${index}`} />
      ))
    }

    if (activeDataState === 'error') {
      return (
        <ErrorState
          className={styles.state}
          onRetry={() => {
            if (activeTab === tabs[0].id) {
              setCurrentState('success')
            } else {
              setPreviousState('success')
            }
          }}
        />
      )
    }

    if (activeDataState === 'empty' || activeWinners.length === 0) {
      return (
        <EmptyState
          className={styles.state}
          title={activeTab === tabs[0].id
            ? 'No winners have been announced yet.'
            : 'No previous winners yet.'}
          message={activeTab === tabs[0].id
            ? 'Winner announcements will appear here after the giveaway is completed.'
            : 'Previous winners will appear here after completed giveaways.'}
        />
      )
    }

    return activeWinners.map((winner) => (
      <WinnerCard
        key={winner.id}
        winner={winner}
        onClaim={setSelectedWinner}
      />
    ))
  }

  return (
    <>
      <div className={styles.tabsWrapper}>
      <div className={styles.tabList} role="tablist" aria-label="Winner lists">
        {tabs.map((tab, tabIndex) => {
          const isActive = activeTab === tab.id

          return (
            <button
              className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
              id={`${tab.id}-tab`}
              key={tab.id}
              ref={(element) => {
                tabRefs.current[tabIndex] = element
              }}
              role="tab"
              type="button"
              aria-controls={`${tab.id}-panel`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tabIndex)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        className={styles.panel}
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
        tabIndex="0"
      >
        <div className={styles.winnerGrid}>{renderPanel()}</div>
      </div>
      </div>

      <PrizeClaimModal
        key={selectedWinner?.id ?? 'claim-closed'}
        winner={selectedWinner}
        isOpen={Boolean(selectedWinner)}
        onClose={() => setSelectedWinner(null)}
      />
    </>
  )
}

export default WinnersTabs

import {
  FaSearch,
  FaTasks,
  FaTicketAlt,
  FaTrophy,
} from 'react-icons/fa'
import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: FaSearch,
    title: 'Explore Giveaways',
    description:
      'Browse active giveaways and choose a reward you would like to win.',
  },
  {
    number: '02',
    icon: FaTasks,
    title: 'Complete Eligible Activities',
    description:
      'Follow the available participation requirements and collect entries.',
  },
  {
    number: '03',
    icon: FaTicketAlt,
    title: 'Enter the Giveaway',
    description:
      'Use your available entries to participate in the selected giveaway.',
  },
  {
    number: '04',
    icon: FaTrophy,
    title: 'Win & Get Rewarded',
    description:
      'Eligible winners are selected according to the giveaway rules and receive the listed reward.',
  },
]

function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>HOW IT WORKS</span>
          <h2>Enter a giveaway in a few simple steps.</h2>
        </div>

        <div className={styles.steps}>
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <article className={styles.step} key={step.number}>
                <div className={styles.stepTop}>
                  <span className={styles.number}>{step.number}</span>
                  <div className={styles.icon}>
                    <Icon aria-hidden="true" />
                  </div>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

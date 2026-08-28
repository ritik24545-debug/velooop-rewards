import {
  FaCheckCircle,
  FaEye,
  FaShieldAlt,
  FaTicketAlt,
  FaTrophy,
  FaUserCheck,
} from 'react-icons/fa'
import styles from './GiveawayRules.module.css'

const giveawayRules = [
  {
    icon: FaUserCheck,
    title: 'Eligibility',
    description: 'Only eligible participants can enter a giveaway.',
  },
  {
    icon: FaTicketAlt,
    title: 'One Participation Per Giveaway',
    description: 'Each user can participate only once in a particular giveaway event.',
  },
  {
    icon: FaCheckCircle,
    title: 'Active Giveaway',
    description: 'Entries can only be submitted while the giveaway is active.',
  },
  {
    icon: FaTrophy,
    title: 'Winner Selection',
    description: 'Winners are selected after the giveaway ends according to the configured giveaway rules.',
  },
  {
    icon: FaShieldAlt,
    title: 'Prize Claim',
    description: 'Eligible winners must complete the required claim details for their prize.',
  },
  {
    icon: FaEye,
    title: 'Transparency',
    description: 'Giveaway status, winner information and claim states should be clearly presented to participants.',
  },
]

function GiveawayRules() {
  return (
    <section className={styles.section} id="rules" aria-labelledby="rules-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>GIVEAWAY RULES</span>
          <h2 id="rules-title">Simple guidelines for a transparent experience.</h2>
          <p>Clear participation guidelines so every giveaway stays simple and transparent.</p>
        </div>

        <div className={styles.ruleGrid}>
          {giveawayRules.map((rule) => {
            const Icon = rule.icon

            return (
              <article className={styles.rule} key={rule.title}>
                <div className={styles.icon} aria-hidden="true">
                  <Icon />
                </div>
                <div>
                  <h3>{rule.title}</h3>
                  <p>{rule.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GiveawayRules

import {
  FaDiscord,
  FaGift,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa'
import styles from './Footer.module.css'

const platformLinks = [
  { label: 'Giveaways', href: '#giveaways' },
  { label: 'Winners', href: '#winners' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
]

const supportLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'Giveaway Rules', href: '#rules' },
  { label: 'Contact Us', href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Responsible Participation', href: '#' },
]

const socialLinks = [
  { label: 'Instagram', icon: FaInstagram },
  { label: 'X / Twitter', icon: FaTwitter },
  { label: 'LinkedIn', icon: FaLinkedinIn },
  { label: 'Discord', icon: FaDiscord },
]

function FooterLinkGroup({ title, links }) {
  return (
    <div className={styles.linkGroup}>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.brand}>
            <a href="#giveaways" className={styles.logo}>
              <span className={styles.logoMark}>
                <FaGift aria-hidden="true" />
              </span>
              <span className={styles.logoText}>
                VELOOP<span>Rewards</span>
              </span>
            </a>
            <p>
              Discover exciting giveaways, collect entries and get a chance to
              win rewards.
            </p>
          </div>

          <nav aria-label="Platform links">
            <FooterLinkGroup title="Platform" links={platformLinks} />
          </nav>

          <nav aria-label="Support links">
            <FooterLinkGroup title="Support" links={supportLinks} />
          </nav>

          <nav aria-label="Legal links">
            <FooterLinkGroup title="Legal" links={legalLinks} />
          </nav>

          <div className={styles.connect}>
            <h2>Connect</h2>
            <div className={styles.socialLinks}>
              {socialLinks.map(({ label, icon: Icon }) => (
                <a
                  href="#"
                  aria-label={label}
                  title={label}
                  key={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <span>© 2026 VELOOP Rewards. All rights reserved.</span>
          <span>Made for the VELOOP Rewards community.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

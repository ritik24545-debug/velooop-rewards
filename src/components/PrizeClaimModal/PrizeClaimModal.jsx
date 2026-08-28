import { useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaGift, FaTimes } from 'react-icons/fa'
import styles from './PrizeClaimModal.module.css'

const initialFormData = {
  fullName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  email: '',
}

const physicalFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', autoComplete: 'name' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
  { name: 'state', label: 'State', type: 'text', autoComplete: 'address-level1' },
  { name: 'pinCode', label: 'PIN Code', type: 'text', autoComplete: 'postal-code' },
]

function PrizeClaimModal({ winner, isOpen, onClose }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [submissionState, setSubmissionState] = useState('initial')
  const modalRef = useRef(null)

  const isGiftCard = winner?.prizeType === 'GIFT_CARD'

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousFocus = document.activeElement
    const modal = modalRef.current
    const focusableSelector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
    ].join(',')
    const firstFocusable = modal?.querySelector(focusableSelector)

    document.body.style.overflow = 'hidden'
    firstFocusable?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modal) {
        return
      }

      const focusableElements = [...modal.querySelectorAll(focusableSelector)]
      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen || !winner) {
    return null
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const requiredFields = isGiftCard
      ? ['email']
      : ['fullName', 'phone', 'address', 'city', 'state', 'pinCode']

    requiredFields.forEach((fieldName) => {
      if (!formData[fieldName].trim()) {
        nextErrors[fieldName] = 'This field is required.'
      }
    })

    if (formData.phone.trim() && !/^\+?[0-9\s()-]{7,20}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number.'
    }

    if (formData.pinCode.trim() && !/^\d{4,10}$/.test(formData.pinCode.trim())) {
      nextErrors.pinCode = 'Enter a valid PIN code.'
    }

    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      setSubmissionState('initial')
      return
    }

    setSubmissionState('submitting')
    window.setTimeout(() => setSubmissionState('success'), 700)
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-modal-title"
        aria-describedby="claim-modal-description"
      >
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>DEMO CLAIM FLOW</span>
            <h2 id="claim-modal-title">
              {winner.isWinner ? 'Claim your prize' : 'Not a Winner Yet'}
            </h2>
          </div>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close prize claim dialog"
            onClick={onClose}
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        {!winner.isWinner ? (
          <div className={styles.emptyState}>
            <FaGift aria-hidden="true" />
            <p id="claim-modal-description">You don&apos;t have a prize to claim from this giveaway.</p>
            <button className={styles.secondaryButton} type="button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : submissionState === 'success' ? (
          <div className={styles.successState}>
            <FaCheckCircle aria-hidden="true" />
            <p id="claim-modal-description">Your claim has been submitted successfully.</p>
            <span>This is a frontend demo. No real prize delivery has been requested.</span>
            <button className={styles.primaryButton} type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <p className={styles.intro} id="claim-modal-description">
              {winner.prize} <span>from {winner.giveaway}</span>
            </p>
            {isGiftCard ? (
              <div className={styles.field}>
                <label htmlFor="claim-email">Email Address</label>
                <input
                  id="claim-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'claim-email-error' : undefined}
                  onChange={updateField}
                />
                {errors.email && <span id="claim-email-error" className={styles.error}>{errors.email}</span>}
                <span className={styles.helper}>Enter the email address where you want to receive your gift card.</span>
              </div>
            ) : (
              <>
                <div className={styles.formGrid}>
                  {physicalFields.slice(0, 2).map((field) => (
                    <div className={styles.field} key={field.name}>
                      <label htmlFor={`claim-${field.name}`}>{field.label}</label>
                      <input
                        id={`claim-${field.name}`}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        value={formData[field.name]}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `claim-${field.name}-error` : undefined}
                        onChange={updateField}
                      />
                      {errors[field.name] && <span id={`claim-${field.name}-error`} className={styles.error}>{errors[field.name]}</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.field}>
                  <label htmlFor="claim-address">Address</label>
                  <textarea
                    id="claim-address"
                    name="address"
                    autoComplete="street-address"
                    rows="3"
                    value={formData.address}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? 'claim-address-error' : undefined}
                    onChange={updateField}
                  />
                  {errors.address && <span id="claim-address-error" className={styles.error}>{errors.address}</span>}
                </div>
                <div className={styles.formGrid}>
                  {physicalFields.slice(2).map((field) => (
                    <div className={styles.field} key={field.name}>
                      <label htmlFor={`claim-${field.name}`}>{field.label}</label>
                      <input
                        id={`claim-${field.name}`}
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        value={formData[field.name]}
                        aria-invalid={Boolean(errors[field.name])}
                        aria-describedby={errors[field.name] ? `claim-${field.name}-error` : undefined}
                        onChange={updateField}
                      />
                      {errors[field.name] && <span id={`claim-${field.name}-error`} className={styles.error}>{errors[field.name]}</span>}
                    </div>
                  ))}
                </div>
              </>
            )}
            <p className={styles.demoNote}>Demo only. This form does not submit personal information to a backend.</p>
            <button className={styles.primaryButton} type="submit" disabled={submissionState === 'submitting'}>
              {submissionState === 'submitting' ? 'Submitting demo claim...' : 'Submit Demo Claim'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default PrizeClaimModal

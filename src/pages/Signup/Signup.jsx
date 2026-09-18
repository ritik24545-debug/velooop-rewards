import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaGift, FaCheck } from 'react-icons/fa'
import { registerUser, storeAuthSession } from '../../services/api'
import styles from './Signup.module.css'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [apiError, setApiError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setApiError('')
    const nextErrors = {}
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) nextErrors.email = 'Please provide a valid email address'
    if (formData.password.length < 8) nextErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setIsLoading(true)
    try {
      const response = await registerUser({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim() || undefined,
      })
      storeAuthSession(response.data)
      setSuccessMessage('Account created successfully! Redirecting you...')
      window.setTimeout(() => navigate('/'), 1500)
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.')
      setIsLoading(false)
    }
  }

  if (successMessage) {
    return (
      <main className={styles.page}><div className={styles.shell}>
        <Link to="/" className={styles.backLink}><FaArrowLeft aria-hidden="true" /> Back to rewards</Link>
        <section className={styles.card} aria-labelledby="success-title"><div className={styles.successIcon}><FaCheck aria-hidden="true" /></div><h1 id="success-title">Account created!</h1><p className={styles.successMessage}>{successMessage}</p></section>
      </div></main>
    )
  }

  return (
    <main className={styles.page}><div className={styles.shell}>
      <Link to="/" className={styles.backLink}><FaArrowLeft aria-hidden="true" /> Back to rewards</Link>
      <section className={styles.card} aria-labelledby="signup-title">
        <div className={styles.brand}><span><FaGift aria-hidden="true" /></span>VELOOP<span>Rewards</span></div>
        <p className={styles.eyebrow}>JOIN THE COMMUNITY</p>
        <h1 id="signup-title">Create your rewards account.</h1>
        <p className={styles.intro}>Set up your profile to explore eligible giveaways and track your entries.</p>
        {apiError && <div className={styles.errorMessage} role="alert">{apiError}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div><label htmlFor="fullName">Full Name {errors.fullName && <span className={styles.fieldError}>{errors.fullName}</span>}</label><input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} disabled={isLoading} /></div>
          <div><label htmlFor="email">Email {errors.email && <span className={styles.fieldError}>{errors.email}</span>}</label><input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} disabled={isLoading} /></div>
          <div><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} disabled={isLoading} /></div>
          <div className={styles.grid}>
            <div><label htmlFor="password">Password {errors.password && <span className={styles.fieldError}>{errors.password}</span>}</label><input id="password" name="password" type="password" value={formData.password} onChange={handleChange} disabled={isLoading} /></div>
            <div><label htmlFor="confirmPassword">Confirm Password {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}</label><input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} disabled={isLoading} /></div>
          </div>
          <button type="submit" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Account'}</button>
        </form>
        <p className={styles.signIn}>Already have an account? <Link to="/">Sign In</Link></p>
      </section>
    </div></main>
  )
}

export default Signup

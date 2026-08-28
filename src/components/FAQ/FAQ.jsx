import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import styles from './FAQ.module.css'

const faqItems = [
  {
    question: 'How do I enter a giveaway?',
    answer:
      'Choose an active giveaway, review its requirements, and use your available VEs to submit an entry.',
  },
  {
    question: 'What are VEs?',
    answer:
      'VEs are VELOOP entry points used to participate in eligible giveaways.',
  },
  {
    question: 'How are winners selected?',
    answer:
      'Winners are selected according to the rules listed on the individual giveaway. Each giveaway explains its selection details before you enter.',
  },
  {
    question: 'Can I enter more than one giveaway?',
    answer:
      'Yes. You can participate in multiple giveaways when you have enough available VEs and meet each giveaway\'s requirements.',
  },
  {
    question: 'What happens after I win?',
    answer:
      'Winner details and next steps are shared through the contact information provided for the giveaway entry.',
  },
  {
    question: 'Where can I find the giveaway rules?',
    answer:
      'The rules and participation requirements are available with each giveaway before you submit an entry.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (
      currentIndex === index ? null : index
    ))
  }

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</span>
          <h2>Everything you need to know before joining a giveaway.</h2>
        </div>

        <div className={styles.list}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`

            return (
              <div className={`${styles.item} ${isOpen ? styles.open : ''}`} key={item.question}>
                <button
                  className={styles.question}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <FaMinus aria-hidden="true" />
                  ) : (
                    <FaPlus aria-hidden="true" />
                  )}
                </button>

                <div
                  className={styles.answerWrapper}
                  id={answerId}
                  aria-hidden={!isOpen}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ

'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'



const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for exploring the platform and getting started.',
    price: '0',
    period: 'free forever - no credit card',
    badge: null,
    perks: [
      { text: '100 Emple Coins', on: true },
      { text: 'Access to Roadmaps & Blogs', on: true },
      { text: 'Access to Study Groups', on: true },
      { text: 'Access to Practice Section', on: true },
      { text: 'Access to Latest Jobs', on: true },
      { text: 'Access to ATS Scanner', on: true },
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Standard',
    tagline: 'For serious job seekers who want every possible advantage.',
    price: '99',
    period: 'one-time purchase',
    badge: null,
    perks: [
      { text: '250 Emple Coins', on: true },
      { text: 'Access to Roadmaps & Blogs', on: true },
      { text: 'Access to Study Groups', on: true },
      { text: 'Access to Practice Section', on: true },
      { text: 'Access to Latest Jobs', on: true },
      { text: 'Access to ATS Scanner', on: true },
    ],
    cta: 'Upgrade to Standard',
  },
  {
    name: 'Enterprise',
    tagline: 'For universities, bootcamps, and placement cells.',
    price: 'Custom',
    period: 'per student, per year',
    badge: null,
    perks: [
      { text: '1000 Emple Coins', on: true },
      { text: 'Everything on standard', on: true },
      { text: 'Personal LMS for university ', on: true },
      { text: 'Unlimited tests, quizzes', on: true },
      { text: 'Dedicated account manager', on: true },
      { text: 'Custom integrations', on: true },
    ],
    cta: 'Contact Sales',
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [showContactModal, setShowContactModal] = useState(false)



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    sectionRef.current
      ?.querySelectorAll('.reveal')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  

  return (
    <section className="section" id="pricing" ref={sectionRef}>
      <div className="content-container">
        <div className="pricing-head reveal">
          <div className="section-tag">Pricing</div>
          <h2 className="section-h2">
            Simple, <em>transparent</em> pricing
          </h2>
          <p className="section-lead">
            Start free. Upgrade when you&apos;re ready to go all-in on your career. No surprise charges.
          </p>
        </div>

        <div className="pricing-grid">
  {plans.map((plan, i) => (
    <div
      key={plan.name}
      className={`plan reveal reveal-d${i + 1} `}
    >
      {plan.badge && <div className="plan-badge">{plan.badge}</div>}

      <div className="plan-name">{plan.name}</div>
      <div className="plan-tagline">{plan.tagline}</div>

      <div className="plan-price-row">
        {plan.price !== 'Custom' && (
        <span className="plan-currency">₹</span>
        )}
        <span className="plan-price">{plan.price}</span>
      </div>

      <div className="plan-period">{plan.period}</div>
      <div className="plan-line" />

      <ul className="plan-perks">
        {plan.perks.map((perk) => (
          <li
            key={perk.text}
            className={`plan-perk${perk.on ? '' : ' off'}`}
          >
            <span className={perk.on ? 'perk-check' : 'perk-dash'}>
              {perk.on ? '✓' : '–'}
            </span>
            {perk.text}
          </li>
        ))}
      </ul>

      <button
        className="plan-btn"
        onClick={() => {
          if (plan.name === 'Enterprise') {
            setShowContactModal(true)
          } else {
            window.location.href = '/auth/login'
          }
        }}
      >
        {plan.cta}
      </button>
    </div>
  ))}
</div>
      </div>

      {showContactModal && (
  <div
    className="contact-modal-overlay"
    onClick={() => setShowContactModal(false)}
  >
    <div
      className="contact-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="contact-modal-close"
        onClick={() => setShowContactModal(false)}
      >
        ×
      </button>

      <h3>Contact Sales</h3>

      <p>
        Interested in Enterprise? Reach out to our team and we'll help you
        find the right solution.
      </p>

      <div className="contact-methods">
        <a
          href="mailto:binarykeeda.education@gmail.com"
          className="contact-method"
        >
          binarykeeda.education@gmail.com
        </a>

        <a
          href="tel:+91 7497918739"
          className="contact-method"
        >
          +91 7497918739
        </a>
      </div>
    </div>
  </div>
)}
    </section>
  )
}
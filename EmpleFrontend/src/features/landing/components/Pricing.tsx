'use client'

import { useEffect, useRef,  } from 'react'

const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for exploring the platform and getting started.',
    price: '0',
    period: 'forever free - no credit card',
    badge: null,
    perks: [
      { text: '50 Emple Coins', on: true },
      { text: 'Access to AI Module', on: true },
      { text: 'Access to Roadmaps & Blogs', on: true },
      { text: 'Access to Study Groups', on: true },
      { text: 'Access to Practice Section', on: true },
      { text: 'Access to Counselling', on: true },
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Standard',
    tagline: 'For serious job seekers who want every possible advantage.',
    price: '399',
    period: 'per month, billed monthly',
    badge: null,
    perks: [
      { text: '1000 Emple Coins', on: true },
      { text: 'Full ATS scanner + rewrite assist', on: true },
      { text: 'Acess to premium roadmaps', on: true },
      { text: 'Company specific tests', on: true },
      { text: 'Access to Personal counselling', on: true },
      { text: 'Priority support', on: true },
    ],
    cta: 'Upgrade to Standard',
  },
  {
    name: 'Enterprice',
    tagline: 'For universities, bootcamps, and placement cells.',
    price: 1299,
    period: 'per student, per year',
    badge: null,
    perks: [
      { text: '100 Emple Coins', on: true },
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
      className={`plan reveal reveal-d${i + 1} ${
        plan.name === 'Standard' ? 'featured' : ''
      }`}
    >
      {plan.badge && <div className="plan-badge">{plan.badge}</div>}

      <div className="plan-name">{plan.name}</div>
      <div className="plan-tagline">{plan.tagline}</div>

      <div className="plan-price-row">
        <span className="plan-currency">₹</span>
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

      <button className="plan-btn">{plan.cta}</button>
    </div>
  ))}
</div>
      </div>
    </section>
  )
}
'use client'

import { useEffect, useRef, useState } from 'react'

const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for exploring the platform and getting started.',
    price: '0',
    period: 'forever free — no credit card',
    badge: null,
    perks: [
      { text: '5 AI interview sessions/month', on: true },
      { text: 'Basic ATS resume scan', on: true },
      { text: 'Access to free roadmaps', on: true },
      { text: 'University leaderboard', on: true },
      { text: 'Advanced analytics', on: false },
      { text: 'Priority AI feedback', on: false },
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Paid',
    tagline: 'For serious job seekers who want every possible advantage.',
    price: '499',
    period: 'per month, billed monthly',
    badge: 'Most Popular',
    perks: [
      { text: 'Unlimited AI interviews', on: true },
      { text: 'Full ATS scanner + rewrite assist', on: true },
      { text: 'All premium roadmaps', on: true },
      { text: 'Global leaderboard access', on: true },
      { text: 'Advanced skill analytics', on: true },
      { text: 'Priority support', on: true },
    ],
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Interprice',
    tagline: 'For universities, bootcamps, and placement cells.',
    price: 1500,
    period: 'contact us for pricing',
    badge: null,
    perks: [
      { text: 'Everything in Pro', on: true },
      { text: 'Admin analytics dashboard', on: true },
      { text: 'Custom leaderboard branding', on: true },
      { text: 'Bulk seat management', on: true },
      { text: 'Dedicated account manager', on: true },
      { text: 'SLA & custom integrations', on: true },
    ],
    cta: 'Contact Sales',
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

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

  const next = () => {
    setIndex((prev) => Math.min(prev + 1, plans.length - 1))
  }

  const prev = () => {
    setIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="section" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="pricing-head reveal">
          <div className="section-tag">Pricing</div>
          <h2 className="section-h2">
            Simple, <em>transparent</em> pricing
          </h2>
          <p className="section-lead">
            Start free. Upgrade when you&apos;re ready to go all-in on your career. No surprise charges.
          </p>
        </div>

        {/* ✅ WRAPPER (VERY IMPORTANT) */}
        <div className="pricing-slider">

          {/* 🔥 SLIDER TRACK */}
          <div
            className="pricing-grid"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: 'transform 0.4s ease',
            }}
          >
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`plan reveal reveal-d${i + 1} ${
                  index === i ? 'active' : ''
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

          {/* 🔥 ARROWS INSIDE WRAPPER */}
          <div className="carousel-controls">
            <button onClick={prev} disabled={index === 0}>
              ‹
            </button>
            <button onClick={next} disabled={index === plans.length - 1}>
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
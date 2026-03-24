'use client'

import { useEffect, useRef } from 'react'

const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for exploring the platform and getting started.',
    price: '0',
    period: 'forever free — no credit card',
    featured: false,
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
    name: 'Pro',
    tagline: 'For serious job seekers who want every possible advantage.',
    price: '499',
    period: 'per month, billed monthly',
    featured: true,
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
    name: 'Teams',
    tagline: 'For universities, bootcamps, and placement cells.',
    price: null,
    period: 'contact us for pricing',
    featured: false,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="pricing-head reveal">
          <div className="section-tag">Pricing</div>
          <h2 className="section-h2">Simple, <em>transparent</em> pricing</h2>
          <p className="section-lead">
            Start free. Upgrade when you&apos;re ready to go all-in on your career. No surprise charges.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`plan reveal reveal-d${i + 1}${plan.featured ? ' featured' : ''}`}>
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-tagline">{plan.tagline}</div>
              <div className="plan-price-row">
                {plan.price !== null ? (
                  <>
                    <span className="plan-currency">₹</span>
                    <span className="plan-price">{plan.price}</span>
                  </>
                ) : (
                  <span className="plan-price" style={{ fontSize: 'clamp(24px,3.5vw,36px)', letterSpacing: -1 }}>
                    Custom
                  </span>
                )}
              </div>
              <div className="plan-period">{plan.period}</div>
              <div className="plan-line" />
              <ul className="plan-perks">
                {plan.perks.map((perk) => (
                  <li key={perk.text} className={`plan-perk${perk.on ? '' : ' off'}`}>
                    <span className={perk.on ? 'perk-check' : 'perk-dash'}>{perk.on ? '✓' : '–'}</span>
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

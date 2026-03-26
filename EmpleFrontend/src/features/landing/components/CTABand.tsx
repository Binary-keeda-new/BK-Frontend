'use client'

import { useEffect, useRef, useState } from 'react'

export default function CTABand() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')

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
    <section className="cta-band" ref={sectionRef}>
      <div className="container">
        <div className="cta-box reveal">
          <div className="section-tag cta-tag">Get Started Today</div>
          <h2 className="cta-h2">
            Your dream job is<br />
            one <em>streak away</em>
          </h2>
          <p className="cta-sub">
            Join 50,000+ students and professionals levelling up their careers with Emple.
          </p>
          <div className="cta-form">
            <input
              className="cta-input"
              type="email"
              placeholder="Enter your email address…"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="cta-submit" onClick={() => alert('Welcome to Emple!')}>
              Start Free →
            </button>
          </div>
          <p className="cta-note">Free forever plan available. No credit card required.</p>
        </div>
      </div>
    </section>
  )
}

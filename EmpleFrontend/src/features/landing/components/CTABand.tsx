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
            Join students and professionals levelling up their careers with Emple.
          </p>
          
        </div>
      </div>
    </section>
  )
}

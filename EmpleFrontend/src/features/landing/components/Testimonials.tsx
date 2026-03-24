'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: "The ATS scanner literally saved my application. Zero callbacks before — after fixing my resume using Emple's suggestions, I had 4 interviews in the first week.",
    initials: 'PR',
    name: 'Priya Ramesh',
    role: 'SDE @ Zomato',
    avatarStyle: {},
  },
  {
    quote: 'The AI mock interviews are incredibly realistic. I practiced for 3 weeks on Emple and the real Google interview felt almost easy. Just got my offer letter!',
    initials: 'AK',
    name: 'Arjun Kapoor',
    role: 'Software Engineer @ Google',
    avatarStyle: { background: 'linear-gradient(135deg,#7c6fcd,#a78bfa)' },
  },
  {
    quote: 'The streak system gamified my prep so I actually stayed consistent. Went from #140 to #8 in my university ranking over 2 months. Got placed at Flipkart!',
    initials: 'SD',
    name: 'Shreya Dubey',
    role: 'Backend Dev @ Flipkart',
    avatarStyle: { background: 'linear-gradient(135deg,#10b981,#34d399)' },
  },
]

export default function Testimonials() {
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
    <section className="section testi-section" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testi-head reveal">
          <div className="section-tag">Reviews</div>
          <h2 className="section-h2">Loved by <em>job seekers</em> everywhere</h2>
          <p className="section-lead">Real stories from people who landed their dream jobs with Emple.</p>
        </div>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`testi-card reveal reveal-d${i + 1}`}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar" style={t.avatarStyle}>{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

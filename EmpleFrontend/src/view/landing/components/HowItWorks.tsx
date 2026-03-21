'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    n: 1,
    title: 'Create your profile',
    desc: 'Set your target role, university, and experience level. Emple personalises everything around your goals from day one.',
  },
  {
    n: 2,
    title: 'Scan & optimise your resume',
    desc: 'Run your resume through our ATS engine and fix every red flag before submitting a single application.',
  },
  {
    n: 3,
    title: 'Practice daily with AI',
    desc: 'Build a streak with daily coding challenges and AI mock interviews. Climb the leaderboard and earn coins.',
  },
  {
    n: 4,
    title: 'Track & get hired',
    desc: 'Manage every application from your dashboard. Know your stats, keep your momentum, land the offer.',
  },
]

const calDays = [0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 2, 0, 0]
// 0=empty, 1=active, 2=today

export default function HowItWorks() {
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
    <section className="section how" id="how" ref={sectionRef}>
      <div className="container">
        <div className="how-inner">
          <div>
            <div className="section-tag reveal">How It Works</div>
            <h2 className="section-h2 reveal">From zero to <em>offer letter</em></h2>
            <p className="section-lead reveal" style={{ marginBottom: 36 }}>
              Our platform guides you through every phase of your career journey — not just interview prep, but the whole picture.
            </p>

            <div className="how-steps">
              {steps.map((step, i) => (
                <div key={step.n} className={`step-card reveal reveal-d${i + 1}`}>
                  <div className="step-badge">{step.n}</div>
                  <div>
                    <div className="step-title">{step.title}</div>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mock */}
          <div className="reveal">
            <div className="mock-wrap">
              <div className="mock-inner">
                <div className="mock-bar">
                  <div className="mock-dot" style={{ background: '#ff5f57' }} />
                  <div className="mock-dot" style={{ background: '#febc2e' }} />
                  <div className="mock-dot" style={{ background: '#28c840' }} />
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', height: 16, borderRadius: 4, marginLeft: 10 }} />
                </div>
                <div className="mock-body">
                  <div className="mock-card">
                    <div className="mock-card-label">Activity Calendar</div>
                    <div className="mock-cal-mini">
                      {calDays.map((d, i) => (
                        <div key={i} className={`mock-day${d === 1 ? ' a' : d === 2 ? ' t' : ''}`} />
                      ))}
                    </div>
                  </div>

                  <div className="mock-card">
                    <div className="mock-card-label">Skill Progress</div>
                    <div className="mock-bar-row">
                      {[['DSA', 78], ['System Design', 55], ['Behavioural', 90]].map(([label, pct]) => (
                        <div key={label}>
                          <div className="mock-row-label"><span>{label}</span><span>{pct}%</span></div>
                          <div className="mock-bar-line">
                            <div className="mock-bar-line-fill" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mock-card mock-full">
                    <div className="mock-stat-row">
                      {[['🔥5', 'Streak'], ['100', 'Coins'], ['#12', 'Uni Rank'], ['24', 'Solved']].map(([val, lbl]) => (
                        <div key={lbl} className="mock-stat-box">
                          <div className="mock-stat-val">{val}</div>
                          <div className="mock-stat-lbl">{lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const features = [
  {
    icon: '🎯',
    title: 'ATS Resume Scanner',
    desc: "Upload your resume and get an instant ATS compatibility score. We highlight exactly what recruiters' systems flag - and show you how to fix it.",
    href: '/user/jobs',
  },
  {
    icon: '🤖',
    title: 'AI Mock Interviews',
    desc: 'Practice with our AI interviewer that adapts to your target role. Get real-time feedback on clarity, confidence, and technical accuracy.',
    href: '/user/ai-interview',
  },
  {
    icon: '📊',
    title: 'Skill Analytics Dashboard',
    desc: 'Track streaks, monitor skill growth over time, and benchmark yourself against peers with our live leaderboard system.',
    href: '/user/dashboard',
  },
  {
    icon: '🗺️',
    title: 'Career Roadmaps',
    desc: 'Curated step-by-step learning paths for every tech role. From junior dev to staff engineer — know exactly what to learn next.',
    href: '/user/resources/roadmaps',
  },
  {
    icon: '💰',
    title: 'Finance & Salary Intel',
    desc: 'Explore verified salary data by role, company, and location. Walk into every negotiation with real numbers in your corner.',
    href: '/user/dashboard',
  },
  {
    icon: '🏆',
    title: 'University Leaderboards',
    desc: 'Compete with peers at your university or globally. Earn Emple Coins for every milestone and redeem them in the Tech Shop.',
    href: '/user/dashboard',
  },
]

const delays = ['reveal-d1', 'reveal-d2', 'reveal-d3', 'reveal-d1', 'reveal-d2', 'reveal-d3']

export default function Features() {
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
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="features" ref={sectionRef}>
      <div className="content-container">
        <div className="features-head reveal">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-h2">Everything to <em>land the job</em></h2>
          <p className="section-lead">
            From your first application to your final offer - Emple has a tool for every step of your career journey.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, i) => (
            <Link
              key={feat.title}
              href={feat.href}
              className={`feat-card reveal ${delays[i]}`}
              style={{ cursor: 'pointer', display: 'block' }}
            >
              <div className="feat-icon-box">{feat.icon}</div>
              <div className="feat-title">{feat.title}</div>
              <p className="feat-desc">{feat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

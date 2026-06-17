'use client'

import { useEffect, useRef } from 'react'
import {
  Target,
  Sparkles,
  LineChart,
  Route,
  GraduationCap,
  Compass,
} from "lucide-react";


const features = [
  {
    icon: Target,
    title: 'ATS Resume Scanner',
    desc: "Upload your resume and get an instant ATS compatibility score. We highlight exactly what recruiters' systems flag and help you fix it.",
  },
  {
    icon: Sparkles,
    title: 'AI Agents',
    desc: 'Learn faster with AI agents designed to support your goals. Follow structured roadmaps, track progress, and discover the right resources. ',
  },
  {
    icon: LineChart,
    title: 'Skill Analytics Dashboard',
    desc: 'Track streaks, monitor skill growth over time, and benchmark yourself against peers with our live leaderboard system.',
  },
  {
    icon: Route,
    title: 'Career Roadmaps',
    desc: 'Curated step-by-step learning paths for every tech role. From junior dev to staff engineer - know exactly what to learn next.',
  },
  {
    icon: GraduationCap,
    title: 'Quizzes & Tests',
    desc: 'Assess your knowledge with interactive quizzes and skill-based tests. Get instant feedback, identify gaps, and improve your strenghts.',
  },
  {
    icon: Compass, 
    title: 'Career Counselling',
    desc: 'Receive expert-backed career guidnce tailored to your goals. Discover opportunities, build a plan, and navigate your future with clarity.',
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
  <div key={feat.title} className={`feat-card reveal ${delays[i]}`}>
    <div className="feat-icon-box">
      <feat.icon size={26} strokeWidth={2} />
    </div>

    <div className="feat-title">{feat.title}</div>
    <p className="feat-desc">{feat.desc}</p>
  </div>
))}
        </div>
      </div>
    </section>
  )
}

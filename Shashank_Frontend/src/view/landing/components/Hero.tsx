// 'use client'

// import { useRef } from 'react'
// import Link from 'next/link'

// export default function Hero() {
//   const spotlightRef = useRef<HTMLDivElement>(null)
//   const heroRef = useRef<HTMLElement>(null)

//   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
//     if (!heroRef.current || !spotlightRef.current) return
//     const r = heroRef.current.getBoundingClientRect()
//     const x = (((e.clientX - r.left) / r.width) * 100).toFixed(2) + '%'
//     const y = (((e.clientY - r.top) / r.height) * 100).toFixed(2) + '%'
//     spotlightRef.current.style.background = `radial-gradient(700px circle at ${x} ${y}, rgba(241,90,34,0.11) 0%, rgba(124,111,205,0.05) 38%, transparent 65%)`
//   }

//   const handleMouseLeave = () => {
//     if (spotlightRef.current) {
//       spotlightRef.current.style.background = `radial-gradient(650px circle at 30% 50%, rgba(241,90,34,0.07) 0%, transparent 65%)`
//     }
//   }

//   const scrollTo = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <section
//       className="hero"
//       id="heroSection"
//       ref={heroRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="hero-grid" />
//       <div className="hero-spotlight" ref={spotlightRef} />
//       <div className="hero-glow-a" />
//       <div className="hero-glow-b" />

//       <div className="hero-inner">
//         {/* LEFT */}
//         <div className="hero-left">
//           <div className="hero-eyebrow">
//             <span className="eyebrow-dot" />
//             AI-Powered Mock Interviews — Now Live
//           </div>

//           <h1 className="hero-h1">
//             Don&apos;t Hustle<br />
//             and Get <span className="highlight">Placed</span><br />
//             with <span className="accent">Emple</span>
//           </h1>

//           <p className="hero-desc">
//             Your AI-powered Placement Preparation Ecosystem — practice coding interviews,
//             score your resume against ATS, track applications, and follow expert career
//             roadmaps, all in one platform built for ambitious job seekers.
//           </p>

//           <div className="hero-btns">
//             <Link className="hero-btn-primary" href="#">
//               Start for Free
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
//               </svg>
//             </Link>
//             <button className="hero-btn-secondary" onClick={() => scrollTo('how')}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
//               </svg>
//               See How It Works
//             </button>
//           </div>

//           <div className="hero-stats">
//             {[
//               { num: '50', suffix: 'K+', label: 'Active Users' },
//               { num: '12', suffix: 'K+', label: 'Jobs Landed' },
//               { num: '98', suffix: '%', label: 'Satisfaction' },
//               { num: '4.9', suffix: '★', label: 'Avg Rating' },
//             ].map((stat, i) => (
//               <>
//                 {i > 0 && <div key={`d${i}`} className="stat-divider" />}
//                 <div key={stat.label} className="hero-stat-item">
//                   <div className="stat-number">{stat.num}<span className="stat-accent">{stat.suffix}</span></div>
//                   <div className="stat-label">{stat.label}</div>
//                 </div>
//               </>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT — AI Character */}
//         <div className="hero-right">
//           <div className="ai-stage">
//             <div className="ai-orbit ai-orbit-1" />
//             <div className="ai-orbit ai-orbit-2" />
//             <div className="ai-glow-core" />
//             <div className="ai-shadow" />
//             <div className="orbit-dot orbit-dot-1" />
//             <div className="orbit-dot orbit-dot-2" />

//             <div className="ai-chip ai-chip-1">
//               <span className="chip-live-dot" />
//               <span className="chip-icon">🤖</span>
//               AI Interview Live
//             </div>
//             <div className="ai-chip ai-chip-2">
//               <span className="chip-icon">📊</span>
//               98% ATS Score
//             </div>
//             <div className="ai-chip ai-chip-3">
//               <span className="chip-icon">🔥</span>
//               5-day Streak!
//             </div>
//             <div className="ai-chip ai-chip-4">
//               <span className="chip-live-dot" />
//               <span className="chip-icon">✅</span>
//               Offer Received
//             </div>

//             <div className="ai-char">
//               <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <ellipse cx="150" cy="348" rx="72" ry="10" fill="rgba(241,90,34,0.12)" />
//                 <rect x="108" y="270" width="30" height="50" rx="15" fill="#13141c" />
//                 <rect x="162" y="270" width="30" height="50" rx="15" fill="#13141c" />
//                 <rect x="100" y="304" width="44" height="20" rx="10" fill="#f15a22" />
//                 <rect x="156" y="304" width="44" height="20" rx="10" fill="#f15a22" />
//                 <circle cx="123" cy="272" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.5" />
//                 <circle cx="177" cy="272" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.5" />
//                 <rect x="82" y="164" width="136" height="116" rx="26" fill="#13141c" />
//                 <rect x="82" y="164" width="136" height="116" rx="26" stroke="rgba(241,90,34,0.28)" strokeWidth="1.5" />
//                 <rect x="94" y="165" width="112" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
//                 <rect x="100" y="180" width="100" height="70" rx="12" fill="#0a0b0f" />
//                 <rect x="100" y="180" width="100" height="70" rx="12" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
//                 {[196, 210, 224, 238].map((y) => (
//                   <rect key={y} x="100" y={y} width="100" height="1" fill="rgba(241,90,34,0.06)" />
//                 ))}
//                 <rect x="112" y="190" width="44" height="4" rx="2" fill="#f15a22" opacity="0.85" />
//                 <rect x="112" y="200" width="66" height="3" rx="1.5" fill="#8a8a9a" opacity="0.45" />
//                 <rect x="112" y="208" width="52" height="3" rx="1.5" fill="#8a8a9a" opacity="0.38" />
//                 <rect x="112" y="216" width="36" height="3" rx="1.5" fill="#f15a22" opacity="0.5" />
//                 <rect x="112" y="224" width="58" height="3" rx="1.5" fill="#8a8a9a" opacity="0.33" />
//                 <rect x="112" y="232" width="44" height="3" rx="1.5" fill="#f15a22" opacity="0.3" />
//                 <rect x="112" y="240" width="28" height="3" rx="1.5" fill="#8a8a9a" opacity="0.28" />
//                 <rect x="158" y="190" width="8" height="4" rx="1" fill="#f15a22" opacity="0.9">
//                   <animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.2s" repeatCount="indefinite" />
//                 </rect>
//                 <circle cx="182" cy="195" r="5" fill="#22c55e" opacity="0.9">
//                   <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
//                 </circle>
//                 <rect x="46" y="172" width="38" height="22" rx="11" fill="#1a1c28" stroke="rgba(241,90,34,0.15)" strokeWidth="1" />
//                 <circle cx="36" cy="183" r="16" fill="#13141c" stroke="rgba(241,90,34,0.25)" strokeWidth="1.2" />
//                 <rect x="26" y="176" width="8" height="13" rx="4" fill="#8a8a9a" opacity="0.55" />
//                 <rect x="36" y="173" width="8" height="15" rx="4" fill="#f15a22" opacity="0.9" />
//                 <rect x="46" y="177" width="7" height="12" rx="3.5" fill="#8a8a9a" opacity="0.45" />
//                 <circle cx="82" cy="183" r="5" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
//                 <rect x="216" y="172" width="38" height="22" rx="11" fill="#1a1c28" stroke="rgba(241,90,34,0.15)" strokeWidth="1" />
//                 <rect x="253" y="160" width="38" height="52" rx="9" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.5" />
//                 <rect x="257" y="164" width="30" height="38" rx="6" fill="#0a0b0f" />
//                 <rect x="261" y="168" width="18" height="3" rx="1.5" fill="#f15a22" opacity="0.75" />
//                 <rect x="261" y="175" width="22" height="2.5" rx="1.2" fill="#8a8a9a" opacity="0.45" />
//                 <rect x="261" y="181" width="16" height="2.5" rx="1.2" fill="#8a8a9a" opacity="0.38" />
//                 <rect x="261" y="187" width="20" height="2.5" rx="1.2" fill="#f15a22" opacity="0.4" />
//                 <rect x="261" y="193" width="14" height="2.5" rx="1.2" fill="#8a8a9a" opacity="0.3" />
//                 <circle cx="272" cy="207" r="3" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
//                 <circle cx="218" cy="183" r="5" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
//                 <rect x="136" y="145" width="28" height="24" rx="7" fill="#1a1c28" />
//                 <line x1="144" y1="148" x2="144" y2="165" stroke="rgba(241,90,34,0.3)" strokeWidth="1" />
//                 <line x1="150" y1="147" x2="150" y2="166" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
//                 <line x1="156" y1="148" x2="156" y2="165" stroke="rgba(241,90,34,0.3)" strokeWidth="1" />
//                 <rect x="78" y="60" width="144" height="90" rx="30" fill="#13141c" />
//                 <rect x="78" y="60" width="144" height="90" rx="30" stroke="rgba(241,90,34,0.32)" strokeWidth="1.5" />
//                 <rect x="90" y="61" width="120" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
//                 {/* Left Eye */}
//                 <rect x="96" y="84" width="48" height="36" rx="11" fill="#0a0b0f" />
//                 <rect x="96" y="84" width="48" height="36" rx="11" stroke="rgba(241,90,34,0.35)" strokeWidth="1" />
//                 <rect x="100" y="88" width="40" height="28" rx="8" fill="rgba(241,90,34,0.06)" />
//                 <circle cx="120" cy="102" r="10" fill="#f15a22" />
//                 <circle cx="120" cy="102" r="5.5" fill="#fff" opacity="0.92" />
//                 <circle cx="121.5" cy="100.5" r="2" fill="#0a0b0f" />
//                 <circle cx="115" cy="96" r="2.5" fill="#fff" opacity="0.55" />
//                 <circle cx="113" cy="100" r="1" fill="#fff" opacity="0.3" />
//                 {/* Right Eye */}
//                 <rect x="156" y="84" width="48" height="36" rx="11" fill="#0a0b0f" />
//                 <rect x="156" y="84" width="48" height="36" rx="11" stroke="rgba(241,90,34,0.35)" strokeWidth="1" />
//                 <rect x="160" y="88" width="40" height="28" rx="8" fill="rgba(241,90,34,0.06)" />
//                 <circle cx="180" cy="102" r="10" fill="#f15a22" />
//                 <circle cx="180" cy="102" r="5.5" fill="#fff" opacity="0.92" />
//                 <circle cx="181.5" cy="100.5" r="2" fill="#0a0b0f" />
//                 <circle cx="175" cy="96" r="2.5" fill="#fff" opacity="0.55" />
//                 <circle cx="173" cy="100" r="1" fill="#fff" opacity="0.3" />
//                 {/* Eye scan lines */}
//                 <rect x="97" y="101" width="46" height="1.5" rx="1" fill="rgba(241,90,34,0.5)">
//                   <animate attributeName="y" values="88;118;88" dur="3s" repeatCount="indefinite" />
//                   <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
//                 </rect>
//                 <rect x="157" y="101" width="46" height="1.5" rx="1" fill="rgba(241,90,34,0.5)">
//                   <animate attributeName="y" values="88;118;88" dur="3s" repeatCount="indefinite" />
//                   <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
//                 </rect>
//                 {/* Antenna */}
//                 <rect x="147" y="30" width="6" height="34" rx="3" fill="#1a1c28" />
//                 <rect x="138" y="58" width="24" height="7" rx="3.5" fill="#1a1c28" />
//                 <circle cx="150" cy="24" r="12" fill="#f15a22" opacity="0.95" />
//                 <circle cx="150" cy="24" r="7" fill="#fff" opacity="0.25" />
//                 <circle cx="150" cy="24" r="3" fill="#fff" opacity="0.9" />
//                 <circle cx="150" cy="24" r="18" stroke="#f15a22" strokeWidth="1.2" strokeOpacity="0.4" fill="none">
//                   <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
//                   <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
//                 </circle>
//                 <circle cx="150" cy="24" r="28" stroke="#f15a22" strokeWidth="1" strokeOpacity="0.2" fill="none">
//                   <animate attributeName="r" values="18;32;18" dur="2s" begin="0.4s" repeatCount="indefinite" />
//                   <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="2s" begin="0.4s" repeatCount="indefinite" />
//                 </circle>
//                 {/* Ears */}
//                 <rect x="62" y="82" width="18" height="30" rx="9" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
//                 <circle cx="71" cy="97" r="5" fill="#f15a22" opacity="0.55">
//                   <animate attributeName="opacity" values="0.55;0.9;0.55" dur="2.5s" repeatCount="indefinite" />
//                 </circle>
//                 <rect x="220" y="82" width="18" height="30" rx="9" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
//                 <circle cx="229" cy="97" r="5" fill="#f15a22" opacity="0.55">
//                   <animate attributeName="opacity" values="0.55;0.9;0.55" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
//                 </circle>
//                 {/* Mouth */}
//                 <rect x="118" y="133" width="64" height="12" rx="6" fill="#1a1c28" />
//                 {[125, 136, 147, 158, 169].map((x) => (
//                   <rect key={x} x={x} y="136" width="7" height="6" rx="3" fill="#f15a22" opacity="0.55" />
//                 ))}
//                 {/* Shoulders */}
//                 <circle cx="88" cy="172" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.2" />
//                 <circle cx="88" cy="172" r="2" fill="rgba(241,90,34,0.4)" />
//                 <circle cx="212" cy="172" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.2" />
//                 <circle cx="212" cy="172" r="2" fill="rgba(241,90,34,0.4)" />
//                 {/* Hips */}
//                 <circle cx="108" cy="268" r="8" fill="#1a1c28" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
//                 <circle cx="192" cy="268" r="8" fill="#1a1c28" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
'use client'

import { Fragment, useRef } from 'react'
import Link from 'next/link'

export default function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || !spotlightRef.current) return
    const r = heroRef.current.getBoundingClientRect()
    const x = (((e.clientX - r.left) / r.width) * 100).toFixed(2) + '%'
    const y = (((e.clientY - r.top) / r.height) * 100).toFixed(2) + '%'
    spotlightRef.current.style.background = `radial-gradient(700px circle at ${x} ${y}, rgba(241,90,34,0.11) 0%, rgba(124,111,205,0.05) 38%, transparent 65%)`
  }

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(650px circle at 30% 50%, rgba(241,90,34,0.07) 0%, transparent 65%)`
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="hero"
      id="heroSection"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-grid" />
      <div className="hero-spotlight" ref={spotlightRef} />
      <div className="hero-glow-a" />
      <div className="hero-glow-b" />

      <div className="hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            AI-Powered Mock Interviews — Now Live
          </div>

          <h1 className="hero-h1">
            Don&apos;t Hustle<br />
            and Get <span className="highlight">Placed</span><br />
            with <span className="accent">Emple</span>
          </h1>

          <p className="hero-desc">
            Your AI-powered Placement Preparation Ecosystem — practice coding interviews,
            score your resume against ATS, track applications, and follow expert career
            roadmaps, all in one platform built for ambitious job seekers.
          </p>

          <div className="hero-btns">
            <Link className="hero-btn-primary" href="#">
              Start for Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <button className="hero-btn-secondary" onClick={() => scrollTo('how')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              See How It Works
            </button>
          </div>

          <div className="hero-stats">
            {[
              { num: '50', suffix: 'K+', label: 'Active Users' },
              { num: '12', suffix: 'K+', label: 'Jobs Landed' },
              { num: '98', suffix: '%', label: 'Satisfaction' },
              { num: '4.9', suffix: '★', label: 'Avg Rating' },
            ].map((stat, i) => (
              <Fragment key={stat.label}>
                {i > 0 && <div className="stat-divider" />}
                <div className="hero-stat-item">
                  <div className="stat-number">{stat.num}<span className="stat-accent">{stat.suffix}</span></div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT — AI Character */}
        <div className="hero-right">
          <div className="ai-stage">
            <div className="ai-orbit ai-orbit-1" />
            <div className="ai-orbit ai-orbit-2" />
            <div className="ai-glow-core" />
            <div className="ai-shadow" />
            <div className="orbit-dot orbit-dot-1" />
            <div className="orbit-dot orbit-dot-2" />

            <div className="ai-chip ai-chip-1">
              <span className="chip-live-dot" />
              <span className="chip-icon">🤖</span>
              AI Interview Live
            </div>
            <div className="ai-chip ai-chip-2">
              <span className="chip-icon">📊</span>
              98% ATS Score
            </div>
            <div className="ai-chip ai-chip-3">
              <span className="chip-icon">🔥</span>
              5-day Streak!
            </div>
            <div className="ai-chip ai-chip-4">
              <span className="chip-live-dot" />
              <span className="chip-icon">✅</span>
              Offer Received
            </div>

            <div className="ai-char">
              <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="150" cy="348" rx="72" ry="10" fill="rgba(241,90,34,0.12)" />
                <rect x="108" y="270" width="30" height="50" rx="15" fill="#13141c" />
                <rect x="162" y="270" width="30" height="50" rx="15" fill="#13141c" />
                <rect x="100" y="304" width="44" height="20" rx="10" fill="#f15a22" />
                <rect x="156" y="304" width="44" height="20" rx="10" fill="#f15a22" />
                <circle cx="123" cy="272" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.5" />
                <circle cx="177" cy="272" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.5" />
                <rect x="82" y="164" width="136" height="116" rx="26" fill="#13141c" />
                <rect x="82" y="164" width="136" height="116" rx="26" stroke="rgba(241,90,34,0.28)" strokeWidth="1.5" />
                <rect x="94" y="165" width="112" height="3" rx="1.5" fill="rgba(255,255,255,0.04)" />
                <rect x="100" y="180" width="100" height="70" rx="12" fill="#0a0b0f" />
                <rect x="100" y="180" width="100" height="70" rx="12" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
                {[196, 210, 224, 238].map((y) => (
                  <rect key={y} x="100" y={y} width="100" height="1" fill="rgba(241,90,34,0.06)" />
                ))}
                <rect x="112" y="190" width="44" height="4" rx="2" fill="#f15a22" opacity="0.85" />
                <rect x="112" y="200" width="66" height="3" rx="1.5" fill="#8a8a9a" opacity="0.45" />
                <rect x="112" y="208" width="52" height="3" rx="1.5" fill="#8a8a9a" opacity="0.38" />
                <rect x="112" y="216" width="36" height="3" rx="1.5" fill="#f15a22" opacity="0.5" />
                <rect x="112" y="224" width="58" height="3" rx="1.5" fill="#8a8a9a" opacity="0.33" />
                <rect x="112" y="232" width="44" height="3" rx="1.5" fill="#f15a22" opacity="0.3" />
                <rect x="112" y="240" width="28" height="3" rx="1.5" fill="#8a8a9a" opacity="0.28" />
                <rect x="158" y="190" width="8" height="4" rx="1" fill="#f15a22" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.2s" repeatCount="indefinite" />
                </rect>
                <circle cx="182" cy="195" r="5" fill="#22c55e" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                <rect x="46" y="172" width="38" height="22" rx="11" fill="#1a1c28" stroke="rgba(241,90,34,0.15)" strokeWidth="1" />
                <circle cx="36" cy="183" r="16" fill="#13141c" stroke="rgba(241,90,34,0.25)" strokeWidth="1.2" />
                <rect x="26" y="176" width="8" height="13" rx="4" fill="#8a8a9a" opacity="0.55" />
                <rect x="36" y="173" width="8" height="15" rx="4" fill="#f15a22" opacity="0.9" />
                <rect x="46" y="177" width="7" height="12" rx="3.5" fill="#8a8a9a" opacity="0.45" />
                <circle cx="82" cy="183" r="5" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
                <rect x="216" y="172" width="38" height="22" rx="11" fill="#1a1c28" stroke="rgba(241,90,34,0.15)" strokeWidth="1" />
                <rect x="253" y="160" width="38" height="52" rx="9" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.5" />
                <rect x="257" y="164" width="30" height="38" rx="6" fill="#0a0b0f" />
                <rect x="261" y="168" width="18" height="3" rx="1.5" fill="#f15a22" opacity="0.75" />
                <rect x="261" y="175" width="22" height="2.5" rx="1.2" fill="#8a8a9a" opacity="0.45" />
                <rect x="261" y="181" width="16" height="2.5" rx="1.2" fill="#8a8a9a" opacity="0.38" />
                <rect x="261" y="187" width="20" height="2.5" rx="1.2" fill="#f15a22" opacity="0.4" />
                <rect x="261" y="193" width="14" height="2.5" rx="1.2" fill="#8a8a9a" opacity="0.3" />
                <circle cx="272" cy="207" r="3" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
                <circle cx="218" cy="183" r="5" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
                <rect x="136" y="145" width="28" height="24" rx="7" fill="#1a1c28" />
                <line x1="144" y1="148" x2="144" y2="165" stroke="rgba(241,90,34,0.3)" strokeWidth="1" />
                <line x1="150" y1="147" x2="150" y2="166" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
                <line x1="156" y1="148" x2="156" y2="165" stroke="rgba(241,90,34,0.3)" strokeWidth="1" />
                <rect x="78" y="60" width="144" height="90" rx="30" fill="#13141c" />
                <rect x="78" y="60" width="144" height="90" rx="30" stroke="rgba(241,90,34,0.32)" strokeWidth="1.5" />
                <rect x="90" y="61" width="120" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
                {/* Left Eye */}
                <rect x="96" y="84" width="48" height="36" rx="11" fill="#0a0b0f" />
                <rect x="96" y="84" width="48" height="36" rx="11" stroke="rgba(241,90,34,0.35)" strokeWidth="1" />
                <rect x="100" y="88" width="40" height="28" rx="8" fill="rgba(241,90,34,0.06)" />
                <circle cx="120" cy="102" r="10" fill="#f15a22" />
                <circle cx="120" cy="102" r="5.5" fill="#fff" opacity="0.92" />
                <circle cx="121.5" cy="100.5" r="2" fill="#0a0b0f" />
                <circle cx="115" cy="96" r="2.5" fill="#fff" opacity="0.55" />
                <circle cx="113" cy="100" r="1" fill="#fff" opacity="0.3" />
                {/* Right Eye */}
                <rect x="156" y="84" width="48" height="36" rx="11" fill="#0a0b0f" />
                <rect x="156" y="84" width="48" height="36" rx="11" stroke="rgba(241,90,34,0.35)" strokeWidth="1" />
                <rect x="160" y="88" width="40" height="28" rx="8" fill="rgba(241,90,34,0.06)" />
                <circle cx="180" cy="102" r="10" fill="#f15a22" />
                <circle cx="180" cy="102" r="5.5" fill="#fff" opacity="0.92" />
                <circle cx="181.5" cy="100.5" r="2" fill="#0a0b0f" />
                <circle cx="175" cy="96" r="2.5" fill="#fff" opacity="0.55" />
                <circle cx="173" cy="100" r="1" fill="#fff" opacity="0.3" />
                {/* Eye scan lines */}
                <rect x="97" y="101" width="46" height="1.5" rx="1" fill="rgba(241,90,34,0.5)">
                  <animate attributeName="y" values="88;118;88" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                </rect>
                <rect x="157" y="101" width="46" height="1.5" rx="1" fill="rgba(241,90,34,0.5)">
                  <animate attributeName="y" values="88;118;88" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                </rect>
                {/* Antenna */}
                <rect x="147" y="30" width="6" height="34" rx="3" fill="#1a1c28" />
                <rect x="138" y="58" width="24" height="7" rx="3.5" fill="#1a1c28" />
                <circle cx="150" cy="24" r="12" fill="#f15a22" opacity="0.95" />
                <circle cx="150" cy="24" r="7" fill="#fff" opacity="0.25" />
                <circle cx="150" cy="24" r="3" fill="#fff" opacity="0.9" />
                <circle cx="150" cy="24" r="18" stroke="#f15a22" strokeWidth="1.2" strokeOpacity="0.4" fill="none">
                  <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="24" r="28" stroke="#f15a22" strokeWidth="1" strokeOpacity="0.2" fill="none">
                  <animate attributeName="r" values="18;32;18" dur="2s" begin="0.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="2s" begin="0.4s" repeatCount="indefinite" />
                </circle>
                {/* Ears */}
                <rect x="62" y="82" width="18" height="30" rx="9" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
                <circle cx="71" cy="97" r="5" fill="#f15a22" opacity="0.55">
                  <animate attributeName="opacity" values="0.55;0.9;0.55" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <rect x="220" y="82" width="18" height="30" rx="9" fill="#1a1c28" stroke="rgba(241,90,34,0.25)" strokeWidth="1" />
                <circle cx="229" cy="97" r="5" fill="#f15a22" opacity="0.55">
                  <animate attributeName="opacity" values="0.55;0.9;0.55" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                </circle>
                {/* Mouth */}
                <rect x="118" y="133" width="64" height="12" rx="6" fill="#1a1c28" />
                {[125, 136, 147, 158, 169].map((x) => (
                  <rect key={x} x={x} y="136" width="7" height="6" rx="3" fill="#f15a22" opacity="0.55" />
                ))}
                {/* Shoulders */}
                <circle cx="88" cy="172" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.2" />
                <circle cx="88" cy="172" r="2" fill="rgba(241,90,34,0.4)" />
                <circle cx="212" cy="172" r="6" fill="#1a1c28" stroke="rgba(241,90,34,0.3)" strokeWidth="1.2" />
                <circle cx="212" cy="172" r="2" fill="rgba(241,90,34,0.4)" />
                {/* Hips */}
                <circle cx="108" cy="268" r="8" fill="#1a1c28" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
                <circle cx="192" cy="268" r="8" fill="#1a1c28" stroke="rgba(241,90,34,0.2)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client";
import { useEffect, useRef, useState } from "react";

interface FAQItem { q: string; a: string; }

const faqs: FAQItem[] = [
  {
    q: "What is Emple?",
    a: "Emple is an ed-tech platform designed to empower students and aspiring professionals through project-based learning, mentorship, and real-world tech exposure.",
  },
  {
    q: "Why should I join Emple?",
    a: "At Emple, you'll work on practical coding challenges, build full-stack projects, participate in hackathons, and get guidance from industry mentors to prepare for SDE roles and beyond.",
  },
  {
    q: "What Resources does Emple offer?",
    a: "Emple provides coding interfaces, curated problem sets, mock interviews, resume reviews, and structured learning paths for technologies like MERN, DevOps, and Data Science.",
  },
  {
    q: "Who can join Emple?",
    a: "Emple is open to all learners — from BCA, B.Tech, MCA students to self-taught coders — anyone passionate about tech, development, and building impactful projects.",
  },
  {
    q: "Is Emple free?",
    a: "Yes, the core resources and community participation are completely free. We believe in democratizing education. Advanced mentorship or certification programs may be optional and paid.",
  },
  {
    q: "What makes Emple different?",
    a: "Unlike tutorial-based platforms, Emple focuses on real projects, peer collaboration, and tech-driven problem-solving — helping you build your portfolio and confidence.",
  },
  {
    q: "How do I get started",
    a: "Just sign up, explore the learning tracks, pick your interest (MERN, DevOps, ML, etc.), and start building! Our mentors and community are always ready to guide you.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .faq-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #0a0b0f;
          color: #eeeef4;
          -webkit-font-smoothing: antialiased;
        }
        .faq-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .faq-fade.faq-in { opacity: 1; transform: none; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.07); }
        .faq-item:first-child { border-top: 1px solid rgba(255,255,255,0.07); }
        .faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; background: none; border: none; cursor: pointer;
          padding: 22px 0; text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .faq-btn:hover .faq-q { color: #eeeef4; }
        .faq-q {
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          font-weight: 600;
          color: #c8c8d8;
          transition: color 0.2s ease;
          line-height: 1.4;
        }
        .faq-q.faq-q-open { color: #eeeef4; }
        .faq-icon {
          flex-shrink: 0;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          color: #f15a22;
          font-size: 1.4rem;
          font-weight: 300;
          line-height: 1;
          transition: transform 0.3s ease;
          user-select: none;
        }
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .faq-answer-wrap.faq-open { grid-template-rows: 1fr; }
        .faq-answer-inner { overflow: hidden; }
        .faq-answer {
          padding-bottom: 22px;
          font-size: clamp(0.88rem, 1.3vw, 0.97rem);
          font-weight: 400;
          line-height: 1.8;
          color: #a0a0b8;
        }
        .faq-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 40% at 80% 10%, rgba(241,90,34,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      <section
        id ='faq'
        ref={sectionRef}
        className="faq-root relative overflow-hidden"
        style={{ padding: "clamp(64px,9vw,128px) clamp(20px,6vw,96px)" }}
      >
        <div className="faq-glow" />

        <div style={{ maxWidth: 860, marginInline: "auto", position: "relative" }}>

          {/* Label row */}
          <div className={`faq-fade${visible ? " faq-in" : ""}`} style={{ transitionDelay: "0.05s", display: "flex", alignItems: "center",   justifyContent: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 28, height: 2.5, background: "#f15a22", borderRadius: 4, flexShrink: 0 }} />
            <span style={{ fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#f15a22" }}>
              FAQ
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`faq-fade${visible ? " faq-in" : ""}`}
            style={{
              transitionDelay: "0.15s",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#eeeef4",
              marginBottom: "clamp(36px,5vw,64px)",
            }}
          >
            Frequently{" "}<span style={{ color: "#f15a22" }}>Asked</span>{" "}Questions
          </h2>

          {/* FAQ items */}
          <div className={`faq-fade${visible ? " faq-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
            {faqs.map((item, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-btn"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className={`faq-q${open === i ? " faq-q-open" : ""}`}>{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                <div className={`faq-answer-wrap${open === i ? " faq-open" : ""}`}>
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
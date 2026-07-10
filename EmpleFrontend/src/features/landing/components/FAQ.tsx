"use client";
import { useEffect, useRef, useState } from "react";

interface FAQItem { q: string; a: string; }

const faqs: FAQItem[] = [
  {
    q: "What is Emple?",
    a: "Emple is an AI-powered career development platform designed to help students, graduates, and professionals prepare for internships, placements, and job opportunities. The platform combines interview preparation, ATS resume analysis, career roadmaps, tutorials, placement resources, and skill-building tools in one place. Whether you're preparing for your first internship or your next career move, Emple helps you build the skills, confidence, and resources needed to succeed.",
  },
  {
    q: "Who can join Emple?",
    a: "Emple is built for learners and professionals at every stage of their career journey, including college students, fresh graduates, job seekers and software developers looking to upskill. Anyone interested in improving their technical skills, interview performance, resume quality, or career readiness can benefit from the platform.",
  },
  {
  q: "What Resources does Emple offer?",
  a: "Emple provides interview preparation resources, structured career roadmaps, technical tutorials, ATS resume guidance, certification resources, placement preparation materials, industry-focused blogs, and community learning opportunities. These resources are designed to help learners develop in-demand skills and prepare confidently for internships, placements, and job opportunities."
},
  {
    q: "Are the career roadmaps suitable for beginners?",
    a: "Yes. The career roadmaps are designed for learners at different skill levels. Whether you are starting with programming fundamentals or preparing for advanced software engineering roles, Emple provides structured learning paths that help users understand what to learn and in what order.",
  },
  {
    q: "Is Emple free?",
    a: "Yes. Emple offers a free plan that provides access to a variety of learning resources, career guides, and preparation materials. Additional premium features may be available for users who want advanced tools, personalized guidance, or enhanced career support.",
  },
  {
    q: "How do I get started",
    a: "Getting started is simple. Create a free account, complete your profile, and explore the available resources. You can begin with career roadmaps, tutorials, interview preparation content, and other learning materials. As you progress, you can use additional tools and features to further support your career goals.",
  },
  {
    q: "What makes Emple different?",
    a: "Unlike traditional learning platforms that focus only on courses, Emple combines learning, career preparation, interview readiness, structured roadmaps, community engagement, and practical resources within a single ecosystem. The platform is designed to help users move beyond learning and take meaningful steps toward internships, placements, and career growth.",
  },
  {
    q: "Can Emple guarantee a job or placement?",
    a: "No. Emple provides educational resources, preparation tools, and career guidance, but job offers and placements depend on individual skills, effort, experience, and hiring decisions made by employers. The platform is designed to improve preparedness and career readiness.",
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
          font-family: 'Nunito', sans-serif;
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
          font-family: 'Nunito', sans-serif;
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

        <div
          className="content-container"
          style={{
            position: "relative"
          }}
        >

          {/* Label row */}
          <div className={`faq-fade${visible ? " faq-in" : ""}`} style={{ transitionDelay: "0.05s", display: "flex", alignItems: "center",   justifyContent: "center", gap: 10, marginBottom: 20 }}>
            
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
              textAlign: "center",
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
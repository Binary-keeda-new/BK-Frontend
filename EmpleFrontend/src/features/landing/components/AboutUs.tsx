"use client";
import { useEffect, useRef, useState } from "react";

interface Stat { value: string; label: string; }
interface AboutUsProps {
  body?: string[];
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "50+", label: "Interactive Quizzes" },
  { value: "1000+", label: "Users" },
  { value: "95%", label: "User Satisfaction" },
];

const defaultBody = [
  "We are Emple, an innovative E-learning and Testing startup on a mission to transform education for the digital generation. Our platform empowers students with personalized learning paths, expert-led courses, and real-time assessments designed to sharpen their skills and prepare them for the future.",
  "Whether you're looking to master coding, cybersecurity, digital marketing, or other in-demand fields, Emple bridges the gap between knowledge and real-world application. Learn. Practice. Excel. Join the movement that's redefining how students learn, grow, and succeed.",
];

export default function AboutUs({ body = defaultBody, stats = defaultStats }: AboutUsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cls = (d: string) => `au-fade${visible ? " au-in" : ""} ${d}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .au-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #0a0b0f;
          color: #eeeef4;
          -webkit-font-smoothing: antialiased;
        }
        .au-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .au-fade.au-in { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.35s; }
        .d4 { transition-delay: 0.5s; }
        .au-stat:hover .au-val { color: #ff8c5a !important; }
        .au-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 45% at 75% 20%, rgba(241,90,34,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      <section id="about"
        ref={sectionRef}
        className="au-root relative overflow-hidden"
        style={{ padding: "clamp(64px,9vw,128px) clamp(20px,6vw,96px)" }}
      >
        <div className="au-glow" />

        <div style={{ maxWidth: 900, marginInline: "auto", position: "relative" }}>

          {/* Label row: dash + uppercase tag — matches reference exactly */}
          <div className={cls("d1")} style={{ display: "flex", alignItems: "center",  justifyContent: "center", gap: 10, marginBottom: 20 }}>
            <span style={{
              display: "inline-block", width: 28, height: 2.5,
              background: "#f15a22", borderRadius: 4, flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#f15a22",
            }}>
              About Us
            </span>
          </div>

          {/* Heading: white + accent word + white */}
          <h2 className={cls("d2")} style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#eeeef4",
            marginBottom: "clamp(20px,3vw,32px)",
          }}>
            Built for the{" "}
            <span style={{ color: "#f15a22" }}>next generation</span>{" "}
            of learners
          </h2>

          {/* Body paragraphs */}
          <div className={cls("d3")}>
            {body.map((p, i) => (
              <p key={i} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(0.95rem, 1.35vw, 1.075rem)",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "#a0a0b8",
                marginBottom: i < body.length - 1 ? "1rem" : 0,
              }}>
                {p}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div
            className={cls("d4")}
            style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "clamp(36px,5vw,60px) 0" }}
          />

          {/* Stats grid */}
          <div
            className={cls("d4")}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "clamp(28px,4vw,56px)",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} className="au-stat" style={{ cursor: "default" }}>
                <div className="au-val" style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  color: "#f15a22",
                  lineHeight: 1,
                  marginBottom: 8,
                  letterSpacing: "-0.025em",
                  transition: "color 0.25s ease",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
                  fontWeight: 600,
                  color: "#5a5a78",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
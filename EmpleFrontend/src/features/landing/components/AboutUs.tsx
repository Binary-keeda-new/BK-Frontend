//"use client";
//import { useEffect, useRef, useState } from "react";
//
//interface Stat { value: string; label: string; }
//interface AboutUsProps {
//  body?: string[];
//  stats?: Stat[];
//}
//
//const defaultStats: Stat[] = [
//  { value: "50+", label: "Interactive Quizzes" },
//  { value: "1000+", label: "Users" },
//  { value: "95%", label: "User Satisfaction" },
//];
//
//const defaultBody = [
//  "We are Emple, an innovative E-learning and Testing startup on a mission to transform education for the digital generation. Our platform empowers students with personalized learning paths, expert-led courses, and real-time assessments designed to sharpen their skills and prepare them for the future.",
//  "Whether you're looking to master coding, cybersecurity, digital marketing, or other in-demand fields, Emple bridges the gap between knowledge and real-world application. Learn. Practice. Excel. Join the movement that's redefining how students learn, grow, and succeed.",
//];
//
//export default function AboutUs({ body = defaultBody, stats = defaultStats }: AboutUsProps) {
//  const sectionRef = useRef<HTMLDivElement>(null);
//  const [visible, setVisible] = useState(false);
//
//  useEffect(() => {
//    const obs = new IntersectionObserver(
//      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
//      { threshold: 0.15 }
//    );
//    if (sectionRef.current) obs.observe(sectionRef.current);
//    return () => obs.disconnect();
//  }, []);
//
//  const cls = (d: string) => `au-fade${visible ? " au-in" : ""} ${d}`;
//
//  return (
//    <>
//      <style>{`
//        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
//        .au-root {
//          font-family: 'Plus Jakarta Sans', sans-serif;
//          background: #0a0b0f;
//          color: #eeeef4;
//          -webkit-font-smoothing: antialiased;
//        }
//        .au-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
//        .au-fade.au-in { opacity: 1; transform: none; }
//        .d1 { transition-delay: 0.05s; }
//        .d2 { transition-delay: 0.2s; }
//        .d3 { transition-delay: 0.35s; }
//        .d4 { transition-delay: 0.5s; }
//        .au-stat:hover .au-val { color: #ff8c5a !important; }
//        .au-glow {
//          position: absolute; inset: 0;
//          background: radial-gradient(ellipse 55% 45% at 75% 20%, rgba(241,90,34,0.09) 0%, transparent 70%);
//          pointer-events: none;
//        }
//      `}</style>
//
//      <section id="about"
//        ref={sectionRef}
//        className="au-root relative overflow-hidden"
//        style={{ padding: "clamp(64px,9vw,128px) clamp(20px,6vw,96px)" }}
//      >
//        <div className="au-glow" />
//
//        {/*<div style={{ maxWidth: 900, marginInline: "auto", position: "relative" }}>*/}
//        <div className="content-container" style={{ position: "relative" }}>
//          {/* Label row: dash + uppercase tag — matches reference exactly */}
//          <div className={cls("d1")} style={{ display: "flex", alignItems: "center",  justifyContent: "center", gap: 10, marginBottom: 20 }}>
//            {/*<span style={{
//              display: "inline-block", width: 28, height: 2.5,
//              background: "#f15a22", borderRadius: 4, flexShrink: 0,
//            }} />*/}
//            <div className="section-tag">
//              About Us
//            </div>
//          </div>
//
//          {/* Heading: white + accent word + white */}
//          <h2 className={cls("d2")} style={{
//            fontFamily: "'Nunito', sans-serif",
//            fontWeight: 900,
//            fontSize: "clamp(2.4rem, 6vw, 4rem)",
//            lineHeight: 1.08,
//            letterSpacing: "-0.03em",
//            color: "#eeeef4",
//            textAlign: "center",
//            marginBottom: "clamp(20px,3vw,32px)",
//          }}>
//            Built for the{" "}
//            <span style={{ color: "#f15a22" }}>next generation</span>{" "}
//            of learners
//          </h2>
//
//          {/* Body paragraphs */}
//          <div className={cls("d3")} 
//          style={{maxWidth: "780px"}}>
//
//            {body.map((p, i) => (
//              <p key={i} style={{
//                fontFamily: "'Nunito', sans-serif",
//                fontSize: "clamp(0.95rem, 1.35vw, 1.075rem)",
//                fontWeight: 400,
//                lineHeight: 1.8,
//                textAlign: "justify",
//                color: "#a0a0b8",
//                marginBottom: i < body.length - 1 ? "1rem" : 0,
//              }}>
//                {p}
//              </p>
//            ))}
//          </div>
//
//          {/* Divider */}
//          <div
//            className={cls("d4")}
//            style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "clamp(36px,5vw,60px) 0" }}
//          />
//
//          {/* Stats grid */}
//          <div
//            className={cls("d4")}
//            style={{
//              display: "grid",
//              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
//              gap: "clamp(28px,4vw,56px)",
//            }}
//          >
//            {stats.map((s, i) => (
//              <div key={i} className="au-stat" style={{ cursor: "default" }}>
//                <div className="au-val" style={{
//                  fontFamily: "'Plus Jakarta Sans', sans-serif",
//                  fontWeight: 900,
//                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
//                  color: "#f15a22",
//                  lineHeight: 1,
//                  marginBottom: 8,
//                  letterSpacing: "-0.025em",
//                  transition: "color 0.25s ease",
//                }}>
//                  {s.value}
//                </div>
//                <div style={{
//                  fontFamily: "'Plus Jakarta Sans', sans-serif",
//                  fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
//                  fontWeight: 600,
//                  color: "#5a5a78",
//                  textTransform: "uppercase",
//                  letterSpacing: "0.1em",
//                }}>
//                  {s.label}
//                </div>
//              </div>
//            ))}
//          </div>
//
//        </div>
//      </section>
//    </>
//  );
//}

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
          font-family: 'Nunito', sans-serif;
          background: #0a0b0f;
          color: #eeeef4;
          -webkit-font-smoothing: antialiased;
        }
        .au-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .au-fade.au-in { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.2s; }
        .d4 { transition-delay: 0.5s; }
        .au-stat:hover .au-val { color: #ff8c5a !important; }
        .au-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 55% 45% at 75% 20%, rgba(241,90,34,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        @keyframes au-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .au-illustration {
          animation: au-float 5s ease-in-out infinite;
          transform-origin: center bottom;
          width: 100%;
          max-width: 420px;
        }
        .au-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }
        @media (max-width: 900px) {
          .au-two-col { grid-template-columns: 1fr; }
          .au-illustration { max-width: 320px; margin: 0 auto; }
          .au-illus-col { display: flex; justify-content: center; }
        }
        @media (max-width: 600px) {
          .au-illustration { max-width: 260px; }
        }
      `}</style>

      <section id="about"
        ref={sectionRef}
        className="au-root relative overflow-hidden"
        style={{ padding: "clamp(64px,9vw,128px) clamp(20px,6vw,96px)" }}
      >
        <div className="au-glow" />

        <div className="content-container" style={{ position: "relative" }}>
          {/* Label */}
          <div className={cls("d1")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
            <div className="section-tag">About Us</div>
          </div>

          {/* Heading */}
          <h2 className={cls("d2")} style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#eeeef4",
            textAlign: "center",
            marginBottom: "clamp(28px,4vw,48px)",
          }}>
            Built for the{" "}
            <span style={{ color: "#f15a22" }}>next generation</span>{" "}
            of learners
          </h2>

          {/* Two-column: text + illustration */}
          <div className="au-two-col">
            {/* Left: body paragraphs — no scroll animation */}
            <div style={{ maxWidth: 740 }}>
              {body.map((p, i) => (
                <p key={i} style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "clamp(0.95rem, 1.35vw, 1.075rem)",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  textAlign: "justify",
                  color: "#a0a0b8",
                  marginBottom: i < body.length - 1 ? "1rem" : 0,
                }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Right: laptop illustration only */}
            <div className="au-illus-col" style={{ paddingLeft: "clamp(0px, 4vw, 48px)" }}>
              <svg
                className="au-illustration"
                viewBox="0 0 420 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Ambient glow behind screen */}
                <ellipse cx="210" cy="130" rx="140" ry="85" fill="#f15a22" opacity="0.07"/>

                {/* Desk surface */}
                <rect x="30" y="218" width="360" height="13" rx="4" fill="#1a1b22"/>
                <rect x="64" y="231" width="14" height="34" rx="3" fill="#14151b"/>
                <rect x="342" y="231" width="14" height="34" rx="3" fill="#14151b"/>

                {/* Laptop base */}
                <rect x="90" y="162" width="240" height="56" rx="7" fill="#1e1f28"/>
                <rect x="97" y="168" width="226" height="44" rx="4" fill="#16171e"/>
                {/* Keyboard row 1 */}
                {[110,130,150,170,190,210,230,250,270,290,310].map((x, i) => (
                  <rect key={i} x={x} y="178" width="14" height="7" rx="2" fill="#2a2b38"/>
                ))}
                {/* Keyboard row 2 */}
                {[110,132,154,174,194,214,234,254,274,294].map((x, i) => (
                  <rect key={i} x={x} y="190" width={i === 1 ? 16 : 14} height="7" rx="2"
                    fill={i === 5 ? "#f15a22" : "#2a2b38"} opacity={i === 5 ? 0.65 : 1}/>
                ))}
                {/* Trackpad */}
                <rect x="182" y="203" width="56" height="9" rx="3" fill="#2a2b38"/>
                {/* Hinge */}
                <rect x="90" y="156" width="240" height="9" rx="3" fill="#13141a"/>

                {/* Laptop screen */}
                <rect x="90" y="14" width="240" height="146" rx="9" fill="#1a1b24"/>
                <rect x="97" y="21" width="226" height="130" rx="6" fill="#0d0e14"/>
                {/* Screen glow */}
                <rect x="97" y="21" width="226" height="130" rx="6" fill="#f15a22" opacity="0.04"/>
                {/* Camera dot */}
                <circle cx="210" cy="25" r="3" fill="#2a2b38"/>

                {/* Code lines on screen */}
                <rect x="112" y="38"  width="38" height="6" rx="2" fill="#f15a22" opacity="0.9"/>
                <rect x="156" y="38"  width="58" height="6" rx="2" fill="#4a9eff" opacity="0.65"/>
                <rect x="112" y="51"  width="20" height="6" rx="2" fill="#a78bfa" opacity="0.8"/>
                <rect x="138" y="51"  width="76" height="6" rx="2" fill="#34d399" opacity="0.6"/>
                <rect x="220" y="51"  width="28" height="6" rx="2" fill="#f15a22" opacity="0.7"/>
                <rect x="124" y="64"  width="48" height="6" rx="2" fill="#4a9eff" opacity="0.45"/>
                <rect x="178" y="64"  width="36" height="6" rx="2" fill="#34d399" opacity="0.45"/>
                <rect x="112" y="77"  width="64" height="6" rx="2" fill="#2a2b38"/>
                <rect x="182" y="77"  width="40" height="6" rx="2" fill="#a78bfa" opacity="0.55"/>
                <rect x="124" y="90"  width="90" height="6" rx="2" fill="#2a2b38"/>
                <rect x="112" y="103" width="32" height="6" rx="2" fill="#f15a22" opacity="0.8"/>
                <rect x="150" y="103" width="56" height="6" rx="2" fill="#2a2b38"/>
                <rect x="124" y="116" width="46" height="6" rx="2" fill="#34d399" opacity="0.45"/>
                <rect x="176" y="116" width="70" height="6" rx="2" fill="#2a2b38"/>
                {/* Cursor blink line */}
                <rect x="112" y="129" width="30" height="6" rx="2" fill="#2a2b38"/>
                <rect x="148" y="128" width="2.5" height="8" rx="1" fill="#f15a22" opacity="0.9"/>

                {/* Coffee mug */}
                <rect x="352" y="186" width="26" height="32" rx="5" fill="#1e1f28"/>
                <rect x="354" y="188" width="22" height="28" rx="4" fill="#16171e"/>
                <path d="M378 196 Q390 193 389 204 Q388 212 378 210" fill="none" stroke="#2a2b38" strokeWidth="2.5" strokeLinecap="round"/>
                <rect x="357" y="191" width="16" height="3" rx="1.5" fill="#f15a22" opacity="0.6"/>
                <path d="M360 184 Q362 177 360 170" fill="none" stroke="#2a2b38" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M367 182 Q369 174 367 167" fill="none" stroke="#2a2b38" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M374 184 Q376 177 374 170" fill="none" stroke="#2a2b38" strokeWidth="1.5" strokeLinecap="round"/>

                {/* Notebook */}
                <rect x="44" y="186" width="42" height="32" rx="4" fill="#1c2a3a"/>
                <rect x="50" y="190" width="32" height="24" rx="2" fill="#152030"/>
                <rect x="53" y="193" width="24" height="2.5" rx="1" fill="#2a4060" opacity="0.8"/>
                <rect x="53" y="198" width="18" height="2.5" rx="1" fill="#2a4060" opacity="0.6"/>
                <rect x="53" y="203" width="22" height="2.5" rx="1" fill="#f15a22" opacity="0.5"/>
                <rect x="53" y="208" width="14" height="2.5" rx="1" fill="#2a4060" opacity="0.4"/>
                <rect x="44" y="186" width="5" height="32" rx="2.5" fill="#f15a22" opacity="0.65"/>

                {/* Floating deco: curly braces */}
                <text x="362" y="52" fontFamily="monospace" fontSize="20" fill="#f15a22" opacity="0.35">{`{}`}</text>

                {/* Gear */}
                <g opacity="0.4" transform="translate(50,60)">
                  <circle cx="0" cy="0" r="10" fill="none" stroke="#f15a22" strokeWidth="1.8"/>
                  <circle cx="0" cy="0" r="4" fill="none" stroke="#f15a22" strokeWidth="1.8"/>
                  <rect x="-1.8" y="-13" width="3.6" height="6" rx="1.8" fill="#f15a22"/>
                  <rect x="-1.8" y="7"   width="3.6" height="6" rx="1.8" fill="#f15a22"/>
                  <rect x="7"    y="-1.8" width="6"   height="3.6" rx="1.8" fill="#f15a22"/>
                  <rect x="-13"  y="-1.8" width="6"   height="3.6" rx="1.8" fill="#f15a22"/>
                </g>

                {/* Spark */}
                <g transform="translate(376,18)" opacity="0.38">
                  <path d="M0,-7 L1.8,-1.8 L7,0 L1.8,1.8 L0,7 L-1.8,1.8 L-7,0 L-1.8,-1.8Z" fill="#f15a22"/>
                </g>

                {/* Signal dots */}
                <circle cx="52" cy="148" r="3.5" fill="#f15a22" opacity="0.25"/>
                <circle cx="64" cy="148" r="3.5" fill="#f15a22" opacity="0.45"/>
                <circle cx="76" cy="148" r="3.5" fill="#f15a22" opacity="0.65"/>
              </svg>
            </div>
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
              maxWidth: 680,        
              margin: "0 auto",
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
"use client";

import React, { useState } from "react";
import { Cpu } from "lucide-react";
import CTutorialPage from "../c/pages/CTutorialPage"; // Import C tutorial feature directly
import JavaTutorialPage from "../java/pages/JavaTutorialPage"; // Import Java tutorial feature

// Official stylized programming language logo SVGs
const CLogo = (props: any) => (
  <svg viewBox="0 0 306 344.35" width="22" height="22" className={props.className} style={props.style}>
    <path fill="#00599C" d="M302.107,258.262c2.401-4.159,3.893-8.845,3.893-13.053V99.14c0-4.208-1.49-8.893-3.892-13.052L153,172.175 L302.107,258.262z"/>
    <path fill="#004482" d="M166.25,341.193l126.5-73.034c3.644-2.104,6.956-5.737,9.357-9.897L153,172.175L3.893,258.263 c2.401,4.159,5.714,7.793,9.357,9.896l126.5,73.034C147.037,345.401,158.963,345.401,166.25,341.193z"/>
    <path fill="#659AD2" d="M302.108,86.087c-2.402-4.16-5.715-7.793-9.358-9.897L166.25,3.156c-7.287-4.208-19.213-4.208-26.5,0 L13.25,76.19C5.962,80.397,0,90.725,0,99.14v146.069c0,4.208,1.491,8.894,3.893,13.053L153,172.175L302.108,86.087z"/>
    <g>
      <path fill="#FFFFFF" d="M153,274.175c-56.243,0-102-45.757-102-102s45.757-102,102-102c36.292,0,70.139,19.53,88.331,50.968 l-44.143,25.544c-9.105-15.736-26.038-25.512-44.188-25.512c-28.122,0-51,22.878-51,51c0,28.121,22.878,51,51,51 c18.152,0,35.085-9.776,44.191-25.515l44.143,25.543C223.142,254.644,189.294,274.175,153,274.175z"/>
    </g>
  </svg>
);

const JavaLogo = (props: any) => (
  <svg viewBox="0 0 128 128" width="22" height="22" className={props.className} style={props.style}>
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
    <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
  </svg>
);

const CppLogo = (props: any) => (
  <svg viewBox="0 0 306 344.35" width="22" height="22" className={props.className} style={props.style}>
    <path fill="#00599C" d="M302.107,258.262c2.401-4.159,3.893-8.845,3.893-13.053V99.14c0-4.208-1.49-8.893-3.892-13.052L153,172.175 L302.107,258.262z"/>
    <path fill="#004482" d="M166.25,341.193l126.5-73.034c3.644-2.104,6.956-5.737,9.357-9.897L153,172.175L3.893,258.263 c2.401,4.159,5.714,7.793,9.357,9.896l126.5,73.034C147.037,345.401,158.963,345.401,166.25,341.193z"/>
    <path fill="#659AD2" d="M302.108,86.087c-2.402-4.16-5.715-7.793-9.358-9.897L166.25,3.156c-7.287-4.208-19.213-4.208-26.5,0 L13.25,76.19C5.962,80.397,0,90.725,0,99.14v146.069c0,4.208,1.491,8.894,3.893,13.053L153,172.175L302.108,86.087z"/>
    <g>
      <path fill="#FFFFFF" d="M153,274.175c-56.243,0-102-45.757-102-102s45.757-102,102-102c36.292,0,70.139,19.53,88.331,50.968 l-44.143,25.544c-9.105-15.736-26.038-25.512-44.188-25.512c-28.122,0-51,22.878-51,51c0,28.121,22.878,51,51,51 c18.152,0,35.085-9.776,44.191-25.515l44.143,25.543C223.142,254.644,189.294,274.175,153,274.175z"/>
    </g>
    <g>
      <polygon fill="#FFFFFF" points="255,166.508 243.666,166.508 243.666,155.175 232.334,155.175 232.334,166.508 221,166.508 221,177.841 232.334,177.841 232.334,189.175 243.666,189.175 243.666,177.841 255,177.841"/>
    </g>
    <g>
      <polygon fill="#FFFFFF" points="297.5,166.508 286.166,166.508 286.166,155.175 274.834,155.175 274.834,166.508 263.5,166.508 263.5,177.841 274.834,177.841 274.834,189.175 286.166,189.175 286.166,177.841 297.5,177.841"/>
    </g>
  </svg>
);

const SUBJECTS = [
  { 
    id: "c",
    title: "C Programming", 
    description: "Learn pointers, dynamic allocations, and syntax structure with interview questions.", 
    icon: CLogo, 
    color: "#ff6b35" 
  },
  {
    id: "java",
    title: "Java Programming",
    description: "Master classes, objects, exception handling, and collections with interactive exercises.",
    icon: JavaLogo,
    color: "#e2433b"
  },
  { 
    id: "oop",
    title: "OOP Principles", 
    description: "Understand classes, interfaces, inheritance, and polymorphism patterns.", 
    icon: Cpu, 
    color: "#a855f7",
    disabled: true 
  },
  { 
    id: "cpp",
    title: "C++ Programming", 
    description: "Master STL, memory handling, template arguments, and class scopes.", 
    icon: CppLogo, 
    color: "#6c63ff",
    disabled: true 
  },
];

export default function TutorialsPage() {
  // Add state to track which subject is active (null means show cards list)
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // If a subject is selected, render it instead of the landing list
  if (activeSubject === "c") {
    return <CTutorialPage onBack={() => setActiveSubject(null)} />;
  }

  if (activeSubject === "java") {
    return <JavaTutorialPage onBack={() => setActiveSubject(null)} />;
  }

  return (
    <div className="p-6 animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "24px", fontWeight: 800, color: "var(--text)" }}>
           Tutorials
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Step-by-step programming language guides and high-frequency interview questions
        </p>
      </div>

      {/* Grid List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        {SUBJECTS.map((sub) => {
          const cardContent = (
            <div
              onClick={() => {
                if (!sub.disabled) setActiveSubject(sub.id);
              }}
              style={{
                background: "var(--surface)", 
                border: "1px solid var(--border)",
                borderRadius: "12px", 
                padding: "20px", 
                cursor: sub.disabled ? "not-allowed" : "pointer",
                transition: "all 0.18s ease", 
                opacity: sub.disabled ? 0.5 : 1,
                minHeight: "150px",
                display: "flex", 
                flexDirection: "column", 
                height: "100%", 
                flexGrow: 1,
              }}
              onMouseEnter={e => {
                if (!sub.disabled) {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${sub.color}`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${sub.color}30`;
                }
              }}
              onMouseLeave={e => {
                if (!sub.disabled) {
                  (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }
              }}
            >
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: `${sub.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px"
              }}>
                <sub.icon size={22} strokeWidth={2} style={{ color: sub.color }} />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", margin: 0 }}>{sub.title}</h3>
                {sub.disabled && (
                  <span className="text-[10px] bg-white/5 border border-white/10 text-gray-500 px-1.5 py-0.5 rounded font-bold">Soon</span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted2)", margin: 0, lineHeight: 1.4, flexGrow: 1 }}>{sub.description}</p>
            </div>
          );

          return <div key={sub.title}>{cardContent}</div>;
        })}
      </div>
    </div>
  );
}
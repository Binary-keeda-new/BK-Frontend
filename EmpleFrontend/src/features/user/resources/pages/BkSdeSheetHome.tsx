"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ============================================================
   TYPES
   ============================================================ */
type CoreSubject = {
  id: string;
  name: string;
  icon: string;
  overview: string;
  topics: string[];
  importance: string;
  notesHref: string;
};

type InterviewCategory = {
  name: string;
  icon: string;
  description: string;
  importance: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

type CompanyPrep = {
  name: string;
  logo: string;
  focusAreas: string[];
  topics: string[];
  path: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

type NavSection = {
  id: string;
  label: string;
  icon: string;
};

/* ============================================================
   DATA
   ============================================================ */
const NAV_SECTIONS: NavSection[] = [
  { id: "coding-practice", label: "Coding Practice", icon: "💻" },
  { id: "core-subjects", label: "Core Subjects", icon: "📘" },
  { id: "aptitude", label: "Aptitude", icon: "🔢" },
  { id: "interview-questions", label: "Interview Qs", icon: "🎯" },
  { id: "mock-tests", label: "Mock Tests", icon: "📝" },
  { id: "notes", label: "Notes", icon: "📚" },
  { id: "company-prep", label: "Company Prep", icon: "🏢" },
  { id: "resume-guide", label: "Resume Guide", icon: "📄" },
];

const CORE_SUBJECTS: CoreSubject[] = [
  {
    id: "os",
    name: "Operating Systems",
    icon: "🖥️",
    overview:
      "Operating Systems form the foundation of modern computing by managing hardware resources, processes, memory, file systems, and scheduling. OS concepts are among the most frequently asked topics in technical interviews.",
    topics: ["Process Scheduling", "Deadlocks", "Memory Management", "Paging & Segmentation", "File Systems", "Threads & Concurrency"],
    importance: "Asked in almost every SDE interview — especially process/thread differences and deadlock handling.",
    notesHref: "/user/resources/gate-notes",
  },
  {
    id: "dbms",
    name: "DBMS",
    icon: "🗄️",
    overview:
      "Database Management Systems help store, organize, retrieve, and manage data efficiently. Topics such as normalization, indexing, transactions, SQL queries, and ACID properties are highly important for interviews.",
    topics: ["Normalization", "Indexing", "Transactions & ACID", "SQL Joins", "ER Models", "Locking & Concurrency"],
    importance: "Core to backend roles — SQL query rounds and normalization questions are extremely common.",
    notesHref: "/user/resources/gate-notes",
  },
  {
    id: "cn",
    name: "Computer Networks",
    icon: "🌐",
    overview:
      "Computer Networks enable communication between systems through protocols and layered architectures. Interview questions commonly focus on TCP/IP, HTTP, DNS, routing, and network security.",
    topics: ["OSI & TCP/IP Model", "HTTP/HTTPS", "DNS", "Routing Algorithms", "TCP vs UDP", "Network Security Basics"],
    importance: "Common in infra/backend interviews — TCP vs UDP and the request lifecycle are favorites.",
    notesHref: "/user/resources/gate-notes",
  },
  {
    id: "oops",
    name: "OOPs",
    icon: "🧩",
    overview:
      "Object-Oriented Programming introduces concepts such as encapsulation, inheritance, polymorphism, and abstraction which are fundamental to software engineering.",
    topics: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "SOLID Principles", "Design Patterns"],
    importance: "Universal across every coding interview — expect conceptual and code-based questions both.",
    notesHref: "/user/resources/gate-notes",
  },
  {
    id: "system-design",
    name: "System Design",
    icon: "🏗️",
    overview:
      "System Design focuses on building scalable, distributed, and reliable systems. Topics include load balancing, caching, databases, microservices, scalability, and architecture patterns.",
    topics: ["Load Balancing", "Caching Strategies", "Database Sharding", "Microservices", "Message Queues", "CAP Theorem"],
    importance: "Critical for 2+ years experience roles — expect 'Design X' style open-ended rounds.",
    notesHref: "/user/resources/gate-notes",
  },
];

const APTITUDE_TOPICS = [
  "Percentage", "Profit and Loss", "Time and Work", "Time Speed Distance",
  "Ratio and Proportion", "Probability", "Permutation and Combination",
  "Number System", "Data Interpretation",
];

const INTERVIEW_CATEGORIES: InterviewCategory[] = [
  { name: "OOPs", icon: "🧩", description: "Encapsulation, inheritance, polymorphism and abstraction based questions.", importance: "Very High", difficulty: "Beginner" },
  { name: "DBMS", icon: "🗄️", description: "SQL queries, normalization, indexing and transaction-based questions.", importance: "Very High", difficulty: "Intermediate" },
  { name: "Computer Networks", icon: "🌐", description: "Protocol stacks, HTTP, DNS and routing questions.", importance: "High", difficulty: "Intermediate" },
  { name: "Operating Systems", icon: "🖥️", description: "Process scheduling, memory management and deadlock scenarios.", importance: "Very High", difficulty: "Intermediate" },
  { name: "Machine Learning", icon: "🤖", description: "Core ML concepts, model evaluation and algorithm tradeoffs.", importance: "Medium", difficulty: "Advanced" },
  { name: "Cyber Security", icon: "🔒", description: "Common vulnerabilities, encryption and secure coding practices.", importance: "Medium", difficulty: "Advanced" },
  { name: "DevOps", icon: "⚙️", description: "CI/CD pipelines, containers, and deployment strategy questions.", importance: "Medium", difficulty: "Intermediate" },
  { name: "System Design", icon: "🏗️", description: "Scalability, architecture and distributed systems questions.", importance: "Very High", difficulty: "Advanced" },
];

const COMPANY_PREP: CompanyPrep[] = [
  { name: "Google", logo: "🔍", focusAreas: ["DSA", "System Design", "Googleyness"], topics: ["Graphs", "DP", "Distributed Systems"], path: "Strong DSA + scalable system design rounds", difficulty: "Advanced" },
  { name: "Amazon", logo: "📦", focusAreas: ["Leadership Principles", "DSA", "System Design"], topics: ["Trees", "Arrays", "OOD"], path: "Behavioral rounds tied closely to Leadership Principles", difficulty: "Intermediate" },
  { name: "Microsoft", logo: "🪟", focusAreas: ["DSA", "Problem Solving", "OOD"], topics: ["Linked Lists", "Recursion", "Design Patterns"], path: "Balanced coding + design across rounds", difficulty: "Intermediate" },
  { name: "Adobe", logo: "🎨", focusAreas: ["DSA", "CS Fundamentals", "Projects"], topics: ["OOPs", "DBMS", "Web Tech"], path: "Strong fundamentals + project deep-dives", difficulty: "Intermediate" },
  { name: "Atlassian", logo: "🪐", focusAreas: ["DSA", "Values Fit", "Collaboration"], topics: ["Hashmaps", "Strings", "API Design"], path: "Coding + strong culture-fit conversations", difficulty: "Intermediate" },
  { name: "Walmart", logo: "🛒", focusAreas: ["DSA", "System Design", "OOD"], topics: ["Arrays", "Graphs", "Scalability"], path: "Practical DSA followed by e-commerce scale design", difficulty: "Intermediate" },
  { name: "Goldman Sachs", logo: "🏦", focusAreas: ["DSA", "CS Fundamentals", "Aptitude"], topics: ["DP", "OOPs", "DBMS"], path: "Heavy fundamentals + quant aptitude rounds", difficulty: "Advanced" },
  { name: "JP Morgan", logo: "💼", focusAreas: ["DSA", "Java/OOD", "Aptitude"], topics: ["Multithreading", "SQL", "Design Patterns"], path: "Java-heavy technical rounds with aptitude screening", difficulty: "Advanced" },
];

const RESUME_CHECKLIST = [
  "One page only (unless 8+ years experience)",
  "Reverse chronological order",
  "Quantify achievements with numbers",
  "Use action verbs (built, optimized, led)",
  "Tailor keywords to job description",
  "No spelling or grammar errors",
  "Consistent formatting and fonts",
  "Include GitHub/portfolio links",
];

const RESUME_MISTAKES = [
  "Using an unprofessional email address",
  "Listing skills without proof or projects",
  "Generic objective statements",
  "Including irrelevant personal details",
  "Overly designed templates that break ATS parsing",
  "Listing every technology you've ever touched",
];

const RESUME_TIPS = [
  "Lead each bullet with impact, not just task",
  "Use the STAR method for project descriptions",
  "Keep a master resume, tailor a copy per application",
  "Get 2-3 people to review before submitting",
];

const difficultyColors = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/30",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/30",
};

const importanceColors: Record<string, string> = {
  "Very High": "text-red-400",
  High: "text-orange-400",
  Medium: "text-yellow-400",
};

/* ============================================================
   ROUTES TO EXISTING APP SECTIONS
   ============================================================ */
const ROUTES = {
  roadmaps: "/user/resources/roadmaps",
  gateNotes: "/user/resources/gate-notes",
  interviewQuestions: "/user/resources/interview-questions",
  practice: "/user/practice",
};

const APTITUDE_PLAYLIST = "https://www.youtube.com/playlist?list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt";

/* ============================================================
   SMALL REUSABLE COMPONENTS
   ============================================================ */
function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 text-left">
      <h2 className="text-2xl font-bold text-white mb-1 leading-tight">{title}</h2>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
}

function GoButton({
  href,
  label = "Open",
  external = false,
}: {
  href: string;
  label?: string;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label} <span>↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label} <span>→</span>
    </Link>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function BKSDESheet() {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const offsets = NAV_SECTIONS.map((s) => {
        const el = sectionRefs.current[s.id];
        if (!el) return { id: s.id, top: Infinity };
        return { id: s.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const matches = (text: string) => text.toLowerCase().includes(search.toLowerCase());

  const filteredCoreSubjects = search
    ? CORE_SUBJECTS.filter((s) => matches(s.name) || s.topics.some(matches))
    : CORE_SUBJECTS;

  const filteredInterviewCats = search
    ? INTERVIEW_CATEGORIES.filter((c) => matches(c.name))
    : INTERVIEW_CATEGORIES;

  const filteredCompanies = search
    ? COMPANY_PREP.filter((c) => matches(c.name))
    : COMPANY_PREP;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ============ HERO ============ */}
      <div className="px-8 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-white mb-1">BK SDE Sheet</h1>
        <p className="text-gray-400 text-sm mb-6">
          Everything you need for SDE interview prep — coding, core subjects, aptitude, mock tests and more, all in one place.
        </p>

        {/* Search Bar */}
        <div className="max-w-md relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics, subjects, companies..."
            className="w-full bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      {/* ============ STICKY NAV ============ */}
      <div className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 px-8 py-3 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeSection === s.id
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              }`}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-10 space-y-16 max-w-6xl mx-auto">

        {/* ============ 1. CODING PRACTICE ============ */}
        <div id="coding-practice" ref={(el) => { sectionRefs.current["coding-practice"] = el; }}>
          <SectionHeading title="Coding Practice" subtitle="Build consistency through structured daily practice." />
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 hover:border-gray-500 transition-all">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <h3 className="text-white font-bold text-lg mb-2">120 Days of Code</h3>
                <p className="text-gray-400 text-sm mb-4">
                  A structured coding challenge designed to build consistency, problem-solving ability, and interview readiness through daily coding practice — progressing from fundamentals to advanced DSA over 120 days.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-orange-400 font-bold text-sm">Days 1-40</p>
                    <p className="text-gray-500 text-xs mt-1">Fundamentals</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-yellow-400 font-bold text-sm">Days 41-80</p>
                    <p className="text-gray-500 text-xs mt-1">Core DSA</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-red-400 font-bold text-sm">Days 81-120</p>
                    <p className="text-gray-500 text-xs mt-1">Advanced & Mocks</p>
                  </div>
                </div>
                <ul className="text-gray-400 text-xs space-y-1 mb-4">
                  <li>✓ Builds daily problem-solving discipline</li>
                  <li>✓ Gradual difficulty progression keeps you from burning out</li>
                  <li>✓ Mirrors real interview prep timelines used by top performers</li>
                </ul>
              </div>
            </div>
            <GoButton href={ROUTES.roadmaps} label="Start 120 Days of Code" />
          </div>
        </div>

        {/* ============ 2. CORE CS SUBJECTS ============ */}
        <div id="core-subjects" ref={(el) => { sectionRefs.current["core-subjects"] = el; }}>
          <SectionHeading title="Core CS Subjects" subtitle="Master the fundamentals interviewers ask about every single time." />
          {filteredCoreSubjects.length === 0 ? (
            <p className="text-gray-500 text-sm">No subjects match your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filteredCoreSubjects.map((subject) => {
                const isOpen = expandedSubject === subject.id;
                return (
                  <div key={subject.id} className="rounded-xl border border-gray-700 bg-gray-900 overflow-hidden hover:border-gray-500 transition-all">
                    <button
                      onClick={() => setExpandedSubject(isOpen ? null : subject.id)}
                      className="w-full text-left p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{subject.icon}</span>
                          <h3 className="text-white font-bold text-base">{subject.name}</h3>
                        </div>
                        <span className={`text-gray-500 text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 space-y-4 border-t border-gray-800 pt-4">
                        <p className="text-gray-400 text-xs leading-relaxed">{subject.overview}</p>

                        <div>
                          <p className="text-gray-500 text-xs mb-2 font-semibold uppercase tracking-wide">Key Topics</p>
                          <div className="flex flex-wrap gap-1.5">
                            {subject.topics.map((t) => (
                              <span key={t} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-700">{t}</span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <p className="text-gray-500 text-xs font-semibold mb-1">📌 Interview Importance</p>
                          <p className="text-gray-400 text-xs">{subject.importance}</p>
                        </div>

                        <GoButton href={subject.notesHref} label="View Notes" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ============ 3. APTITUDE ============ */}
        <div id="aptitude" ref={(el) => { sectionRefs.current["aptitude"] = el; }}>
          <SectionHeading title="Quantitative Aptitude" subtitle="A crucial filter round at almost every placement drive." />
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 hover:border-gray-500 transition-all">
            <p className="text-gray-400 text-sm mb-4">
              Aptitude is an important component of placement assessments and hiring tests. Strong aptitude skills improve logical thinking, numerical ability, and problem-solving speed.
            </p>
            <div className="mb-4">
              <p className="text-gray-500 text-xs mb-2 font-semibold uppercase tracking-wide">Topic Coverage</p>
              <div className="flex flex-wrap gap-1.5">
                {APTITUDE_TOPICS.map((t) => (
                  <span key={t} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-700">{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <p className="text-white text-sm font-semibold">CareerRide — Quantitative Aptitude Playlist</p>
              <p className="text-gray-500 text-xs">Complete video coverage of every placement aptitude topic</p>
            </div>
            <GoButton href={APTITUDE_PLAYLIST} label="Watch Playlist" external />
          </div>
        </div>

        {/* ============ 4. INTERVIEW QUESTIONS ============ */}
        <div id="interview-questions" ref={(el) => { sectionRefs.current["interview-questions"] = el; }}>
          <SectionHeading title="Interview Questions" subtitle="Category-wise curated questions to sharpen your concepts." />
          {filteredInterviewCats.length === 0 ? (
            <p className="text-gray-500 text-sm">No categories match your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredInterviewCats.map((cat) => (
                <div key={cat.name} className="rounded-xl border border-gray-700 bg-gray-900 p-4 hover:border-gray-500 transition-all flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[cat.difficulty]}`}>{cat.difficulty}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{cat.name}</h3>
                  <p className="text-gray-400 text-xs mb-2 flex-1">{cat.description}</p>
                  <p className={`text-xs mb-3 font-medium ${importanceColors[cat.importance]}`}>● {cat.importance} priority</p>
                  <GoButton href={ROUTES.interviewQuestions} label="Practice" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============ 5. MOCK TESTS ============ */}
        <div id="mock-tests" ref={(el) => { sectionRefs.current["mock-tests"] = el; }}>
          <SectionHeading title="Mock Tests" subtitle="Practice real interview-style assessments and evaluate readiness." />
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 hover:border-gray-500 transition-all">
            <p className="text-gray-400 text-sm mb-4">
              Simulate real interview pressure with structured mock tests — topic-wise drills or full mixed assessments — and get a clear read on where you stand before the real thing.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-white text-sm font-semibold">Topic-wise</p>
                <p className="text-gray-500 text-xs mt-1">Focused practice</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-white text-sm font-semibold">Mixed</p>
                <p className="text-gray-500 text-xs mt-1">Full assessment</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-white text-sm font-semibold">Performance</p>
                <p className="text-gray-500 text-xs mt-1">Score tracking</p>
              </div>
            </div>
            <GoButton href={ROUTES.practice} label="Start Mock Test" />
          </div>
        </div>

        {/* ============ 6. NOTES LIBRARY ============ */}
        <div id="notes" ref={(el) => { sectionRefs.current["notes"] = el; }}>
          <SectionHeading title="Notes Library" subtitle="Centralized collection of preparation notes for technical subjects." />
          <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 hover:border-gray-500 transition-all">
            <p className="text-gray-400 text-sm mb-4">
              Access handwritten and curated GATE-style notes covering every core subject — organized by topic for quick revision.
            </p>
            <GoButton href={ROUTES.gateNotes} label="Browse Notes" />
          </div>
        </div>

        {/* ============ 7. COMPANY-WISE PREP ============ */}
        <div id="company-prep" ref={(el) => { sectionRefs.current["company-prep"] = el; }}>
          <SectionHeading title="Company-wise Preparation" subtitle="Tailor your prep to how each company actually interviews." />
          {filteredCompanies.length === 0 ? (
            <p className="text-gray-500 text-sm">No companies match your search.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCompanies.map((c) => (
                <div key={c.name} className="rounded-xl border border-gray-700 bg-gray-900 p-4 hover:border-gray-500 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{c.logo}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[c.difficulty]}`}>{c.difficulty}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{c.name}</h3>
                  <p className="text-gray-500 text-xs mb-1 font-semibold">Focus Areas</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {c.focusAreas.map((f) => (
                      <span key={f} className="bg-gray-800 text-gray-300 text-xs px-1.5 py-0.5 rounded">{f}</span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mb-1 font-semibold">Key Topics</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {c.topics.map((t) => (
                      <span key={t} className="bg-gray-800 text-orange-400 text-xs px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">{c.path}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============ 8. RESUME GUIDE ============ */}
        <div id="resume-guide" ref={(el) => { sectionRefs.current["resume-guide"] = el; }}>
          <SectionHeading title="Resume Guide" subtitle="Build an ATS-friendly resume that gets you shortlisted." />
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-gray-700 bg-gray-900 p-5">
              <p className="text-white font-semibold text-sm mb-3">✅ Checklist</p>
              <ul className="space-y-2">
                {RESUME_CHECKLIST.map((item) => (
                  <li key={item} className="text-gray-400 text-xs flex gap-2">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-700 bg-gray-900 p-5">
              <p className="text-white font-semibold text-sm mb-3">⚠️ Common Mistakes</p>
              <ul className="space-y-2">
                {RESUME_MISTAKES.map((item) => (
                  <li key={item} className="text-gray-400 text-xs flex gap-2">
                    <span className="text-red-400">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-gray-700 bg-gray-900 p-5">
              <p className="text-white font-semibold text-sm mb-3">💡 Pro Tips</p>
              <ul className="space-y-2">
                {RESUME_TIPS.map((item) => (
                  <li key={item} className="text-gray-400 text-xs flex gap-2">
                    <span className="text-yellow-400">★</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";
import React from "react";
import { useState, useMemo } from "react";
import EmptyState from "@/shared/components/ui/EmptyState";
import { useTheme } from "@/providers/ThemeContext";
import {
  User, Calendar, Phone, Mail, MapPin, GraduationCap,
  BookOpen, Github, Linkedin, Code2, FileText, Wrench,
  FolderGit2, Edit3, Save, X,
} from "lucide-react";

const sections = [
  { label: "Personal Info",  icon: <User size={16} />,         fields: ["name","dob","contact","email","address"] },
  { label: "Academic Info",  icon: <GraduationCap size={16} />, fields: ["university","tenth","twelfth","semester","cgpa"] },
  { label: "Professional",   icon: <Code2 size={16} />,         fields: ["github","linkedin","codingProfile","resume","skills","projectsLink"] },
];

const fieldMeta: Record<string, { label: string; placeholder: string; icon: React.ReactNode; type?: string }> = {
  name:          { label: "Full Name",          placeholder: "John Doe",                    icon: <User size={14} /> },
  dob:           { label: "Date of Birth",      placeholder: "DD/MM/YYYY",                  icon: <Calendar size={14} />, type: "date" },
  contact:       { label: "Contact Number",     placeholder: "+91 9876543210",              icon: <Phone size={14} /> },
  email:         { label: "Email Address",      placeholder: "john@example.com",            icon: <Mail size={14} />, type: "email" },
  address:       { label: "Address",            placeholder: "City, State, Country",        icon: <MapPin size={14} /> },
  university:    { label: "University",         placeholder: "Your University Name",        icon: <GraduationCap size={14} /> },
  tenth:         { label: "10th Percentage",    placeholder: "e.g. 92.5%",                 icon: <BookOpen size={14} /> },
  twelfth:       { label: "12th Percentage",    placeholder: "e.g. 88.0%",                 icon: <BookOpen size={14} /> },
  semester:      { label: "Current Semester",   placeholder: "e.g. 6th",                   icon: <BookOpen size={14} /> },
  cgpa:          { label: "CGPA",               placeholder: "e.g. 8.5",                   icon: <BookOpen size={14} /> },
  github:        { label: "GitHub Profile",     placeholder: "https://github.com/you",     icon: <Github size={14} />, type: "url" },
  linkedin:      { label: "LinkedIn Profile",   placeholder: "https://linkedin.com/in/you", icon: <Linkedin size={14} />, type: "url" },
  codingProfile: { label: "Coding Profile",     placeholder: "LeetCode / Codeforces URL",  icon: <Code2 size={14} />, type: "url" },
  resume:        { label: "Resume Link",        placeholder: "Drive / Notion link",        icon: <FileText size={14} />, type: "url" },
  skills:        { label: "Skills",             placeholder: "React, Node.js, Python...",  icon: <Wrench size={14} /> },
  projectsLink:  { label: "Projects Link",      placeholder: "Portfolio / GitHub Repos",   icon: <FolderGit2 size={14} />, type: "url" },
};

type ProfileData = Record<string, string>;
const defaultData: ProfileData = Object.fromEntries(Object.keys(fieldMeta).map((k) => [k, ""]));

// ─── Mock activity data ───────────────────────────────────────────────────────
// Replace generateMockActivity with a real data fetch when backend is ready.
// Shape: Record<"YYYY-MM-DD", 0|1|2|3|4>
function generateMockActivity(): Record<string, 0 | 1 | 2 | 3 | 4> {
  return {};
}

// ─── Heatmap component ────────────────────────────────────────────────────────
const COLS = 52;
const ROWS = 7;
const CELL = 13;
const GAP  = 3;

function ActivityHeatmap({ isDark, activityData }: {
  isDark: boolean;
  activityData: Record<string, 0 | 1 | 2 | 3 | 4>;
}) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const hasData = Object.keys(activityData).length > 0;
  if (!hasData) {
    return (
      <div className="flex-1 min-h-0 mb-3 mt-4">
        <EmptyState
          title="No Activity Data"
          description="Activity data will appear here once you start using the platform."
          icon={<Calendar size={20} />}
        />
      </div>
    );
  }

  // dark-mode orange ramp: level 0 = near-invisible, 1-4 = progressively brighter
  const darkColors  = ["#1a1a1a", "#7c2d0e", "#c2410c", "#ea580c", "#f97316"];
  const lightColors = ["#f1f0ed", "#fed7aa", "#fb923c", "#ea580c", "#c2410c"];
  const colors = isDark ? darkColors : lightColors;

  // Build a grid: 52 columns × 7 rows, newest column on the right
  const today = new Date();
  // Align so today lands on the last cell of the last column
  const totalCells = COLS * ROWS;

  const cells: { date: string; level: 0 | 1 | 2 | 3 | 4; col: number; row: number }[] = [];
  for (let i = 0; i < totalCells; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (totalCells - 1 - i));
    const key = d.toISOString().split("T")[0];
    const col = Math.floor(i / ROWS);
    const row = i % ROWS;
    cells.push({ date: key, level: activityData[key] ?? 0, col, row });
  }

  const dayLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  // Month labels: find first cell of each month
  const monthLabels: { label: string; col: number }[] = [];
  cells.forEach(c => {
    if (c.row === 0) {
      const month = c.date.slice(5, 7);
      const last = monthLabels[monthLabels.length - 1];
      const label = new Date(c.date).toLocaleString("default", { month: "short" });
      if (!last || last.label !== label) {
        monthLabels.push({ label, col: c.col });
      }
    }
  });

  const svgW = COLS * (CELL + GAP) + 32;
  const svgH = ROWS * (CELL + GAP) + 28;

  return (
    <div style={{ position: "relative", overflowX: "auto" }}>
      <svg
        width={svgW} height={svgH}
        style={{ display: "block", fontFamily: "inherit" }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Month labels */}
        {monthLabels.map(({ label, col }) => (
          <text
            key={`${label}-${col}`}
            x={32 + col * (CELL + GAP)}
            y={11}
            fontSize={10}
            fill={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"}
          >
            {label}
          </text>
        ))}
        {/* Day labels */}
        {[1, 3, 5].map(r => (
          <text
            key={r}
            x={0} y={24 + r * (CELL + GAP) + CELL / 2 + 3}
            fontSize={10}
            fill={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
          >
            {dayLabels[r]}
          </text>
        ))}
        {/* Cells */}
        {cells.map(({ date, level, col, row }) => {
          const x = 32 + col * (CELL + GAP);
          const y = 18 + row * (CELL + GAP);
          return (
            <rect
              key={date}
              x={x} y={y}
              width={CELL} height={CELL}
              rx={3}
              fill={colors[level]}
              style={{ cursor: "pointer", transition: "opacity 0.1s" }}
              onMouseEnter={(e) => {
                const svg = (e.target as SVGRectElement).closest("svg")!.getBoundingClientRect();
                const rect = (e.target as SVGRectElement).getBoundingClientRect();
                setTooltip({
                  text: `${date} · level ${level}`,
                  x: rect.left - svg.left + CELL / 2,
                  y: rect.top - svg.top - 8,
                });
              }}
            />
          );
        })}
      </svg>
      {tooltip && (
        <div style={{
          position: "absolute",
          left: tooltip.x,
          top: tooltip.y,
          transform: "translate(-50%, -100%)",
          background: isDark ? "#1f1f1f" : "#111",
          color: "#fff",
          fontSize: 11,
          padding: "4px 8px",
          borderRadius: 5,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<ProfileData>(defaultData);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const activityData = useMemo(() => generateMockActivity(), []);

  const handleChange = (key: string, value: string) => setData((p) => ({ ...p, [key]: value }));
  const orange = "#f97316";

  const filled = Object.values(data).filter(v => v.trim() !== "").length;
  const total  = Object.keys(fieldMeta).length;
  const pct    = Math.round((filled / total) * 100);

  const totalActivity = useMemo(() =>
    Object.values(activityData).filter(v => v > 0).length, [activityData]);

  return (
    <>
      <style>{`
        .pr-root {
          min-height: 100vh;
          padding: 0;
          font-family: inherit;
          transition: background 0.3s, color 0.3s;
        }
        .pr-root.dark  { background: #0a0a0a; color: #f1f1f1; }
        .pr-root.light { background: #f4f4f2; color: #111827; }

        /* ── top banner ── */
        .pr-banner {
          width: 100%;
          padding: 32px 40px 28px;
          border-bottom: 1px solid;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .pr-banner.dark  { background: #111111; border-color: #222; }
        .pr-banner.light { background: #ffffff;  border-color: #e5e7eb; }

        .pr-avatar {
          width: 72px; height: 72px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; font-weight: 800; color: #fff;
          background: linear-gradient(135deg, #ea580c, #f97316);
          border: 3px solid ${orange};
          box-shadow: 0 0 0 4px rgba(249,115,22,0.15);
          flex-shrink: 0;
        }
        .pr-name  { font-size: 22px; font-weight: 700; }
        .pr-sub   { font-size: 13px; opacity: 0.45; margin-top: 3px; }

        .pr-stats-row {
          display: flex; gap: 24px; flex-wrap: wrap;
        }
        .pr-stat-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: 10px 20px; border-radius: 10px;
          border: 1px solid;
          min-width: 90px;
        }
        .pr-stat-pill.dark  { background: rgba(255,255,255,0.04); border-color: #2a2a2a; }
        .pr-stat-pill.light { background: #f9fafb; border-color: #e5e7eb; }
        .pr-stat-val  { font-size: 20px; font-weight: 700; color: ${orange}; }
        .pr-stat-lbl  { font-size: 11px; opacity: 0.4; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.06em; }

        /* ── body grid ── */
        .pr-body {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: calc(100vh - 160px);
        }
        @media (max-width: 860px) {
          .pr-body { grid-template-columns: 1fr; }
          .pr-sidebar { border-right: none !important; border-bottom: 1px solid; }
        }

        /* ── sidebar ── */
        .pr-sidebar {
          padding: 28px 20px;
          border-right: 1px solid;
          display: flex; flex-direction: column; gap: 8px;
        }
        .pr-sidebar.dark  { border-color: #1e1e1e; background: #111111; }
        .pr-sidebar.light { border-color: #e5e7eb; background: #ffffff; }

        .pr-sidebar-section { margin-bottom: 24px; }
        .pr-sidebar-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; opacity: 0.35;
          padding: 0 8px; margin-bottom: 6px;
        }

        .pr-nav-btn {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          border: none; background: transparent; cursor: pointer;
          font-size: 13px; font-weight: 600; text-align: left;
          transition: all 0.15s;
        }
        .pr-nav-btn.dark  { color: rgba(255,255,255,0.5); }
        .pr-nav-btn.light { color: #6b7280; }
        .pr-nav-btn.active-dark  { color: ${orange}; background: rgba(249,115,22,0.1); }
        .pr-nav-btn.active-light { color: ${orange}; background: rgba(249,115,22,0.08); }
        .pr-nav-btn:hover { color: ${orange}; background: rgba(249,115,22,0.06); }

        .pr-nav-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${orange}; margin-left: auto; flex-shrink: 0;
          opacity: 0; transition: opacity 0.2s;
        }
        .pr-nav-btn.active-dark .pr-nav-dot,
        .pr-nav-btn.active-light .pr-nav-dot { opacity: 1; }

        /* completion in sidebar */
        .pr-completion {
          padding: 16px; border-radius: 10px; border: 1px solid;
          margin-bottom: 8px;
        }
        .pr-completion.dark  { background: rgba(255,255,255,0.03); border-color: #222; }
        .pr-completion.light { background: #f9fafb; border-color: #e5e7eb; }
        .pr-comp-label { font-size: 12px; opacity: 0.4; display: flex; justify-content: space-between; margin-bottom: 8px; }
        .pr-comp-pct   { color: ${orange}; font-weight: 700; opacity: 1; }
        .pr-bar-bg     { height: 5px; border-radius: 99px; overflow: hidden; }
        .pr-bar-bg.dark  { background: rgba(255,255,255,0.07); }
        .pr-bar-bg.light { background: #e5e7eb; }
        .pr-bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #ea580c, #f97316);
          transition: width 0.5s ease;
        }

        /* ── main content ── */
        .pr-main { padding: 32px 36px; flex: 1; }

        /* heatmap card */
        .pr-heatmap-card {
          border-radius: 12px; border: 1px solid;
          padding: 22px 24px; margin-bottom: 28px;
        }
        .pr-heatmap-card.dark  { background: #111111; border-color: #1e1e1e; }
        .pr-heatmap-card.light { background: #ffffff;  border-color: #e5e7eb; }

        .pr-section-hd {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px;
        }
        .pr-section-title { font-size: 13px; font-weight: 700; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.07em; }
        .pr-legend {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; opacity: 0.4;
        }
        .pr-legend-cell { width: 11px; height: 11px; border-radius: 2px; }

        /* fields card */
        .pr-fields-card {
          border-radius: 12px; border: 1px solid;
          overflow: hidden;
        }
        .pr-fields-card.dark  { background: #111111; border-color: #1e1e1e; }
        .pr-fields-card.light { background: #ffffff;  border-color: #e5e7eb; }

        .pr-fields-header {
          padding: 16px 24px;
          border-bottom: 1px solid;
          display: flex; align-items: center; gap: 10px;
        }
        .pr-fields-header.dark  { border-color: #1e1e1e; }
        .pr-fields-header.light { border-color: #e5e7eb; }
        .pr-fields-title { font-size: 15px; font-weight: 700; }
        .pr-fields-subtitle { font-size: 12px; opacity: 0.4; margin-left: auto; }

        .pr-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          padding: 24px;
        }
        @media (max-width: 640px) { .pr-fields-grid { grid-template-columns: 1fr; } }

        .field-wrap { display: flex; flex-direction: column; gap: 6px; }
        .field-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; opacity: 0.4;
          display: flex; align-items: center; gap: 5px;
        }
        .field-value-box {
          display: flex; align-items: center; justify-content: space-between;
          border-radius: 9px; padding: 11px 14px;
          cursor: pointer; transition: all 0.18s;
          min-height: 44px; border: 1.5px solid transparent;
        }
        .field-value-box.dark  { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.07); }
        .field-value-box.light { background: #f9fafb; border-color: #e5e7eb; }
        .field-value-box:hover, .field-value-box.active {
          border-color: ${orange} !important;
          background: rgba(249,115,22,0.05) !important;
        }
        .field-value-text { font-size: 14px; font-weight: 500; }
        .field-empty { opacity: 0.3; font-style: italic; }
        .field-input {
          width: 100%; border-radius: 9px; padding: 11px 14px;
          font-size: 14px; font-weight: 500; outline: none;
          border: 1.5px solid ${orange}; transition: box-shadow 0.2s;
          box-sizing: border-box;
        }
        .field-input.dark  { background: rgba(249,115,22,0.05); color: #f1f1f1; box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
        .field-input.light { background: #fff7f3; color: #111827;  box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
        .edit-icon { opacity: 0; transition: opacity 0.15s; }
        .field-value-box:hover .edit-icon { opacity: 1; }

        /* save banner */
        .save-banner {
          margin: 0 24px 24px;
          border-radius: 10px; padding: 12px 18px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 13px; animation: slidein 0.2s ease;
        }
        .save-banner.dark  { background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25); color: ${orange}; }
        .save-banner.light { background: #fff7f3; border: 1px solid rgba(249,115,22,0.3); color: #c2410c; }
        .save-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 8px; border: none;
          background: ${orange}; color: #fff;
          font-size: 13px; font-weight: 700; cursor: pointer;
          transition: all 0.15s;
        }
        .save-btn:hover { background: #ea6c0a; transform: translateY(-1px); }
        .discard-btn {
          background: transparent; border: none; cursor: pointer;
          opacity: 0.5; padding: 4px; margin-left: 8px; transition: opacity 0.15s;
        }
        .discard-btn:hover { opacity: 1; }
        @keyframes slidein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={`pr-root ${isDark ? "dark" : "light"}`}>

        {/* ── Banner ── */}
        <div className={`pr-banner ${isDark ? "dark" : "light"}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div className="pr-avatar">
              {data.name ? data.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
            </div>
            <div>
              <div className="pr-name">{data.name || "Your Name"}</div>
              <div className="pr-sub">{data.email || "Complete your profile to get started"}</div>
              {data.university && (
                <div style={{ fontSize: 12, opacity: 0.5, marginTop: 3 }}>
                  {data.university}{data.semester ? ` · Semester ${data.semester}` : ""}
                </div>
              )}
            </div>
          </div>
          <div className="pr-stats-row">
            <div className={`pr-stat-pill ${isDark ? "dark" : "light"}`}>
              <span className="pr-stat-val">{pct}%</span>
              <span className="pr-stat-lbl">Complete</span>
            </div>
            <div className={`pr-stat-pill ${isDark ? "dark" : "light"}`}>
              <span className="pr-stat-val">{totalActivity}</span>
              <span className="pr-stat-lbl">Active days</span>
            </div>
            {data.cgpa && (
              <div className={`pr-stat-pill ${isDark ? "dark" : "light"}`}>
                <span className="pr-stat-val">{data.cgpa}</span>
                <span className="pr-stat-lbl">CGPA</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Body: sidebar + main ── */}
        <div className="pr-body">

          {/* Sidebar */}
          <aside className={`pr-sidebar ${isDark ? "dark" : "light"}`}>

            {/* Completion */}
            <div className={`pr-completion ${isDark ? "dark" : "light"}`}>
              <div className="pr-comp-label">
                <span>Profile completion</span>
                <span className="pr-comp-pct">{pct}%</span>
              </div>
              <div className={`pr-bar-bg ${isDark ? "dark" : "light"}`}>
                <div className="pr-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div style={{ fontSize: 11, opacity: 0.35, marginTop: 8 }}>
                {total - filled} field{total - filled !== 1 ? "s" : ""} remaining
              </div>
            </div>

            {/* Nav */}
            <div className="pr-sidebar-label">Sections</div>
            {sections.map((s, i) => (
              <button
                key={s.label}
                className={`pr-nav-btn ${
                  activeSection === i
                    ? isDark ? "active-dark" : "active-light"
                    : isDark ? "dark" : "light"
                }`}
                onClick={() => setActiveSection(i)}
              >
                {s.icon}
                {s.label}
                <span className="pr-nav-dot" />
              </button>
            ))}

            {/* Quick links from data */}
            {(data.github || data.linkedin || data.resume) && (
              <>
                <div className="pr-sidebar-label" style={{ marginTop: 16 }}>Quick links</div>
                {data.github && (
                  <a href={data.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                      fontSize: 12, color: isDark ? "rgba(255,255,255,0.45)" : "#6b7280",
                      textDecoration: "none", borderRadius: 7 }}>
                    <Github size={13} /> GitHub
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                      fontSize: 12, color: isDark ? "rgba(255,255,255,0.45)" : "#6b7280",
                      textDecoration: "none", borderRadius: 7 }}>
                    <Linkedin size={13} /> LinkedIn
                  </a>
                )}
                {data.resume && (
                  <a href={data.resume} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                      fontSize: 12, color: isDark ? "rgba(255,255,255,0.45)" : "#6b7280",
                      textDecoration: "none", borderRadius: 7 }}>
                    <FileText size={13} /> Resume
                  </a>
                )}
              </>
            )}
          </aside>

          {/* Main */}
          <main className="pr-main">

            {/* Activity Heatmap */}
            <div className={`pr-heatmap-card ${isDark ? "dark" : "light"}`}>
              <div className="pr-section-hd">
                <span className="pr-section-title">Activity Heatmap</span>
                <div className="pr-legend">
                  <span>Less</span>
                  {(isDark
                    ? ["#1a1a1a","#7c2d0e","#c2410c","#ea580c","#f97316"]
                    : ["#f1f0ed","#fed7aa","#fb923c","#ea580c","#c2410c"]
                  ).map((c, i) => (
                    <div key={i} className="pr-legend-cell" style={{ background: c }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
              <ActivityHeatmap isDark={isDark} activityData={activityData} />
            </div>

            {/* Fields card */}
            <div className={`pr-fields-card ${isDark ? "dark" : "light"}`}>
              <div className={`pr-fields-header ${isDark ? "dark" : "light"}`}>
                <span style={{ color: orange }}>{sections[activeSection].icon}</span>
                <span className="pr-fields-title">{sections[activeSection].label}</span>
                <span className="pr-fields-subtitle">
                  {sections[activeSection].fields.filter(k => data[k].trim()).length} / {sections[activeSection].fields.length} filled
                </span>
              </div>

              <div className="pr-fields-grid">
                {sections[activeSection].fields.map((key) => {
                  const meta = fieldMeta[key];
                  const isEditing = editing === key;
                  return (
                    <div className="field-wrap" key={key}>
                      <div className="field-label">{meta.icon} {meta.label}</div>
                      {isEditing ? (
                        <input
                          autoFocus
                          type={meta.type || "text"}
                          value={data[key]}
                          onChange={(e) => handleChange(key, e.target.value)}
                          onBlur={() => setEditing(null)}
                          onKeyDown={(e) => e.key === "Enter" && setEditing(null)}
                          placeholder={meta.placeholder}
                          className={`field-input ${isDark ? "dark" : "light"}`}
                        />
                      ) : (
                        <div
                          className={`field-value-box ${isDark ? "dark" : "light"}`}
                          onClick={() => setEditing(key)}
                        >
                          <span className={`field-value-text ${!data[key] ? "field-empty" : ""}`}>
                            {data[key] || meta.placeholder}
                          </span>
                          <Edit3 size={13} className="edit-icon" style={{ color: orange, flexShrink: 0 }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Save banner */}
              {Object.values(data).some(v => v.trim() !== "") && (
                <div className={`save-banner ${isDark ? "dark" : "light"}`}>
                  <span>You have unsaved changes</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button className="save-btn"><Save size={13} /> Save Profile</button>
                    <button
                      className="discard-btn"
                      style={{ color: isDark ? "#fff" : "#374151" }}
                      onClick={() => setData(defaultData)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
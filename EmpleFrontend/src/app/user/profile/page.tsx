"use client";
import React from "react";
import { useState } from "react";
import { useTheme } from "@/view/user/contexts/ThemeContext";
import {
  User, Calendar, Phone, Mail, MapPin, GraduationCap,
  BookOpen, Github, Linkedin, Code2, FileText, Wrench,
  FolderGit2, Edit3, Save, X, ChevronRight
} from "lucide-react";

const sections = [
  {
    label: "Personal Info",
    icon: <User size={16} />,
    fields: ["name", "dob", "contact", "email", "address"],
  },
  {
    label: "Academic Info",
    icon: <GraduationCap size={16} />,
    fields: ["university", "tenth", "twelfth", "semester", "cgpa"],
  },
  {
    label: "Professional",
    icon: <Code2 size={16} />,
    fields: ["github", "linkedin", "codingProfile", "resume", "skills", "projectsLink"],
  },
];


const fieldMeta: Record<string, { label: string; placeholder: string; icon: React.ReactNode; type?: string }> = {

  name:         { label: "Full Name",          placeholder: "John Doe",                   icon: <User size={14} /> },
  dob:          { label: "Date of Birth",      placeholder: "DD/MM/YYYY",                 icon: <Calendar size={14} />, type: "date" },
  contact:      { label: "Contact Number",     placeholder: "+91 9876543210",             icon: <Phone size={14} /> },
  email:        { label: "Email Address",      placeholder: "john@example.com",           icon: <Mail size={14} />, type: "email" },
  address:      { label: "Address",            placeholder: "City, State, Country",       icon: <MapPin size={14} /> },
  university:   { label: "University",         placeholder: "Your University Name",       icon: <GraduationCap size={14} /> },
  tenth:        { label: "10th Percentage",    placeholder: "e.g. 92.5%",                icon: <BookOpen size={14} /> },
  twelfth:      { label: "12th Percentage",    placeholder: "e.g. 88.0%",                icon: <BookOpen size={14} /> },
  semester:     { label: "Current Semester",   placeholder: "e.g. 6th",                  icon: <BookOpen size={14} /> },
  cgpa:         { label: "CGPA",               placeholder: "e.g. 8.5",                  icon: <BookOpen size={14} /> },
  github:       { label: "GitHub Profile",     placeholder: "https://github.com/you",    icon: <Github size={14} />, type: "url" },
  linkedin:     { label: "LinkedIn Profile",   placeholder: "https://linkedin.com/in/you", icon: <Linkedin size={14} />, type: "url" },
  codingProfile:{ label: "Coding Profile",     placeholder: "LeetCode / Codeforces URL", icon: <Code2 size={14} />, type: "url" },
  resume:       { label: "Resume Link",        placeholder: "Drive / Notion link",       icon: <FileText size={14} />, type: "url" },
  skills:       { label: "Skills",             placeholder: "React, Node.js, Python...", icon: <Wrench size={14} /> },
  projectsLink: { label: "Projects Link",      placeholder: "Portfolio / GitHub Repos",  icon: <FolderGit2 size={14} />, type: "url" },
};

type ProfileData = Record<string, string>;

const defaultData: ProfileData = Object.fromEntries(Object.keys(fieldMeta).map((k) => [k, ""]));

export default function ProfilePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<ProfileData>(defaultData);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const handleChange = (key: string, value: string) => setData((p) => ({ ...p, [key]: value }));

  const orange = "#f97316";

  return (
    <>
      <style>{`
        .profile-root {
          min-height: 100vh;
          padding: 32px 24px;
          transition: background 0.3s, color 0.3s;
        }
        .profile-root.dark { background: var(--bg, #0f0f0f); color: var(--text, #f1f1f1); }
        .profile-root.light { background: #f9fafb; color: #111827; }

        .profile-card {
          max-width: 860px;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          transition: background 0.3s, border 0.3s, box-shadow 0.3s;
        }
        .profile-card.dark {
          background: var(--surface, #1a1a1a);
          border: 1px solid var(--border, #2a2a2a);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .profile-card.light {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }

        /* Header */
        .profile-header {
          padding: 28px 32px 20px;
          border-bottom: 1px solid;
          display: flex; align-items: center; gap: 20px;
        }
        .profile-header.dark { border-color: var(--border, #2a2a2a); }
        .profile-header.light { border-color: #e5e7eb; }

        .avatar-ring {
          width: 68px; height: 68px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 800; color: #fff;
          background: linear-gradient(135deg, #f97316, #fb923c);
          border: 3px solid ${orange};
          box-shadow: 0 0 0 4px rgba(249,115,22,0.15);
          flex-shrink: 0;
        }
        .profile-name { font-size: 20px; font-weight: 700; }
        .profile-sub { font-size: 13px; opacity: 0.5; margin-top: 2px; }

        /* Tab nav */
        .tab-nav {
          display: flex; gap: 4px;
          padding: 16px 32px 0;
          border-bottom: 1px solid;
        }
        .tab-nav.dark { border-color: var(--border, #2a2a2a); }
        .tab-nav.light { border-color: #e5e7eb; }

        .tab-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 16px 11px;
          border: none; background: transparent; cursor: pointer;
          font-size: 13px; font-weight: 600;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          border-radius: 8px 8px 0 0;
        }
        .tab-btn.dark { color: rgba(255,255,255,0.45); }
        .tab-btn.light { color: #6b7280; }
        .tab-btn.active-dark { color: ${orange}; border-bottom-color: ${orange}; background: rgba(249,115,22,0.06); }
        .tab-btn.active-light { color: ${orange}; border-bottom-color: ${orange}; background: rgba(249,115,22,0.05); }
        .tab-btn:hover { color: ${orange}; }

        /* Fields grid */
        .fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          padding: 28px 32px 32px;
        }
        @media (max-width: 600px) { .fields-grid { grid-template-columns: 1fr; } }

        .field-wrap { display: flex; flex-direction: column; gap: 6px; }

        .field-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase; opacity: 0.45;
          display: flex; align-items: center; gap: 5px;
        }

        .field-value-box {
          display: flex; align-items: center; justify-content: space-between;
          border-radius: 10px; padding: 11px 14px;
          cursor: pointer; transition: all 0.18s;
          min-height: 44px;
          border: 1.5px solid transparent;
        }
        .field-value-box.dark {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.07);
        }
        .field-value-box.light {
          background: #f9fafb;
          border-color: #e5e7eb;
        }
        .field-value-box:hover, .field-value-box.active {
          border-color: ${orange} !important;
          background: rgba(249,115,22,0.05) !important;
        }
        .field-value-text { font-size: 14px; font-weight: 500; }
        .field-empty { opacity: 0.3; font-style: italic; }

        .field-input {
          width: 100%; border-radius: 10px; padding: 11px 14px;
          font-size: 14px; font-weight: 500; outline: none;
          border: 1.5px solid ${orange};
          transition: box-shadow 0.2s;
        }
        .field-input.dark {
          background: rgba(249,115,22,0.05);
          color: #f1f1f1;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.12);
        }
        .field-input.light {
          background: #fff7f3;
          color: #111827;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
        }

        .edit-icon { opacity: 0; transition: opacity 0.15s; }
        .field-value-box:hover .edit-icon { opacity: 1; }

        /* Save banner */
        .save-banner {
          margin: 0 32px 24px;
          border-radius: 10px;
          padding: 12px 18px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 13px;
          animation: slidein 0.2s ease;
        }
        .save-banner.dark { background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25); color: ${orange}; }
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
          opacity: 0.5; padding: 4px; margin-left: 8px;
          transition: opacity 0.15s;
        }
        .discard-btn:hover { opacity: 1; }

        @keyframes slidein {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .completion-bar-wrap { padding: 0 32px 20px; }
        .completion-label { font-size: 12px; opacity: 0.45; margin-bottom: 6px; display: flex; justify-content: space-between; }
        .bar-bg {
          height: 5px; border-radius: 99px; overflow: hidden;
        }
        .bar-bg.dark { background: rgba(255,255,255,0.07); }
        .bar-bg.light { background: #e5e7eb; }
        .bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transition: width 0.5s ease;
        }
      `}</style>

      <div className={`profile-root ${isDark ? "dark" : "light"}`}>
        <div className={`profile-card ${isDark ? "dark" : "light"}`}>

          {/* Header */}
          <div className={`profile-header ${isDark ? "dark" : "light"}`}>
            <div className="avatar-ring">
              {data.name ? data.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U"}
            </div>
            <div>
              <div className="profile-name">{data.name || "Your Name"}</div>
              <div className="profile-sub">{data.email || "Complete your profile to get started"}</div>
            </div>
          </div>

          {/* Completion Bar */}
          {(() => {
            const filled = Object.values(data).filter(v => v.trim() !== "").length;
            const total = Object.keys(fieldMeta).length;
            const pct = Math.round((filled / total) * 100);
            return (
              <div className="completion-bar-wrap" style={{ paddingTop: 20 }}>
                <div className="completion-label">
                  <span>Profile Completion</span>
                  <span style={{ color: orange, fontWeight: 700 }}>{pct}%</span>
                </div>
                <div className={`bar-bg ${isDark ? "dark" : "light"}`}>
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })()}

          {/* Tabs */}
          <div className={`tab-nav ${isDark ? "dark" : "light"}`}>
            {sections.map((s, i) => (
              <button
                key={s.label}
                className={`tab-btn ${
                  activeSection === i
                    ? isDark ? "active-dark" : "active-light"
                    : isDark ? "dark" : "light"
                }`}
                onClick={() => setActiveSection(i)}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="fields-grid">
            {sections[activeSection].fields.map((key) => {
              const meta = fieldMeta[key];
              const isEditing = editing === key;
              return (
                <div className="field-wrap" key={key}>
                  <div className="field-label">
                    {meta.icon} {meta.label}
                  </div>
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

          {/* Save banner — shows if any field is filled */}
          {Object.values(data).some(v => v.trim() !== "") && (
            <div className={`save-banner ${isDark ? "dark" : "light"}`}>
              <span>You have unsaved changes</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button className="save-btn">
                  <Save size={13} /> Save Profile
                </button>
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
      </div>
    </>
  );
}
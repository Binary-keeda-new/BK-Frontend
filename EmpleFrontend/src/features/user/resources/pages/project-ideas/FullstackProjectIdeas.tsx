"use client";

import Link from "next/link";
import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Crowdsourced Civic Issue Reporting and Resolution System",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Build a mobile-first platform that allows citizens to report civic issues like potholes, broken streetlights, and overflowing bins with photo and location tagging, while giving municipal staff a powerful dashboard to route, assign, and resolve reports.",
    steps: [
      "Build a mobile app for citizens to submit geotagged reports with photo, voice, and text descriptions",
      "Create a centralized admin dashboard with live interactive map showing all reported issues by category and priority",
      "Implement automated routing engine that directs reports to relevant departments (sanitation, public works) based on issue type and location",
      "Build notification system to keep citizens updated through confirmation, acknowledgment, and resolution stages",
      "Add analytics and reporting features showing departmental response times, reporting trends, and resolution rates",
      "Ensure scalable backend with concurrent user support, high-volume media uploads, and APIs for future integrations",
    ],
    skills: ["React Native", "Node.js", "MongoDB", "Google Maps API", "WebSockets", "REST APIs", "Firebase"],
  },
  {
    id: 2,
    title: "DBT Implementation Portal for PCR Act and PoA Act Beneficiaries",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Develop a secure web and mobile platform to digitize Direct Benefit Transfer disbursement under PCR and PoA Acts, enabling real-time tracking of fund sanctions, Aadhaar-based victim verification, and seamless integration with national databases like CCTNS and eCourts.",
    steps: [
      "Build a secure beneficiary registration portal with Aadhaar and DigiLocker-based identity verification",
      "Implement real-time fund tracking dashboard showing sanction, disbursement, and utilization status for each case",
      "Integrate with national databases: Aadhaar, eCourts, CCTNS, and financial institutions via APIs",
      "Build role-based access for District Authorities, Social Welfare Departments, and Financial Institutions",
      "Create a grievance redressal and beneficiary feedback module with case status notifications",
      "Ensure end-to-end data encryption and privacy compliance to protect victim identities",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "Aadhaar APIs", "REST APIs", "Role-Based Auth", "Encryption"],
  },
  {
    id: 3,
    title: "Smart Tourist Safety Monitoring and Incident Response System",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a digital ecosystem for tourist safety using blockchain-based digital IDs, geo-fencing alerts, AI anomaly detection, and a real-time police and tourism department dashboard — enabling rapid emergency response and secure identity verification for tourists.",
    steps: [
      "Build a blockchain-based digital ID generation system issuing tamper-proof tourist IDs at airports, hotels, and check-posts",
      "Develop a mobile app with geo-fencing alerts for restricted zones, panic button with live location sharing, and optional real-time tracking",
      "Implement AI-based anomaly detection for sudden location drop-offs, prolonged inactivity, and deviation from planned routes",
      "Create a tourism department and police dashboard with tourist cluster visualizations, heat maps, and alert history",
      "Add automated E-FIR generation for missing person cases with access to digital ID records and last known locations",
      "Build multilingual support for 10+ Indian languages with offline functionality and end-to-end encryption",
    ],
    skills: ["React Native", "Node.js", "Blockchain", "MongoDB", "WebSockets", "Google Maps API", "AI/ML"],
  },
  {
    id: 4,
    title: "Monastery360 — Digital Heritage Platform for Sikkim's Monasteries",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Build a unified digital platform offering 360° virtual tours, interactive geo-tagged maps, digital archives of manuscripts and murals, location-based audio guides, and cultural event calendars to make Sikkim's 200+ monasteries accessible to tourists and researchers worldwide.",
    steps: [
      "Build a web platform with 360° panoramic virtual tours and narrated walkthroughs in multiple languages",
      "Create an interactive geo-tagged map of all monastery locations with travel routes and nearby attractions",
      "Develop a digital archive module for scanned manuscripts, murals, and historical documents with AI-powered search and categorization",
      "Implement a smart audio guide app using GPS for location-based audio triggers with offline mode for remote areas",
      "Build a cultural calendar with festival and ritual schedules, booking options, and tourist participation features",
      "Integrate with local transport and tourism services for seamless trip planning",
    ],
    skills: ["React", "Node.js", "MongoDB", "Google Maps API", "Three.js/360°", "AWS S3", "Mobile Dev"],
  },
  {
    id: 5,
    title: "Prashikshan — Academia Industry Interface for NEP Internships",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a centralized digital platform connecting students, colleges, and industry partners to streamline the NEP internship process — with modules for internship discovery, application tracking, faculty monitoring, skill readiness, automatic logbook generation, and credit integration.",
    steps: [
      "Build a student portal for internship discovery, application, and progress tracking with real-time status updates",
      "Create an industry collaboration module for companies to post openings, manage applications, and offer hybrid/remote slots",
      "Develop a faculty and admin panel with dashboards to monitor student progress and provide feedback",
      "Add skill readiness modules with pre-internship training content and assessments",
      "Implement an automatic logbook and report generator to ensure NEP-compliant documentation and prevent fake certificates",
      "Build a credit integration system and analytics dashboard showing skill gaps, industry trends, and participation data",
    ],
    skills: ["React", "Node.js", "MongoDB", "REST APIs", "Role-Based Auth", "PDF Generation", "Firebase"],
  },
  {
    id: 6,
    title: "Millets Value Chain Digital Marketplace Platform",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a robust multilingual digital marketplace linking farmers, FPOs, SHGs, processors, and consumers on a single platform with features for online trading, quality certification, produce traceability, logistics support, payment facilitation, and millet branding under Shree Anna.",
    steps: [
      "Build a multilingual marketplace connecting farmers and SHGs directly with buyers, processors, and consumers",
      "Implement produce traceability from farm to fork with QR-based tracking and quality certification workflows",
      "Integrate payment gateways for secure transactions with fair pricing mechanisms for smallholder farmers",
      "Add logistics support module for procurement coordination, delivery tracking, and warehouse management",
      "Build government scheme and subsidy integration for millet entrepreneurship support and certification",
      "Ensure offline functionality with simple navigation optimized for rural users with limited connectivity",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "Payment Gateway", "REST APIs", "QR/Traceability", "Mobile Dev"],
  },
  {
    id: 7,
    title: "Real-Time Monitoring System for Disaster Management Trainings",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a centralized web and mobile platform for NDMA's CBT Division to capture real-time training data from SDMAs, ATIs, and NGOs across India, with GIS mapping, analytics dashboards, impact tracking, and report generation to identify capacity-building gaps.",
    steps: [
      "Build a web portal and mobile app for SDMAs, ATIs, and NGOs to enter real-time training data from the field",
      "Implement GIS mapping to visualize geographic spread of trainings across states, districts, and themes",
      "Create analytics dashboards for impact tracking, thematic coverage analysis, and training gap identification",
      "Add automated report generation with customizable templates for NDMA officials",
      "Implement role-based user access control with notification and alert systems for milestone tracking",
      "Build integration APIs for connecting with existing NDMA and state-level disaster management systems",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "GIS/Leaflet", "REST APIs", "Role-Based Auth", "Chart.js"],
  },
  {
    id: 8,
    title: "Temple and Pilgrimage Crowd Management Platform",
    difficulty: "Hard",
    color: "#ef4444",
    description:
      "Build a scalable smart platform for managing crowd surges at major pilgrimage sites like Somnath, Dwarka, Ambaji, and Pavagadh — with virtual queue management, digital darshan passes, real-time crowd density monitoring, emergency alert systems, and multilingual pilgrim apps.",
    steps: [
      "Build a smart queue and ticketing system with virtual queue management, digital darshan passes, and real-time wait time updates",
      "Create a multilingual mobile app providing pilgrims with temple timings, wait times, routes, facilities, and emergency contacts",
      "Implement IoT and CCTV integration with AI analytics for crowd density monitoring and automated surge alerts",
      "Build an emergency and safety module with panic detection, smart barricade alerts, and medical assistance mapping",
      "Develop a traffic and mobility management system for parking guidance, shuttle coordination, and dynamic traffic flow",
      "Add accessibility features with priority navigation assistance for elderly, women, children, and differently-abled pilgrims",
    ],
    skills: ["React Native", "Node.js", "MongoDB", "WebSockets", "Google Maps API", "IoT Integration", "Redis"],
  },
  {
    id: 9,
    title: "ERP-Based Integrated Student Management System for Colleges",
    difficulty: "Hard",
    color: "#ef4444",
    description:
      "Build a low-cost cloud-based ERP system for public colleges that unifies admissions, fee collection, hostel allocation, library records, and examination management into a single source of truth with automated receipting, real-time dashboards, and role-based access — without expensive proprietary software.",
    steps: [
      "Design an integrated workflow where admission data flows seamlessly into a central student database",
      "Build automated fee receipting with digital receipt generation and payment gateway integration",
      "Implement live hostel occupancy tracking and library record management updating the same central database",
      "Create summary dashboards for administrators with real-time institutional metrics and key performance indicators",
      "Add role-based access control for students, faculty, admin, and management with data security and regular backups",
      "Ensure the system is built on widely available cloud tools to keep costs low and adoption easy for existing staff",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "Role-Based Auth", "Payment Gateway", "REST APIs", "Cloud (AWS/GCP)"],
  },
  {
    id: 10,
    title: "Digital Mental Health and Psychological Support System for Students",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a stigma-free, culturally sensitive digital mental health platform for college students with an AI-guided chatbot, confidential counsellor booking, psychoeducational resources in regional languages, a moderated peer support forum, and an anonymous admin analytics dashboard.",
    steps: [
      "Build an AI-guided chatbot offering coping strategies and referring students to professionals based on severity screening",
      "Implement a confidential booking system for on-campus counsellor appointments and mental health helpline access",
      "Create a psychoeducational resource hub with videos, relaxation audio, and wellness guides in regional languages",
      "Build a moderated peer-to-peer support forum with trained student volunteer oversight",
      "Develop an admin dashboard with anonymous data analytics using PHQ-9/GAD-7 screening tools to identify trends",
      "Ensure end-to-end confidentiality, offline support mapping with college counsellors, and institution-specific customization",
    ],
    skills: ["React", "Node.js", "MongoDB", "NLP/Chatbot", "WebSockets", "REST APIs", "Firebase"],
  },
];

type Project = (typeof PROJECTS)[0];

export default function FullstackProjectIdeas() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Header */}
      <div style={{ padding: "24px", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <Link
          href="/user/resources/project-ideas"
          style={{ color: "var(--muted2)", textDecoration: "none", fontSize: "14px", marginBottom: "16px", display: "inline-block" }}
        >
          ← Back to Project Ideas
        </Link>
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "28px", fontWeight: 800, color: "var(--text)", marginTop: "12px", marginBottom: "4px" }}>
          Fullstack Project Ideas
        </h1>
        <p style={{ fontSize: "12px", color: "var(--muted2)", opacity: 0.7, margin: 0 }}>
          Click any project to view description and steps to solve
        </p>
      </div>

      {/* Grid */}
      <div style={{ padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.18s ease",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = `1px solid ${project.color}`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${project.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Top row: badge + arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 700, padding: "3px 10px",
                  borderRadius: "999px", background: `${project.color}15`,
                  color: project.color, border: `1px solid ${project.color}30`,
                }}>
                  {project.difficulty}
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="transparent" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", lineHeight: 1.4, margin: 0 }}>
                {project.title}
              </h3>

              {/* Skills on card */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                {project.skills.map((skill) => (
                  <span key={skill} style={{
                    fontSize: "11px", fontWeight: 600,
                    padding: "3px 9px", borderRadius: "999px",
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: `1px solid ${selected.color}40`,
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: `0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px ${selected.color}20`,
            }}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: "8px", width: "32px", height: "32px",
                cursor: "pointer", color: "var(--muted2)",
                fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>

            {/* Badge */}
            <span style={{
              fontSize: "11px", fontWeight: 700, padding: "3px 10px",
              borderRadius: "999px", background: `${selected.color}15`,
              color: selected.color, border: `1px solid ${selected.color}30`,
              display: "inline-block", marginBottom: "12px",
            }}>
              {selected.difficulty}
            </span>

            {/* Title */}
            <h2 style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontSize: "20px", fontWeight: 800,
              color: "var(--text)", marginBottom: "12px", lineHeight: 1.4,
              paddingRight: "40px",
            }}>
              {selected.title}
            </h2>

            {/* Description */}
            <p style={{ fontSize: "14px", color: "var(--muted2)", lineHeight: 1.7, marginBottom: "24px" }}>
              {selected.description}
            </p>

            {/* Steps */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                🛠️ Steps to Solve
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {selected.steps.map((step, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: selected.color, flexShrink: 0, marginTop: "6px",
                    }} />
                    <span style={{ fontSize: "13px", color: "var(--muted2)", lineHeight: 1.7 }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
                💡 Skills Required
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {selected.skills.map((skill) => (
                  <li key={skill} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: selected.color, flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: "13px", fontWeight: 600,
                      padding: "4px 12px", borderRadius: "999px",
                      background: `${selected.color}15`,
                      color: selected.color,
                      border: `1px solid ${selected.color}30`,
                    }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
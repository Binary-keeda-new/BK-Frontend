"use client";

import Link from "next/link";
import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Identification of URL Based Attacks from IP Data",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Build a system to detect and identify various cyber attacks carried out using HTTP protocol's URL field, including SQL injection, XSS, directory traversal, command injection, SSRF, and more using IPDR data.",
    steps: [
      "Generate simulated attack datasets using tools like SQLmap, Burp Suite, XSStrike, and Commix",
      "Build a log ingestion pipeline to parse HTTP/IPDR data and extract URL fields",
      "Train ML classifiers to detect attack patterns across 10+ URL attack categories",
      "Build a frontend GUI to visualize results and query by attack type, IP range, and success status",
      "Add PCAP file ingestion to identify URL-based attacks in external captures",
      "Implement CSV and JSON export functionality for result sets",
    ],
    skills: ["Python", "ML/Scikit-learn", "Network Security", "React", "PCAP Analysis", "SQL"],
  },
  {
    id: 2,
    title: "Cryptocurrency Address Collection and Categorization System",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Create an autonomous system that scrapes cryptocurrency addresses from surface and deep web sources, associates them with suspect entities, clusters them by criminal activity type, and provides an analytical frontend for querying.",
    steps: [
      "Build a web scraper to autonomously collect crypto addresses from forums, news portals, and deep web sources",
      "Design a database schema storing address, crypto type, PII info, category, source, and last scan date",
      "Implement clustering algorithms to categorize addresses by suspect activity type",
      "Build a REST API layer for querying the database with filters",
      "Create an analytics dashboard with timeline-based querying and visualizations",
      "Add CSV and JSON export functionality for result sets",
    ],
    skills: ["Python", "Web Scraping", "PostgreSQL", "React", "Data Clustering", "REST APIs"],
  },
  {
    id: 3,
    title: "AI Enabled Cyber Incident & Safety Web Portal for Defence",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Develop a secure, AI-driven cyber incident portal exclusively for defence personnel, families, and veterans. The portal accepts multi-format forensic samples, analyzes them using AI/ML, and provides real-time alerts and mitigation steps linked to CERT-Army.",
    steps: [
      "Build a secure web portal and mobile app with role-based access control and audit trails",
      "Implement multi-format file ingestion (text, URLs, images, audio, video) for forensic evidence",
      "Train AI/ML models for classifying incidents: fraud, malware, phishing, espionage, OPSEC risk",
      "Build real-time alert system with automated playbook-style mitigation recommendations",
      "Create risk-ranked dashboards for CERT-Army with actionable intelligence",
      "Ensure compliance with defence data-security norms and strict audit logging",
    ],
    skills: ["React", "Node.js", "Python", "AI/ML", "MongoDB", "Role-Based Auth", "Mobile Dev"],
  },
  {
    id: 4,
    title: "Conversational SIEM Assistant for Investigation and Automated Threat Reporting",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Build an NLP-powered interface that connects directly with ELK SIEMs (Elastic SIEM/Wazuh) to support conversational investigations and automated report generation without requiring users to know complex query syntax like KQL or Elasticsearch DSL.",
    steps: [
      "Set up ELK stack (Elasticsearch, Logstash, Kibana) or Wazuh as the base SIEM",
      "Build an NLP parser to understand natural language queries and extract intent and entities",
      "Implement a query generator that maps parsed intent to Elasticsearch DSL/KQL queries",
      "Build a context manager to maintain multi-turn dialogue history for iterative investigations",
      "Create a response formatter to present results as text, tables, or charts",
      "Add automated report generation from natural language requests with narrative summaries",
    ],
    skills: ["Python", "NLP/LLM", "Elasticsearch", "Wazuh", "React", "REST APIs", "Data Visualization"],
  },
  {
    id: 5,
    title: "Blockchain-Based Botanical Traceability of Ayurvedic Herbs",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Develop a permissioned blockchain system to immutably record every stage of an Ayurvedic herb's journey — from geo-tagged harvest events by farmers, through processing and lab testing, to finished product on retail shelves with consumer-facing QR code verification.",
    steps: [
      "Set up a permissioned blockchain network using Hyperledger Fabric with nodes for farmers, labs, processors, and manufacturers",
      "Build GPS-enabled mobile DApp for collectors to record CollectionEvent metadata with geo-tagging",
      "Implement smart contracts enforcing sustainability guidelines, geo-fencing, and quality validations",
      "Create QualityTest and ProcessingStep event recording for labs and processing facilities",
      "Generate unique on-chain QR codes for finished product batches with FHIR-style provenance bundles",
      "Build a lightweight consumer web portal for QR scanning and a stakeholder dashboard with RESTful APIs",
    ],
    skills: ["Hyperledger Fabric", "Solidity", "Node.js", "React", "IoT/GPS", "REST APIs", "Mobile Dev"],
  },
  {
    id: 6,
    title: "Real-Time AI/ML Based Phishing Detection and Prevention System",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a real-time phishing detection framework powered by deep learning, advanced NLP, and graph-based analytics that integrates into browsers and email clients to detect phishing across email, SMS, and websites with sub-50ms latency.",
    steps: [
      "Train transformer-based NLP models (BERT/RoBERTa) on labeled phishing datasets for semantic analysis of emails and SMS",
      "Implement CNN-based visual analysis to detect brand impersonation markers in webpage DOM structures",
      "Build graph neural networks for relationship mapping between domains, WHOIS records, and DNS history",
      "Create a continuous learning pipeline with online training from live threat feeds and user feedback",
      "Develop lightweight browser extensions for Chrome, Firefox, and Edge with real-time local inference",
      "Integrate with threat intelligence feeds (MISP, AlienVault OTX) and sandbox environments for behavioral analysis",
    ],
    skills: ["Python", "BERT/RoBERTa", "TensorFlow/PyTorch", "GNN", "Browser Extensions", "REST APIs"],
  },
  {
    id: 7,
    title: "Transformer Based End-to-End Web Application Firewall (WAF) Pipeline",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build a complete WAF pipeline from log ingestion to transformer-based training and real-time anomaly detection on a live web server, replacing static rule-based detection with learned pattern recognition from raw web traffic.",
    steps: [
      "Build a log ingestion pipeline supporting both batch and streaming from Apache/Nginx access logs",
      "Implement a parser to extract and normalize key fields: method, path, parameters, headers, and payload",
      "Create a tokenizer to convert normalized requests into token sequences for transformer input",
      "Train an open-source transformer model on synthetic benign traffic datasets",
      "Deploy trained model alongside web server with Apache/Nginx integration for real-time non-blocking inference",
      "Implement incremental retraining pipeline to continuously update model on new benign traffic",
    ],
    skills: ["Python", "Transformers/HuggingFace", "Apache/Nginx", "Docker", "MLOps", "Log Analysis"],
  },
  {
    id: 8,
    title: "Mitigating National Security Risks from LLMs in AI-Driven Malign Information Operations",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Design a multi-layered technical framework to detect, analyze, and mitigate misuse of LLMs in hostile information operations including disinformation campaigns, synthetic propaganda, and AI-generated phishing at a national security scale.",
    steps: [
      "Deploy transformer-based classifiers (RoBERTa, T5) trained on AI-generated vs human-generated content datasets",
      "Build forensic watermarking and fingerprinting techniques to trace LLM outputs to specific model families",
      "Implement graph neural networks to map disinformation clusters and actor coordination patterns across platforms",
      "Create a federated detection protocol for secure intelligence sharing between allied agencies",
      "Build a risk-scoring dashboard with heatmaps, temporal trend analysis, and predictive modelling",
      "Integrate privacy-preserving techniques (federated learning, differential privacy) with explainable AI layers",
    ],
    skills: ["Python", "NLP/LLMs", "GNN", "Federated Learning", "React", "Blockchain", "XAI"],
  },
  {
    id: 9,
    title: "AI-Driven Next-Generation Firewall for Dynamic Threat Detection and Zero Trust",
    difficulty: "Hard",
    color: "#ef4444",
    description:
      "Design and develop an AI-powered NGFW integrating deep learning, NLP, and graph-based anomaly detection for intelligent context-aware security enforcement with Zero Trust architecture, federated learning, and automated incident response.",
    steps: [
      "Implement Deep Packet Inspection with CNN-based SSL/TLS traffic classification and unsupervised clustering for anomaly detection",
      "Build Zero Trust enforcement with risk-based authentication, behavioral biometrics, and micro-segmentation at SDP level",
      "Deploy federated learning frameworks (TensorFlow Federated) for privacy-preserving threat intelligence sharing across NGFW nodes",
      "Integrate STIX/TAXII threat intelligence feeds with internal telemetry for predictive defense and proactive rule updates",
      "Implement SOAR workflows for automated containment, quarantine, and sandboxing with reinforcement learning for rule optimization",
      "Build a real-time SOC dashboard with attack graph visualization, anomaly heatmaps, and SIEM/SOAR platform integration via APIs",
    ],
    skills: ["Python", "Deep Learning", "Network Security", "Federated Learning", "SOAR", "Zero Trust", "Kubernetes"],
  },
  {
    id: 10,
    title: "Application Software to Obfuscate Object Files Using LLVM",
    difficulty: "Hard",
    color: "#ef4444",
    description:
      "Build an application that obfuscates object files generated from C and C++ code using LLVM compiler infrastructure, generating hardened binaries for Windows and Linux that are extremely difficult to reverse-engineer.",
    steps: [
      "Set up LLVM toolchain and understand LLVM IR (Intermediate Representation) pass architecture",
      "Implement custom LLVM passes for control flow obfuscation, instruction substitution, and bogus control flow insertion",
      "Add string encryption, fake function insertion, and dead code injection as configurable obfuscation layers",
      "Build a CLI interface accepting input parameters to control obfuscation extent and customization",
      "Cross-compile obfuscated binaries for both Windows and Linux target platforms",
      "Generate detailed reports logging input parameters, obfuscation methods, bogus code count, cycles, and string encryption stats",
    ],
    skills: ["C/C++", "LLVM", "Compiler Design", "Reverse Engineering", "CMake", "Windows/Linux Internals"],
  },
];

type Project = (typeof PROJECTS)[0];

export default function CybersecurityProjectIdeas() {
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
          Cybersecurity Project Ideas
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
            {/* Colored bullet dot */}
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

            {/* Skills in modal — bulleted list */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
                💡 Skills Required
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {selected.skills.map((skill) => (
                  <li key={skill} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Bullet dot colored */}
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
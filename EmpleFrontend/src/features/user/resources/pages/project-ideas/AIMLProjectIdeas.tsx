"use client";

import Link from "next/link";
import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Image Based Breed Recognition for Cattle and Buffaloes of India",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Build an AI-driven image recognition system to identify and classify breeds of Indian cattle and buffaloes, integrating with the Bharat Pashudhan App to support Field Level Workers during animal registration with real-time breed suggestions.",
    steps: [
      "Collect and curate a labeled dataset of Indian cattle and buffalo breeds including crossbreeds",
      "Train a CNN-based image classification model (ResNet/EfficientNet) on diverse environmental conditions and poses",
      "Build a breed database covering the most common indigenous and crossbred Indian cattle and buffalo breeds",
      "Implement preprocessing to handle varied lighting, backgrounds, and animal orientations",
      "Build a mobile-friendly interface with real-time breed suggestion and confidence score display",
      "Integrate with BPA platform APIs to provide decision-support during registration workflows",
    ],
    skills: ["Python", "CNN/EfficientNet", "TensorFlow/PyTorch", "Mobile Dev", "REST APIs", "Image Classification"],
  },
  {
    id: 2,
    title: "Smart Community Health Monitoring and Early Warning System for Water-Borne Diseases",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Develop a digital health surveillance platform that uses AI/ML to detect patterns and predict outbreaks of water-borne diseases in rural Northeast India, integrating IoT water sensors, mobile reporting, and multilingual dashboards for health authorities.",
    steps: [
      "Build a mobile app for ASHA workers and community volunteers to report symptoms and water quality data via SMS or app",
      "Integrate low-cost IoT water quality sensors (turbidity, pH, bacterial presence) with a data ingestion pipeline",
      "Train ML models on symptom patterns, seasonal trends, and water quality reports to predict outbreak probability",
      "Build a real-time alert system to notify district health officials and local governance bodies",
      "Create a multilingual dashboard with hotspot visualization, intervention tracking, and resource allocation tools",
      "Implement offline functionality with sync capabilities for remote tribal areas with limited connectivity",
    ],
    skills: ["Python", "ML/Scikit-learn", "IoT/Sensors", "React", "Node.js", "NLP", "Mobile Dev"],
  },
  {
    id: 3,
    title: "Disaster Preparedness and Response Education System for Schools and Colleges",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Build a digital platform offering interactive disaster education modules, region-specific alerts, virtual drills, and gamified learning experiences to equip students and staff with life-saving disaster preparedness knowledge.",
    steps: [
      "Design region-specific disaster education modules covering earthquakes, floods, and fires with localized content",
      "Build gamified learning experiences with quizzes, simulations, and reward systems to improve engagement",
      "Implement virtual drill simulations where students practice evacuation and emergency response scenarios",
      "Create an emergency contact directory with real-time communication tools for use during actual disasters",
      "Build admin dashboards for school administrators to track preparedness scores and drill participation rates",
      "Integrate real-time regional disaster alerts from NDMA APIs into the platform for live awareness",
    ],
    skills: ["React", "Node.js", "MongoDB", "Gamification", "REST APIs", "Mobile Dev", "UI/UX Design"],
  },
  {
    id: 4,
    title: "AI-Powered DPR Quality Assessment and Risk Prediction System for MDoNER",
    difficulty: "Easy",
    color: "#22c55e",
    description:
      "Develop an AI-based platform that ingests Detailed Project Reports (DPRs) submitted to MDoNER, evaluates them for completeness, technical feasibility, and compliance using NLP, and predicts project risks like cost overruns and delays.",
    steps: [
      "Build a document ingestion pipeline to parse DPRs from PDF and text formats using OCR and NLP",
      "Train NLP models to evaluate completeness, detect inconsistencies like mismatched budgets and unrealistic timelines",
      "Develop risk prediction models to flag potential issues like environmental impact and resource shortages",
      "Build a configurable rule engine aligned with MDoNER guidelines for standardized evaluation",
      "Create a user-friendly dashboard with regional language support (Assamese, Hindi) for non-technical officials",
      "Implement offline functionality and integration with MDoNER's existing project management systems",
    ],
    skills: ["Python", "NLP/spaCy", "OCR/Tesseract", "ML", "React", "FastAPI", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Automated Compliance Checker for Legal Metrology Declarations on E-Commerce Platforms",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build an AI-powered compliance checker that crawls e-commerce platforms, extracts product declaration data using OCR and computer vision, and validates them against Legal Metrology (Packaged Commodities) Rules with a regulatory dashboard.",
    steps: [
      "Build web crawlers and scraping pipelines for major e-commerce platforms (Amazon, Flipkart) in real-time and batch modes",
      "Implement multi-language OCR to extract declaration text from product images and crop relevant label regions",
      "Develop a configurable rule engine to validate extracted fields against Legal Metrology Rules (MRP, net quantity, country of origin, etc.)",
      "Flag non-compliance issues with detailed violation reports categorized by rule type and severity",
      "Build a cloud-based regulator dashboard with compliance scores, trends by brand/category, and exportable reports",
      "Implement geo-tagged compliance heatmaps and secure access controls for government regulators",
    ],
    skills: ["Python", "OCR/Tesseract", "Computer Vision", "Web Scraping", "React", "FastAPI", "Cloud (AWS/GCP)"],
  },
  {
    id: 6,
    title: "Smart PPE Compliance Monitoring and Reporting System for Underground Coal Mines",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Develop a smart automated system using AI-based computer vision and RFID/NFC to verify PPE compliance of workers before entering underground coal mines, with real-time alerts, entry control, and predictive safety analytics.",
    steps: [
      "Set up AI cameras and RFID/NFC readers at mine entry gates for automated PPE detection",
      "Train computer vision models to detect mandatory PPE items: helmet, cap lamp, safety boots, reflective vest, gas detector, self-rescuer",
      "Implement face detection combined with PPE compliance validation in a single scan pipeline",
      "Build an alert system to issue audio-visual warnings and optionally deny entry to non-compliant workers",
      "Create time-stamped geo-tagged compliance logs with worker-wise daily and monthly reporting",
      "Develop web and mobile dashboards with predictive analytics to identify at-risk workers and reward safety champions",
    ],
    skills: ["Python", "Computer Vision/YOLO", "RFID/NFC", "React", "Node.js", "MongoDB", "Edge Computing"],
  },
  {
    id: 7,
    title: "AI and ML Enabled Video Analysis and Interpretation System for Surveillance",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build an AI/ML-powered video analysis platform that ingests feeds from surveillance cameras, drones, and body cams to automatically detect threats, recognize objects, track suspicious activities, and generate real-time alerts and reports.",
    steps: [
      "Build a multi-format video ingestion pipeline supporting feeds from cameras, body cams, and drones in various formats",
      "Implement computer vision algorithms for feature extraction: object detection, activity recognition, and movement tracking",
      "Train deep learning models (YOLO, Faster R-CNN) on domain-specific datasets for threat-related object and activity detection",
      "Integrate facial recognition with watchlist comparison and cross-camera movement tracking",
      "Build real-time analysis engine generating alerts, heatmaps, and reports based on configurable user requirements",
      "Create an easy-to-use operator interface for programming detection rules without deep technical knowledge",
    ],
    skills: ["Python", "YOLO/Faster R-CNN", "OpenCV", "Deep Learning", "Facial Recognition", "React", "FFmpeg"],
  },
  {
    id: 8,
    title: "Multimodal Retrieval-Augmented Generation (RAG) System for Offline Intelligence",
    difficulty: "Medium",
    color: "#f59e0b",
    description:
      "Build an offline multimodal RAG system that ingests PDFs, DOCs, images, and voice recordings into a unified semantic retrieval framework, enabling natural language querying with grounded LLM-generated answers and citation transparency.",
    steps: [
      "Build ingestion pipelines for DOCX/PDF text extraction, image embedding generation, and audio speech-to-text conversion",
      "Index all modalities in a shared vector space using a unified embedding model (CLIP, Whisper, sentence-transformers)",
      "Implement semantic cross-modal search: text-to-image, image-to-text, and audio-to-document retrieval",
      "Integrate an offline LLM (LLaMA, Mistral) to generate grounded answers from retrieved multimodal context",
      "Build citation transparency with numbered source links back to original documents, images, and audio segments",
      "Create a unified chat interface supporting text queries and optional multimodal input uploads",
    ],
    skills: ["Python", "LLMs (LLaMA/Mistral)", "CLIP/Whisper", "Vector DB (FAISS/Chroma)", "RAG", "FastAPI", "React"],
  },
  {
    id: 9,
    title: "Optical-Guided Super-Resolution for Thermal IR Imagery",
    difficulty: "Hard",
    color: "#ef4444",
    description:
      "Develop a deep learning fusion pipeline that generates high-resolution thermal IR maps by leveraging high-resolution optical imagery as a spatial guide, preserving thermal fidelity while enhancing spatial sharpness for urban planning, wildfire detection, and precision agriculture.",
    steps: [
      "Implement multi-sensor geometric co-registration to align high-resolution optical images with low-resolution TIR data",
      "Build a fusion-based deep learning architecture (guided super-resolution network) combining spatial optical features with thermal data",
      "Incorporate physics-based priors (radiative transfer, emissivity correction, energy balance) to ensure thermal consistency",
      "Train the model on paired optical-thermal datasets ensuring no false texture transfer from optical to thermal outputs",
      "Evaluate outputs using PSNR, SSIM, and RMSE (Kelvin) metrics against reference high-resolution thermal images",
      "Optimize the pipeline for scalability to process large-area satellite imagery efficiently",
    ],
    skills: ["Python", "Deep Learning", "PyTorch", "Remote Sensing", "Super-Resolution", "OpenCV", "GIS/GDAL"],
  },
  {
    id: 10,
    title: "Integrated Platform for Crowdsourced Ocean Hazard Reporting and Social Media Analytics",
    difficulty: "Hard",
    color: "#ef4444",
    description:
      "Build a unified mobile and web platform enabling citizens to submit geotagged ocean hazard reports, integrating NLP-based social media analytics to extract hazard discussions, generate dynamic hotspot maps, and support INCOIS early warning systems.",
    steps: [
      "Build a mobile and web app for citizens to submit geotagged reports, photos, and videos of ocean hazard events",
      "Implement role-based access for citizens, officials, and analysts with offline data collection and sync capabilities",
      "Integrate social media feeds (Twitter, Facebook, YouTube) with an NLP engine to detect hazard-related discussions and sentiment",
      "Build a dynamic map dashboard with hotspot generation based on report density, keyword frequency, and verified incidents",
      "Implement multilingual NLP support for regional coastal languages to maximize community participation",
      "Connect platform APIs with INCOIS early warning systems for real-time validation and emergency response coordination",
    ],
    skills: ["Python", "NLP/Transformers", "React Native", "Node.js", "MongoDB", "WebSockets", "GIS/Leaflet"],
  },
];

type Project = (typeof PROJECTS)[0];

export default function AIMLProjectIdeas() {
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
          AI / ML Project Ideas
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
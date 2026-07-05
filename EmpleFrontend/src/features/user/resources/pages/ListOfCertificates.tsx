"use client";
<<<<<<< HEAD
import React from 'react';
=======

import { ReactNode } from "react";
>>>>>>> origin/develop

type Level = "Beginner" | "Intermediate" | "Advanced";

const levelStyles: Record<Level, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-yellow-100 text-yellow-700",
  Advanced: "bg-red-100 text-red-700",
};

const brandStyles: Record<string, { bg: string }> = {
  AWS: { bg: "bg-gradient-to-br from-[#FF9900] to-[#232F3E]" },
  "Cyber Security": { bg: "bg-gradient-to-br from-[#e63946] to-[#1d3557]" },
  Cisco: { bg: "bg-gradient-to-br from-[#1BA0D7] to-[#004B87]" },
  "Google Cloud": { bg: "bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05]" },
  TensorFlow: { bg: "bg-gradient-to-br from-[#FF6F00] to-[#FF8F00]" },
  "Red Hat": { bg: "bg-gradient-to-br from-[#CC0000] to-[#820000]" },
  CUDA: { bg: "bg-gradient-to-br from-[#76B900] to-[#1a1a2e]" },
};

const LogoComponents: Record<string, ReactNode> = {
  AWS: (
    <svg viewBox="0 0 150 90" className="w-28 h-16" fill="none">
      <text x="10" y="55" fontSize="42" fontWeight="bold" fill="white" fontFamily="Arial">aws</text>
      <path d="M8 65 Q75 85 142 65" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <polygon points="138,60 142,65 136,68" fill="#FF9900"/>
    </svg>
  ),
  "Cyber Security": (
    <svg viewBox="0 0 100 80" className="w-24 h-16" fill="none">
      <path d="M50 5 L85 20 L85 50 Q85 70 50 78 Q15 70 15 50 L15 20 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
      <path d="M35 40 L45 52 L65 32" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="10" y="75" fontSize="11" fontWeight="bold" fill="white" fontFamily="Arial">CyberSec</text>
    </svg>
  ),
  Cisco: (
    <svg viewBox="0 0 140 60" className="w-28 h-14" fill="none">
      <rect x="5" y="20" width="12" height="20" rx="3" fill="white"/>
      <rect x="22" y="12" width="12" height="36" rx="3" fill="white"/>
      <rect x="39" y="6" width="12" height="48" rx="3" fill="white"/>
      <rect x="56" y="12" width="12" height="36" rx="3" fill="white"/>
      <rect x="73" y="20" width="12" height="20" rx="3" fill="white"/>
      <text x="92" y="42" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial">cisco</text>
    </svg>
  ),
  "Google Cloud": (
    <svg viewBox="0 0 170 60" className="w-36 h-14" fill="none">
      <circle cx="20" cy="30" r="14" fill="#4285F4"/>
      <circle cx="20" cy="30" r="8" fill="white"/>
      <text x="40" y="38" fontSize="20" fontWeight="bold" fill="white" fontFamily="Arial">Google Cloud</text>
    </svg>
  ),
  TensorFlow: (
    <svg viewBox="0 0 130 70" className="w-28 h-16" fill="none">
      <polygon points="65,5 100,25 100,55 65,65 30,55 30,25" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
      <text x="22" y="43" fontSize="13" fontWeight="bold" fill="white" fontFamily="Arial">TensorFlow</text>
    </svg>
  ),
  "Red Hat": (
    <svg viewBox="0 0 130 70" className="w-28 h-16" fill="none">
      <ellipse cx="55" cy="25" rx="30" ry="18" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2"/>
      <ellipse cx="55" cy="25" rx="20" ry="10" fill="white" fillOpacity="0.2"/>
      <text x="10" y="58" fontSize="16" fontWeight="bold" fill="white" fontFamily="Arial">Red Hat</text>
    </svg>
  ),
  CUDA: (
    <svg viewBox="0 0 130 70" className="w-28 h-16" fill="none">
      <rect x="8" y="12" width="48" height="42" rx="4" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
      <rect x="16" y="20" width="9" height="9" rx="1" fill="white"/>
      <rect x="30" y="20" width="9" height="9" rx="1" fill="white"/>
      <rect x="16" y="33" width="9" height="9" rx="1" fill="white"/>
      <rect x="30" y="33" width="9" height="9" rx="1" fill="white"/>
      <text x="62" y="42" fontSize="22" fontWeight="bold" fill="white" fontFamily="Arial">CUDA</text>
    </svg>
  ),
};

const certificates = [
  { name: "AWS", level: "Beginner" as Level, description: "Start your cloud journey with Amazon Web Services.", certLink: "https://aws.amazon.com/certification/", videoLink: "https://www.youtube.com/watch?v=NhDYbskXRgc" },
  { name: "Cyber Security", level: "Beginner" as Level, description: "Learn security fundamentals with CompTIA Security+.", certLink: "https://www.comptia.org/certifications/security", videoLink: "https://www.youtube.com/watch?v=KiEptGbnEBc" },
  { name: "Cisco", level: "Intermediate" as Level, description: "Master networking with the globally recognized CCNA.", certLink: "https://www.cisco.com/site/us/en/learn/training-certifications/index.html", videoLink: "https://www.youtube.com/watch?v=H8W9oMNSuwo" },
  { name: "Google Cloud", level: "Intermediate" as Level, description: "Get certified in Google Cloud Platform services.", certLink: "https://cloud.google.com/learn/certification", videoLink: "https://www.youtube.com/watch?v=OlAmyf4_4O4" },
  { name: "TensorFlow", level: "Intermediate" as Level, description: "Validate your ML skills with TensorFlow Developer Certificate.", certLink: "https://www.tensorflow.org/certificate", videoLink: "https://www.youtube.com/watch?v=9Q-gGpx5nLQ" },
  { name: "Red Hat", level: "Advanced" as Level, description: "Prove your Linux and enterprise skills with RHCSA.", certLink: "https://www.redhat.com/en/services/certification", videoLink: "https://www.youtube.com/watch?v=EnOMpRIGbs8" },
  { name: "CUDA", level: "Advanced" as Level, description: "Master GPU parallel computing with NVIDIA CUDA.", certLink: "https://developer.nvidia.com/cuda-training", videoLink: "https://www.youtube.com/watch?v=86FAWCzIe_4" },
];

const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export default function ListOfCertificates() {
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-950">
      <h1 className="text-3xl font-bold text-center mb-1 text-white">
        Professional Certifications
      </h1>
      <p className="text-center text-gray-500 text-sm mb-10">
        Explore certifications grouped by difficulty level
      </p>

      {levels.map((level) => (
        <div key={level} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className={`px-4 py-1 rounded-full text-xs font-semibold ${levelStyles[level]}`}>
              {level}
            </span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {certificates
              .filter((c) => c.level === level)
              .map((certificate) => {
                const brand = brandStyles[certificate.name];
                return (
                  <div
                    key={certificate.name}
                    className="rounded-xl border border-gray-700 overflow-hidden hover:scale-105 hover:border-gray-500 transition-all duration-200 shadow-lg shadow-black/40"
                  >
                    {/* Logo BG */}
                    <div className={`${brand.bg} w-full h-24 flex items-center justify-center`}>
                      {LogoComponents[certificate.name]}
                    </div>

                    {/* Content */}
                    <div className="p-4 bg-gray-900 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-sm font-semibold text-white">
                          {certificate.name}
                        </h2>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${levelStyles[certificate.level]}`}>
                          {certificate.level}
                        </span>
                      </div>

                      <p className="text-gray-400 text-xs mb-3">
                        {certificate.description}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openLink(certificate.certLink)}
                          className="flex-1 bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700 text-xs font-medium transition-colors"
                        >
                          🎓 Certify
                        </button>
                        <button
                          onClick={() => openLink(certificate.videoLink)}
                          className="flex-1 bg-red-500 text-white py-1.5 rounded-md hover:bg-red-600 text-xs font-medium transition-colors"
                        >
                          ▶ Guide
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
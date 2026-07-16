"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch } from "lucide-react";
import type { ATSMode } from "../types/ats.types";

interface AnalysisProgressModalProps {
  isOpen: boolean;
  mode: ATSMode;
}

const loadingMessages = [
  "Matching your resume with the job description...",
  "Analyzing your skills and experience...",
  "Checking ATS keyword compatibility...",
  "Evaluating technical strengths...",
  "Generating personalized recommendations...",
  "Preparing your report..."
];

export default function AnalysisProgressModal({ isOpen, mode }: AnalysisProgressModalProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  // Rotate messages and lock scroll
  useEffect(() => {
    if (!isOpen) {
      setMessageIndex(0);
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";

    // Rotate encouraging messages every 2.5 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    return () => {
      clearInterval(messageInterval);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div 
        className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-[0_16px_64px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from bubbling
      >
        <div className="p-10 text-center flex flex-col items-center">
          
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center text-[var(--orange)] shadow-[0_0_24px_rgba(241,90,34,0.15)] animate-pulse">
              <FileSearch size={36} />
            </div>
          </div>

          <h2 className="text-2xl font-black text-white mb-3 font-['Inter',sans-serif] tracking-tight">
            Analyzing Your Resume
          </h2>
          
          <p className="text-[15px] text-[var(--muted)] leading-relaxed max-w-[280px] mb-8">
            We're matching your resume with the job description. This usually takes a few seconds.
          </p>

          <div className="h-8 flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-semibold text-[var(--orange)] tracking-wide"
              >
                {loadingMessages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

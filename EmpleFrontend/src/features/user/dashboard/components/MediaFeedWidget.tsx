"use client";

import { LOGO_URL } from '@/shared/constants/assets'
import { Bell, ChevronDown, ExternalLink, Link as LinkIcon, Briefcase, GraduationCap } from "lucide-react";

export default function MediaFeedWidget() {
  return (
    <div className="animated-border h-full w-full">
      <div className="animated-border-inner h-full w-full flex flex-col bg-[var(--surface)] text-white font-sans overflow-hidden">
        
        {/* Cards Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* ================================================== CARD 1 - LINKEDIN ================================================== */}
        <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[#1b1f23] flex flex-col">
          {/* Banner */}
          <div className="h-16 relative w-full bg-[#4e4637] overflow-hidden flex">
             <div className="w-2/3 h-full bg-[#4e4637]"></div>
             <div className="w-1/3 h-full bg-[#40392c] rounded-l-full -ml-4"></div>
          </div>
          
          <div className="px-4 pb-4 relative flex flex-col">
            {/* Logo & Bell */}
            <div className="flex justify-between items-start -mt-8 mb-2">
              <div className="w-16 h-16 bg-white border-2 border-[#1b1f23] rounded flex items-center justify-center p-1 shrink-0 z-10">
                <img src={LOGO_URL} alt="Emple" className="w-full h-full object-contain" />
              </div>
              <div className="mt-10 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <Bell size={20} className="fill-current" />
              </div>
            </div>

            {/* Info */}
            <div className="mb-4">
              <h3 className="text-[22px] font-semibold text-white leading-tight mb-1">Emple</h3>
              <p className="text-[15px] text-gray-200 mb-1.5">Fuel Your Future with Knowledge.</p>
              <p className="text-[13px] text-gray-400">Education • 152 followers • 2-10 employees</p>
            </div>

            {/* Buttons */}
            <div className="flex mt-auto">
              <a href="https://www.linkedin.com/company/binarykeeda-education/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center py-2 px-4 rounded-full text-[13px] whitespace-nowrap font-semibold bg-white text-[#1b1f23] hover:bg-gray-200 transition-colors" style={{ textDecoration: 'none' }}>
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* ================================================== CARD 2 - YOUTUBE ================================================== */}
        <div className="rounded-xl overflow-hidden border border-[#4a2a22] bg-[#2d120d] flex flex-col p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1.5 shrink-0">
              <img src={LOGO_URL} alt="Emple Learning" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-[22px] font-bold text-white leading-tight mb-0.5">Emple Learning</h3>
              <p className="text-[14px] text-gray-300 mb-0.5">@emplelearning</p>
              <p className="text-[13px] text-gray-400">745 subscribers • 194 videos</p>
            </div>
          </div>

          {/* YouTube Buttons */}
          <div className="flex gap-3 mb-2">
            <button className="flex-1 flex items-center justify-center py-2 px-3 rounded-full text-[13px] font-medium bg-white/10 hover:bg-white/20 text-white transition-colors gap-2 border border-transparent">
              <Bell size={16} className="fill-current" />
              Subscribed
              <ChevronDown size={16} className="ml-1 opacity-70" />
            </button>
            <a href="#" className="flex-1 flex items-center justify-center py-2 px-3 rounded-full text-[13px] font-medium border border-white/20 hover:bg-white/10 text-white transition-colors gap-1.5" style={{ textDecoration: 'none' }}>
              View Channel
            </a>
          </div>
          
          {/* Requested Buttons */}
          <div className="flex mt-3 pt-3 border-t border-white/10">
            <a href="https://www.youtube.com/@emplelearning" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center py-2 px-4 rounded-full text-[13px] whitespace-nowrap font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors" style={{ textDecoration: 'none' }}>
              Subscribe on YouTube
            </a>
          </div>
        </div>

        {/* ================================================== CARD 3 - INSTAGRAM ================================================== */}
        <div className="rounded-xl overflow-hidden border border-[#262626] bg-black flex flex-col p-4 pb-5">
          {/* Top Info */}
          <div className="flex items-center gap-6 mb-4">
            <div className="w-20 h-20 bg-[#121212] rounded-full flex items-center justify-center shrink-0 border border-white/10 relative">
               <img src={LOGO_URL} alt="Emple Learning" className="w-[60%] h-[60%] object-contain scale-[1.2]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-medium text-white mb-3">Emple Learning</h3>
              <div className="flex justify-between items-center pr-2">
                <div className="flex flex-col items-center">
                  <span className="text-[16px] font-semibold text-white">293</span>
                  <span className="text-[13px] text-white">posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[16px] font-semibold text-white">6,567</span>
                  <span className="text-[13px] text-white">followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[16px] font-semibold text-white">6</span>
                  <span className="text-[13px] text-white">following</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="text-[14px] text-white flex flex-col gap-0.5 mb-5">
            <p className="m-0 text-gray-400">Education</p>
            <p className="m-0 flex items-start gap-1.5 mt-1">
              <span>💻</span> <span>Jobs and Technical updates.</span>
            </p>
            <p className="m-0 flex items-start gap-1.5">
              <span>🎓</span> <span>Roadmaps, quizzes and free counselling sessions for everyone.</span>
            </p>
            <a href="http://www.emple.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#e0f1ff] font-medium hover:underline mt-1" style={{ textDecoration: 'none' }}>
              <LinkIcon size={14} className="rotate-45" /> www.emple.in
            </a>
          </div>

          {/* Buttons */}
          <div className="flex">
            <a href="https://www.instagram.com/emple.in/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-[13px] whitespace-nowrap font-semibold bg-[#0095f6] hover:bg-[#1877f2] text-white transition-colors" style={{ textDecoration: 'none' }}>
              Follow on Instagram
            </a>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}

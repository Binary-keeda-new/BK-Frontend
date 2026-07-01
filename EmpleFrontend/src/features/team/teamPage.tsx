"use client";

import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Member = {
  name: string;
  role: string;
  dept: string;
  avatar: string;
  bio: string;
  skills: string[];
  joined: string;
  linkedin: string;
  github: string;
};



// ─── Leadership (4 cards) ─────────────────────────────────────────────────────

const LEADERSHIP: Member[] = [
  { name: "Mausam Chowksey", role: "Founder and CEO ", dept: "Leadership", avatar: "/team/Mausam.jpeg", bio: "", skills: [""], joined: "jun 2026 ", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Kamakshi Rautela",     role: "Co-Founder and CFO",  dept: "Leadership", avatar: "/team/kamakshi.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Dhinesh Ravi",      role: "Operations Head and CTO ", dept: "Leadership", avatar: "/team/dinesh.jpeg", bio: "", skills: [""], joined: "june 2026 ", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Neelam Sharma",    role: "Counselling",          dept: "Leadership", avatar: "/team/neelam.jpeg", bio: "Dev oversees all product squads. He built the real-time AI interview engine that processes 10k+ sessions per day.", skills: ["Node.js", "WebSockets", "Docker", "OpenAI API"], joined: "Feb 2023", linkedin: "https://linkedin.com", github: "https://github.com" },
];

// ─── Mentorship (4 cards) ─────────────────────────────────────────────────────

const MENTORSHIP: Member[] = [
  { name: "Aryan",  role: "Technical Mentor",     dept: "Mentorship", avatar: "/team/aryansir.jpeg", bio: "", skills: [""], joined: "June 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Dr. Suryakant", role: "Marketing Head",    dept: "Mentorship", avatar: "/team/suryakant.jpeg", bio: "", skills: [""], joined: "June 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Aryan Bhandari", role: "Ex-Development Lead",   dept: "Mentorship", avatar: "/team/aryanbhandari.jpeg", bio: "", skills: [""], joined: "June 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Himanshu",  role: "Mentor",    dept: "Mentorship", avatar: "/team/himanshu.jpeg", bio: " ", skills: [""], joined: "jUNE 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
];

// ─── Interns / Spines (24 cards) ─────────────────────────────────────────────

const INTERNS: Member[] = [
  { name: "Alisha",     role: "Application Developer",        dept: "Full Stack Developer",        avatar: "/team/alsiha.jpeg", bio: " Alisha is passionate about Computer Science and building modern web applications with React, Next.js, Node.js, and MongoDB. She enjoys turning ideas into complete products by working across frontend, backend, and database layers.", skills: ["React" , "Next.js", "JavaScript","HTML","CSS","tailwind CSS","Node.js","Express.js", "mongoDB","Figma","Python","Docker","git and github"], joined: "June 2026", linkedin: "https://www.linkedin.com/in/alisha-678550374/", github: "https://github.com/alishacreates" },
  { name: "Palak Sharma ",    role: "Application Developer",        dept: "Full Stack Developer",        avatar: "/team/palak.jpeg", bio: " Palak is a Full Stack Developer focused on creating efficient digital solutions, driven by a love for problem-solving and user-centric design. ", skills: ["Figma", "React.js","Next.js", "Node.js","express.js", "mongoDB"], joined: "June 2026", linkedin: "www.linkedin.com/in/palak-sharma-18667924b", github: "https://github.com/Palak-Sharma05" },
  { name: "Shreya Gangwar",    role: "Application Developer",        dept: "Mobile App Developer",        avatar: "/team/shreya.jpeg", bio: " Shreya is a Mobile App Developer, Full-Stack Web Developer, and Machine Learning Enthusiast with a passion for building scalable applications and AI-powered solutions. Dedicated to creating innovative technology that solves real-world problems and delivers impactful user experiences. ", skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Firebase", "JavaScript", "Python", "Machine Learning", "AI", "REST APIs", "Git", "GitHub" , "DSA",  "OOP"], joined: "June 2026", linkedin: "https://www.linkedin.com/in/shreya-gangwar-9b50a430b/", github: "https://github.com/Shreya0705-ui" },
  { name: "Lakshita Deopura",   role: "Application Developer",        dept: "Full Stack Developer",        avatar: "/team/lakshita.jpeg", bio: " Lakshita is a Full Stack Developer skilled in building responsive web applications and AI-driven solutions.Passionate about creating impactful products through clean code, collaboration, and continuous learning.", skills: ["React.js","Node.js", "Python" ,"MongoDB","Generative AI"], joined: "June 2026", linkedin: "www.linkedin.com/in/lakshita-deopura", github: "https://github.com/Lakshita-1408" },
  { name: "Anika Sen",   role: "Social Media Lead",     dept: "Full Stack Developer",     avatar: "/team/anika.jpeg", bio: " Anika is a Full-stack developer passionate about building web applications and solving real-world problems through technology. ", skills: ["React.js", "Next.js" ,"Node.js" , "Express.js" ,"HTML" ,"Python", "FigmaCSSJava" ], joined: "June 2026", linkedin: "https://www.linkedin.com/in/anika-sen-?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/anikasen1006" },
  { name: "Srishti Pundeer",   role: "QA",     dept: "Full Stack Developer",     avatar: "/team/srishti.jpeg", bio: "Srishti is a Computer Science and Engineering student passionate about technology, innovation, and continuous learning. Her interests include software development, artificial intelligence, data science, and algorithmic problem-solving. She enjoys building impactful projects that address real-world challenges and is committed to expanding her technical expertise through hands-on development, research, and collaborative initiatives. ", skills: ["REST APIs", "react", "next.js", "express" , "node.js", "SQL" , "Git and Github", "DSA" ,"mongoDB"], joined: "jun 2026", linkedin: "https://www.linkedin.com/in/srishti-pundeer/", github: "https://github.com/srishtipundeer1116" },
  { name: "Vridhi Jain",     role: "Application Developer",     dept: "Full Stack Developer",     avatar: "/team/vridhi.jpeg", bio: "", skills: [""], joined: "June 2026", linkedin: "www.linkedin.com/in/vridhijain29", github: "https://github.com/Vridhi29" },
  { name: "Bhavya Agarwal",     role: "Application Developer", dept: "", avatar: "BA", bio: "", skills: [""], joined: "June 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Kunal Bubna",    role: "Application Developer",        dept: "Full Stack Developer",        avatar: "/team/kunal.jpeg", bio: " Kunal Bubna is a Full Stack Developer with a strong interest in creating innovative and user-centric digital solutions. Enjoys solving complex problems and building reliable applications across the frontend and backend. ", skills: ["React.js " , "Next.js ", "Node.js" , "Express.js" , "MongoDB"], joined: "June 2026", linkedin: "https://www.linkedin.com/in/kunal-bubna-873036374?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "kunalbubna263 (Kunal Bubna) https://share.google/GRxElEZsCoixbvktl" },
  { name: "Bhoomi Tomer",  role: "Application Developer",     dept: "Full Stack Developer",     avatar: "/team/bhoomi.jpeg", bio: " Bhoomi is a Cyber Security enthusiast and Full Stack Developer passionate about building secure, user-friendly web applications and solving real-world problems through technology. Interested in secure software development, web technologies, and i strengthening digital systems through innovative solutions.", skills: ["React.js " ,  "Node.js ", "JavaScript", "Python", "Cyber Security", "Network Security", "Vulnerability Assessment", "Security Analysis", "Git", "GitHub", "DSA"], joined: "June 2026", linkedin: "https://www.linkedin.com/in/tomerbhoomi?utm_source=share_via&utm_content=profile&utm_medium=member_ios", github: "https://github.com/bhoomig9891-hash" },
  { name: "Amishi",  role: "ML Developer", dept: "", avatar: "A", bio: "", skills: [""], joined: "Jun 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Hardik Bindal",   role: "Emple Kids Lead",        dept: "Full Stack Developer",        avatar: "/team/hardik.jpeg", bio: "", skills: [""], joined: "Jun 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Akshat Sharma",   role: "Content Writer",        dept: "Content Writer",        avatar: "/team/akshat.jpeg", bio: " Akshat is a Cybersecurity enthusiast and Computer Science student with a strong interest in ethical hacking, network security, and digital forensics. Passionate about understanding cyber threats, vulnerability assessment, and security best practices. Actively developing practical skills through cybersecurity labs, CTF challenges, and hands-on projects while continuously expanding knowledge of information security. Focused on building secure and resilient digital systems.", skills: ["Java" ,"Dsa" , "Python" ,"Research and Analysis" , "Content Writing"], joined: "Jun 2026", linkedin: "linkedin.com/in/akshat-sharma2087", github: "https://github.com/akshat8710" },
  { name: "Akriti Joshi",   role: "Content Writer",     dept: "Content Writer",     avatar: "/team/akriti.jpeg", bio: " Akriti is a Passionate student with a strong interest in coding , problem solving , research , and cybersecurity . She enjoys building practical solutions through programming , exploring emerging technologies .", skills: ["Python", "Java" , "DSA" , "OOP" , "Content Writing "], joined: "June 2026", linkedin: "www.linkedin.com/in/ aakriti-joshi-049893363", github: "https://github.com/Aakriti1-joshi" },
  { name: "Manan Rajoria",  role: "Content Writer", dept: "Content Writer", avatar: "MR", bio: " Manan is  a technology enthusiast with a strong interest in software development, problem-solving, and emerging technologies. He enjoys learning new technical skills, building practical solutions, and continuously expanding my knowledge in the field of computer science. ", skills: ["Java " , " Python " , "Content Writing " , "Research & Analysis"], joined: "June 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Vanshika Rawat",    role: "Cyber Security Analyst",        dept: "Cyber Security",        avatar: "/team/vanshika.jpeg", bio: "", skills: [""], joined: "Jun 2026", linkedin: "https://www.linkedin.com/in/oneshika/", github: "https://github.com/1shieka" },
  { name: "Rahul Chaturvedi",  role: "Cyber Security Analyst",     dept: "Cyber Security",     avatar: "RC", bio: " Rahul is a Cyber Security enthusiasts focused on securing digital infrastructure and supporting safe technology environments. Interested in identifying security challenges, assessing potential risks, and contributing to effective security solutions.", skills: ["Cyber Security " , "Penetration Testing ", "Information Security", "Security Analysis", "Threat Assessment", "Risk Management"], joined: "June 2026 ", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Manya Goel",    role: "ML Developer",        dept: "",        avatar: "/team/manya.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "https://www.linkedin.com/in/manya-goel", github: "https://github.com/Manya-Goel" },
  { name: "Tanish Chopra",   role: "Cyber Security Analyst", dept: "Cyber Security", avatar: "/team/tanish.jpeg", bio: " Tanish is a Cyber Security enthusiast with a keen interest in system and network security, risk identification, and strengthening digital environments. Passionate about security analysis, risk assessment, and enhancing digital protection through structured and proactive security measures.", skills: ["Cyber Security " , "Vulnerability Assessment " , "Penetration Testing " , "Web Application" , " Security Network " , "Security Risk Assessment ", "Security Analysis"], joined: "June 2026", linkedin: "https://www.linkedin.com/in/tanish-chopra15", github: "https://github.com/tanishchopra15" },
  { name: "Garima",    role: "ML developer",     dept: "Mobile Developer",     avatar: "/team/garima.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "https://www.linkedin.com/in/garima-goyal-68869631b?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/new" },
  { name: "Aditya Agarwal",  role: "ML Developer",        dept: "Full Stack Developer",        avatar: "/team/aditya.jpeg", bio: " Aditya is an Enthusiastic learner with an interest in technology and problem-solving.  He enjoys building project and continuously improving his skills.", skills: ["Python","java","research and analysis "], joined: "June 2026", linkedin: "www.linkedin.com/in/aditya-agarwal-5b617b339", github: "https://github.com/Adityaagarwal2005" },
  { name: "Shivanya",   role: "Devops", dept: "", avatar: "S", bio: "", skills: [""], joined: "June 2026", linkedin: "https://linkedin.com", github: "https://github.com" },
  { name: "Tanya Marwaha",   role: "Innovation Management",        dept: "Mobile Development",        avatar: "/team/tanya.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "https://www.linkedin.com/in/tanya-marwaha-abb690330/", github: "https://github.com/Tanya-1806" },
  { name: "Meghna Dhakad",   role: "Innovation Management",        dept: "Mobile Development",        avatar: "/team/meghna.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "https://www.linkedin.com/in/meghna-dhakad?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/MeghnaDhakad" },
  { name: "Vaanya Sehrawat",   role: "Innovation Management",        dept: "Social Media",        avatar: "/team/vaanya.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "www.linkedin.com/in/vaanya-sehrawat", github: "https://github.com/VaanyaSehrawat" },
    { name: "Rishika ",   role: "Social Media",        dept: "Social Media",        avatar: "R", bio: "", skills: [""], joined: "june 2026", linkedin: "", github: "" },
    { name: "Kashish Bhatt  ",   role: "Social Media",        dept: "Social Media",        avatar: "/team/kashish.jpeg", bio: "", skills: [""], joined: "june 2026", linkedin: "https://www.linkedin.com/in/kashish-bhatt-418a98341?utm_source=share_via&utm_content=profile&utm_medium=member_android", github: "https://github.com/Kashish-Bhatt" },
];

// ─── Dept colour map ──────────────────────────────────────────────────────────

const DEPT_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Leadership:       { bg: "#1a0d00", border: "#FF6B35", text: "#FF8C42", badge: "#FF6B35" },
  Mentorship:       { bg: "#0d001a", border: "#A855F7", text: "#C084FC", badge: "#A855F7" },
  Android:          { bg: "#1a1200", border: "#FF6B35", text: "#FF8C42", badge: "#FF6B35" },
  "Cyber Security": { bg: "#120010", border: "#FF4466", text: "#FF6680", badge: "#FF4466" },
  "Full Stack":     { bg: "#001218", border: "#35BBFF", text: "#55CCFF", badge: "#35BBFF" },
  Content:          { bg: "#001208", border: "#35FF8C", text: "#55FFAA", badge: "#35FF8C" },
};

// ─── LinkedIn SVG ─────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

// ─── GitHub SVG ───────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// ─── Member Card ──────────────────────────────────────────────────────────────

function MemberCard({ member, onClick, showSocial = true }: { member: Member; onClick: () => void; showSocial?: boolean }) {
  const col = DEPT_COLORS[member.dept] ?? DEPT_COLORS["Full Stack"];
  return (
    <div
      className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer w-full"
      style={{ background: `linear-gradient(145deg, ${col.bg} 0%, #111 100%)`, border: `1px solid ${col.border}44` }}
      onClick={onClick}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${col.border}33`; (e.currentTarget as HTMLElement).style.borderColor = `${col.border}99`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = `${col.border}44`; }}
    >
     <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
  style={{ border: `2px solid ${col.badge}` }}>
  {member.avatar.startsWith("/") ? (
    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-xl font-black text-white"
      style={{ background: `linear-gradient(135deg, ${col.badge}, ${col.badge}88)` }}>
      {member.avatar}
    </div>
  )}
</div>
      <div className="text-center">
        <p className="font-bold text-white text-sm leading-tight">{member.name}</p>
        <p className="text-xs mt-1" style={{ color: col.text }}>{member.role}</p>
      </div>
      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
        style={{ background: `${col.badge}18`, color: col.text, border: `1px solid ${col.badge}44` }}>
        {member.dept}
      </span>
      {showSocial && (
        <div className="flex gap-2 mt-1">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 hover:scale-110"
            style={{ background: `${col.badge}18`, color: col.text, border: `1px solid ${col.badge}33` }}
            title="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href={member.github} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 hover:scale-110"
            style={{ background: `${col.badge}18`, color: col.text, border: `1px solid ${col.badge}33` }}
            title="GitHub">
            <GitHubIcon />
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}44)` }} />
      <span className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
        style={{ color, background: `${color}12`, border: `1px solid ${color}33` }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${color}44)` }} />
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ member, onClose }: { member: Member; onClose: () => void }) {
  const col = DEPT_COLORS[member.dept] ?? DEPT_COLORS["Full Stack"];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)" }} onClick={onClose}>
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#111", border: `1px solid ${col.border}77`, boxShadow: `0 0 60px ${col.border}33` }}
        onClick={e => e.stopPropagation()}>
        {/* Cover */}
        <div className="h-36 w-full relative flex items-end px-6 pb-0"
          style={{ background: `linear-gradient(135deg, ${col.bg} 0%, #0d0d0d 100%)`, borderBottom: `1px solid ${col.border}22` }}>
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} />
         <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden translate-y-12"
  style={{ border: `3px solid ${col.badge}`, outline: `4px solid #111`, boxShadow: `0 0 32px ${col.badge}66` }}>
  {member.avatar.startsWith("/") ? (
    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-3xl font-black text-white"
      style={{ background: `linear-gradient(135deg, ${col.badge}, ${col.badge}88)` }}>
      {member.avatar}
    </div>
  )}
</div>
        </div>
        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-white text-2xl leading-none transition-colors">×</button>
        {/* Content */}
       <div className="px-6 pt-16 pb-6">
          <div className="mb-4">
            <h2 className="text-white text-xl font-black">{member.name}</h2>
            <p className="text-sm mt-0.5" style={{ color: col.text }}>{member.role}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
                style={{ background: `${col.badge}18`, color: col.text, border: `1px solid ${col.badge}44` }}>
                {member.dept}
              </span>
            </div>
          </div>
          {member.dept !== "Leadership" && member.dept !== "Mentorship" && (
            <>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#aaa" }}>{member.bio}</p>
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
                  style={{ background: `${col.badge}18`, color: col.text, border: `1px solid ${col.badge}44` }}>
                  Joined {member.joined}
                </span>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full transition-all hover:scale-105"
                  style={{ background: "#0A66C218", color: "#0A66C2", border: "1px solid #0A66C244" }}>
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full transition-all hover:scale-105"
                  style={{ background: "#ffffff12", color: "#ccc", border: "1px solid #ffffff22" }}>
                  <GitHubIcon /> GitHub
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#555" }}>Skills</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map(s => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full"
                      style={{ background: "#1a1a1a", color: col.text, border: `1px solid ${col.border}33` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 4-column row renderer ────────────────────────────────────────────────────

function CardRow({ members, onSelect, showSocial = true }: { members: Member[]; onSelect: (m: Member) => void; showSocial?: boolean }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {members.map(m => (
        <MemberCard key={m.name + m.role} member={m} onClick={() => onSelect(m)} showSocial={showSocial} />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [selected, setSelected] = useState<Member | null>(null);

  // Chunk interns into rows of 4
  const internRows: Member[][] = [];
  for (let i = 0; i < INTERNS.length; i += 4) internRows.push(INTERNS.slice(i, i + 4));

  return (
    <main className="min-h-screen w-full" style={{ background: "#0d0d0d", fontFamily: "'Inter', sans-serif" }}>
      {/* Grid bg */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,107,53,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-14">
        {/* Page header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(255,107,53,0.12)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.25)" }}>
            ● Our Team
          </span>
          <h1 className="text-5xl font-black text-white tracking-tight">
            People behind <span style={{ color: "#FF6B35" }}>Emple</span>
          </h1>
          <p className="text-sm mt-3" style={{ color: "#555" }}>Click any card to learn more about the team.</p>
        </div>

        {/* Leadership Row */}
        <SectionLabel label="Leadership Team" color="#FF6B35" />
        <CardRow members={LEADERSHIP} onSelect={setSelected} showSocial={false} />

        {/* Mentorship Row */}
        <div className="mt-10">
          <SectionLabel label="Mentorship Team" color="#A855F7" />
          <CardRow members={MENTORSHIP} onSelect={setSelected} showSocial={false} />
        </div>

        {/* Interns / Spines */}
        <div className="mt-10">
          <SectionLabel label="Interns & Spines" color="#35BBFF" />
          {internRows.map((row, i) => (
            <CardRow key={i} members={row} onSelect={setSelected} />
          ))}
        </div>

        <p className="text-center mt-12 text-xs" style={{ color: "#2a2a2a" }}>
          © 2026 Emple · AI-Powered Placement Ecosystem
        </p>
      </div>

      {selected && <Modal member={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
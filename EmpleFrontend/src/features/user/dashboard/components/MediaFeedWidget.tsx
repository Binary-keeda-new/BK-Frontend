"use client";

import { ExternalLink } from "lucide-react";

export default function MediaFeedWidget() {
  const posts = [
    { id: 1, caption: "Learn React like a pro! 🚀 Master the fundamentals and build modern web applications efficiently.", date: "2 hrs ago", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=100&auto=format&fit=crop" },
    { id: 2, caption: "Mastering Tailwind CSS 💅 Utility-first CSS framework for rapid UI development.", date: "5 hrs ago", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=100&auto=format&fit=crop" },
    { id: 3, caption: "Top 5 interview tips 💼 Land your dream job with these actionable strategies.", date: "1 day ago", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=100&auto=format&fit=crop" },
    { id: 4, caption: "Behind the scenes at Emple HQ 🏢", date: "2 days ago", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=100&auto=format&fit=crop" },
    { id: 5, caption: "New AI features rolling out next week! 🤖 Get ready for next-gen productivity.", date: "3 days ago", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=100&auto=format&fit=crop" },
  ];

  return (
    <div className="animated-border h-full">
      <div
        className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 22px)" }}
      >
        <div className="flex items-center gap-3" style={{ marginBottom: "clamp(12px, 3.5vw, 16px)", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Profile" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: "var(--orange)" }} />
          <div className="flex-1 min-w-0">
            <h3 className="m-0 font-bold truncate" style={{ fontSize: "14px", color: "var(--text)" }}>@emple.io</h3>
            <p className="m-0 truncate" style={{ fontSize: "11px", color: "var(--muted)" }}>Official Emple Account</p>
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontSize: "10px", color: "var(--text)", fontWeight: 600 }}>12.4K <span style={{ color: "var(--muted)", fontWeight: 400 }}>Followers</span></span>
              <span style={{ fontSize: "10px", color: "var(--text)", fontWeight: 600 }}>142 <span style={{ color: "var(--muted)", fontWeight: 400 }}>Following</span></span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {posts.map(post => (
            <a 
              key={post.id} 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 rounded-xl transition-all duration-200"
              style={{ background: "var(--surface2)", border: "1px solid var(--border)", textDecoration: "none" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--orange)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img src={post.img} alt="Post" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="font-medium line-clamp-2 m-0 leading-snug" style={{ fontSize: "12px", color: "var(--text)" }}>{post.caption}</p>
                <p className="m-0 mt-1.5" style={{ fontSize: "10px", color: "var(--muted)" }}>{post.date}</p>
              </div>
              <ExternalLink size={14} color="var(--muted2)" className="flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

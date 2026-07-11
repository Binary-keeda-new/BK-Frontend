"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "@descope/nextjs-sdk/client";
import { Lock } from "lucide-react";
import LoginGate from "@/shared/components/access/LoginGate";

const NAV_ITEMS = [
  {
    label: "Dashboard", tip: "Dashboard", href: "/user/dashboard",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  },
  {
    label: "Practice", tip: "Practice", href: "/user/practice",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    label: "Resources", tip: "Resources", href: "/resources",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  },
  {
    label: "Tutorials", tip: "Tutorials", href: "/user/tutorials",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  },
  {
    label: "Jobs", tip: "Jobs", href: "/jobs",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  },
  {
    label: "ATS Scanner", tip: "ATS Scanner", href: "/user/ats",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
  },
  /*{
    label: "AI Interview", tip: "AI Interview", href: "/user/ai-interview",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  },
  */
  {
    label: "Tech Shop", tip: "Tech Shop", href: "/user/tech-shop",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  },
  {
    label: "Events", tip: "Events", href: "/user/events",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="16" r="2" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "Sessions", tip: "Sessions", href: "/user/sessions",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
];

const iconClass = "w-7 h-7 flex items-center justify-center flex-shrink-0";

const itemBase = "has-tip flex items-center gap-[11px] px-[10px] py-[9px] rounded-[11px] cursor-pointer select-none text-[13.5px] whitespace-nowrap font-medium transition-all duration-200";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useSession() as any;

  useEffect(() => {
    if (pathname.includes('/user/profile')) {
      setCollapsed(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (!pathname.includes('/user/profile')) {
        setCollapsed(window.innerWidth < 768);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  const getStyle = (isActive: boolean) => ({
    background: isActive ? "var(--orange)" : "transparent",
    color: isActive ? "#fff" : "var(--muted2)",
    boxShadow: isActive ? "0 4px 14px rgba(241,90,34,0.35)" : "none",
  });

  const onHover = (e: React.MouseEvent, isActive: boolean, on: boolean) => {
    if (!isActive) {
      const el = e.currentTarget as HTMLElement;
      el.style.background = on ? "var(--orange-dim)" : "transparent";
      el.style.color = on ? "var(--orange)" : "var(--muted2)";
    }
  };

  const handleItemClick = (e: React.MouseEvent, isPremium: boolean) => {
    if (isPremium && !isAuthenticated) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <aside
      className={`
        relative z-20 flex flex-col flex-shrink-0
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[66px]" : "w-[215px]"}
      `}
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
    >
      {/* Floating Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[82px] w-7 h-7 flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--muted2)] hover:text-[var(--orange)] shadow-md z-50 cursor-pointer transition-colors"
        title="Toggle Sidebar"
      >
        <svg
          width="14" height="14" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
          style={{ transform: collapsed ? "scaleX(-1)" : "scaleX(1)", transition: "transform 380ms ease" }}
        >
          <polyline points="8,2 4,6 8,10"/>
        </svg>
      </button>
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} px-[16px] py-5 min-h-[64px] flex-shrink-0`}>
        <div className={`flex items-center gap-2 ${collapsed ? "hidden" : "flex"}`}>
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 font-extrabold text-base text-white italic font-syne transition-all duration-200 hover:scale-[1.07] hover:-rotate-3"
            style={{ background: "var(--orange)", boxShadow: "0 4px 14px rgba(241,90,34,0.35)" }}
          >
            e
          </div>
          <span
            className="font-syne text-xl font-extrabold tracking-tight whitespace-nowrap"
            style={{ color: "var(--text)" }}
          >
            <em className="not-italic" style={{ color: "var(--orange)" }}>e</em>mple
          </span>
        </div>
      </div>


      {/* Collapsed */}
     <button
  onClick={() => setCollapsed(!collapsed)}
  className="
    absolute
    top-[63px]
    -right-4
    w-7
    h-7
    z-[9999]
    rounded-full
    bg-[#F15A22]
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    hover:scale-105
    transition-all
  "
>
    {collapsed ? (
     <ChevronRight size={18} strokeWidth={2.8} />
     ) : (
     <ChevronLeft size={18} strokeWidth={2.8} />
    )}
    </button>


      {/* Nav items */}
      <nav className="flex-1 px-[10px] py-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          let isActive = pathname === item.href;
          if (item.label === "Resources" && pathname.startsWith("/resources")) isActive = true;
          if (item.label === "Jobs" && pathname.startsWith("/jobs")) isActive = true;
          if (item.label === "Tutorials" && pathname.startsWith("/user/tutorials")) isActive = true;
          if (item.label === "Sessions" && pathname.startsWith("/user/sessions")) isActive = true;
          const isPremium = !["Resources", "Jobs", "Tech Shop", "Events", "Counselling", "Tutorials"].includes(item.label);
          return (
            <Link href={item.href} key={item.label} style={{ textDecoration: "none" }} onClick={(e) => handleItemClick(e, isPremium)}>
              <div
                data-tip={item.tip}
                className={`${itemBase} mb-[1px]`}
                style={getStyle(isActive)}
                onMouseEnter={e => onHover(e, isActive, true)}
                onMouseLeave={e => onHover(e, isActive, false)}
              >
                <div className={iconClass}>{item.icon}</div>
                <span className={`flex-1 ${collapsed ? "hidden" : "flex"} items-center justify-between`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* The bottom section with Collapse is removed as requested */}

      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, padding: '20px'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <button 
              onClick={() => setShowLoginModal(false)}
              style={{
                position: 'absolute', top: '10px', right: '10px',
                background: 'transparent', border: 'none', color: 'var(--muted2)',
                fontSize: '24px', cursor: 'pointer', zIndex: 10
              }}
            >
              &times;
            </button>
            <LoginGate title="Free Account Required" message="Create a free Emple account to access this feature and unlock premium resources." />
          </div>
        </div>
      )}
    </aside>
  );
}
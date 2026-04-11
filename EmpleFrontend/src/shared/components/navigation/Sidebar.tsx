"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    label: "Resources", tip: "Resources", href: "/user/resources",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  },
  {
    label: "Jobs & ATS", tip: "ATS", href: "/user/jobs",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  },
  /*{
    label: "AI Interview", tip: "AI Interview", href: "/user/ai-interview",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>,
  },
  {
    label: "Blog", tip: "Blog", href: "/user/blog",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="7" x2="18" y2="7"/><line x1="10" y1="11" x2="18" y2="11"/><line x1="10" y1="15" x2="14" y2="15"/></svg>,
  },*/
  {
    label: "Tech Shop", tip: "Tech Shop", href: "/user/tech-shop",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  },
  {
    label: "Events", tip: "Events", href: "/user/events",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="16" r="2" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "Counselling", tip: "Counselling", href: "/user/counselling",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`
        relative z-20 flex flex-col flex-shrink-0 overflow-hidden
        transition-all duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
        ${collapsed ? "w-[66px]" : "w-[215px]"}
      `}
      style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
    >
      <div className="flex flex-col flex-1 w-[215px]">

        {/* Logo */}
        <div className="relative flex items-center gap-2 px-[18px] py-5 min-h-[64px] flex-shrink-0">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0
                        font-extrabold text-base text-white italic font-syne cursor-pointer
                        transition-all duration-200 hover:scale-[1.07] hover:-rotate-3"
            style={{
              background: "var(--orange)",
              boxShadow: "0 4px 14px rgba(241,90,34,0.35)",
            }}
          >
            e
          </div>

          <div
            className={`font-syne text-xl font-extrabold tracking-tight whitespace-nowrap
                        transition-all duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${collapsed ? "opacity-0 -translate-x-3 pointer-events-none w-0" : "opacity-100 translate-x-0"}`}
            style={{ color: "var(--text)" }}
          >
            <em className="not-italic" style={{ color: "var(--orange)" }}>e</em>mple
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-6 -right-[13px] z-30 w-[26px] h-[26px] rounded-full
                       flex items-center justify-center cursor-pointer
                       transition-all duration-200
                       hover:!bg-[var(--orange)] hover:!text-white hover:!border-[var(--orange)]"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--muted2)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            <svg
              width="11" height="11" viewBox="0 0 12 12" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
              className={`transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${collapsed ? "scale-x-[-1]" : ""}`}
            >
              <polyline points="8,2 4,6 8,10"/>
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav
          className={`flex-1 px-[10px] py-1 overflow-y-auto overflow-x-hidden
                      ${collapsed ? "sidebar-collapsed" : ""}`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label} style={{ textDecoration: "none" }}>
                <div
                  data-tip={item.tip}
                  className={`
                    has-tip relative flex items-center gap-[11px] px-[10px] py-[9px]
                    rounded-[11px] cursor-pointer select-none mb-[1px]
                    text-[13.5px] whitespace-nowrap
                    transition-all duration-[180ms]
                    ${isActive ? "text-white font-semibold" : "font-medium hover:opacity-100"}
                  `}
                  style={{
                    background: isActive ? "var(--orange)" : "transparent",
                    color: isActive ? "#fff" : "var(--muted2)",
                    boxShadow: isActive ? "0 4px 14px rgba(241,90,34,0.35)" : "none",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "var(--orange-dim)";
                      (e.currentTarget as HTMLElement).style.color = "var(--orange)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--muted2)";
                    }
                  }}
                >
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <span
                    className={`flex-1 transition-all duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                                ${collapsed ? "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden" : "opacity-100 translate-x-0"}`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Transactions — pinned to bottom */}
        <div className="px-[10px] pb-3" style={{ borderTop: "1px solid var(--border)" }}>
          <Link href="/user/transactions" style={{ textDecoration: "none" }}>
            <div
              data-tip="Transactions"
              className={`
                has-tip relative flex items-center gap-[11px] px-[10px] py-[9px]
                rounded-[11px] cursor-pointer select-none mt-2
                text-[13.5px] whitespace-nowrap font-medium
                transition-all duration-[180ms]
                ${pathname === "/user/transactions" ? "text-white font-semibold" : ""}
              `}
              style={{
                background: pathname === "/user/transactions" ? "var(--orange)" : "transparent",
                color: pathname === "/user/transactions" ? "#fff" : "var(--muted2)",
                boxShadow: pathname === "/user/transactions" ? "0 4px 14px rgba(241,90,34,0.35)" : "none",
              }}
              onMouseEnter={e => {
                if (pathname !== "/user/transactions") {
                  (e.currentTarget as HTMLElement).style.background = "var(--orange-dim)";
                  (e.currentTarget as HTMLElement).style.color = "var(--orange)";
                }
              }}
              onMouseLeave={e => {
                if (pathname !== "/user/transactions") {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--muted2)";
                }
              }}
            >
              <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <line x1="10" y1="7" x2="18" y2="7"/>
                  <line x1="10" y1="11" x2="18" y2="11"/>
                  <line x1="10" y1="15" x2="14" y2="15"/>
                </svg>
              </div>
              <span
                className={`flex-1 transition-all duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                            ${collapsed ? "opacity-0 -translate-x-2 pointer-events-none w-0 overflow-hidden" : "opacity-100 translate-x-0"}`}
              >
                Transactions
              </span>
            </div>
          </Link>
        </div>

      </div>
    </aside>
  );
}
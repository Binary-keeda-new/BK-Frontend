// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useTheme } from "@/view/user/contexts/ThemeContext";
// import { Clapperboard, Sparkles, Bell, User, LogOut } from "lucide-react";
// import { useDescope, useSession } from "@descope/nextjs-sdk/client";
// import { useRouter } from "next/navigation";

// export default function Topbar() {
//   const { theme, toggleTheme } = useTheme();
//   const isDark = theme === "dark";
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const sdk = useDescope();
//   const router = useRouter();
//  const { session } = useSession() as any;

//   // Dynamic user initials
//   const userName = session?.token?.name || session?.token?.email || "User";
//   const initials = userName
//     .split(" ")
//     .map((n: string) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

//   const handleLogout = async () => {
//     await sdk.logout();
//     router.push("/landing");
//   };

//   useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const iconBtns = [
//     { title: "Media - Coming Soon", icon: <Clapperboard size={22} /> },
//     { title: "Emple AI", icon: <Sparkles size={22} /> },
//     { title: "Notifications", icon: <Bell size={20} /> },
//   ];

//   return (
//     <>
//       <style>{`
//         @keyframes pulse-dot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.2); }
//         }
//         .enhanced-navbar {
//           backdrop-filter: blur(10px);
//           transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
//         }
//         .enhanced-navbar.light-nav {
//           background: linear-gradient(90deg, #ffffff 0%, #fffbf7 100%);
//           border-bottom: 1px solid rgba(249,115,22,0.1);
//           box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//           color: #374151;
//         }
//         .enhanced-navbar.dark-nav {
//           background: var(--surface);
//           border-bottom: 1px solid var(--border);
//           box-shadow: 0 2px 12px rgba(0,0,0,0.3);
//         }
//         .logo-img {
//           height: 35px; width: auto; display: block;
//           background: transparent !important;
//           border: none !important; box-shadow: none !important;
//           transition: all 0.3s ease;
//         }
//         .logo-img:hover { transform: scale(1.05); filter: brightness(1.05); }
//         .coin-badge-light {
//           background: #f3f4f6; border: 1.5px solid #e5e7eb;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #374151;
//           transition: all 0.3s ease;
//         }
//         .coin-badge-light:hover {
//           background: #ffffff; border-color: #d1d5db;
//           box-shadow: 0 2px 6px rgba(0,0,0,0.12); transform: translateY(-1px);
//         }
//         .coin-badge-dark {
//           background: rgba(253,216,53,0.1);
//           border: 1px solid rgba(253,216,53,0.3);
//           color: #f0c030; transition: all 0.3s ease;
//         }
//         .coin-badge-dark:hover { background: rgba(253,216,53,0.18); transform: translateY(-1px); }
//         .nav-icon-btn {
//           width: 44px; height: 44px; border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; border: none; background: transparent;
//           transition: all 0.3s ease;
//         }
//         .nav-icon-btn.light-icon { color: #6b7280; }
//         .nav-icon-btn.dark-icon { color: var(--muted2); }
//         .nav-icon-btn:hover {
//           transform: translateY(-2px);
//           background-color: rgba(249,115,22,0.1) !important;
//           color: #f97316 !important;
//         }
//         .user-avatar-light {
//           border: 2px solid #f97316;
//           box-shadow: 0 4px 12px rgba(249,115,22,0.2);
//           transition: all 0.3s ease; cursor: pointer;
//         }
//         .user-avatar-light:hover { transform: scale(1.1); box-shadow: 0 6px 16px rgba(249,115,22,0.3); }
//         .user-avatar-dark {
//           border: 2px solid var(--border);
//           box-shadow: 0 2px 8px rgba(241,90,34,0.3);
//           transition: all 0.3s ease; cursor: pointer;
//         }
//         .user-avatar-dark:hover { transform: scale(1.1); box-shadow: 0 4px 14px rgba(241,90,34,0.45); }
//         .avatar-dropdown {
//           position: absolute;
//           top: 54px;
//           right: 0;
//           min-width: 160px;
//           border-radius: 12px;
//           overflow: hidden;
//           z-index: 100;
//           animation: fadeIn 0.15s ease;
//         }
//         .avatar-dropdown.dark-drop {
//           background: var(--surface);
//           border: 1px solid var(--border);
//           box-shadow: 0 8px 24px rgba(0,0,0,0.4);
//         }
//         .avatar-dropdown.light-drop {
//           background: #ffffff;
//           border: 1px solid #e5e7eb;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//         }
//         .dropdown-item {
//           display: flex; align-items: center; gap: 10px;
//           padding: 11px 16px; cursor: pointer;
//           font-size: 14px; font-weight: 500;
//           transition: background 0.15s;
//         }
//         .dropdown-item.dark-item { color: var(--text); }
//         .dropdown-item.dark-item:hover { background: var(--orange-dim); color: var(--orange); }
//         .dropdown-item.light-item { color: #374151; }
//         .dropdown-item.light-item:hover { background: #fff7f3; color: #f97316; }
//         .dropdown-item.logout { color: #ef4444 !important; }
//         .dropdown-item.logout:hover { background: rgba(239,68,68,0.1) !important; }
//         .dropdown-divider { height: 1px; margin: 0; }
//         .dropdown-divider.dark-div { background: var(--border); }
//         .dropdown-divider.light-div { background: #e5e7eb; }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       <header className="relative h-[62px]">
//         <nav className={`enhanced-navbar ${isDark ? "dark-nav" : "light-nav"} fixed left-0 h-[62px] flex items-center pr-8 pl-6 justify-between z-40 w-full top-0`}>

//           {/* Logo */}
//           <div className="flex items-center">
//             {isDark ? (
//               <span className="font-syne text-xl font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
//                 <em className="not-italic" style={{ color: "var(--orange)" }}>e</em>mple
//               </span>
//             ) : (
//               <img
//                 src="/emple-logo.png"
//                 alt="Emple"
//                 className="logo-img"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                   const fallback = e.currentTarget.parentElement?.querySelector(".logo-fallback") as HTMLElement;
//                   if (fallback) fallback.style.display = "block";
//                 }}
//               />
//             )}
//             <span className="logo-fallback font-syne text-xl font-extrabold tracking-tight text-orange-500" style={{ display: "none" }}>
//               <em className="not-italic">e</em>
//               <em className="not-italic text-gray-800">mple</em>
//             </span>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-3">

//             {/* Coin Badge */}
//             <div className={`coin-badge-${isDark ? "dark" : "light"} flex gap-2 rounded-full items-center px-3 py-1.5 cursor-pointer`}>
//               <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center text-[9px] font-extrabold" style={{ background: "#fdd835", color: "#6d4c00" }}>
//                 BK
//               </span>
//               <span className="text-xs font-semibold">100</span>
//             </div>

//             {/* Theme Toggle */}
//             <button title="Toggle Theme" onClick={toggleTheme} className={`nav-icon-btn ${isDark ? "dark-icon" : "light-icon"}`}>
//               {isDark ? "☀️" : "🌙"}
//             </button>

//             {/* Icon Buttons */}
//             {iconBtns.map(({ title, icon }) => (
//               <button key={title} title={title} className={`nav-icon-btn ${isDark ? "dark-icon" : "light-icon"}`}>
//                 {icon}
//               </button>
//             ))}

//             {/* User Avatar + Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <div
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className={`user-avatar-${isDark ? "dark" : "light"} w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white`}
//                 style={{
//                   background: isDark
//                     ? "linear-gradient(135deg, #f15a22, #6c63ff)"
//                     : "linear-gradient(135deg, #f97316, #fb923c)",
//                 }}
//               >
//                 {initials}
//               </div>

//               {/* Dropdown */}
//               {dropdownOpen && (
//                 <div className={`avatar-dropdown ${isDark ? "dark-drop" : "light-drop"}`}>
//                   {/* User name in dropdown */}
//                   <div className={`dropdown-item ${isDark ? "dark-item" : "light-item"}`} style={{ opacity: 0.7, cursor: 'default', fontSize: 12 }}>
//                     {userName}
//                   </div>
//                   <div className={`dropdown-divider ${isDark ? "dark-div" : "light-div"}`} />
//                   <div className={`dropdown-item ${isDark ? "dark-item" : "light-item"}`}>
//                     <User size={16} />
//                     <span>Profile</span>
//                   </div>
//                   <div className={`dropdown-divider ${isDark ? "dark-div" : "light-div"}`} />
//                   <div
//                     onClick={handleLogout}
//                     className={`dropdown-item logout ${isDark ? "dark-item" : "light-item"}`}
//                   >
//                     <LogOut size={16} />
//                     <span>Logout</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }





//"use client";
//
//import { useState, useRef, useEffect } from "react";
//import { useTheme } from "@/providers/ThemeContext";
//import { Clapperboard, Sparkles, Bell, User, LogOut } from "lucide-react";
//import { useDescope, useSession } from "@descope/nextjs-sdk/client";
//import { useRouter } from "next/navigation";
//
//export default function Topbar() {
//  const { theme, toggleTheme } = useTheme();
//  const isDark = theme === "dark";
//  const [dropdownOpen, setDropdownOpen] = useState(false);
//  const dropdownRef = useRef<HTMLDivElement>(null);
//  const sdk = useDescope();
//  const router = useRouter();
//  const { session } = useSession() as any;
//
//  // Dynamic user initials
//  const userName = session?.token?.name || session?.token?.email || "User";
//  const initials = userName
//    .split(" ")
//    .map((n: string) => n[0])
//    .join("")
//    .toUpperCase()
//    .slice(0, 2);
//
//  const handleLogout = async () => {
//    await sdk.logout();
//    router.push("/landing");
//  };
//
//  const handleProfile = () => {
//    router.push("/user/profile");
//    setDropdownOpen(false);
//  };
//
//  useEffect(() => {
//    function handleClickOutside(e: MouseEvent) {
//      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//        setDropdownOpen(false);
//      }
//    }
//    document.addEventListener("mousedown", handleClickOutside);
//    return () => document.removeEventListener("mousedown", handleClickOutside);
//  }, []);
//
//  const iconBtns = [
//    { title: "Media - Coming Soon", icon: <Clapperboard size={22} /> },
//    { title: "Emple AI", icon: <Sparkles size={22} /> },
//    { title: "Notifications", icon: <Bell size={20} /> },
//  ];
//
//  return (
//    <>
//      <style>{`
//        @keyframes pulse-dot {
//          0%, 100% { opacity: 1; transform: scale(1); }
//          50% { opacity: 0.8; transform: scale(1.2); }
//        }
//        .enhanced-navbar {
//          backdrop-filter: blur(10px);
//          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
//        }
//        .enhanced-navbar.light-nav {
//          background: linear-gradient(90deg, #ffffff 0%, #fffbf7 100%);
//          border-bottom: 1px solid rgba(249,115,22,0.1);
//          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
//          color: #374151;
//        }
//        .enhanced-navbar.dark-nav {
//          background: var(--surface);
//          border-bottom: 1px solid var(--border);
//          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
//        }
//        .logo-img {
//          height: 35px; width: auto; display: block;
//          background: transparent !important;
//          border: none !important; box-shadow: none !important;
//          transition: all 0.3s ease;
//        }
//        .logo-img:hover { transform: scale(1.05); filter: brightness(1.05); }
//        .coin-badge-light {
//          background: #f3f4f6; border: 1.5px solid #e5e7eb;
//          box-shadow: 0 1px 3px rgba(0,0,0,0.1); color: #374151;
//          transition: all 0.3s ease;
//        }
//        .coin-badge-light:hover {
//          background: #ffffff; border-color: #d1d5db;
//          box-shadow: 0 2px 6px rgba(0,0,0,0.12); transform: translateY(-1px);
//        }
//        .coin-badge-dark {
//          background: rgba(253,216,53,0.1);
//          border: 1px solid rgba(253,216,53,0.3);
//          color: #f0c030; transition: all 0.3s ease;
//        }
//        .coin-badge-dark:hover { background: rgba(253,216,53,0.18); transform: translateY(-1px); }
//        .nav-icon-btn {
//          width: 44px; height: 44px; border-radius: 50%;
//          display: flex; align-items: center; justify-content: center;
//          cursor: pointer; border: none; background: transparent;
//          transition: all 0.3s ease;
//        }
//        .nav-icon-btn.light-icon { color: #6b7280; }
//        .nav-icon-btn.dark-icon { color: var(--muted2); }
//        .nav-icon-btn:hover {
//          transform: translateY(-2px);
//          background-color: rgba(249,115,22,0.1) !important;
//          color: #f97316 !important;
//        }
//        .user-avatar-light {
//          border: 2px solid #f97316;
//          box-shadow: 0 4px 12px rgba(249,115,22,0.2);
//          transition: all 0.3s ease; cursor: pointer;
//        }
//        .user-avatar-light:hover { transform: scale(1.1); box-shadow: 0 6px 16px rgba(249,115,22,0.3); }
//        .user-avatar-dark {
//          border: 2px solid var(--border);
//          box-shadow: 0 2px 8px rgba(241,90,34,0.3);
//          transition: all 0.3s ease; cursor: pointer;
//        }
//        .user-avatar-dark:hover { transform: scale(1.1); box-shadow: 0 4px 14px rgba(241,90,34,0.45); }
//        .avatar-dropdown {
//          position: absolute;
//          top: 54px;
//          right: 0;
//          min-width: 160px;
//          border-radius: 12px;
//          overflow: hidden;
//          z-index: 100;
//          animation: fadeIn 0.15s ease;
//        }
//        .avatar-dropdown.dark-drop {
//          background: var(--surface);
//          border: 1px solid var(--border);
//          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
//        }
//        .avatar-dropdown.light-drop {
//          background: #ffffff;
//          border: 1px solid #e5e7eb;
//          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//        }
//        .dropdown-item {
//          display: flex; align-items: center; gap: 10px;
//          padding: 11px 16px; cursor: pointer;
//          font-size: 14px; font-weight: 500;
//          transition: background 0.15s;
//        }
//        .dropdown-item.dark-item { color: var(--text); }
//        .dropdown-item.dark-item:hover { background: var(--orange-dim); color: var(--orange); }
//        .dropdown-item.light-item { color: #374151; }
//        .dropdown-item.light-item:hover { background: #fff7f3; color: #f97316; }
//        .dropdown-item.logout { color: #ef4444 !important; }
//        .dropdown-item.logout:hover { background: rgba(239,68,68,0.1) !important; }
//        .dropdown-divider { height: 1px; margin: 0; }
//        .dropdown-divider.dark-div { background: var(--border); }
//        .dropdown-divider.light-div { background: #e5e7eb; }
//        @keyframes fadeIn {
//          from { opacity: 0; transform: translateY(-6px); }
//          to { opacity: 1; transform: translateY(0); }
//        }
//      `}</style>
//
//      <header className="relative h-[62px]">
//        <nav className={`enhanced-navbar ${isDark ? "dark-nav" : "light-nav"} fixed left-0 h-[62px] flex items-center pr-8 pl-6 justify-between z-40 w-full top-0`}>
//
//          {/* Logo */}
//          <div className="flex items-center">
//            {isDark ? (
//              <span className="font-syne text-xl font-extrabold tracking-tight" style={{ color: "var(--text)" }}>
//                <em className="not-italic" style={{ color: "var(--orange)" }}>e</em>mple
//              </span>
//            ) : (
//              <img
//                src="/emple-logo.png"
//                alt="Emple"
//                className="logo-img"
//                onError={(e) => {
//                  e.currentTarget.style.display = "none";
//                  const fallback = e.currentTarget.parentElement?.querySelector(".logo-fallback") as HTMLElement;
//                  if (fallback) fallback.style.display = "block";
//                }}
//              />
//            )}
//            <span className="logo-fallback font-syne text-xl font-extrabold tracking-tight text-orange-500" style={{ display: "none" }}>
//              <em className="not-italic">e</em>
//              <em className="not-italic text-gray-800">mple</em>
//            </span>
//          </div>
//
//          {/* Right Side */}
//          <div className="flex items-center gap-3">
//
//            {/* Coin Badge */}
//            <div className={`coin-badge-${isDark ? "dark" : "light"} flex gap-2 rounded-full items-center px-3 py-1.5 cursor-pointer`}>
//              <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center text-[9px] font-extrabold" style={{ background: "#fdd835", color: "#6d4c00" }}>
//                E
//              </span>
//              <span className="text-xs font-semibold">100</span>
//            </div>
//
//            {/* Theme Toggle */}
//            <button title="Toggle Theme" onClick={toggleTheme} className={`nav-icon-btn ${isDark ? "dark-icon" : "light-icon"}`}>
//              {isDark ? "☀️" : "🌙"}
//            </button>
//
//            {/* Icon Buttons */}
//            {iconBtns.map(({ title, icon }) => (
//              <button key={title} title={title} className={`nav-icon-btn ${isDark ? "dark-icon" : "light-icon"}`}>
//                {icon}
//              </button>
//            ))}
//
//            {/* User Avatar + Dropdown */}
//            <div className="relative" ref={dropdownRef}>
//              <div
//                onClick={() => setDropdownOpen(!dropdownOpen)}
//                className={`user-avatar-${isDark ? "dark" : "light"} w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white`}
//                style={{
//                  background: isDark
//                    ? "linear-gradient(135deg, #f15a22, #6c63ff)"
//                    : "linear-gradient(135deg, #f97316, #fb923c)",
//                }}
//              >
//                {initials}
//              </div>
//
//              {/* Dropdown */}
//              {dropdownOpen && (
//                <div className={`avatar-dropdown ${isDark ? "dark-drop" : "light-drop"}`}>
//                  {/* User name in dropdown */}
//                  <div className={`dropdown-item ${isDark ? "dark-item" : "light-item"}`} style={{ opacity: 0.7, cursor: 'default', fontSize: 12 }}>
//                    {userName}
//                  </div>
//                  <div className={`dropdown-divider ${isDark ? "dark-div" : "light-div"}`} />
//                  {/* ✅ Profile - now navigates to /user/profile */}
//                  <div
//                    onClick={handleProfile}
//                    className={`dropdown-item ${isDark ? "dark-item" : "light-item"}`}
//                  >
//                    <User size={16} />
//                    <span>Profile</span>
//                  </div>
//                  <div className={`dropdown-divider ${isDark ? "dark-div" : "light-div"}`} />
//                  <div
//                    onClick={handleLogout}
//                    className={`dropdown-item logout ${isDark ? "dark-item" : "light-item"}`}
//                  >
//                    <LogOut size={16} />
//                    <span>Logout</span>
//                  </div>
//                </div>
//              )}
//            </div>
//
//          </div>
//        </nav>
//      </header>
//    </>
//  );
//}

"use client";

import { useState, useRef, useEffect } from "react";
import { Clapperboard, Sparkles, Bell, User, LogOut } from "lucide-react";
import { useDescope, useSession } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sdk = useDescope();
  const router = useRouter();
  const { session } = useSession() as any;

  const userName = session?.token?.name || session?.token?.email || "User";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    await sdk.logout();
    router.push("/landing");
  };

  const handleProfile = () => {
    router.push("/user/profile");
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconBtns = [
    { title: "Media - Coming Soon", icon: <Clapperboard size={22} /> },
    { title: "Emple AI", icon: <Sparkles size={22} /> },
    { title: "Notifications", icon: <Bell size={20} /> },
  ];

  return (
    <>
      <style>{`
        .enhanced-navbar {
          backdrop-filter: blur(10px);
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }
        .logo-text em { color: var(--orange); }
        .coin-badge {
          background: rgba(253,216,53,0.1);
          border: 1px solid rgba(253,216,53,0.3);
          color: #f0c030;
          transition: all 0.3s ease;
        }
        .coin-badge:hover { background: rgba(253,216,53,0.18); transform: translateY(-1px); }
        .nav-icon-btn {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; background: transparent;
          color: var(--muted2);
          transition: all 0.3s ease;
        }
        .nav-icon-btn:hover {
          transform: translateY(-2px);
          background-color: rgba(249,115,22,0.1) !important;
          color: #f97316 !important;
        }
        .user-avatar {
          border: 2px solid var(--border);
          box-shadow: 0 2px 8px rgba(241,90,34,0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .user-avatar:hover { transform: scale(1.1); box-shadow: 0 4px 14px rgba(241,90,34,0.45); }
        .avatar-dropdown {
          position: absolute;
          top: 54px; right: 0;
          min-width: 160px;
          border-radius: 12px;
          overflow: hidden;
          z-index: 100;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          animation: fadeIn 0.15s ease;
        }
        .dropdown-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px; cursor: pointer;
          font-size: 14px; font-weight: 500;
          color: var(--text);
          transition: background 0.15s;
        }
        .dropdown-item:hover { background: var(--orange-dim); color: var(--orange); }
        .dropdown-item.logout { color: #ef4444 !important; }
        .dropdown-item.logout:hover { background: rgba(239,68,68,0.1) !important; }
        .dropdown-divider { height: 1px; margin: 0; background: var(--border); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <header className="relative h-[62px]">
        <nav className="enhanced-navbar fixed left-0 h-[62px] flex items-center pr-8 pl-6 justify-between z-40 w-full top-0">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo-final.png"
              alt="emple"
              className="h-[75px] w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Coin Badge */}
            <div className="coin-badge flex gap-2 rounded-full items-center px-3 py-1.5 cursor-pointer">
              <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center text-[9px] font-extrabold"
                style={{ background: "#fdd835", color: "#6d4c00" }}>
                E
              </span>
              <span className="text-xs font-semibold">100</span>
            </div>

            {/* Icon Buttons */}
            {iconBtns.map(({ title, icon }) => (
              <button key={title} title={title} className="nav-icon-btn">
                {icon}
              </button>
            ))}

            {/* User Avatar + Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="user-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
              >
                {initials}
              </div>

              {dropdownOpen && (
                <div className="avatar-dropdown">
                  <div className="dropdown-item" style={{ opacity: 0.7, cursor: "default", fontSize: 12 }}>
                    {userName}
                  </div>
                  <div className="dropdown-divider" />
                  <div onClick={handleProfile} className="dropdown-item">
                    <User size={16} />
                    <span>Profile</span>
                  </div>
                  <div className="dropdown-divider" />
                  <div onClick={handleLogout} className="dropdown-item logout">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </nav>
      </header>
    </>
  );
}
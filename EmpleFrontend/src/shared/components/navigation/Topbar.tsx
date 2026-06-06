"use client";

import { useState, useRef, useEffect } from "react";
import { Clapperboard, Sparkles, Bell, User, LogOut } from "lucide-react";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Restored drawer imports
import SlideDrawer from "../ui/SlideDrawer";
import SocialFeedPanel from "../../../features/user/social-feed/components/SocialFeedPanel";
import AIChatPanel from "../../../features/user/ai-assistant/components/AIChatPanel";

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<'media' | 'ai' | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sdk = useDescope();
  const router = useRouter();
  

  // useUser is more reliable for profile data than useSession on localhost
  const { session } = useSession() as any;
  const { user, isUserLoading } = useUser();

  // Get the best available identifier from user object OR session token
  const userEmail = user?.email || session?.user?.email || session?.token?.email;
  const fullName = user?.name || session?.user?.name || session?.token?.name;
  const displayName = fullName || userEmail || "User";

  // Logic: 
  // 1. If Name exists (John Doe) -> "JD"
  // 2. If only Email exists (alisha@em.com) -> "AL"
  // 3. If loading/none -> Show nothing or "U"
  const initials = fullName 
    ? fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : userEmail 
      ? userEmail.slice(0, 2).toUpperCase() 
      : "U";

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
        .nav-icon-btn:hover, .nav-icon-btn.active {
          transform: translateY(-2px);
          background-color: rgba(241, 90, 34, 0.1) !important;
          color: var(--orange) !important;
        }
        .nav-icon-btn.active {
          box-shadow: 0 0 12px rgba(241, 90, 34, 0.2);
        }
        /* Hide less critical icon buttons on small screens */
        @media (max-width: 480px) {
          .nav-icon-btn.hide-mobile { display: none; }
          .coin-badge { padding: 4px 8px; }
          .coin-badge .coin-label { display: none; }
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
        <nav className="enhanced-navbar fixed left-0 h-[62px] flex items-center pr-4 pl-3 sm:pr-8 sm:pl-6 justify-between z-40 w-full top-0">

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
          <div className="flex items-center gap-1 sm:gap-3">

            {/* Coin Badge */}
            <div className="coin-badge flex gap-2 rounded-full items-center px-3 py-1.5 cursor-pointer">
              <span className="w-[22px] h-[22px] rounded-full inline-flex items-center justify-center text-[9px] font-extrabold"
                style={{ background: "#fdd835", color: "#6d4c00" }}>
                E
              </span>
              <span className="coin-label text-xs font-semibold">100</span>
            </div>

            {/* Icon Buttons */}
            <button
              title="Media Feed"
              onClick={() => setActiveDrawer(activeDrawer === 'media' ? null : 'media')}
              className={`nav-icon-btn hide-mobile ${activeDrawer === 'media' ? 'active' : ''}`}
            >
              <Clapperboard size={22} />
            </button>
            
            <button
              title="Emple AI"
              onClick={() => setActiveDrawer(activeDrawer === 'ai' ? null : 'ai')}
              className={`nav-icon-btn ${activeDrawer === 'ai' ? 'active' : ''}`}
            >
              <Sparkles size={22} />
            </button>

            <button
              title="Notifications"
              className="nav-icon-btn"
            >
              <Bell size={20} />
            </button>

            {/* User Avatar + Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="user-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
              >
                {/* Hide initials while loading to prevent flashing "U" */}
                {isUserLoading ? "" : initials}
              </div>

              {dropdownOpen && (
                <div className="avatar-dropdown">
                  <div className="dropdown-item" style={{ opacity: 0.7, cursor: "default", fontSize: 11 }}>
                    {displayName}
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

      {/* Slide Drawers */}
      <SlideDrawer
        isOpen={activeDrawer === 'media'}
        onClose={() => setActiveDrawer(null)}
        title="Social Feed"
        width="sm"
        icon={<Clapperboard className="w-5 h-5" />}
      >
        <SocialFeedPanel />
      </SlideDrawer>

      <SlideDrawer
        isOpen={activeDrawer === 'ai'}
        onClose={() => setActiveDrawer(null)}
        title="Emple AI"
        width="md"
        icon={<Sparkles className="w-5 h-5" />}
      >
        <AIChatPanel />
      </SlideDrawer>
    </>
  );
}
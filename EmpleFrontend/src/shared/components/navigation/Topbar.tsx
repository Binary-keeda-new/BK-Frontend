"use client";

import { useState, useRef, useEffect } from "react";
import { Clapperboard, Sparkles, Bell, User, LogOut } from "lucide-react";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";


export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sdk = useDescope();
  const router = useRouter();
<<<<<<< HEAD
  

  // useUser is more reliable for profile data than useSession on localhost
=======

>>>>>>> develop
  const { session } = useSession() as any;
  const { user, isUserLoading } = useUser();

  const userEmail =
    user?.email || session?.user?.email || session?.token?.email;
  const fullName =
    user?.name || session?.user?.name || session?.token?.name;
  const displayName = fullName || userEmail || "User";

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <header className="relative h-[62px]">
      <nav className="fixed top-0 left-0 z-40 w-full h-[62px] flex items-center justify-between px-3 sm:px-6 pr-4 sm:pr-8
        backdrop-blur-md bg-[var(--surface)] border-b border-[var(--border)]
        shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
>>>>>>> develop

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/logo-final.png"
            alt="emple"
            className="h-[75px] w-auto object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-3">

          {/* Coin Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
            bg-yellow-400/10 border border-yellow-400/30 text-yellow-400
            hover:bg-yellow-400/20 transition hover:-translate-y-[1px]">
            
            <span className="w-[22px] h-[22px] flex items-center justify-center rounded-full text-[9px] font-extrabold
              bg-yellow-400 text-yellow-900">
              E
            </span>

            <span className="text-xs font-semibold hidden sm:inline">
              100
            </span>
          </div>

          {/* Icons */}
          {iconBtns.map(({ title, icon }) => (
            <button
              key={title}
              title={title}
              className={`w-11 h-11 flex items-center justify-center rounded-full text-[var(--muted2)]
                transition-all duration-300
                hover:-translate-y-[2px] hover:bg-orange-500/10 hover:text-orange-500
                ${title === "Media - Coming Soon" ? "hidden sm:flex" : ""}`}
            >
              {icon}
            </button>
          ))}

          {/* Avatar */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm text-white cursor-pointer
                border border-[var(--border)]
                shadow-[0_2px_8px_rgba(241,90,34,0.3)]
                hover:scale-110 hover:shadow-[0_4px_14px_rgba(241,90,34,0.45)]
                transition"
              style={{
                background:
                  "linear-gradient(135deg, #f15a22, #6c63ff)",
              }}
            >
              {!isUserLoading && initials}
            </div>

<<<<<<< HEAD
            {/* Icon Buttons */}
            <button
  title="Media Feed"
  className="nav-icon-btn hide-mobile"
>
  <Clapperboard size={22} />
</button>
            
            <button
  title="Emple AI"
  className="nav-icon-btn"
>
  <Sparkles size={22} />
</button>

            <button
              title="Notifications"
              className="nav-icon-btn"
            >
              <Bell size={20} />
            </button>
=======
            {dropdownOpen && (
              <div className="absolute right-0 top-[54px] w-40 rounded-xl overflow-hidden z-50
                bg-[var(--surface)] border border-[var(--border)]
                shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                animate-[fadeIn_0.15s_ease]">
>>>>>>> develop

                <div className="px-4 py-2 text-[11px] opacity-70">
                  {displayName}
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div
                  onClick={handleProfile}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer
                    hover:bg-orange-500/10 hover:text-orange-500 transition">
                  <User size={16} />
                  Profile
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer text-red-500
                    hover:bg-red-500/10 transition">
                  <LogOut size={16} />
                  Logout
                </div>
              </div>
            )}
          </div>
<<<<<<< HEAD
        </nav>
      </header>

      
    </>
=======

        </div>
      </nav>
    </header>
>>>>>>> develop
  );
}
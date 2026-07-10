"use client";

import { useState, useRef, useEffect } from "react";
import { Clapperboard, Sparkles, Bell, User, LogOut , ListTodo } from "lucide-react";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sdk = useDescope();
  const router = useRouter();

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

  const iconBtns = [
    { title: "Media - Coming Soon", icon: <Clapperboard size={22} /> },
    { title: "Emple AI", icon: <Sparkles size={22} /> },
    { title: "Notifications", icon: <Bell size={20} /> },
  ];

  return (
    <header className="relative h-[62px]">
      <nav className="fixed top-0 left-0 z-40 w-full h-[62px] flex items-center justify-between px-3 sm:px-6 pr-4 sm:pr-8
        backdrop-blur-md bg-[var(--surface)] border-b border-[var(--border)]
        shadow-[0_2px_12px_rgba(0,0,0,0.3)]">

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

          {/* Productivity Button */}
          <button
          onClick={() => router.push("/user/productivity")}
          className="
          w-10 h-10
          rounded-full
          flex items-center justify-center
          cursor-pointer
          text-gray-400
          transition-all duration-300 ease-out
          hover:bg-[rgba(249,115,22,0.12)]
          hover:text-[#f97316]
          hover:-translate-y-1
          "
          title="Productivity Hub"
          >
          <ListTodo size={22} />
          </button> 

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

            {dropdownOpen && (
              <div className="absolute right-0 top-[54px] w-40 rounded-xl overflow-hidden z-50
                bg-[var(--surface)] border border-[var(--border)]
                shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                animate-[fadeIn_0.15s_ease]">

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

        </div>
      </nav>
    </header>
  );
}
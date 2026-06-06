"use client";

import { useState, useRef, useEffect } from "react";
import { Clapperboard, Sparkles, Bell, User, LogOut, ClipboardList } from "lucide-react";
import { ListTodo } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const [tasks, setTasks] = useState([{ text: "", done: false }]);
  const addTask = () => { setTasks([...tasks,{ text: "", done: false }]);};
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

            {/* Icon Buttons — hide Clapperboard on mobile */}
            {iconBtns.map(({ title, icon }) => (
              <button
                key={title}
                title={title}
                className={`nav-icon-btn${title === "Media - Coming Soon" ? " hide-mobile" : ""}`}
              >
                {icon}
              </button>
            ))}


            {/* Todo Button */}
            <div className="relative">

            <button
            onClick={() => setTodoOpen(!todoOpen)}
            className={`
  w-10 h-10
  rounded-full
  flex items-center justify-center
  cursor-pointer

  transition-all duration-300 ease-out

  ${
    todoOpen
      ? `
        bg-[rgba(249,115,22,0.12)]
        text-[#f97316]
        -translate-y-1
      `
      : `
        text-gray-400
        hover:bg-[rgba(249,115,22,0.12)]
        hover:text-[#f97316]
        hover:-translate-y-1
      `
  }
`}
          >
           <ListTodo size={22} />
           </button>
             <div
             className={`
             absolute
             right-[-70px]
             top-14
             w-[300px]
             h-[600px]
             z-50
             transition-all duration-500
             ease-[cubic-bezier(0.22,1,0.36,1)]
             ${

             todoOpen
             ? "opacity-100 translate-x-0"
        :    "opacity-0 translate-x-12 pointer-events-none"
              }
              ` }
                  >

         <div className="animated-border">
         <div
          className="
             animated-border-inner
              w-[300px]
              h-[500px]
              p-5
              overflow-y-auto
          "
          style={{
            backgroundColor: "#0f172a",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            }}
              >

          <div className="flex items-center justify-between mb-4">

  <h3 className="text-white font-semibold text-lg">
    To Do List
  </h3>

  <button
    onClick={() => setTasks([{ text: "", done: false }])}
    className="
      w-8 h-8
      rounded-full
      flex items-center justify-center
      text-gray-400
      transition-all duration-300
      hover:bg-[rgba(249,115,22,0.12)]
      hover:text-[#f97316]
      hover:-translate-y-1
    "
    title="Reset Tasks"
  >
    <RotateCcw size={18} />
  </button>

</div>

          <div className="space-y-4">

          {tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-3">

           <input
           type="checkbox"
           checked={task.done}
           onChange={() => {
           const updated = [...tasks];
           updated[index].done = !updated[index].done;
           setTasks(updated);
            }}
           className="w-5 h-5 rounded-full accent-orange-500"
            />
          <input
          type="text"
          value={task.text}
          placeholder="Add a task..."
          onFocus={() => {
          if (index === tasks.length - 1) {
          setTasks([
          ...tasks,
          { text: "", done: false }
             ]);
                 }
                     }}
          onChange={(e) => {
          const updated = [...tasks];
          updated[index].text = e.target.value;
          setTasks(updated);
          }}
           onKeyDown={(e) => {
           if (e.key === "Enter") {
           e.preventDefault();

          const nextInput =
          e.currentTarget.parentElement?.nextElementSibling?.querySelector(
          'input[type="text"]'
          ) as HTMLInputElement;

          nextInput?.focus();
              }
                  }}
          className={`
          bg-transparent
          outline-none
          text-gray-300
          w-full
          border-none
          ${
            task.done
              ? "line-through text-gray-500"
              : ""
          }
        `}
      />
    </div>
  ))}
</div>

          {/* Extra empty space at bottom */}
          <div className="h-40" />

        </div>

      </div>

    </div>

</div>


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
    </>
  );
}
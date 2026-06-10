"use client";

import { useState, useRef, useEffect } from "react";
import {
  Clapperboard,
  Sparkles,
  Bell,
  User,
  LogOut,
  ListTodo,
  RotateCcw,
} from "lucide-react";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

type Task = {
  text: string;
  done: boolean;
};

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([{ text: "", done: false }]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const todoRef = useRef<HTMLDivElement>(null);

  const sdk = useDescope();
  const router = useRouter();

  const { session } = useSession() as any;
  const { user, isUserLoading } = useUser();

  const userEmail = user?.email || session?.user?.email || session?.token?.email;
  const fullName = user?.name || session?.user?.name || session?.token?.name;
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
      const target = e.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }

      if (todoRef.current && !todoRef.current.contains(target)) {
        setTodoOpen(false);
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
    <header className="relative h-[62px]">
      <nav
        className="fixed top-0 left-0 z-40 w-full h-[62px] flex items-center justify-between px-3 sm:px-6 pr-4 sm:pr-8
        backdrop-blur-md bg-[var(--surface)] border-b border-[var(--border)]
        shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
      >
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
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
            bg-yellow-400/10 border border-yellow-400/30 text-yellow-400
            hover:bg-yellow-400/20 transition hover:-translate-y-[1px]"
          >
            <span
              className="w-[22px] h-[22px] flex items-center justify-center rounded-full text-[9px] font-extrabold
              bg-yellow-400 text-yellow-900"
            >
              E
            </span>

            <span className="text-xs font-semibold hidden sm:inline">100</span>
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

          {/* Todo Button */}
          <div className="relative" ref={todoRef}>
            <button
              onClick={() => setTodoOpen((prev) => !prev)}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                transition-all duration-300 ease-out
                ${
                  todoOpen
                    ? "bg-[rgba(249,115,22,0.12)] text-[#f97316] -translate-y-1"
                    : "text-gray-400 hover:bg-[rgba(249,115,22,0.12)] hover:text-[#f97316] hover:-translate-y-1"
                }`}
              title="To Do List"
            >
              <ListTodo size={22} />
            </button>

            <div
              className={`fixed right-4 top-20 w-[300px] z-50
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  todoOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12 pointer-events-none"
                }`}
            >
              <div className="animated-border">
                <div
                  className="animated-border-inner w-[300px] h-[500px] p-5 overflow-y-auto rounded-xl"
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
                      className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400
                        transition-all duration-300
                        hover:bg-[rgba(249,115,22,0.12)]
                        hover:text-[#f97316]
                        hover:-translate-y-1"
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
                              setTasks([...tasks, { text: "", done: false }]);
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
                                ) as HTMLInputElement | null;

                              nextInput?.focus();
                            }
                          }}
                          className={`bg-transparent outline-none text-gray-300 w-full border-none
                            ${task.done ? "line-through text-gray-500" : ""}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="h-40" />
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm text-white cursor-pointer
                border border-[var(--border)]
                shadow-[0_2px_8px_rgba(241,90,34,0.3)]
                hover:scale-110 hover:shadow-[0_4px_14px_rgba(241,90,34,0.45)]
                transition"
              style={{
                background: "linear-gradient(135deg, #f15a22, #6c63ff)",
              }}
            >
              {!isUserLoading && initials}
            </div>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-[54px] w-44 rounded-xl overflow-hidden z-50
                bg-[var(--surface)] border border-[var(--border)]
                shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                animate-[fadeIn_0.15s_ease]"
              >
                <div className="px-4 py-2 text-xs opacity-70 cursor-default truncate">
                  {displayName}
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div
                  onClick={handleProfile}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer
                    hover:bg-orange-500/10 hover:text-orange-500 transition"
                >
                  <User size={16} />
                  Profile
                </div>

                <div className="h-px bg-[var(--border)]" />

                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer text-red-500
                    hover:bg-red-500/10 transition"
                >
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
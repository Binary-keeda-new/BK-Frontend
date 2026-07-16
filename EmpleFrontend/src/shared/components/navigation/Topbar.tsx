"use client";
import { LOGO_URL } from '@/shared/constants/assets'
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
import SlideDrawer from "@/shared/components/ui/SlideDrawer";
import MediaFeedWidget from "@/features/user/dashboard/components/MediaFeedWidget";
import AIAssistantWidget from "@/features/ai-assistant/components/AIAssistantWidget";
import EmptyState from "@/shared/components/ui/EmptyState";
import WalletBadge from "@/features/wallet/components/WalletBadge";
import { useWallet } from "@/providers/WalletProvider";
import { useNotification } from "@/providers/NotificationProvider";
import { MessageCircleQuestion } from "lucide-react";
import RequestFormDrawer from "@/features/user/requests/components/RequestFormDrawer";
// import WalletBadge from "@/features/wallet/components/WalletBadge";

type Task = {
  text: string;
  done: boolean;
};

function NotificationsPanel({
  notifications,
  readIds,
  onToggleRead,
  onMarkAllRead,
}: {
  notifications: any[]
  readIds: Set<string>
  onToggleRead: (id: string) => void
  onMarkAllRead: () => void
}) {
  const typeColors: Record<string, string> = {
    info: '#3b82f6',
    warning: '#f59e0b',
    success: '#22c55e',
    alert: '#ef4444',
  }

  const unreadCount = notifications.filter(n => !readIds.has(n._id)).length

  if (notifications.length === 0) {
    return (
      <div className="h-full p-4">
        <EmptyState
          title="No Notifications Yet"
          description="You're all caught up. New updates, announcements, and activity alerts will appear here."
          icon={<Bell size={28} />}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">

      {/* Panel header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 13, color: 'var(--muted2)', fontWeight: 500 }}>
          {unreadCount} unread
        </span>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'rgb(241,90,34)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
        {notifications.map((n: any) => {
          const isRead = readIds.has(n._id)
          return (
            <div
              key={n._id}
              style={{
                borderRadius: 12,
                padding: '12px 14px',
                background: isRead ? 'var(--surface2)' : `${typeColors[n.type]}10`,
                borderLeft: `3px solid ${isRead ? 'var(--border)' : typeColors[n.type]}`,
                border: `1px solid ${isRead ? 'var(--border)' : `${typeColors[n.type]}25`}`,
                width: '100%',
                opacity: isRead ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 8,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: '0 0 4px 0',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {n.title}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: 12,
                    color: 'var(--muted2)',
                    lineHeight: 1.5,
                  }}>
                    {n.message}
                  </p>
                </div>

                {/* Toggle read dot */}
                <button
                  onClick={() => onToggleRead(n._id)}
                  title={isRead ? 'Mark as unread' : 'Mark as read'}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: isRead ? 'var(--border)' : typeColors[n.type],
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    marginTop: 4,
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([{ text: "", done: false }]);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(() => {
  try {
    const stored = localStorage.getItem('readNotificationIds')
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
});

  const dropdownRef = useRef<HTMLDivElement>(null);
  const todoRef = useRef<HTMLDivElement>(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const sdk = useDescope();
  const router = useRouter();

  const { session, isAuthenticated } = useSession() as any;
  const { user, isUserLoading } = useUser();
  const { config, refreshWallet } = useWallet();
  const { notifyReward } = useNotification();
  
  const todoReward = config?.TODO?.COMPLETION_REWARD || 5;

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

  const unreadCount = allNotifications.length - readIds.size;

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL ?? ''
    fetch(`${BASE}/api/v1/notifications`)
      .then(r => r.json())
      .then(json => setAllNotifications(json.data ?? []))
      .catch(() => setAllNotifications([]))
  }, [])

  const handleLogout = async () => {
    await sdk.logout();
    router.push("/landing");
  };

  const handleProfile = () => {
    router.push("/user/profile");
    setDropdownOpen(false);
  };

  const handleToggleRead = (id: string) => {
  setReadIds(prev => {
    const next = new Set(prev)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    localStorage.setItem('readNotificationIds', JSON.stringify([...next]))
    return next
  })
}

  const handleMarkAllRead = () => {
  const allIds = new Set(allNotifications.map(n => n._id))
  setReadIds(allIds)
  localStorage.setItem('readNotificationIds', JSON.stringify([...allIds]))
}

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

  return (
    <header className="relative h-[62px]">
      <nav
        className="fixed top-0 left-0 z-40 w-full h-[62px] flex items-center justify-between px-3 sm:px-6 pr-4 sm:pr-8
        backdrop-blur-md bg-[var(--surface)] border-b border-[var(--border)]
        shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
      >
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer transition-transform hover:scale-105"
          onClick={() => router.push("/")}
        >
          <img
            src={LOGO_URL}
            alt="emple"
            className="h-[75px] w-auto object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-3">

          {/* Coin Badge */}
          {isAuthenticated && <WalletBadge />}

          {/* Media button */}
          {isAuthenticated && (
            <button
              title="Media - Coming Soon"
              onClick={() => setMediaOpen(true)}
              className="w-11 h-11 hidden sm:flex items-center justify-center rounded-full text-[var(--muted2)]
                transition-all duration-300 hover:-translate-y-[2px] hover:bg-orange-500/10 hover:text-orange-500"
            >
              <Clapperboard size={22} />
            </button>
          )}

          {/* AI button */}
          {isAuthenticated && (
            <button
              title="Emple AI"
              onClick={() => setAiOpen(true)}
              className="w-11 h-11 flex items-center justify-center rounded-full text-[var(--muted2)]
                transition-all duration-300 hover:-translate-y-[2px] hover:bg-orange-500/10 hover:text-orange-500"
            >
              <Sparkles size={22} />
            </button>
          )}

          {/* Bell button with unread badge */}
          {isAuthenticated && (
            <button
              title="Notifications"
              onClick={() => setNotifOpen(true)}
              className="relative w-11 h-11 flex items-center justify-center rounded-full text-[var(--muted2)]
                transition-all duration-300 hover:-translate-y-[2px] hover:bg-orange-500/10 hover:text-orange-500"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'rgb(241,90,34)',
                  color: '#fff',
                  fontSize: 9,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Todo Button */}
          {isAuthenticated && (
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
                transition-all duration-500 ease-[linear(cubic-bezier(0.22,1,0.36,1))]
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
                    <div className="flex items-center justify-between mb-2">
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
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md text-xs font-medium">
                        <span>🪙</span> Earn {todoReward} Coins on completing 3 daily todos
                      </div>
                    </div>

                    <div className="space-y-4">
                      {tasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => {
                              const updated = [...tasks];
                              const isNowDone = !updated[index].done;
                              updated[index].done = isNowDone;
                              setTasks(updated);

                              if (isNowDone) {
                                const completedCount = updated.filter(t => t.done && t.text.trim() !== "").length;
                                if (completedCount >= 3) {
                                  const todayStr = new Date().toISOString().split('T')[0];
                                  const rewardKey = `todo_reward_${todayStr}`;
                                  if (!localStorage.getItem(rewardKey)) {
                                    notifyReward("Todo Milestone", "3 tasks completed!", todoReward);
                                    refreshWallet();
                                    localStorage.setItem(rewardKey, 'true');
                                  }
                                }
                              }
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
          )}
          {/* Raise a Request button */}
{isAuthenticated && (
  <button
    title="Raise a Request"
    onClick={() => setRequestOpen(true)}
    className="w-11 h-11 flex items-center justify-center rounded-full text-[var(--muted2)]
      transition-all duration-300 hover:-translate-y-[2px] hover:bg-orange-500/10 hover:text-orange-500"
  >
    <MessageCircleQuestion size={20} />
  </button>
)}

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

          {/* Avatar Dropdown */}
          {isAuthenticated ? (
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
          ) : (
            <button
              onClick={() => router.push("/auth/signup")}
              className="px-4 py-2 text-sm font-bold text-white rounded-lg transition-transform hover:scale-105 ml-2"
              style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
            >
              Sign Up Free
            </button>
          )}

        </div>
      </nav>

      {/* Media Drawer */}
      <SlideDrawer
        isOpen={mediaOpen}
        onClose={() => setMediaOpen(false)}
        title="Media"
        icon={<img src="/logo-isolated.png" alt="Emple" className="h-6 w-auto object-contain scale-110" />}
        width="md"
      >
        <div className="h-full">
          <MediaFeedWidget />
        </div>
      </SlideDrawer>

      {/* AI Assistant Drawer */}
      <SlideDrawer
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
        width="md"
        hideHeader={true}
      >
        <div className="h-full">
          <AIAssistantWidget onClose={() => setAiOpen(false)} />
        </div>
      </SlideDrawer>

      {/* Notifications Drawer */}
      <SlideDrawer
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        title="Notifications"
        width="md"
      >
        <NotificationsPanel
          notifications={allNotifications}
          readIds={readIds}
          onToggleRead={handleToggleRead}
          onMarkAllRead={handleMarkAllRead}
        />
      </SlideDrawer>
      {/* Request Drawer */}
<RequestFormDrawer isOpen={requestOpen} onClose={() => setRequestOpen(false)} />

    </header>
  );
}
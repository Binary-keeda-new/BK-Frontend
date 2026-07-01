"use client";

import { useEffect, useMemo, useState } from "react";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type Activity = {
  visitedDates: string[];
  currentStreak: number;
  highestStreak: number;
  lastVisitedDate: string | null;
};

interface CalDay {
  day: number;
  date: string;
  otherMonth?: boolean;
  isToday?: boolean;
}

type ActivityCalendarProps = {
  activity: Activity;
  token?: string;
  baseurl: string;
  onActivityUpdate: (activity: Activity) => void;
};

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getMonthDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}-01`;
};

const generateCalendarWeeks = (monthDate: Date): CalDay[][] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const calendarStart = new Date(year, month, 1 - startOffset);

  const weeks: CalDay[][] = [];

  for (let week = 0; week < 6; week++) {
    const days: CalDay[] = [];

    for (let day = 0; day < 7; day++) {
      const current = new Date(calendarStart);
      current.setDate(calendarStart.getDate() + week * 7 + day);

      days.push({
        day: current.getDate(),
        date: toDateKey(current),
        otherMonth: current.getMonth() !== month,
        isToday: toDateKey(current) === toDateKey(new Date()),
      });
    }

    weeks.push(days);
  }

  return weeks;
};

const NavBtn = ({
  children,
  onClick,
}: {
  children: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-[clamp(6px,2vw,8px)] py-[clamp(2px,0.8vw,3px)] rounded-[7px] text-[clamp(11px,3vw,13px)] cursor-pointer transition-all duration-150"
    style={{
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      color: "var(--muted2)",
    }}
  >
    {children}
  </button>
);

export default function ActivityCalendar({
  activity,
  token,
  baseurl,
  onActivityUpdate,
}: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchMonthActivity = async () => {
      if (!token) return;

      const dateKey = getMonthDateKey(currentMonth);

      const res = await fetch(`${baseurl}/api/v1/activity?date=${dateKey}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      onActivityUpdate(data.data);
    };

    fetchMonthActivity();
  }, [currentMonth, token, baseurl, onActivityUpdate]);

  const visitedDates = activity.visitedDates || [];
  const highestStreak = activity.highestStreak || 0;

  const weeks = useMemo(
    () => generateCalendarWeeks(currentMonth),
    [currentMonth]
  );

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="animated-border h-full">
      <div
        className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 22px)" }}
      >
        <div
          className="flex justify-between items-start"
          style={{ marginBottom: "clamp(10px, 3vw, 14px)" }}
        >
          <div
            className="font-syne font-bold"
            style={{
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "var(--text)",
            }}
          >
            Activity Calendar
          </div>

          <div className="text-right">
            <div
              className="font-semibold flex items-center gap-1 justify-end"
              style={{
                fontSize: "clamp(9px, 2.5vw, 11px)",
                color: "var(--muted2)",
              }}
            >
              🔥 Streak
            </div>

           <div
              className="font-syne font-extrabold"
              style={{
                fontSize: "clamp(17px, 4.5vw, 20px)",
                color: "var(--muted)",
                lineHeight: 1.1,
              }}
            >
              {highestStreak} {highestStreak === 1 ? "day" : "days"}
            </div>
            <div
              style={{
                fontSize: "clamp(9px, 2.2vw, 11px)",
                color: "var(--orange)",
                marginTop: "4px",
              }}
            >
              {highestStreak > 0
                ? "Keep going — your best streak is growing."
                : "Start practicing to build your streak."}
            </div>
          </div>
        </div>

        <div
          className="relative flex items-center"
          style={{
            gap: "clamp(4px, 1.5vw, 6px)",
            marginBottom: "clamp(10px, 3vw, 14px)",
          }}
        >
          <NavBtn
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear() - 1,
                  currentMonth.getMonth(),
                  1
                )
              )
            }
          >
            «
          </NavBtn>

          <NavBtn
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1
                )
              )
            }
          >
            ‹
          </NavBtn>

          <div
            className="absolute left-1/2 -translate-x-1/2 font-semibold whitespace-nowrap"
            style={{
              fontSize: "clamp(12px, 3vw, 13px)",
              color: "var(--text)",
            }}
          >
            {monthLabel}
          </div>

          <div
            className="flex ml-auto"
            style={{ gap: "clamp(4px, 1.5vw, 6px)" }}
          >
            <NavBtn
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
            >
              ›
            </NavBtn>

            <NavBtn
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear() + 1,
                    currentMonth.getMonth(),
                    1
                  )
                )
              }
            >
              »
            </NavBtn>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div
            className="grid grid-cols-7 text-center w-full"
            style={{ gap: "clamp(2px, 0.8vw, 3px)" }}
          >
            {DAYS.map((d, i) => (
              <div
                key={d}
                className="font-bold uppercase tracking-[0.05em]"
                style={{
                  fontSize: "clamp(7px, 2vw, 9.5px)",
                  padding: "clamp(3px, 1vw, 4px) 0",
                  color: i >= 5 ? "rgba(241,90,34,0.7)" : "var(--muted)",
                }}
              >
                {d}
              </div>
            ))}

            {weeks.map((week, wi) =>
              week.map((cell, ci) => {
                const isWeekend = ci >= 5;
                const isVisited = visitedDates.includes(cell.date);

                const baseColor =
                  cell.isToday || isVisited
                    ? "#fff"
                    : cell.otherMonth
                    ? "var(--muted)"
                    : isWeekend
                    ? "rgba(241,90,34,0.85)"
                    : "var(--text)";

                const bgColor = cell.isToday
                          ? "var(--orange)"
                          : isVisited
                          ? "rgba(34, 197, 94, 0.08)"
                          : "transparent";

                return (
                  <div
                    key={`${wi}-${ci}-${cell.date}`}
                    className="relative rounded-[8px] cursor-pointer transition-all duration-150"
                    style={{
                      fontSize: "clamp(10px, 2.8vw, 12px)",
                      padding: "clamp(4px, 1.5vw, 6px) 0",
                      color: baseColor,
                      opacity: cell.otherMonth && !isVisited ? 0.4 : 1,
                      background: bgColor,
                      backdropFilter:
                        cell.isToday || isVisited ? "blur(10px)" : "none",
                      WebkitBackdropFilter:
                        cell.isToday || isVisited ? "blur(10px)" : "none",
                      border: isVisited
                    ? "0.5px solid green"
                  : cell.isToday
              ? "1px solid rgba(255,255,255,0.18)"
                       : "1px solid transparent",
                      fontWeight: cell.isToday || isVisited ? 700 : 400,
                      boxShadow: cell.isToday
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.16),
                          0 0 0 1px rgba(241,90,34,0.25),
                          0 8px 22px rgba(241,90,34,0.22)
                        `
                        : isVisited
                        ? `
                          inset 0 1px 0 rgba(255,255,255,0.08),
                          0 0 0 1px rgba(34,197,94,0.25),
                          0 8px 20px rgba(34,197,94,0.15)
                        `
                        : "none",
                    }}
                  >
                    {cell.day}

                    {isVisited && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 rounded-full block"
                        style={{
                          bottom: "2px",
                          width: "clamp(4px, 1vw, 5px)",
                          height: "clamp(4px, 1vw, 5px)",
                          background: "#22c55e",
                          boxShadow: "0 0 8px rgba(34,197,94,0.8)",
                        }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
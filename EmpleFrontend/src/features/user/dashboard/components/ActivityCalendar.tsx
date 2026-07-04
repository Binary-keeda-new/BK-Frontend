"use client";
//activity
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
    className="cursor-pointer rounded-md border border-[var(--border)] bg-[var(--surface2)] px-2 py-1 text-xs text-[var(--muted2)] transition-all duration-150 hover:bg-white/5"
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
      <div className="animated-border-inner flex h-full flex-col overflow-hidden p-4 sm:p-5">
        <div className="mb-[clamp(10px,3vw,14px)] flex items-start justify-between">
          <div>
            <div className="font-syne text-[clamp(13px,3.5vw,15px)] font-bold text-[var(--text)]">
              Activity Calendar
            </div>

            <div className="font-syne mt-0.5 bg-gradient-to-br from-[#FFB366] to-[#F15A22] bg-clip-text text-[clamp(17px,4.5vw,20px)] font-extrabold leading-[1.2] text-transparent drop-shadow-[0_0_12px_rgba(241,90,34,0.35)] transition-all duration-200">
              {highestStreak} {highestStreak === 1 ? "day" : "days"}
            </div>
          </div>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex h-[18px] w-[18px] cursor-help items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[11px] text-[var(--muted2)]"
            >
              i
            </button>

            <div className="absolute right-0 top-[26px] z-50 hidden w-[220px] rounded-[10px] border border-[var(--border)] bg-[rgba(20,20,20,0.96)] px-3 py-2.5 text-[11px] leading-[1.4] text-[var(--text)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] group-hover:block">
              Your streak is based on consecutive daily dashboard visits. If
              you miss a day, your current streak resets, but your highest
              streak remains saved.
            </div>
          </div>
        </div>

        <div className="relative mb-[clamp(10px,3vw,14px)] flex items-center gap-[clamp(4px,1.5vw,6px)]">
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

          <div className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(12px,3vw,13px)] font-semibold text-[var(--text)]">
            {monthLabel}
          </div>

          <div className="ml-auto flex gap-[clamp(4px,1.5vw,6px)]">
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

        <div className="flex flex-1 items-center justify-center">
          <div className="grid w-full grid-cols-7 gap-[clamp(2px,0.8vw,3px)] text-center">
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`py-[clamp(3px,1vw,4px)] text-[clamp(7px,2vw,9.5px)] font-bold uppercase tracking-[0.05em] ${
                  i >= 5 ? "text-[rgba(241,90,34,0.7)]" : "text-[var(--muted)]"
                }`}
              >
                {d}
              </div>
            ))}

            {weeks.map((week, wi) =>
              week.map((cell, ci) => {
                const isWeekend = ci >= 5;
                const isVisited = visitedDates.includes(cell.date);

                const dayClass = [
                  "relative mx-auto flex cursor-pointer items-center justify-center rounded-full",
                  "h-[clamp(28px,6vw,36px)] w-[clamp(28px,6vw,36px)]",
                  "text-[clamp(10px,2.8vw,12px)] transition-all duration-150",

                  cell.isToday || isVisited ? "font-bold" : "font-normal",

                  cell.isToday || isVisited
                    ? "text-white backdrop-blur-[10px]"
                    : cell.otherMonth
                    ? "text-[var(--muted)]"
                    : isWeekend
                    ? "text-[rgba(241,90,34,0.85)]"
                    : "text-[var(--text)]",

                  cell.otherMonth && !isVisited ? "opacity-40" : "opacity-100",

                  cell.isToday
                    ? "border-2 border-[#22c55e] bg-[rgba(34,197,94,0.18)] shadow-[0_0_12px_rgba(34,197,94,0.25)]"
                    : isVisited
                    ? "border-2 border-[#f15a22] bg-transparent shadow-[0_0_10px_rgba(241,90,34,0.18)]"
                    : "border border-transparent bg-transparent shadow-none",
                ].join(" ");

                return (
                  <div key={`${wi}-${ci}-${cell.date}`} className={dayClass}>
                    {cell.day}
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
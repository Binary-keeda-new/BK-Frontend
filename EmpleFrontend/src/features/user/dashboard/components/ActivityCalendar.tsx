"use client";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalDay {
  day: number;
  otherMonth?: boolean;
  isToday?: boolean;
  hasDot?: boolean;
}

const WEEKS: CalDay[][] = [
  [
    { day: 26, otherMonth: true }, { day: 27, otherMonth: true }, { day: 28, otherMonth: true },
    { day: 29, otherMonth: true }, { day: 30, otherMonth: true }, { day: 31, otherMonth: true },
    { day: 1 },
  ],
  [{ day: 2 }, { day: 3 }, { day: 4 }, { day: 5, hasDot: true }, { day: 6 }, { day: 7 }, { day: 8, hasDot: true }],
  [{ day: 9, hasDot: true }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }],
  [{ day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20, isToday: true }, { day: 21 }, { day: 22 }],
  [{ day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 1, otherMonth: true }],
];

const NavBtn = ({ children }: { children: string }) => (
  <button
    className="px-2 py-[3px] rounded-[7px] text-[13px] cursor-pointer transition-all duration-150"
    style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--muted2)" }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLButtonElement;
      el.style.borderColor = "var(--orange)";
      el.style.color = "var(--orange)";
      el.style.background = "var(--orange-dim)";
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLButtonElement;
      el.style.borderColor = "var(--border)";
      el.style.color = "var(--muted2)";
      el.style.background = "var(--surface2)";
    }}
  >
    {children}
  </button>
);

export default function ActivityCalendar() {
  return (
    <div className="animated-border">
      <div className="animated-border-inner p-[22px] overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-start mb-[14px]">
          <div className="font-syne text-[15px] font-bold" style={{ color: "var(--text)" }}>
            Activity Calendar
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold flex items-center gap-1 justify-end" style={{ color: "var(--muted2)" }}>
              🔥 Streak
            </div>
            <div className="font-syne text-[20px] font-extrabold" style={{ color: "var(--orange)" }}>
              5 days
            </div>
          </div>
        </div>

        {/* Month nav */}
        <div className="relative flex items-center gap-[6px] mb-[14px]">
          <NavBtn>«</NavBtn>
          <NavBtn>‹</NavBtn>
          <div className="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold" style={{ color: "var(--text)" }}>
            February 2026
          </div>
          <div className="flex gap-[6px] ml-auto">
            <NavBtn>›</NavBtn>
            <NavBtn>»</NavBtn>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-[3px] text-center">
          {/* Day names */}
          {DAYS.map((d, i) => (
            <div
              key={d}
              className="text-[9.5px] font-bold uppercase tracking-[0.05em] py-1"
              style={{ color: i >= 5 ? "rgba(241,90,34,0.7)" : "var(--muted)" }}
            >
              {d}
            </div>
          ))}

          {/* Days */}
          {WEEKS.map((week, wi) =>
            week.map((cell, ci) => {
              const isWeekend = ci >= 5;
              const baseColor = cell.isToday
                ? "#fff"
                : cell.otherMonth
                ? "var(--muted)"
                : isWeekend
                ? "rgba(241,90,34,0.85)"
                : "var(--text)";

              return (
                <div
                  key={`${wi}-${ci}`}
                  className="relative text-[12px] py-[6px] rounded-[8px] cursor-pointer
                             transition-all duration-150"
                  style={{
                    color: baseColor,
                    opacity: cell.otherMonth ? 0.4 : 1,
                    background: cell.isToday ? "var(--orange)" : "transparent",
                    fontWeight: cell.isToday ? 700 : 400,
                    boxShadow: cell.isToday ? "0 3px 10px rgba(241,90,34,0.4)" : "none",
                  }}
                  onMouseEnter={e => {
                    if (!cell.isToday) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "var(--orange-dim)";
                      el.style.color = "var(--orange)";
                      el.style.transform = "scale(1.08)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!cell.isToday) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "transparent";
                      el.style.color = baseColor;
                      el.style.transform = "";
                    }
                  }}
                >
                  {cell.day}
                  {cell.hasDot && (
                    <span
                      className="absolute bottom-[2px] left-1/2 -translate-x-1/2
                                 w-1 h-1 rounded-full block"
                      style={{ background: cell.isToday ? "rgba(255,255,255,0.8)" : "var(--orange)" }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
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
  [{ day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }],
  [{ day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }],
  [{ day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20, isToday: true }, { day: 21 }, { day: 22 }],
  [{ day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 1, otherMonth: true }],
];

const NavBtn = ({ children }: { children: string }) => (
  <button
    className="px-[clamp(6px,2vw,8px)] py-[clamp(2px,0.8vw,3px)] rounded-[7px] text-[clamp(11px,3vw,13px)] cursor-pointer transition-all duration-150"
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
    <div className="animated-border h-full">
      <div className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 22px)" }}
      >

        {/* Header */}
        <div className="flex justify-between items-start" style={{ marginBottom: "clamp(10px, 3vw, 14px)" }}>
          <div
            className="font-syne font-bold"
            style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "var(--text)" }}
          >
            Activity Calendar
          </div>
          <div className="text-right">
            <div
              className="font-semibold flex items-center gap-1 justify-end"
              style={{ fontSize: "clamp(9px, 2.5vw, 11px)", color: "var(--muted2)" }}
            >
              🔥 Streak
            </div>
            <div
              className="font-syne font-extrabold"
              style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: "var(--muted)", lineHeight: 1.1 }}
            >
              0 days
            </div>
            <div style={{ fontSize: "clamp(9px, 2.2vw, 11px)", color: "var(--orange)", marginTop: "4px" }}>
              Start practicing to build your streak.
            </div>
          </div>
        </div>

        {/* Month nav */}
        <div className="relative flex items-center" style={{ gap: "clamp(4px, 1.5vw, 6px)", marginBottom: "clamp(10px, 3vw, 14px)" }}>
          <NavBtn>«</NavBtn>
          <NavBtn>‹</NavBtn>
          <div
            className="absolute left-1/2 -translate-x-1/2 font-semibold whitespace-nowrap"
            style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "var(--text)" }}
          >
            February 2026
          </div>
          <div className="flex ml-auto" style={{ gap: "clamp(4px, 1.5vw, 6px)" }}>
            <NavBtn>›</NavBtn>
            <NavBtn>»</NavBtn>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="grid grid-cols-7 text-center w-full"
            style={{ gap: "clamp(2px, 0.8vw, 3px)" }}
          >

            {/* Day names */}
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
                    className="relative rounded-[8px] cursor-pointer transition-all duration-150"
                    style={{
                      fontSize: "clamp(10px, 2.8vw, 12px)",
                      padding: "clamp(4px, 1.5vw, 6px) 0",
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
                        className="absolute left-1/2 -translate-x-1/2 rounded-full block"
                        style={{
                          bottom: "2px",
                          width: "clamp(3px, 0.9vw, 4px)",
                          height: "clamp(3px, 0.9vw, 4px)",
                          background: cell.isToday ? "rgba(255,255,255,0.8)" : "var(--orange)",
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
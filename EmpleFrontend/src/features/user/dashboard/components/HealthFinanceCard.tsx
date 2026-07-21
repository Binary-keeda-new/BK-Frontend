
//  TEMPORARILY DISABLED — Health & Finance Card                                
                                                 


"use client";

// ── Active imports (only what the blank placeholder needs)
// import type { ReactNode } from "react";

// ── DISABLED IMPORTS (kept for reference) 
// import { Activity, Wallet, CircleDollarSign } from "lucide-react";
// import { useHealthFinance } from "../hooks/useHealthFinance";
// import type { HealthStats, FinanceSummary } from "../hooks/useHealthFinance";

// ── DISABLED CONSTANTS 
// const RING_SIZE = 82;
// const STROKE_WIDTH = 6;
// const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
// const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// function fmt(n: number) { return n.toLocaleString("en-IN"); }

// ORIGINAL CARD CODE 
/*

import type { ReactNode } from "react";
import { Activity, Wallet, CircleDollarSign } from "lucide-react";
import { useHealthFinance } from "../hooks/useHealthFinance";
import type { HealthStats, FinanceSummary } from "../hooks/useHealthFinance";


const RING_SIZE = 82;
const STROKE_WIDTH = 6;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}


function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="font-semibold uppercase tracking-[0.06em] flex items-center"
      style={{
        fontSize: "clamp(9px, 2.2vw, 10.5px)",
        color: "#ff9a5c",
        gap: 5,
        marginBottom: "clamp(8px, 2vw, 10px)",
      }}
    >
      {children}
    </div>
  );
}

function CoinRow({ coins, label }: { coins: number; label: string }) {
  return (
    <div
      className="flex items-center rounded-[10px]"
      style={{
        gap: "clamp(5px, 1.5vw, 7px)",
        padding: "clamp(5px, 1.5vw, 7px) clamp(8px, 2vw, 10px)",
        background: "rgba(241,90,34,0.06)",
        border: "1px solid rgba(241,90,34,0.15)",
        marginTop: "clamp(6px, 1.5vw, 8px)",
      }}
    >
      <CircleDollarSign size={13} style={{ color: "#ff9a5c", flexShrink: 0 }} />
      <span style={{ fontSize: "clamp(10px, 2.5vw, 11.5px)", color: "var(--muted2)" }}>
        {label}
      </span>
      <span
        className="font-bold ml-auto"
        style={{ fontSize: "clamp(11px, 2.8vw, 12.5px)", color: "#ff9a5c" }}
      >
        {fmt(coins)}
      </span>
    </div>
  );
}



function StepRing({ progress }: { progress: number }) {
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = CIRCUMFERENCE * (1 - clamped);
  const pct = Math.round(clamped * 100);

  return (
    <div className="relative flex-shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        aria-label={`${pct}% of daily step goal`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient id="hf-step-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15a22" />
            <stop offset="100%" stopColor="#ff9a5c" />
          </linearGradient>
        </defs>
        { }
        <circle
          cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={STROKE_WIDTH}
        />
        { }
        <circle
          cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS}
          fill="none"
          stroke="url(#hf-step-grad)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={String(CIRCUMFERENCE)}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      { }
      <div
        className="absolute inset-0 flex items-center justify-center font-bold"
        style={{ fontSize: "clamp(11px, 2.8vw, 13px)", color: "var(--text)" }}
      >
        {pct}%
      </div>
    </div>
  );
}


function HealthSection({ data }: { data: HealthStats }) {
  const stepsLeft = Math.max(data.stepGoal - data.todaySteps, 0);
  const stepProgress = data.todaySteps / Math.max(data.stepGoal, 1);
  const goalReached = stepsLeft === 0;

  return (
    <div>
      <SectionLabel>
        <Activity size={10} />
        Health Tracker
      </SectionLabel>

      { }
      <div className="flex items-center" style={{ gap: "clamp(10px, 2.5vw, 14px)" }}>
        <StepRing progress={stepProgress} />

        <div className="flex flex-col flex-1 min-w-0" style={{ gap: "clamp(4px, 1vw, 5px)" }}>
          { }
          <div>
            <div style={{ fontSize: "clamp(9px, 2.2vw, 10.5px)", color: "var(--muted2)" }}>
              Today
            </div>
            <div
              className="font-bold truncate"
              style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "var(--text)", lineHeight: 1.2 }}
            >
              {fmt(data.todaySteps)}
              <span style={{ fontSize: "clamp(9px, 2vw, 10px)", color: "var(--muted)", fontWeight: 400, marginLeft: 3 }}>
                steps
              </span>
            </div>
          </div>

          { }
          <div style={{ fontSize: "clamp(9px, 2.2vw, 10.5px)", color: "var(--muted2)" }}>
            Goal:&nbsp;
            <span style={{ color: "var(--muted)" }}>{fmt(data.stepGoal)} steps</span>
          </div>

          { }
          <div
            className="inline-flex items-center rounded-[6px] w-fit font-semibold"
            style={{
              fontSize: "clamp(8.5px, 2vw, 10px)",
              padding: "2px 7px",
              background: goalReached ? "rgba(16,185,129,0.12)" : "var(--surface2)",
              border: `1px solid ${goalReached ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
              color: goalReached ? "#10b981" : "var(--muted2)",
            }}
          >
            {goalReached ? "✅ Goal reached!" : `${fmt(stepsLeft)} steps left`}
          </div>
        </div>
      </div>

      <CoinRow coins={data.monthlyCoins} label="Health Coins This Month" />
    </div>
  );
}



function FinanceSection({ data }: { data: FinanceSummary }) {
  const progress = Math.min(data.monthlySpending / Math.max(data.monthlyBudget, 1), 1);
  const pct = Math.round(progress * 100);

  const isOver = data.monthlySpending > data.monthlyBudget;
  const isBalanced = data.monthlySpending === data.monthlyBudget;

  const status = isOver
    ? { icon: "❌", label: "Over Budget", color: "#ef4444", bg: "rgba(239,68,68,0.10)", bar: "#ef4444" }
    : isBalanced
      ? { icon: "⚠️", label: "Balanced", color: "#f59e0b", bg: "rgba(245,158,11,0.10)", bar: "#f59e0b" }
      : { icon: "✅", label: "Under Budget", color: "#10b981", bg: "rgba(16,185,129,0.08)", bar: "#f15a22" };

  return (
    <div>
      <SectionLabel>
        <Wallet size={10} />
        Finance Overview
      </SectionLabel>

      { }
      <div
        className="flex items-baseline justify-between"
        style={{ marginBottom: "clamp(6px, 1.5vw, 8px)" }}
      >
        <div>
          <span
            className="font-bold"
            style={{ fontSize: "clamp(13px, 3.2vw, 15px)", color: "var(--text)" }}
          >
            ₹{fmt(data.monthlySpending)}
          </span>
          <span style={{ fontSize: "clamp(9px, 2vw, 10px)", color: "var(--muted)", marginLeft: 3 }}>
            spent
          </span>
        </div>
        <div style={{ fontSize: "clamp(9px, 2.2vw, 10.5px)", color: "var(--muted2)" }}>
          of ₹{fmt(data.monthlyBudget)}
        </div>
      </div>

      { }
      <div
        className="rounded-full overflow-hidden"
        style={{ height: 6, background: "rgba(255,255,255,0.06)", marginBottom: "clamp(7px, 1.8vw, 10px)" }}
      >
        <div
          className="rounded-full"
          style={{
            width: `${Math.min(pct, 100)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${status.bar}, ${status.bar}cc)`,
            boxShadow: `0 0 6px ${status.bar}55`,
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>

      { }
      <div
        className="flex items-center rounded-[8px]"
        style={{
          gap: "clamp(5px, 1.2vw, 6px)",
          padding: "clamp(5px, 1.2vw, 7px) clamp(8px, 2vw, 10px)",
          background: status.bg,
          border: `1px solid ${status.color}33`,
        }}
      >
        <span style={{ fontSize: "clamp(10px, 2.5vw, 11.5px)" }}>{status.icon}</span>
        <span
          className="font-semibold"
          style={{ fontSize: "clamp(10px, 2.5vw, 11.5px)", color: status.color }}
        >
          {status.label}
        </span>
        <span
          className="ml-auto font-bold"
          style={{ fontSize: "clamp(9px, 2.2vw, 10.5px)", color: "var(--muted2)" }}
        >
          {pct}%
        </span>
      </div>

      <CoinRow coins={data.monthlyCoins} label="Finance Coins This Month" />
    </div>
  );
}



function Bar({ w, h = "10px" }: { w: string; h?: string }) {
  return (
    <div
      style={{
        width: w, height: h, borderRadius: 6,
        background: "var(--surface2)",
        animation: "hf-pulse 1.6s ease-in-out infinite",
      }}
    />
  );
}

function CardSkeleton() {
  return (
    <>
      <style>{`@keyframes hf-pulse{0%,100%{opacity:.55}50%{opacity:.2}}`}</style>
      <div className="flex flex-col" style={{ gap: 8 }}>
        <Bar w="55%" h="9px" />
        <div className="flex items-center" style={{ gap: 12 }}>
          <Bar w="82px" h="82px" />
          <div className="flex flex-col flex-1" style={{ gap: 6 }}>
            <Bar w="70%" />
            <Bar w="50%" />
            <Bar w="60%" />
          </div>
        </div>
        <Bar w="100%" h="28px" />
        <div style={{ height: 1, background: "var(--border)" }} />
        <Bar w="60%" h="9px" />
        <Bar w="100%" h="38px" />
        <Bar w="100%" h="22px" />
        <Bar w="100%" h="28px" />
      </div>
    </>
  );
}


function CardError({ message }: { message: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center text-center rounded-[12px]"
      style={{
        padding: "clamp(10px, 2.5vw, 16px)",
        border: "1px dashed var(--border)",
        background: "var(--surface2)",
        gap: 6,
      }}
    >
      <span style={{ fontSize: "clamp(9px, 2.2vw, 11px)", color: "var(--muted)" }}>
        {message}
      </span>
      <span style={{ fontSize: "clamp(8.5px, 2vw, 10px)", color: "var(--muted)", opacity: 0.6 }}>
        Retrying every 30s
      </span>
    </div>
  );
}


// ORIGINAL DEFAULT EXPORT (DISABLED):
//
// export default function HealthFinanceCard() {
//   const { health, finance, loading, error } = useHealthFinance();
//
//   const bothFailed = error && !health && !finance;
//
//   return (
//     <div className="animated-border h-full">
//       <div
//         className="animated-border-inner overflow-hidden h-full flex flex-col"
//         style={{ padding: "clamp(14px, 4vw, 20px)" }}
//       >
//         { }
//         <div
//           className="flex items-center justify-between"
//           style={{ marginBottom: "clamp(10px, 3vw, 14px)" }}
//         >
//           <div
//             className="font-syne font-bold"
//             style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "var(--text)" }}
//           >
//             Health &amp; Finance
//           </div>
//
//           { }
//           <div className="group relative">
//             <button
//               type="button"
//               className="flex h-[18px] w-[18px] cursor-help items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[11px] text-[var(--muted2)]"
//             >
//               i
//             </button>
//
//             <div className="absolute right-0 top-7 z-50 hidden w-60 rounded-xl border border-[var(--border)] bg-[rgba(20,20,20,0.96)] p-3 text-[11px] leading-relaxed text-[var(--text)] shadow-2xl group-hover:block">
//               <div className="mb-1.5 font-semibold text-[#ff9a5c]">
//                 How are coins earned?
//               </div>
//
//               <ul className="list-disc space-y-1 pl-4">
//                 <li>
//                   Health data is collected from your phone through the Emple app.
//                   Complete your daily step goal to earn 1 Coin.
//                 </li>
//                 <li>
//                   Finance activity is tracked through expenses added in the Emple
//                   app. Stay within your monthly budget to earn 10 Coins.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//
//         { }
//         {loading ? (
//           <CardSkeleton />
//         ) : bothFailed ? (
//           <CardError message={error!} />
//         ) : (
//           <div className="flex-1 flex flex-col" style={{ gap: "clamp(10px, 2.5vw, 14px)" }}>
//
//             { }
//             {health ? (
//               <HealthSection data={health} />
//             ) : (
//               <div
//                 className="text-center rounded-[10px]"
//                 style={{
//                   padding: "clamp(8px, 2vw, 12px)",
//                   fontSize: "clamp(10px, 2.5vw, 11px)",
//                   color: "var(--muted)",
//                   border: "1px dashed var(--border)",
//                   background: "var(--surface2)",
//                 }}
//               >
//                 Health data unavailable
//               </div>
//             )}
//
//             { }
//             <div style={{ height: 1, background: "var(--border)", flexShrink: 0 }} />
//
//             { }
//             {finance ? (
//               <FinanceSection data={finance} />
//             ) : (
//               <div
//                 className="text-center rounded-[10px]"
//                 style={{
//                   padding: "clamp(8px, 2vw, 12px)",
//                   fontSize: "clamp(10px, 2.5vw, 11px)",
//                   color: "var(--muted)",
//                   border: "1px dashed var(--border)",
//                   background: "var(--surface2)",
//                 }}
//               >
//                 Finance data unavailable
//               </div>
//             )}
//
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

*/
// ── ORIGINAL CARD CODE END ─────────────────────────────────────────────────────

// ── TEMPORARY BLANK PLACEHOLDER ───────────────────────────────────────────────
// Renders an empty card with identical dimensions, styling, border, shadow,
// spacing, animations, and responsiveness as the original HealthFinanceCard.
// No health content, no finance content, no loading state, no error state,
// no tooltips, no charts, no progress rings, no coins, no budget information.
// ──────────────────────────────────────────────────────────────────────────────

export default function HealthFinanceCard() {
  return (
    <div className="animated-border h-full">
      <div
        className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 20px)" }}
      >
        {/* Blank placeholder — no content rendered */}
      </div>
    </div>
  );
}

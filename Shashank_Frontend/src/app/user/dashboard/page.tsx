
// "use client";

// import Sidebar from "@/view/user/components/Sidebar";
// import Topbar from "@/view/user/components/Topbar";
// import ActivityCalendar from "@/view/user/components/ActivityCalendar";
// import Leaderboard from "@/view/user/components/Leaderboard";
// import PromoCard from "@/view/user/components/PromoCard";

// const SUB_BTNS = [
//   { label: "Test Submissions", primary: true },
//   { label: "Quiz Submissions", primary: false },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
//       <Sidebar />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Topbar />
//         <main className="flex-1 overflow-y-auto p-[22px_24px] grid gap-[18px]"
//           style={{ gridTemplateColumns: "1fr 1fr 300px", gridTemplateRows: "auto auto", alignContent: "start" }}>
//           <ActivityCalendar />
//           <Leaderboard />
//           <div style={{ gridColumn: 3, gridRow: 1 }}>
//             <PromoCard />
//           </div>
//           <div className="flex gap-3 items-center justify-end" style={{ gridColumn: "1 / 3" }}>
//             {SUB_BTNS.map(({ label, primary }) => (
//               <button key={label}
//                 className="px-6 py-[10px] rounded-[25px] text-[13.5px] font-semibold cursor-pointer transition-all duration-[180ms] hover:-translate-y-[1px]"
//                 style={{
//                   background: primary ? "var(--orange)" : "var(--surface)",
//                   color: primary ? "#fff" : "var(--muted2)",
//                   border: primary ? "1.5px solid var(--orange)" : "1.5px solid var(--border)",
//                   boxShadow: primary ? "0 4px 14px rgba(241,90,34,0.35)" : "none",
//                 }}>
//                 {label}
//               </button>
//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




"use client";

import ActivityCalendar from "@/view/user/dashboard/ActivityCalendar";
import Leaderboard from "@/view/user/dashboard/Leaderboard";
import PromoCard from "@/view/user/dashboard/PromoCard";


const SUB_BTNS = [
  { label: "Test Submissions", primary: true },
  { label: "Quiz Submissions", primary: false },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-[22px_24px] grid gap-[18px]"
      style={{ gridTemplateColumns: "1fr 1fr 300px", gridTemplateRows: "auto auto", alignContent: "start" }}>
      <ActivityCalendar />
      <Leaderboard />
      <div style={{ gridColumn: 3, gridRow: 1 }}>
        <PromoCard />
      </div>
      <div className="flex gap-3 items-center justify-end" style={{ gridColumn: "1 / 3" }}>
        {SUB_BTNS.map(({ label, primary }) => (
          <button key={label}
            className="px-6 py-[10px] rounded-[25px] text-[13.5px] font-semibold cursor-pointer transition-all duration-[180ms] hover:-translate-y-[1px]"
            style={{
              background: primary ? "var(--orange)" : "var(--surface)",
              color: primary ? "#fff" : "var(--muted2)",
              border: primary ? "1.5px solid var(--orange)" : "1.5px solid var(--border)",
              boxShadow: primary ? "0 4px 14px rgba(241,90,34,0.35)" : "none",
            }}>
            {label}
          </button>
        ))}
      </div>
    </main>
  );
}
// import Sidebar from "@/view/user/components/Sidebar";
// import Topbar from "@/view/user/components/Topbar";

// export default function UserLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ flex: 1 }}>
//         <Topbar />
//         <main>
//           {children}   {/* ← yahan har page load hoga */}
//         </main>
//       </div>
//     </div>
//   );
// }

import Sidebar from "@/view/user/components/Sidebar";
import Topbar from "@/view/user/components/Topbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
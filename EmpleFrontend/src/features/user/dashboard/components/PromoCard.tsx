"use client";

export default function PromoCard() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-[10px]
                 rounded-[20px] p-[22px] relative overflow-hidden h-full"
      style={{
        background: "var(--surface)",
        border: "1.5px solid rgba(241,90,34,0.3)",
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(241,90,34,0.08) 0%, transparent 65%)" }}
      />

      <div className="text-[46px] leading-none relative z-10"
        style={{ filter: "drop-shadow(0 4px 10px rgba(241,90,34,0.4))" }}
      >
        🚀
      </div>

      <div className="font-syne text-[16px] font-extrabold relative z-10" style={{ color: "var(--text)" }}>
        Unlock Pro Features
      </div>

      <div className="text-[12px] leading-relaxed max-w-[200px] relative z-10" style={{ color: "var(--muted2)" }}>
        Get unlimited access to premium content, advanced analytics, and exclusive features!
      </div>

      <button
        className="relative z-10 mt-1 px-7 py-[10px] rounded-[25px] text-[13.5px]
                   font-bold text-white border-none cursor-pointer
                   transition-all duration-200 hover:-translate-y-[2px]"
        style={{
          background: "var(--orange)",
          boxShadow: "0 4px 14px rgba(241,90,34,0.4)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--orange-hover)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(241,90,34,0.5)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--orange)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(241,90,34,0.4)";
        }}
      >
        Upgrade Now
      </button>
    </div>
  );
}
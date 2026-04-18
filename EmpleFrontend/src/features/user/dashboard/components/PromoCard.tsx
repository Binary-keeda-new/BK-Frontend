"use client";

export default function PromoCard() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-[20px] relative overflow-hidden h-full"
      style={{
        gap: "clamp(7px, 2vw, 10px)",
        padding: "clamp(14px, 4vw, 22px)",
        background: "var(--surface)",
        border: "1.5px solid rgba(241,90,34,0.3)",
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(241,90,34,0.08) 0%, transparent 65%)" }}
      />

      <div
        className="leading-none relative z-10"
        style={{
          fontSize: "clamp(32px, 8vw, 46px)",
          filter: "drop-shadow(0 4px 10px rgba(241,90,34,0.4))",
        }}
      >
        🚀
      </div>

      <div
        className="font-syne font-extrabold relative z-10"
        style={{ fontSize: "clamp(13px, 3.5vw, 16px)", color: "var(--text)" }}
      >
        Unlock Pro Features
      </div>

      <div
        className="leading-relaxed relative z-10"
        style={{
          fontSize: "clamp(10px, 2.5vw, 12px)",
          maxWidth: "clamp(160px, 40vw, 200px)",
          color: "var(--muted2)",
        }}
      >
        Get unlimited access to premium content, advanced analytics, and exclusive features!
      </div>

      <button
        className="relative z-10 rounded-[25px] font-bold text-white border-none cursor-pointer
                   transition-all duration-200 hover:-translate-y-[2px]"
        style={{
          marginTop: "clamp(2px, 1vw, 4px)",
          padding: "clamp(7px, 2vw, 10px) clamp(18px, 5vw, 28px)",
          fontSize: "clamp(11px, 2.8vw, 13.5px)",
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
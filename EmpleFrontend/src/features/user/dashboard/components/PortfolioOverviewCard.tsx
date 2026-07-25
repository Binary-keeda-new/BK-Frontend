"use client";

import React, { useEffect, useState } from "react";
import { UserProfile } from "@/features/user/profile/types";
import { getMyProfile } from "@/features/user/profile/services/profile.service";
import { validateProfile } from "@/features/user/profile/utils/validation";
import { Briefcase, ExternalLink, Edit2, PlusCircle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

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
      <div className="flex flex-col" style={{ gap: 14 }}>
        <div className="flex items-center" style={{ gap: 12 }}>
          <Bar w="60px" h="60px" />
          <div className="flex flex-col flex-1" style={{ gap: 6 }}>
            <Bar w="60%" />
            <Bar w="40%" />
            <Bar w="50%" />
          </div>
        </div>
        <div style={{ height: 1, background: "var(--border)" }} />
        <div className="flex items-center gap-2">
           <Bar w="80px" h="24px" />
           <Bar w="80px" h="24px" />
        </div>
        <Bar w="100%" h="40px" />
        <Bar w="100%" h="20px" />
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
        Retrying later...
      </span>
    </div>
  );
}

export default function PortfolioOverviewCard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (mounted && res.success) {
          setProfile(res.data);
        }
      } catch (err: any) {
        if (mounted && err.message !== 'Profile not found') {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => { mounted = false; };
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getImageUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
  };

  const validation = profile ? validateProfile(profile) : { completionPercentage: 0, isValid: false };
  const isPublished = profile?.isPublished && profile?.username;
  const isDraft = profile && !isPublished;
  const isNotCreated = !profile;

  const fullName = profile?.personalInfo?.fullName || "Your Name";
  const headline = profile?.personalInfo?.headline || profile?.experience?.[0]?.role || "Professional Headline";
  const email = profile?.personalInfo?.email || "Update your email";

  return (
    <div className="animated-border h-full">
      <div
        className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 20px)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "clamp(12px, 3.5vw, 16px)" }}
        >
          <div
            className="font-syne font-bold flex items-center gap-2 uppercase tracking-[0.06em]"
            style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#ff9a5c" }}
          >
            <Briefcase size={14} />
            Portfolio
          </div>
        </div>

        {loading ? (
          <CardSkeleton />
        ) : error ? (
          <CardError message={error} />
        ) : (
          <div className="flex-1 flex flex-col" style={{ gap: "clamp(14px, 3.5vw, 18px)" }}>
            
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {profile?.profilePhoto ? (
                  <img 
                    src={getImageUrl(profile.profilePhoto)} 
                    alt={fullName}
                    className="w-14 h-14 rounded-full object-cover border-2"
                    style={{ borderColor: "var(--border)" }}
                  />
                ) : (
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl border-2"
                    style={{ background: "var(--surface2)", color: "var(--text)", borderColor: "var(--border)" }}
                  >
                    {getInitials(fullName === "Your Name" ? undefined : fullName)}
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-bold truncate" style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "var(--text)" }}>
                  {fullName}
                </h3>
                <p className="truncate font-medium mt-0.5" style={{ fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--orange)" }}>
                  {headline}
                </p>
                <p className="truncate mt-0.5" style={{ fontSize: "clamp(10px, 2.5vw, 11px)", color: "var(--muted)" }}>
                  {email}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2">
              {/* Status Badge */}
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold"
                style={{ 
                  fontSize: "clamp(10px, 2.5vw, 11px)",
                  background: isPublished ? "rgba(16,185,129,0.12)" : isDraft ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                  color: isPublished ? "#10b981" : isDraft ? "#f59e0b" : "#ef4444",
                  border: `1px solid ${isPublished ? "rgba(16,185,129,0.3)" : isDraft ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}`
                }}
              >
                {isPublished ? <CheckCircle size={12} /> : isDraft ? <Clock size={12} /> : <PlusCircle size={12} />}
                {isPublished ? "Published" : isDraft ? "Draft" : "Not Created"}
              </div>
              
              {/* Completion Percentage */}
              {profile && (
                <div 
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold"
                  style={{ 
                    fontSize: "clamp(10px, 2.5vw, 11px)",
                    background: "var(--surface2)",
                    color: "var(--muted2)",
                    border: "1px solid var(--border)"
                  }}
                >
                  {validation.completionPercentage}% Complete
                </div>
              )}
            </div>

            <div style={{ height: 1, background: "var(--border)" }} />

            {/* Empty State vs Preview */}
            <div className="flex-1 flex flex-col justify-center">
              {isNotCreated ? (
                <p className="text-center font-medium" style={{ fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--muted2)" }}>
                  Complete your profile to publish a professional portfolio.
                </p>
              ) : isPublished ? (
                <div className="text-center">
                  <span className="block mb-1 font-semibold" style={{ fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--muted)" }}>Portfolio URL</span>
                  <a 
                    href={`/u/${profile.username}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block truncate max-w-full font-bold hover:underline transition-colors"
                    style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "var(--orange)" }}
                  >
                    emple.com/u/{profile.username}
                  </a>
                </div>
              ) : (
                <p className="text-center font-medium" style={{ fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--muted2)" }}>
                  You haven't published your portfolio yet.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-auto pt-2">
              <Link 
                href={isPublished ? `/u/${profile.username}` : "/dashboard/profile"}
                target={isPublished ? "_blank" : undefined}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[8px] font-bold transition-all shadow-sm hover:opacity-90"
                style={{ background: "var(--orange)", color: "#fff", fontSize: "clamp(12px, 3vw, 13px)" }}
              >
                {isPublished ? (
                  <>View Portfolio <ExternalLink size={14} /></>
                ) : (
                  <>Create Portfolio <PlusCircle size={14} /></>
                )}
              </Link>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

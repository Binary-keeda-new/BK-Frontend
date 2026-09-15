"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, User, ExternalLink, PenSquare } from "lucide-react";
import { getMyProfile } from "@/features/user/profile/services/profile.service";
import type { UserProfile } from "@/features/user/profile/types";

export default function PortfolioCard() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        setLoading(true);
        setError(null);
        const res = await getMyProfile();
        if (res.success && res.data) {
          setProfile(res.data);
        }
      } catch (err: any) {
        if (err.message === "Profile not found" || err.status === 404) {
          setProfile(null);
        } else {
          setError(err.message || "Unable to load portfolio");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
  }, []);

  // Compute profile fields gracefully
  const name = profile?.personalInfo?.fullName || profile?.username || "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
    
  const edu = profile?.education?.[0];
  const degreeStr = edu?.degree ? `${edu.degree}${edu.branch ? ` in ${edu.branch}` : ""}` : null;
  const collegeStr = edu?.institution;
  const avatarUrl = profile?.profilePhoto 
    ? (profile.profilePhoto.startsWith('http') 
        ? profile.profilePhoto 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}`) 
    : null;

  return (
    <div className="animated-border h-full">
      <div className="animated-border-inner group relative flex h-full flex-col overflow-hidden p-4 sm:p-5">
        
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="font-syne text-[clamp(13px,3.5vw,15px)] font-bold text-[var(--text)] flex items-center gap-2">
            <Briefcase size={16} style={{ color: "var(--orange)" }} />
            Portfolio
          </div>

          <div className="group/tooltip relative">
            <button
              type="button"
              className="inline-flex h-[18px] w-[18px] cursor-help items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[11px] text-[var(--muted2)]"
            >
              i
            </button>

            <div className="absolute right-0 top-7 z-50 hidden w-[220px] rounded-[10px] border border-[var(--border)] bg-[rgba(20,20,20,0.96)] px-3 py-2.5 text-[11px] leading-[1.4] text-[var(--text)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] group-hover/tooltip:block text-left">
              <div className="mb-1.5 font-bold text-orange-400">
                About your portfolio
              </div>
              <div className="text-[11px] leading-relaxed text-white">
                {(!profile && !loading && !error) && (
                  "Create your profile to add your professional and academic information. You can publish your portfolio once your profile is ready."
                )}
                {(profile && !profile.isPublished) && (
                  "Visit Profile to update your details. Publish your portfolio to make it publicly visible."
                )}
                {(profile && profile.isPublished) && (
                  "Your portfolio is published and publicly accessible. Select Portfolio to view it, or Edit Profile to update your information."
                )}
                {(loading || error) && (
                  "Information about your professional portfolio."
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center w-full">
          {loading ? (
            <div className="flex w-full flex-col items-center gap-3 animate-pulse">
              <div className="h-16 w-16 rounded-full bg-white/5" />
              <div className="h-4 w-1/2 rounded bg-white/5" />
              <div className="h-3 w-2/3 rounded bg-white/5 mt-1" />
              <div className="h-8 w-full rounded-xl bg-white/5 mt-4" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-[13px] text-[var(--muted)]">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-[11px] font-medium text-[var(--orange)] hover:underline mt-1"
              >
                Retry
              </button>
            </div>
          ) : !profile ? (
            // State 1: No Portfolio
            <div className="flex w-full flex-col items-center animate-in fade-in duration-500">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(241,90,34,0.1)] text-[var(--orange)]">
                <User size={28} />
              </div>
              <p className="mb-5 text-[13px] text-[var(--muted)] px-2">
                Create your profile and showcase your skills.
              </p>
              <button
                onClick={() => router.push("/user/profile")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--orange)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(241,90,34,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(241,90,34,0.4)]"
              >
                Create Profile
              </button>
            </div>
          ) : (
            // State 2 & 3: Draft or Published Preview
            <div className="flex w-full flex-col items-center animate-in fade-in duration-500">
              
              {/* Avatar + Badge */}
              <div className="relative mb-3 flex flex-col items-center">
                {avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={avatarUrl} 
                    alt={name} 
                    className="h-16 w-16 rounded-full object-cover border-2 border-[var(--surface2)] shadow-md" 
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f15a22] to-[#ff9a5c] text-[20px] font-bold text-white shadow-lg shadow-orange-500/20 ring-2 ring-[var(--surface2)]">
                    {initials}
                  </div>
                )}
                
                {/* Small Status Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  {profile.isPublished ? (
                    <span className="rounded-full bg-[#10b981] border border-[#10b981]/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm shadow-[#10b981]/20">
                      LIVE
                    </span>
                  ) : (
                    <span className="rounded-full bg-[var(--surface2)] border border-[var(--border)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--muted)] shadow-sm">
                      DRAFT
                    </span>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="mt-3 w-full px-1 flex flex-col items-center">
                <h3 className="text-[15px] font-bold text-[var(--text)] w-full truncate text-center">
                  {name}
                </h3>
                
                {degreeStr || collegeStr ? (
                  <div className="mt-1 flex w-full flex-col items-center gap-0.5 text-[12px] text-[var(--muted)] leading-tight">
                    {degreeStr && <span className="truncate w-full max-w-[220px]">{degreeStr}</span>}
                    {collegeStr && <span className="truncate w-full max-w-[220px] opacity-80">{collegeStr}</span>}
                  </div>
                ) : (
                  <div className="mt-1.5 text-[11px] text-[var(--orange)] opacity-80 italic">
                    Complete your profile
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="mt-5 flex w-full flex-col gap-2.5">
                {profile.isPublished ? (
                  <>
                    <button
                      onClick={() => window.open(`/u/${profile.username}`, "_blank")}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--orange)] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_4px_14px_rgba(241,90,34,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(241,90,34,0.4)]"
                    >
                      Portfolio
                      <ExternalLink size={14} />
                    </button>
                    
                    <button
                      onClick={() => router.push("/user/profile")}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] px-4 py-1.5 text-[11px] font-semibold text-[var(--muted)] transition-all hover:bg-[rgba(255,255,255,0.06)] hover:text-[var(--text)]"
                    >
                      <PenSquare size={12} />
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push("/user/profile")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--surface2)] border border-[var(--border)] px-4 py-2.5 text-[13px] font-semibold text-[var(--text)] transition-all hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]"
                  >
                    Profile
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { UserProfile } from '../../types';
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  ExternalLink,
  Download,
  GraduationCap,
  Briefcase,
  Award,
  CheckCircle2,
  BookOpen,
  Code2,
  FileText,
  ChevronRight,
  Sparkles,
  Binary,
} from 'lucide-react';

/* ──────────────────────── CSS Keyframes (injected once) ──────────────────────── */
const globalStyles = `
@keyframes gridShift {
  0%   { background-position: 0px 0px; }
  50%  { background-position: 30px 30px; }
  100% { background-position: 0px 0px; }
}
@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 20px rgba(56,189,248,0.3), 0 0 60px rgba(56,189,248,0.1); }
  50%      { text-shadow: 0 0 30px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.2); }
}
@keyframes borderGlow {
  0%, 100% { border-color: rgba(56,189,248,0.15); box-shadow: 0 0 15px rgba(56,189,248,0.05); }
  50%      { border-color: rgba(56,189,248,0.35); box-shadow: 0 0 25px rgba(56,189,248,0.12); }
}
@keyframes dotPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.4); }
  50%      { box-shadow: 0 0 0 8px rgba(56,189,248,0); }
}
`;

/* ──────────────────────── Animation Variants ──────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

/* ──────────────────────── Section Wrapper ──────────────────────── */
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ──────────────────────── Section Title ──────────────────────── */
function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg" style={{ background: 'rgba(56,189,248,0.1)' }}>
        <Icon className="w-5 h-5" style={{ color: '#38BDF8' }} />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: '#E2E8F0' }}>
        {title}
      </h2>
      <div className="flex-1 h-px ml-4" style={{ background: 'linear-gradient(to right, rgba(56,189,248,0.3), transparent)' }} />
    </div>
  );
}

/* ──────────────────────── Skill Bar Component ──────────────────────── */
function SkillBar({ name, percentage, color, delay }: { name: string; percentage: number; color: string; delay: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium" style={{ color: '#E2E8F0' }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: '#64748B' }}>{percentage}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(15,23,42,0.8)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}, ${color}dd)` }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${percentage}%` } : { width: '0%' }}
          transition={{ duration: 1.2, delay: delay * 0.08, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────── Helpers ──────────────────────── */
function buildPhotoUrl(profilePhoto?: string): string | null {
  if (!profilePhoto) return null;
  return profilePhoto.startsWith('http')
    ? profilePhoto
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profilePhoto}`;
}

function buildResumeUrl(resumeUrl?: string): string | null {
  if (!resumeUrl) return null;
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${resumeUrl}`;
}

function formatDate(date?: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const socialIconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  leetcode: Code2,
  codeforces: Code2,
  hackerrank: Code2,
  kaggle: Binary,
};

const skillColors: Record<string, string> = {
  ai_ml: '#38BDF8',
  frontend: '#34D399',
  backend: '#818CF8',
  cloud: '#F472B6',
  devops: '#FB923C',
  languages: '#38BDF8',
  tools: '#A78BFA',
};

const skillLabels: Record<string, string> = {
  ai_ml: 'AI / Machine Learning',
  frontend: 'Frontend',
  backend: 'Backend',
  cloud: 'Cloud',
  devops: 'DevOps',
  languages: 'Languages',
  tools: 'Tools & Platforms',
};

/* ──────────────────────── Main Component ──────────────────────── */
export function AIResearch({ profile }: { profile: UserProfile }) {
  const personalInfo = profile.personalInfo || {};
  const about = profile.about || {};
  const education = profile.education || [];
  const experience = profile.experience || [];
  const projects = profile.projects || [];
  const skills = profile.skills || {};
  const certifications = profile.certifications || [];
  const achievements = profile.achievements || [];
  const socialLinks = profile.socialLinks || {};

  const photoUrl = buildPhotoUrl(profile.profilePhoto);
  const resumeUrl = buildResumeUrl(profile.resumeUrl);

  const activeSocials = Object.entries(socialLinks).filter(
    ([, url]) => url && url.trim() !== ''
  );

  const activeSkillCategories = Object.entries(skills).filter(
    ([, arr]) => arr && arr.length > 0
  ) as [string, string[]][];

  return (
    <>
      {/* Inject global keyframes */}
      <style>{globalStyles}</style>

      <div
        className="min-h-screen w-full relative"
        style={{
          background: 'linear-gradient(180deg, #0A0F1E 0%, #0F172A 50%, #0A0F1E 100%)',
          color: '#E2E8F0',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Animated Grid Overlay ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(56,189,248,0.03) 0px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(56,189,248,0.03) 0px, transparent 1px, transparent 60px)
            `,
            animation: 'gridShift 20s ease-in-out infinite',
          }}
        />

        {/* ── Content Container ── */}
        <div className="relative z-10">
          {/* ═══════════════════════════ HERO SECTION ═══════════════════════════ */}
          <header className="relative overflow-hidden">
            {/* Gradient orb decorations */}
            <div
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.3), transparent)' }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3), transparent)' }}
            />

            <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-16">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="flex flex-col md:flex-row items-center md:items-start gap-10"
              >
                {/* Profile Photo */}
                {photoUrl && (
                  <motion.div variants={scaleIn} className="shrink-0">
                    <div
                      className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1"
                      style={{
                        background: 'linear-gradient(135deg, #38BDF8, #34D399)',
                      }}
                    >
                      <div
                        className="absolute -inset-2 rounded-full opacity-40 blur-xl"
                        style={{ background: 'linear-gradient(135deg, #38BDF8, #34D399)' }}
                      />
                      <img
                        src={photoUrl}
                        alt={personalInfo.fullName || 'Profile'}
                        className="relative w-full h-full rounded-full object-cover"
                        style={{ border: '3px solid #0A0F1E' }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  {/* Name */}
                  <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3"
                    style={{
                      color: '#F8FAFC',
                      animation: 'glowPulse 4s ease-in-out infinite',
                    }}
                  >
                    {personalInfo.fullName || 'Researcher'}
                  </motion.h1>

                  {/* Headline */}
                  {personalInfo.headline && (
                    <motion.p
                      variants={fadeUp}
                      className="font-mono text-lg md:text-xl mb-4"
                      style={{ color: '#34D399' }}
                    >
                      <span style={{ color: '#38BDF8' }}>{'>'}</span>{' '}
                      {personalInfo.headline}
                    </motion.p>
                  )}

                  {/* Tagline */}
                  {personalInfo.tagline && (
                    <motion.p
                      variants={fadeUp}
                      className="text-base md:text-lg max-w-2xl mb-6"
                      style={{ color: '#94A3B8' }}
                    >
                      {personalInfo.tagline}
                    </motion.p>
                  )}

                  {/* Meta row */}
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 mb-6"
                  >
                    {personalInfo.location && (
                      <span className="flex items-center gap-1.5 text-sm" style={{ color: '#94A3B8' }}>
                        <MapPin className="w-4 h-4" style={{ color: '#38BDF8' }} />
                        {personalInfo.location}
                      </span>
                    )}
                    {personalInfo.email && (
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="flex items-center gap-1.5 text-sm hover:underline"
                        style={{ color: '#94A3B8' }}
                      >
                        <Mail className="w-4 h-4" style={{ color: '#38BDF8' }} />
                        {personalInfo.email}
                      </a>
                    )}
                    {personalInfo.phone && (
                      <span className="flex items-center gap-1.5 text-sm" style={{ color: '#94A3B8' }}>
                        <Phone className="w-4 h-4" style={{ color: '#38BDF8' }} />
                        {personalInfo.phone}
                      </span>
                    )}
                    {personalInfo.website && (
                      <a
                        href={personalInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm hover:underline"
                        style={{ color: '#94A3B8' }}
                      >
                        <Globe className="w-4 h-4" style={{ color: '#38BDF8' }} />
                        Website
                      </a>
                    )}
                  </motion.div>

                  {/* Social Links */}
                  {activeSocials.length > 0 && (
                    <motion.div
                      variants={fadeUp}
                      className="flex items-center justify-center md:justify-start gap-2"
                    >
                      {activeSocials.map(([key, url]) => {
                        const IconComp = socialIconMap[key] || Globe;
                        return (
                          <motion.a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
                            style={{
                              background: 'rgba(56,189,248,0.08)',
                              border: '1px solid rgba(56,189,248,0.15)',
                              color: '#94A3B8',
                            }}
                            title={key}
                          >
                            <IconComp className="w-4.5 h-4.5" />
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Divider line */}
            <div className="max-w-6xl mx-auto px-6 md:px-8">
              <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.2), transparent)' }} />
            </div>
          </header>

          {/* ═══════════════════════════ MAIN CONTENT ═══════════════════════════ */}
          <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 space-y-24">

            {/* ─── ABOUT / RESEARCH SUMMARY ─── */}
            {(about.bio || about.professionalSummary || about.careerObjective) && (
              <Section>
                <SectionTitle icon={BookOpen} title="Research Profile" />
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Professional Summary Card */}
                  {about.professionalSummary && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="rounded-xl p-6 md:p-8 md:col-span-2"
                      style={{
                        background: 'rgba(15,23,42,0.6)',
                        border: '1px solid rgba(56,189,248,0.15)',
                        backdropFilter: 'blur(12px)',
                        animation: 'borderGlow 4s ease-in-out infinite',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4" style={{ color: '#38BDF8' }} />
                        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#38BDF8' }}>
                          Professional Summary
                        </span>
                      </div>
                      <p className="text-base md:text-lg leading-relaxed" style={{ color: '#CBD5E1' }}>
                        {about.professionalSummary}
                      </p>
                    </motion.div>
                  )}

                  {/* Bio */}
                  {about.bio && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="rounded-xl p-6 md:p-8"
                      style={{
                        background: 'rgba(15,23,42,0.4)',
                        border: '1px solid rgba(56,189,248,0.08)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4" style={{ color: '#34D399' }} />
                        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#34D399' }}>
                          About
                        </span>
                      </div>
                      <p className="leading-relaxed" style={{ color: '#94A3B8' }}>
                        {about.bio}
                      </p>
                    </motion.div>
                  )}

                  {/* Career Objective */}
                  {about.careerObjective && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="rounded-xl p-6 md:p-8"
                      style={{
                        background: 'rgba(15,23,42,0.4)',
                        border: '1px solid rgba(56,189,248,0.08)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <ChevronRight className="w-4 h-4" style={{ color: '#34D399' }} />
                        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#34D399' }}>
                          Research Objective
                        </span>
                      </div>
                      <p className="leading-relaxed" style={{ color: '#94A3B8' }}>
                        {about.careerObjective}
                      </p>
                    </motion.div>
                  )}
                </div>
              </Section>
            )}

            {/* ─── EXPERIENCE ─── */}
            {experience.length > 0 && (
              <Section>
                <SectionTitle icon={Briefcase} title="Research & Experience" />
                <div className="relative">
                  {/* Timeline line */}
                  <div
                    className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
                    style={{ background: 'linear-gradient(to bottom, rgba(56,189,248,0.3), rgba(56,189,248,0.05))' }}
                  />

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-8"
                  >
                    {experience.map((exp, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        transition={{ duration: 0.6 }}
                        className="relative pl-12 md:pl-16"
                      >
                        {/* Timeline dot */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
                          className="absolute left-2.5 md:left-4.5 top-2 w-3.5 h-3.5 rounded-full z-10"
                          style={{
                            background: '#38BDF8',
                            animation: 'dotPulse 3s ease-in-out infinite',
                            animationDelay: `${i * 0.5}s`,
                          }}
                        />

                        <motion.div
                          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(56,189,248,0.1)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="rounded-xl p-6"
                          style={{
                            background: 'rgba(15,23,42,0.5)',
                            border: '1px solid rgba(56,189,248,0.1)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                            <div>
                              <h3 className="text-lg font-bold" style={{ color: '#E2E8F0' }}>
                                {exp.role || 'Role'}
                              </h3>
                              <p className="font-mono text-sm" style={{ color: '#38BDF8' }}>
                                {exp.company}
                                {exp.employmentType && (
                                  <span style={{ color: '#64748B' }}> · {exp.employmentType}</span>
                                )}
                              </p>
                            </div>
                            <span className="text-xs font-mono shrink-0 mt-1 sm:mt-0" style={{ color: '#64748B' }}>
                              {formatDate(exp.startDate)} — {exp.currentRole ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-sm leading-relaxed mt-3" style={{ color: '#94A3B8' }}>
                              {exp.description}
                            </p>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </Section>
            )}

            {/* ─── EDUCATION ─── */}
            {education.length > 0 && (
              <Section>
                <SectionTitle icon={GraduationCap} title="Education & Research" />
                <div className="relative">
                  {/* Timeline line */}
                  <div
                    className="absolute left-4 md:left-6 top-0 bottom-0 w-px"
                    style={{ background: 'linear-gradient(to bottom, rgba(52,211,153,0.3), rgba(52,211,153,0.05))' }}
                  />

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="space-y-8"
                  >
                    {education.map((edu, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        transition={{ duration: 0.6 }}
                        className="relative pl-12 md:pl-16"
                      >
                        {/* Timeline dot */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
                          className="absolute left-2.5 md:left-4.5 top-2 w-3.5 h-3.5 rounded-full z-10"
                          style={{
                            background: '#34D399',
                            animation: 'dotPulse 3s ease-in-out infinite',
                            animationDelay: `${i * 0.5}s`,
                          }}
                        />

                        <motion.div
                          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(52,211,153,0.1)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="rounded-xl p-6"
                          style={{
                            background: 'rgba(15,23,42,0.5)',
                            border: '1px solid rgba(52,211,153,0.1)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                            <div>
                              <h3 className="text-lg font-bold" style={{ color: '#E2E8F0' }}>
                                {[edu.degree, edu.branch].filter(Boolean).join(' in ') || 'Degree'}
                              </h3>
                              <p className="font-mono text-sm" style={{ color: '#34D399' }}>
                                {edu.institution}
                              </p>
                              {edu.specialization && (
                                <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                                  Specialization: {edu.specialization}
                                </p>
                              )}
                            </div>
                            <div className="text-right shrink-0 mt-1 sm:mt-0">
                              <span className="text-xs font-mono" style={{ color: '#64748B' }}>
                                {[edu.startYear, edu.endYear].filter(Boolean).join(' — ')}
                              </span>
                              {edu.cgpa && (
                                <p className="text-xs font-mono mt-0.5" style={{ color: '#38BDF8' }}>
                                  CGPA: {edu.cgpa}
                                </p>
                              )}
                            </div>
                          </div>
                          {edu.description && (
                            <p className="text-sm leading-relaxed mt-3" style={{ color: '#94A3B8' }}>
                              {edu.description}
                            </p>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </Section>
            )}

            {/* ─── PROJECTS / PUBLICATIONS ─── */}
            {projects.length > 0 && (
              <Section>
                <SectionTitle icon={Code2} title="Projects & Publications" />
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {projects.map((project, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      transition={{ duration: 0.5 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 0 40px rgba(56,189,248,0.08)',
                      }}
                      className="group rounded-xl p-6 relative overflow-hidden"
                      style={{
                        background: 'rgba(15,23,42,0.5)',
                        border: '1px solid rgba(56,189,248,0.1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {/* Hover gradient border effect */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(52,211,153,0.05))',
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-lg font-bold" style={{ color: '#E2E8F0' }}>
                            {project.name}
                          </h3>
                          <div className="flex gap-2 shrink-0">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
                                style={{ color: '#94A3B8' }}
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
                                style={{ color: '#94A3B8' }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {project.description && (
                          <p className="text-sm leading-relaxed mb-4" style={{ color: '#94A3B8' }}>
                            {project.description}
                          </p>
                        )}

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-md text-xs font-mono"
                                style={{
                                  background: 'rgba(56,189,248,0.08)',
                                  color: '#38BDF8',
                                  border: '1px solid rgba(56,189,248,0.15)',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>
            )}

            {/* ─── SKILLS VISUALIZATION ─── */}
            {activeSkillCategories.length > 0 && (
              <Section>
                <SectionTitle icon={Sparkles} title="Technical Expertise" />
                <div className="grid md:grid-cols-2 gap-8">
                  {activeSkillCategories.map(([category, skillList]) => {
                    const color = skillColors[category] || '#38BDF8';
                    const label = skillLabels[category] || category;

                    return (
                      <motion.div
                        key={category}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeUp}
                        transition={{ duration: 0.6 }}
                        className="rounded-xl p-6"
                        style={{
                          background: 'rgba(15,23,42,0.4)',
                          border: '1px solid rgba(56,189,248,0.08)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <h3 className="text-sm font-mono uppercase tracking-widest mb-5" style={{ color }}>
                          {label}
                        </h3>
                        {skillList.map((skill, idx) => {
                          // Visual percentage: distribute between 78-96% for visual fullness
                          const percentage = Math.min(96, Math.max(78, 96 - idx * 3));
                          return (
                            <SkillBar
                              key={skill}
                              name={skill}
                              percentage={percentage}
                              color={color}
                              delay={idx}
                            />
                          );
                        })}
                      </motion.div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* ─── ACHIEVEMENTS / PUBLICATIONS ─── */}
            {achievements.length > 0 && (
              <Section>
                <SectionTitle icon={Award} title="Achievements & Publications" />
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {achievements.map((ach, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      transition={{ duration: 0.5 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 4px 30px rgba(56,189,248,0.08)',
                      }}
                      className="rounded-xl p-6"
                      style={{
                        background: 'rgba(15,23,42,0.5)',
                        border: '1px solid rgba(56,189,248,0.1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                          style={{ background: 'rgba(52,211,153,0.1)' }}
                        >
                          <Award className="w-4 h-4" style={{ color: '#34D399' }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1" style={{ color: '#E2E8F0' }}>
                            {ach.title}
                          </h3>
                          {ach.date && (
                            <p className="text-xs font-mono mb-2" style={{ color: '#64748B' }}>
                              {formatDate(ach.date)}
                            </p>
                          )}
                          {ach.description && (
                            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                              {ach.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>
            )}

            {/* ─── CERTIFICATIONS ─── */}
            {certifications.length > 0 && (
              <Section>
                <SectionTitle icon={CheckCircle2} title="Certifications" />
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      transition={{ duration: 0.5 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: '0 0 25px rgba(52,211,153,0.08)',
                      }}
                      className="rounded-xl p-5 flex items-start gap-3"
                      style={{
                        background: 'rgba(15,23,42,0.4)',
                        border: '1px solid rgba(52,211,153,0.1)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(52,211,153,0.15)' }}
                      >
                        <CheckCircle2 className="w-4 h-4" style={{ color: '#34D399' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: '#E2E8F0' }}>
                          {cert.name}
                        </h3>
                        {cert.issuer && (
                          <p className="text-xs" style={{ color: '#64748B' }}>
                            {cert.issuer}
                          </p>
                        )}
                        {cert.date && (
                          <p className="text-xs font-mono mt-1" style={{ color: '#64748B' }}>
                            {formatDate(cert.date)}
                          </p>
                        )}
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs mt-2 hover:underline"
                            style={{ color: '#38BDF8' }}
                          >
                            Verify <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Section>
            )}

            {/* ─── RESUME DOWNLOAD ─── */}
            {resumeUrl && (
              <Section>
                <div className="flex justify-center">
                  <motion.a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 0 40px rgba(56,189,248,0.15)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-widest transition-colors"
                    style={{
                      border: '1px solid rgba(56,189,248,0.3)',
                      color: '#38BDF8',
                      background: 'rgba(56,189,248,0.05)',
                    }}
                  >
                    <Download className="w-5 h-5" />
                    Download Curriculum Vitae
                  </motion.a>
                </div>
              </Section>
            )}
          </main>

          {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
          <footer className="relative">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
              <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.15), transparent)' }} />
            </div>
            <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="font-mono text-sm" style={{ color: '#64748B' }}>
                    © {new Date().getFullYear()} {personalInfo.fullName || 'Researcher'}
                  </p>
                  {personalInfo.email && (
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs hover:underline"
                      style={{ color: '#94A3B8' }}
                    >
                      {personalInfo.email}
                    </a>
                  )}
                </div>

                {activeSocials.length > 0 && (
                  <div className="flex items-center gap-3">
                    {activeSocials.map(([key, url]) => {
                      const IconComp = socialIconMap[key] || Globe;
                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:opacity-80"
                          style={{ color: '#64748B' }}
                          title={key}
                        >
                          <IconComp className="w-4 h-4" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

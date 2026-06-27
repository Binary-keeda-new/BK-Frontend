'use client';

import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { UserProfile } from '../../types';
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  Download,
  Award,
  Trophy,
  Calendar,
  GraduationCap,
  Briefcase,
  Code2,
  ArrowUpRight,
} from 'lucide-react';

/* ─── CSS Keyframe Animations (injected via <style>) ─── */
const globalStyles = `
@keyframes meshFloat1 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  25% { transform: translate(10%, -15%) scale(1.1); }
  50% { transform: translate(-5%, 10%) scale(0.95); }
  75% { transform: translate(15%, 5%) scale(1.05); }
}
@keyframes meshFloat2 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  25% { transform: translate(-12%, 8%) scale(1.08); }
  50% { transform: translate(8%, -12%) scale(0.92); }
  75% { transform: translate(-8%, -5%) scale(1.12); }
}
@keyframes meshFloat3 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  33% { transform: translate(15%, 10%) scale(1.15); }
  66% { transform: translate(-10%, -8%) scale(0.9); }
}
@keyframes geoFloat1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(15deg); }
}
@keyframes geoFloat2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(25px) rotate(-12deg); }
}
@keyframes geoFloat3 {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  50% { transform: translateY(-20px) rotate(8deg) scale(1.1); }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

/* ─── Palette ─── */
const ACCENT_COLORS = [
  '#F43F5E', // rose
  '#8B5CF6', // violet
  '#F97316', // orange
  '#06B6D4', // cyan
  '#10B981', // emerald
  '#EC4899', // pink
];

const pickAccent = (index: number) => ACCENT_COLORS[index % ACCENT_COLORS.length];

/* ─── Animation Variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: i * 0.06,
    },
  }),
};

/* ─── Helper: build image urls ─── */
const buildPhotoUrl = (photo?: string) => {
  if (!photo) return '';
  return photo.startsWith('http')
    ? photo
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${photo}`;
};

const buildResumeUrl = (url?: string) => {
  if (!url) return '';
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${url}`;
};

/* ─── Helper: format date ─── */
const fmtDate = (d?: Date | string) => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/* ─── Section Title Component ─── */
function SectionTitle({
  children,
  accent = '#F43F5E',
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1C1917] mb-4">
        {children}
      </h2>
      <div className="h-1.5 w-24 rounded-full" style={{ background: accent }} />
    </motion.div>
  );
}

/* ─── Social Icon Map ─── */
const socialIconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  leetcode: Code2,
  codeforces: Code2,
  hackerrank: Code2,
  kaggle: Code2,
};

const socialColorMap: Record<string, string> = {
  github: '#1C1917',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  leetcode: '#F97316',
  codeforces: '#8B5CF6',
  hackerrank: '#10B981',
  kaggle: '#06B6D4',
};

/* ══════════════════════════════════════════════════════════ */
/*                  MAIN COMPONENT                           */
/* ══════════════════════════════════════════════════════════ */
export function CreativeDesigner({ profile }: { profile: UserProfile }) {
  const {
    personalInfo = {},
    about = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
    achievements = [],
    socialLinks = {},
  } = profile;

  const photoUrl = buildPhotoUrl(profile.profilePhoto);
  const resumeUrl = buildResumeUrl(profile.resumeUrl);

  /* Flatten skills into categorized arrays */
  const skillCategories = useMemo(() => {
    const cats: { label: string; items: string[]; color: string }[] = [];
    if (skills?.frontend?.length)
      cats.push({ label: 'Frontend', items: skills.frontend, color: '#F43F5E' });
    if (skills?.backend?.length)
      cats.push({ label: 'Backend', items: skills.backend, color: '#8B5CF6' });
    if (skills?.ai_ml?.length)
      cats.push({ label: 'AI / ML', items: skills.ai_ml, color: '#F97316' });
    if (skills?.cloud?.length)
      cats.push({ label: 'Cloud', items: skills.cloud, color: '#06B6D4' });
    if (skills?.devops?.length)
      cats.push({ label: 'DevOps', items: skills.devops, color: '#10B981' });
    if (skills?.languages?.length)
      cats.push({ label: 'Languages', items: skills.languages, color: '#EC4899' });
    if (skills?.tools?.length)
      cats.push({ label: 'Tools', items: skills.tools, color: '#6366F1' });
    return cats;
  }, [skills]);

  const socialEntries = useMemo(() => {
    return Object.entries(socialLinks || {}).filter(
      ([, v]) => v && typeof v === 'string' && v.trim() !== ''
    ) as [string, string][];
  }, [socialLinks]);

  /* ─── Render ─── */
  return (
    <>
      {/* Inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      <div className="relative min-h-screen overflow-hidden font-sans" style={{ background: '#FAFAF9' }}>
        {/* ═══ Animated Gradient Mesh Background ═══ */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-20 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #F43F5E 0%, transparent 70%)',
              animation: 'meshFloat1 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-20 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
              animation: 'meshFloat2 24s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-1/4 left-1/3 w-[55vw] h-[55vw] rounded-full opacity-15 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #F97316 0%, transparent 70%)',
              animation: 'meshFloat3 18s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-2/3 right-1/4 w-[40vw] h-[40vw] rounded-full opacity-10 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)',
              animation: 'meshFloat1 22s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* ═══════════════════ HERO ═══════════════════ */}
          <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
            {/* Floating Geometric Shapes */}
            <div
              className="absolute top-20 left-[10%] w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-30"
              style={{
                background: 'linear-gradient(135deg, #F43F5E, #F97316)',
                animation: 'geoFloat1 7s ease-in-out infinite',
              }}
            />
            <div
              className="absolute top-1/3 right-[8%] w-12 h-12 sm:w-20 sm:h-20 rounded-lg opacity-25 rotate-12"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
                animation: 'geoFloat2 6s ease-in-out infinite',
              }}
            />
            <div
              className="absolute bottom-1/4 left-[15%] w-10 h-10 sm:w-16 sm:h-16 rounded-full opacity-20"
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #10B981)',
                animation: 'geoFloat3 8s ease-in-out infinite',
              }}
            />
            <div
              className="absolute bottom-1/3 right-[15%] w-8 h-8 sm:w-14 sm:h-14 rounded-lg opacity-25 -rotate-6"
              style={{
                background: 'linear-gradient(135deg, #F97316, #EC4899)',
                animation: 'geoFloat1 9s ease-in-out infinite reverse',
              }}
            />
            <div
              className="absolute top-[60%] left-[5%] w-6 h-6 sm:w-10 sm:h-10 rounded-full opacity-20"
              style={{
                background: '#8B5CF6',
                animation: 'geoFloat2 7.5s ease-in-out infinite',
              }}
            />

            {/* Hero Content */}
            <div className="max-w-6xl mx-auto text-center">
              {/* Profile Photo */}
              {photoUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
                  className="relative inline-block mb-10"
                >
                  <div className="relative">
                    <div
                      className="absolute -inset-2 rounded-full opacity-60 blur-lg"
                      style={{
                        background: 'linear-gradient(135deg, #F43F5E, #8B5CF6, #F97316)',
                        animation: 'gradientShift 4s ease infinite',
                        backgroundSize: '200% 200%',
                      }}
                    />
                    <img
                      src={photoUrl}
                      alt={personalInfo.fullName || 'Profile'}
                      className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                  </div>
                </motion.div>
              )}

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.4 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-6"
                style={{ color: '#1C1917' }}
              >
                {personalInfo.fullName || 'Your Name'}
              </motion.h1>

              {/* Headline — italic serif accent */}
              {personalInfo.headline && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
                  className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 max-w-4xl mx-auto"
                  style={{ color: '#78716C' }}
                >
                  {personalInfo.headline}
                </motion.p>
              )}

              {/* Tagline with gradient text */}
              {personalInfo.tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.85 }}
                  className="text-lg sm:text-xl md:text-2xl font-semibold mb-10 max-w-2xl mx-auto"
                  style={{
                    background: 'linear-gradient(135deg, #F43F5E, #8B5CF6, #F97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease infinite',
                  }}
                >
                  {personalInfo.tagline}
                </motion.p>
              )}

              {/* Contact Chips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
              >
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow"
                    style={{ color: '#1C1917' }}
                  >
                    <Mail className="w-4 h-4" style={{ color: '#F43F5E' }} />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow"
                    style={{ color: '#1C1917' }}
                  >
                    <Phone className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                    {personalInfo.phone}
                  </a>
                )}
                {personalInfo.location && (
                  <span
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur shadow-md"
                    style={{ color: '#1C1917' }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: '#F97316' }} />
                    {personalInfo.location}
                  </span>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur shadow-md hover:shadow-lg transition-shadow"
                    style={{ color: '#1C1917' }}
                  >
                    <Globe className="w-4 h-4" style={{ color: '#06B6D4' }} />
                    Website
                  </a>
                )}
              </motion.div>

              {/* Resume Button */}
              {resumeUrl && profile.resumeUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.15 }}
                >
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #F43F5E, #8B5CF6, #F97316)',
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 4s ease infinite',
                    }}
                  >
                    <Download className="w-5 h-5" />
                    Download Resume
                  </a>
                </motion.div>
              )}
            </div>
          </section>

          {/* ═══════════════════ ABOUT ═══════════════════ */}
          {(about.bio || about.professionalSummary || about.careerObjective) && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-5xl mx-auto">
                <SectionTitle accent="#8B5CF6">About</SectionTitle>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative"
                >
                  {/* Decorative quote marks */}
                  <span
                    className="absolute -top-8 -left-4 text-[120px] sm:text-[160px] leading-none font-serif opacity-10 select-none pointer-events-none"
                    style={{ color: '#8B5CF6' }}
                  >
                    &ldquo;
                  </span>

                  <div className="relative pl-0 sm:pl-8">
                    {about.professionalSummary && (
                      <p
                        className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed mb-8 italic"
                        style={{ color: '#1C1917' }}
                      >
                        {about.professionalSummary}
                      </p>
                    )}
                    {about.bio && about.bio !== about.professionalSummary && (
                      <p className="text-lg leading-relaxed" style={{ color: '#78716C' }}>
                        {about.bio}
                      </p>
                    )}
                    {about.careerObjective &&
                      about.careerObjective !== about.professionalSummary &&
                      about.careerObjective !== about.bio && (
                        <p className="text-lg leading-relaxed mt-6" style={{ color: '#78716C' }}>
                          {about.careerObjective}
                        </p>
                      )}
                  </div>

                  {/* Colorful accent line */}
                  <div
                    className="mt-10 h-1 w-32 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #F43F5E, #8B5CF6, #F97316)',
                    }}
                  />
                </motion.div>
              </div>
            </section>
          )}

          {/* ═══════════════════ PROJECTS ═══════════════════ */}
          {projects.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-6xl mx-auto">
                <SectionTitle accent="#F43F5E">Projects</SectionTitle>

                <div className="space-y-24 sm:space-y-32">
                  {projects.map((proj, i) => {
                    const accent = pickAccent(i);
                    const isOdd = i % 2 !== 0;
                    const thumbnailUrl = proj.thumbnail
                      ? proj.thumbnail.startsWith('http')
                        ? proj.thumbnail
                        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${proj.thumbnail}`
                      : '';

                    return (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className={`flex flex-col gap-8 sm:gap-12 items-center ${
                          isOdd ? 'md:flex-row-reverse' : 'md:flex-row'
                        }`}
                      >
                        {/* Thumbnail */}
                        <motion.div
                          whileHover={{ scale: 1.03, y: -6 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="w-full md:w-1/2"
                        >
                          <div
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                            style={{
                              background: thumbnailUrl
                                ? undefined
                                : `linear-gradient(135deg, ${accent}22, ${accent}44)`,
                            }}
                          >
                            {thumbnailUrl ? (
                              <img
                                src={thumbnailUrl}
                                alt={proj.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Code2 className="w-16 h-16 opacity-20" style={{ color: accent }} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </motion.div>

                        {/* Info */}
                        <div className="w-full md:w-1/2 space-y-5">
                          <h3
                            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
                            style={{ color: '#1C1917' }}
                          >
                            {proj.name}
                          </h3>

                          {proj.description && (
                            <p className="text-lg leading-relaxed" style={{ color: '#78716C' }}>
                              {proj.description}
                            </p>
                          )}

                          {proj.technologies && proj.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {proj.technologies.map((tech, ti) => (
                                <span
                                  key={ti}
                                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                                  style={{ background: pickAccent(i + ti) }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-4 pt-2">
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-bold text-sm hover:opacity-70 transition-opacity"
                                style={{ color: accent }}
                              >
                                Live Demo <ArrowUpRight className="w-4 h-4" />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-bold text-sm hover:opacity-70 transition-opacity"
                                style={{ color: '#1C1917' }}
                              >
                                <Github className="w-4 h-4" /> Source
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════ SKILLS ═══════════════════ */}
          {skillCategories.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-6xl mx-auto">
                <SectionTitle accent="#F97316">Skills</SectionTitle>

                <div className="space-y-14">
                  {skillCategories.map((cat, ci) => (
                    <motion.div
                      key={ci}
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      <motion.h3
                        variants={fadeUp}
                        className="text-sm font-bold uppercase tracking-[0.2em] mb-5"
                        style={{ color: cat.color }}
                      >
                        {cat.label}
                      </motion.h3>
                      <div className="flex flex-wrap gap-3">
                        {cat.items.map((skill, si) => (
                          <motion.span
                            key={si}
                            variants={scalePop}
                            custom={si}
                            whileHover={{ scale: 1.1, y: -4 }}
                            className="px-5 py-2.5 rounded-full text-sm font-semibold shadow-md cursor-default transition-shadow hover:shadow-lg"
                            style={{
                              background: `${cat.color}12`,
                              color: cat.color,
                              border: `1.5px solid ${cat.color}30`,
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════ EXPERIENCE ═══════════════════ */}
          {experience.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-5xl mx-auto">
                <SectionTitle accent="#06B6D4">Experience</SectionTitle>

                <div className="relative">
                  {/* Timeline Line */}
                  <div
                    className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5"
                    style={{
                      background: 'linear-gradient(to bottom, #F43F5E, #8B5CF6, #F97316, #06B6D4)',
                    }}
                  />

                  <div className="space-y-12">
                    {experience.map((exp, i) => {
                      const accent = pickAccent(i);
                      return (
                        <motion.div
                          key={i}
                          variants={fadeUp}
                          custom={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                          className="relative pl-16 sm:pl-20"
                        >
                          {/* Timeline Dot */}
                          <div
                            className="absolute left-4 sm:left-6 top-1 w-4 h-4 rounded-full border-4 border-white shadow-md"
                            style={{ background: accent }}
                          />

                          {/* Year Marker */}
                          <div
                            className="text-xs font-bold uppercase tracking-wider mb-2"
                            style={{ color: accent }}
                          >
                            {fmtDate(exp.startDate)}
                            {' — '}
                            {exp.currentRole ? 'Present' : fmtDate(exp.endDate)}
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-black" style={{ color: '#1C1917' }}>
                            {exp.role}
                          </h3>

                          <p className="text-lg font-semibold mt-1" style={{ color: '#78716C' }}>
                            {exp.company}
                            {exp.employmentType && (
                              <span className="text-sm font-normal ml-2">
                                · {exp.employmentType}
                              </span>
                            )}
                          </p>

                          {exp.description && (
                            <p className="mt-3 leading-relaxed" style={{ color: '#78716C' }}>
                              {exp.description}
                            </p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════ EDUCATION ═══════════════════ */}
          {education.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-5xl mx-auto">
                <SectionTitle accent="#8B5CF6">Education</SectionTitle>

                <div className="grid gap-6 sm:gap-8">
                  {education.map((edu, i) => {
                    const accent = pickAccent(i + 2);
                    return (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="relative bg-white/70 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow border border-white/50"
                        style={{
                          borderLeft: `4px solid ${accent}`,
                        }}
                      >
                        {/* Overlapping depth effect */}
                        <div
                          className="absolute -top-2 -right-2 w-full h-full rounded-2xl -z-10 opacity-30"
                          style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}
                        />

                        <div className="flex items-start gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${accent}15` }}
                          >
                            <GraduationCap className="w-6 h-6" style={{ color: accent }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-xl sm:text-2xl font-black"
                              style={{ color: '#1C1917' }}
                            >
                              {edu.institution}
                            </h3>

                            {(edu.degree || edu.branch) && (
                              <p className="text-lg font-semibold mt-1" style={{ color: accent }}>
                                {edu.degree}
                                {edu.branch && ` — ${edu.branch}`}
                              </p>
                            )}

                            {edu.specialization && (
                              <p className="text-sm mt-1" style={{ color: '#78716C' }}>
                                Specialization: {edu.specialization}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              {(edu.startYear || edu.endYear) && (
                                <span
                                  className="flex items-center gap-1.5 text-sm font-medium"
                                  style={{ color: '#78716C' }}
                                >
                                  <Calendar className="w-3.5 h-3.5" />
                                  {edu.startYear}
                                  {edu.endYear && ` – ${edu.endYear}`}
                                </span>
                              )}
                              {edu.cgpa && (
                                <span
                                  className="px-3 py-1 rounded-full text-xs font-bold text-white"
                                  style={{ background: accent }}
                                >
                                  CGPA: {edu.cgpa}
                                </span>
                              )}
                            </div>

                            {edu.description && (
                              <p className="mt-3 text-sm leading-relaxed" style={{ color: '#78716C' }}>
                                {edu.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════ CERTIFICATIONS ═══════════════════ */}
          {certifications.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-5xl mx-auto">
                <SectionTitle accent="#F97316">Certifications</SectionTitle>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid sm:grid-cols-2 gap-5"
                >
                  {certifications.map((cert, i) => {
                    const accent = pickAccent(i + 1);
                    return (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="relative bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                        style={{ border: `2px solid ${accent}30` }}
                      >
                        {/* Colorful top border */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{
                            background: `linear-gradient(90deg, ${accent}, ${pickAccent(i + 3)})`,
                          }}
                        />

                        <div className="flex items-start gap-3">
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ background: `${accent}15` }}
                          >
                            <Award className="w-5 h-5" style={{ color: accent }} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4
                              className="font-bold text-lg"
                              style={{ color: '#1C1917' }}
                            >
                              {cert.name}
                            </h4>
                            {cert.issuer && (
                              <p className="text-sm font-medium mt-0.5" style={{ color: accent }}>
                                {cert.issuer}
                              </p>
                            )}
                            {cert.date && (
                              <p className="text-xs mt-1.5" style={{ color: '#78716C' }}>
                                {fmtDate(cert.date)}
                              </p>
                            )}
                          </div>

                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-shrink-0 p-2 rounded-lg hover:opacity-70 transition-opacity"
                              style={{ color: accent }}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </section>
          )}

          {/* ═══════════════════ ACHIEVEMENTS ═══════════════════ */}
          {achievements.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-5xl mx-auto">
                <SectionTitle accent="#10B981">Achievements</SectionTitle>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {achievements.map((ach, i) => {
                    const accent = pickAccent(i + 4);
                    return (
                      <motion.div
                        key={i}
                        variants={scalePop}
                        custom={i}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="relative bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                      >
                        <div
                          className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4"
                          style={{ background: `${accent}15` }}
                        >
                          <Trophy className="w-7 h-7" style={{ color: accent }} />
                        </div>

                        <h4
                          className="font-black text-lg mb-2"
                          style={{ color: '#1C1917' }}
                        >
                          {ach.title}
                        </h4>

                        {ach.description && (
                          <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>
                            {ach.description}
                          </p>
                        )}

                        {ach.date && (
                          <p className="text-xs mt-3 font-medium" style={{ color: accent }}>
                            {fmtDate(ach.date)}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </section>
          )}

          {/* ═══════════════════ SOCIAL LINKS ═══════════════════ */}
          {socialEntries.length > 0 && (
            <section className="relative px-6 py-24 sm:py-32">
              <div className="max-w-3xl mx-auto text-center">
                <SectionTitle accent="#EC4899">Connect</SectionTitle>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {socialEntries.map(([platform, url], i) => {
                    const IconComponent = socialIconMap[platform] || ExternalLink;
                    const color = socialColorMap[platform] || '#1C1917';

                    return (
                      <motion.a
                        key={platform}
                        variants={scalePop}
                        custom={i}
                        whileHover={{ scale: 1.15, y: -6 }}
                        whileTap={{ scale: 0.95 }}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-shadow text-white"
                        style={{ background: color }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="capitalize">{platform}</span>
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </section>
          )}

          {/* ═══════════════════ FOOTER ═══════════════════ */}
          <footer className="relative px-6 py-16 sm:py-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Decorative gradient line */}
              <div
                className="mx-auto h-1 w-32 sm:w-48 rounded-full mb-10"
                style={{
                  background: 'linear-gradient(90deg, #F43F5E, #8B5CF6, #F97316, #06B6D4)',
                }}
              />

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #F43F5E, #8B5CF6, #F97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {personalInfo.fullName || 'Portfolio'}
                </h2>

                <p className="text-sm font-medium" style={{ color: '#78716C' }}>
                  © {new Date().getFullYear()} — Crafted with passion & pixels
                </p>

                {/* Resume button again in footer */}
                {resumeUrl && profile.resumeUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-bold text-sm text-white shadow-lg hover:shadow-xl transition-shadow"
                    style={{
                      background: 'linear-gradient(135deg, #F43F5E, #8B5CF6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 4s ease infinite',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </motion.a>
                )}
              </motion.div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

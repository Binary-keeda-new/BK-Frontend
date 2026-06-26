'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { UserProfile } from '../../types';
import { motion, useInView } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Download,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Award,
  Trophy,
  BadgeCheck,
  ChevronRight,
  Globe,
  Code2,
  Layers,
  Calendar,
} from 'lucide-react';

/* ───────────────────────── helpers ───────────────────────── */

const buildPhotoUrl = (photo?: string) => {
  if (!photo) return '';
  return photo.startsWith('http')
    ? photo
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${photo}`;
};

const buildResumeUrl = (url?: string) =>
  url ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${url}` : '';

const formatDate = (d?: Date | string) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getInitials = (name?: string) => {
  if (!name) return 'S';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const totalSkillsCount = (skills?: UserProfile['skills']) => {
  if (!skills) return 0;
  return Object.values(skills).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
    0,
  );
};

/* ───────────── animation variants ───────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ──────────── Animated Counter ──────────── */

function AnimatedCounter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

/* ──────── Section wrapper ──────── */

function Section({
  children,
  id,
  className = '',
  gray = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  gray?: boolean;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${gray ? 'bg-[#F9FAFB]' : 'bg-white'} ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{children}</h2>
      {sub && <p className="mt-3 text-gray-500 max-w-xl mx-auto text-base md:text-lg">{sub}</p>}
      <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500" />
    </motion.div>
  );
}

/* ──────── Social Link Map ──────── */

const socialMeta: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  github: { icon: Github, label: 'GitHub', color: 'hover:bg-gray-800 hover:text-white' },
  linkedin: { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
  twitter: { icon: Twitter, label: 'Twitter', color: 'hover:bg-sky-500 hover:text-white' },
  youtube: { icon: Youtube, label: 'YouTube', color: 'hover:bg-red-600 hover:text-white' },
  leetcode: { icon: Code2, label: 'LeetCode', color: 'hover:bg-amber-500 hover:text-white' },
  codeforces: { icon: Code2, label: 'Codeforces', color: 'hover:bg-blue-700 hover:text-white' },
  hackerrank: { icon: Code2, label: 'HackerRank', color: 'hover:bg-green-600 hover:text-white' },
  kaggle: { icon: Layers, label: 'Kaggle', color: 'hover:bg-cyan-600 hover:text-white' },
};

function SocialButtons({ links, size = 'md' }: { links?: UserProfile['socialLinks']; size?: 'sm' | 'md' }) {
  if (!links) return null;
  const entries = Object.entries(links).filter(([, v]) => !!v);
  if (entries.length === 0) return null;
  const s = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  const iconS = size === 'sm' ? 16 : 20;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {entries.map(([key, url]) => {
        const meta = socialMeta[key];
        if (!meta) return null;
        const Icon = meta.icon;
        return (
          <motion.a
            key={key}
            href={url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`${s} rounded-full bg-white/80 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-600 transition-colors duration-200 ${meta.color}`}
            title={meta.label}
          >
            <Icon size={iconS} />
          </motion.a>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function StudentPortfolio({ profile }: { profile: UserProfile }) {
  const {
    personalInfo = {},
    about = {},
    education = [],
    experience = [],
    projects = [],
    skills,
    certifications = [],
    achievements = [],
    socialLinks,
  } = profile;

  const photoUrl = buildPhotoUrl(profile.profilePhoto);
  const resumeUrl = buildResumeUrl(profile.resumeUrl);

  const skillCategories: { key: keyof NonNullable<UserProfile['skills']>; label: string; color: string }[] = [
    { key: 'frontend', label: 'Frontend', color: 'from-blue-500 to-cyan-400' },
    { key: 'backend', label: 'Backend', color: 'from-emerald-500 to-teal-400' },
    { key: 'ai_ml', label: 'AI / ML', color: 'from-violet-500 to-purple-400' },
    { key: 'cloud', label: 'Cloud', color: 'from-sky-500 to-blue-400' },
    { key: 'devops', label: 'DevOps', color: 'from-orange-500 to-amber-400' },
    { key: 'languages', label: 'Languages', color: 'from-pink-500 to-rose-400' },
    { key: 'tools', label: 'Tools', color: 'from-gray-600 to-gray-400' },
  ];

  const statItems = [
    { label: 'Projects', value: projects.length, icon: FolderOpen, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Skills', value: totalSkillsCount(skills), icon: Code2, color: 'text-blue-500 bg-blue-50' },
    { label: 'Certifications', value: certifications.length, icon: BadgeCheck, color: 'text-violet-500 bg-violet-50' },
    { label: 'Experience', value: experience.length, icon: Briefcase, color: 'text-amber-500 bg-amber-50' },
  ];

  /* ────────────────── HERO ────────────────── */

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* ─── HERO BANNER ─── */}
      <header className="relative overflow-hidden">
        {/* gradient banner */}
        <div className="h-56 sm:h-64 md:h-72 bg-gradient-to-br from-emerald-500 via-emerald-400 to-blue-500 relative">
          {/* decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-12 left-1/2 w-96 h-96 -translate-x-1/2 rounded-full bg-white/5" />
        </div>

        {/* profile content overlapping banner */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="-mt-24 sm:-mt-28 flex flex-col items-center text-center"
          >
            {/* profile photo */}
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={personalInfo.fullName || 'Profile'}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[6px] border-white shadow-xl object-cover bg-white"
              />
            ) : (
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full border-[6px] border-white shadow-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                {getInitials(personalInfo.fullName)}
              </div>
            )}

            {/* name */}
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>

            {/* headline */}
            {personalInfo.headline && (
              <p className="mt-2 text-lg sm:text-xl font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {personalInfo.headline}
              </p>
            )}

            {/* tagline */}
            {personalInfo.tagline && (
              <p className="mt-1 text-gray-500 text-sm sm:text-base max-w-lg">{personalInfo.tagline}</p>
            )}

            {/* metadata chips */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center">
              {personalInfo.location && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                  <MapPin size={14} className="text-emerald-500" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <Mail size={14} className="text-blue-500" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                  <Phone size={14} className="text-violet-500" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <Globe size={14} className="text-emerald-500" />
                  Website
                </a>
              )}
            </div>

            {/* social links */}
            <div className="mt-5">
              <SocialButtons links={socialLinks} />
            </div>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              {profile.resumeUrl && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
                >
                  <Download size={18} />
                  Download Resume
                </motion.a>
              )}
              {personalInfo.email && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold hover:border-emerald-400 hover:text-emerald-700 transition-colors bg-white"
                >
                  <Mail size={18} />
                  Contact Me
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>

        <div className="h-16" />
      </header>

      {/* ─── STAT COUNTERS ─── */}
      {(projects.length > 0 || totalSkillsCount(skills) > 0 || certifications.length > 0 || experience.length > 0) && (
        <Section gray>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {statItems
              .filter((s) => s.value > 0)
              .map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
                      <Icon size={22} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
          </motion.div>
        </Section>
      )}

      {/* ─── ABOUT ─── */}
      {(about.bio || about.professionalSummary || about.careerObjective) && (
        <Section>
          <SectionTitle sub="Get to know me a little better">About Me</SectionTitle>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {about.bio && (
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">{about.bio}</p>
            )}
            {about.professionalSummary && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Professional Summary</h3>
                <p className="text-gray-600 leading-relaxed">{about.professionalSummary}</p>
              </div>
            )}
            {about.careerObjective && (
              <div className="bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-100 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Career Objective</h3>
                <p className="text-gray-600 leading-relaxed">{about.careerObjective}</p>
              </div>
            )}
          </motion.div>
        </Section>
      )}

      {/* ─── EDUCATION (PROMINENT – first section) ─── */}
      {education.length > 0 && (
        <Section gray>
          <SectionTitle sub="My academic journey and qualifications">Education</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {education.map((edu, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                {/* decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 leading-snug">
                      {edu.institution || 'Institution'}
                    </h3>
                    <p className="text-emerald-600 font-semibold mt-1">
                      {[edu.degree, edu.branch].filter(Boolean).join(' – ')}
                    </p>
                    {edu.specialization && (
                      <p className="text-gray-500 text-sm mt-0.5">Specialization: {edu.specialization}</p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {(edu.startYear || edu.endYear) && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                          <Calendar size={12} />
                          {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
                        </span>
                      )}
                      {edu.cgpa && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                    </div>

                    {edu.description && (
                      <p className="mt-3 text-gray-500 text-sm leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* ─── SKILLS ─── */}
      {skills && totalSkillsCount(skills) > 0 && (
        <Section>
          <SectionTitle sub="Technologies and tools I work with">Skills</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skillCategories.map((cat) => {
              const items = skills[cat.key];
              if (!items || items.length === 0) return null;
              return (
                <motion.div
                  key={cat.key}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{cat.label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.04, duration: 0.3 }}
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Section>
      )}

      {/* ─── EXPERIENCE ─── */}
      {experience.length > 0 && (
        <Section gray>
          <SectionTitle sub="Where I've worked and what I've done">Experience</SectionTitle>
          <div className="max-w-3xl mx-auto relative">
            {/* timeline line */}
            <div className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-300 via-blue-300 to-violet-300" />

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative pl-12 md:pl-14"
                >
                  {/* dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    className="absolute left-2.5 md:left-3.5 top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 border-[3px] border-white shadow"
                  />

                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{exp.role || 'Role'}</h3>
                        <p className="text-emerald-600 font-semibold">{exp.company}</p>
                      </div>
                      {exp.employmentType && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                          {exp.employmentType}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar size={12} />
                      {formatDate(exp.startDate)}
                      {' – '}
                      {exp.currentRole ? (
                        <span className="text-emerald-600 font-semibold">Present</span>
                      ) : (
                        formatDate(exp.endDate)
                      )}
                    </div>

                    {exp.description && (
                      <p className="mt-3 text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* ─── PROJECTS ─── */}
      {projects.length > 0 && (
        <Section>
          <SectionTitle sub="Things I've built and worked on">Projects</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow group"
              >
                {/* colored top bar */}
                <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400" />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-50 to-blue-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <FolderOpen size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-emerald-600 transition-colors">
                      {proj.name}
                    </h3>
                  </div>

                  {proj.description && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{proj.description}</p>
                  )}

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <ExternalLink size={16} /> Live
                      </a>
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
        <Section gray>
          <SectionTitle sub="Verified credentials and courses">Certifications</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center flex-shrink-0">
                    <BadgeCheck size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 leading-snug">{cert.name}</h3>
                    {cert.issuer && (
                      <p className="text-sm text-gray-500 mt-0.5">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <p className="text-xs text-gray-400 mt-1">{formatDate(cert.date)}</p>
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        View Certificate <ChevronRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* ─── ACHIEVEMENTS ─── */}
      {achievements.length > 0 && (
        <Section>
          <SectionTitle sub="Recognition and accomplishments">Achievements</SectionTitle>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl mx-auto space-y-5"
          >
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                  <Trophy size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900">{ach.title}</h3>
                  {ach.description && (
                    <p className="mt-1 text-gray-500 text-sm leading-relaxed">{ach.description}</p>
                  )}
                  {ach.date && (
                    <p className="mt-2 text-xs text-gray-400">{formatDate(ach.date)}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

      {/* ─── RESUME CTA ─── */}
      {profile.resumeUrl && (
        <Section gray>
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <div className="inline-block bg-white rounded-3xl shadow-lg border border-gray-100 px-8 sm:px-14 py-10 sm:py-12">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 text-white flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
                <Download size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Interested in my profile?</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Download my resume to learn more about my skills, experience, and qualifications.
              </p>
              <motion.a
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow text-lg"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </Section>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-2">
              {personalInfo.fullName || 'Portfolio'}
            </h4>
            {personalInfo.headline && (
              <p className="text-gray-400 text-sm mb-6">{personalInfo.headline}</p>
            )}

            {/* footer social links */}
            <div className="mb-6">
              <SocialButtons links={socialLinks} size="sm" />
            </div>

            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
              >
                {personalInfo.email}
              </a>
            )}

            <div className="mt-6 pt-6 border-t border-gray-800 text-gray-500 text-xs">
              © {new Date().getFullYear()} {personalInfo.fullName || 'Portfolio'}. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

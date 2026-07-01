'use client';

import { motion, type Variants } from 'framer-motion';
import {
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Mail,
  MapPin,
  Download,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  ChevronRight,
  Globe,
  Youtube,
  CheckCircle2,
  Trophy,
  Calendar,
  Phone,
} from 'lucide-react';
import { UserProfile } from '../../types';

/* ─────────────────────────  HELPERS  ───────────────────────── */

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

const formatDate = (d?: Date | string) => {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/* skill category display names */
const SKILL_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  ai_ml: 'AI / ML',
  cloud: 'Cloud',
  devops: 'DevOps',
  languages: 'Languages',
  tools: 'Tools',
};

/* ─────────────────────────  ANIMATION VARIANTS  ───────────────────────── */

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const cardStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ─────────────────────────  NAV LINKS  ───────────────────────── */

interface NavLink { label: string; href: string }

function getNavLinks(profile: UserProfile): NavLink[] {
  const links: NavLink[] = [];
  if (profile.about?.bio || profile.about?.professionalSummary) links.push({ label: 'About', href: '#about' });
  if (profile.skills && Object.values(profile.skills).some((v) => v && v.length > 0)) links.push({ label: 'Skills', href: '#skills' });
  if (profile.projects && profile.projects.length > 0) links.push({ label: 'Projects', href: '#projects' });
  if (profile.experience && profile.experience.length > 0) links.push({ label: 'Experience', href: '#experience' });
  if (profile.education && profile.education.length > 0) links.push({ label: 'Education', href: '#education' });
  if (profile.certifications && profile.certifications.length > 0) links.push({ label: 'Certifications', href: '#certifications' });
  if (profile.achievements && profile.achievements.length > 0) links.push({ label: 'Achievements', href: '#achievements' });
  return links;
}

/* ─────────────────────────  SOCIAL ICON MAP  ───────────────────────── */

function SocialIcon({ type, url }: { type: string; url: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    github: <Github className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    youtube: <Youtube className="w-5 h-5" />,
    leetcode: <Code2 className="w-5 h-5" />,
    codeforces: <Code2 className="w-5 h-5" />,
    hackerrank: <Code2 className="w-5 h-5" />,
    kaggle: <Globe className="w-5 h-5" />,
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/[0.08] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300"
    >
      {iconMap[type] || <Globe className="w-5 h-5" />}
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function ModernDeveloper({ profile }: { profile: UserProfile }) {
  const {
    personalInfo = {},
    about = {},
    skills = {},
    projects = [],
    experience = [],
    education = [],
    certifications = [],
    achievements = [],
    socialLinks = {},
  } = profile;

  const navLinks = getNavLinks(profile);
  const photoUrl = buildPhotoUrl(profile.profilePhoto);
  const resumeUrl = buildResumeUrl(profile.resumeUrl);

  const hasSocials = Object.entries(socialLinks).some(([, v]) => !!v);
  const hasSkills = Object.values(skills).some((v) => v && v.length > 0);

  /* ───────── CSS keyframes injected via style tag ───────── */
  const gradientKeyframes = `
    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes float-orb {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -20px) scale(1.05); }
      66% { transform: translate(-20px, 15px) scale(0.95); }
    }
    @keyframes float-orb-2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-25px, 20px) scale(1.08); }
      66% { transform: translate(20px, -15px) scale(0.92); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `;

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-200 font-sans selection:bg-violet-500/30 selection:text-white antialiased">
      <style>{gradientKeyframes}</style>

      {/* ──── Background gradient glow spots ──── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            animation: 'float-orb 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #D946EF 0%, transparent 70%)',
            animation: 'float-orb-2 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
            animation: 'float-orb 18s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* ════════════════  FLOATING NAV  ════════════════ */}
      {navLinks.length > 0 && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-sm text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}

      <div className="relative z-10">
        {/* ════════════════  HERO SECTION  ════════════════ */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          {/* Hero floating orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.12]"
            style={{
              background: 'radial-gradient(circle, #8B5CF6 0%, #D946EF 40%, transparent 70%)',
              animation: 'float-orb 15s ease-in-out infinite',
              filter: 'blur(60px)',
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative text-center max-w-4xl mx-auto"
          >
            {/* Profile photo */}
            {photoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="relative">
                  <div
                    className="absolute -inset-1 rounded-full opacity-70"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #D946EF, #8B5CF6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 4s ease infinite',
                      filter: 'blur(8px)',
                    }}
                  />
                  <img
                    src={photoUrl}
                    alt={personalInfo.fullName || 'Profile'}
                    className="relative w-28 h-28 rounded-full object-cover border-2 border-[#09090B]"
                  />
                </div>
              </motion.div>
            )}

            {/* Name – animated gradient text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-4"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FAFAFA 0%, #A78BFA 30%, #D946EF 60%, #FAFAFA 100%)',
                  backgroundSize: '300% 300%',
                  animation: 'gradient-shift 6s ease infinite',
                  WebkitBackgroundClip: 'text',
                }}
              >
                {personalInfo.fullName || 'Your Name'}
              </span>
            </motion.h1>

            {/* Headline */}
            {personalInfo.headline && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-2"
              >
                {personalInfo.headline}
              </motion.p>
            )}

            {/* Tagline */}
            {personalInfo.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base text-zinc-500 font-light max-w-xl mx-auto mb-6"
              >
                {personalInfo.tagline}
              </motion.p>
            )}

            {/* Metadata: location + email */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500 mb-8"
            >
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </a>
              )}
            </motion.div>

            {/* Social links */}
            {hasSocials && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-3 mb-8"
              >
                {Object.entries(socialLinks).map(
                  ([key, val]) => val && <SocialIcon key={key} type={key} url={val} />,
                )}
              </motion.div>
            )}

            {/* Resume CTA */}
            {profile.resumeUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #A855F7, #D946EF)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 4s ease infinite',
                    }}
                  />
                  <span className="absolute inset-[1px] rounded-full bg-[#09090B] group-hover:bg-transparent transition-colors duration-300" />
                  <span className="relative flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </span>
                </a>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* ════════════════  ABOUT  ════════════════ */}
        {(about.bio || about.professionalSummary || about.careerObjective) && (
          <motion.section
            id="about"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">About</h2>
            </div>

            <div className="pl-5 border-l border-white/[0.06]">
              {about.professionalSummary && (
                <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light mb-6">
                  {about.professionalSummary}
                </p>
              )}
              {about.bio && about.bio !== about.professionalSummary && (
                <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-light mb-6">
                  {about.bio}
                </p>
              )}
              {about.careerObjective && (
                <p className="text-base text-zinc-500 leading-relaxed font-light italic">
                  {about.careerObjective}
                </p>
              )}
            </div>
          </motion.section>
        )}

        {/* ════════════════  SKILLS  ════════════════ */}
        {hasSkills && (
          <motion.section
            id="skills"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Skills</h2>
            </div>

            <div className="space-y-10">
              {Object.entries(skills).map(
                ([category, items]) =>
                  items &&
                  items.length > 0 && (
                    <div key={category}>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-4">
                        {SKILL_LABELS[category] || category}
                      </h3>
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-wrap gap-2.5"
                      >
                        {items.map((skill: string) => (
                          <motion.span
                            key={skill}
                            variants={chipVariant}
                            whileHover={{ scale: 1.06, transition: { duration: 0.2 } }}
                            className="px-3.5 py-1.5 text-sm rounded-lg bg-white/[0.04] border border-white/[0.07] text-zinc-300 hover:border-violet-500/30 hover:bg-violet-500/[0.06] hover:text-white cursor-default transition-colors duration-200"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  ),
              )}
            </div>
          </motion.section>
        )}

        {/* ════════════════  PROJECTS  ════════════════ */}
        {projects.length > 0 && (
          <motion.section
            id="projects"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-5xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Projects</h2>
            </div>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {projects.map((proj, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group relative rounded-2xl p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] hover:border-violet-500/20 hover:bg-white/[0.05] hover:shadow-[0_8px_40px_rgba(139,92,246,0.08)] transition-all duration-300"
                >
                  {/* Title + links */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {proj.name}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-500 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {proj.description && (
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                      {proj.description}
                    </p>
                  )}

                  {/* Tech tags */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {proj.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-md bg-white/[0.05] border border-white/[0.06] text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* ════════════════  EXPERIENCE  ════════════════ */}
        {experience.length > 0 && (
          <motion.section
            id="experience"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Experience</h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-white/[0.06] to-transparent" />

              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative pl-8"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-violet-500/60 bg-[#09090B]"
                    >
                      <div className="absolute inset-[3px] rounded-full bg-violet-500/80" />
                    </motion.div>

                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
                        <span className="text-sm text-violet-400/80 font-medium">{exp.company}</span>
                        {exp.employmentType && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500">
                            {exp.employmentType}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 mb-3 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(exp.startDate)}
                        {' — '}
                        {exp.currentRole ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-zinc-500 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* ════════════════  EDUCATION  ════════════════ */}
        {education.length > 0 && (
          <motion.section
            id="education"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Education</h2>
            </div>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-5"
            >
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  whileHover={{ y: -2, transition: { duration: 0.3 } }}
                  className="group rounded-2xl p-6 bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <GraduationCap className="w-5 h-5 text-violet-400/70" />
                        <h3 className="text-lg font-semibold text-zinc-100">{edu.institution}</h3>
                      </div>
                      <p className="text-sm text-zinc-400 ml-[30px]">
                        {[edu.degree, edu.branch, edu.specialization].filter(Boolean).join(' · ')}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-zinc-500 mt-2 ml-[30px]">{edu.description}</p>
                      )}
                    </div>
                    <div className="sm:text-right ml-[30px] sm:ml-0 shrink-0">
                      {(edu.startYear || edu.endYear) && (
                        <p className="text-xs text-zinc-600 flex items-center sm:justify-end gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {edu.startYear}{edu.startYear && edu.endYear ? ' — ' : ''}{edu.endYear}
                        </p>
                      )}
                      {edu.cgpa && (
                        <p className="text-xs text-zinc-500 mt-1">
                          CGPA: <span className="text-violet-400/70 font-medium">{edu.cgpa}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* ════════════════  CERTIFICATIONS  ════════════════ */}
        {certifications.length > 0 && (
          <motion.section
            id="certifications"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Certifications</h2>
            </div>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-3"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-3 rounded-xl p-4 bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-violet-400/70 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        {cert.url ? (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-zinc-200 hover:text-white transition-colors inline-flex items-center gap-1.5"
                          >
                            {cert.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <span className="text-sm font-medium text-zinc-200">{cert.name}</span>
                        )}
                        {cert.issuer && (
                          <span className="text-xs text-zinc-500 ml-2">by {cert.issuer}</span>
                        )}
                      </div>
                      {cert.date && (
                        <span className="text-xs text-zinc-600 shrink-0">{formatDate(cert.date)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* ════════════════  ACHIEVEMENTS  ════════════════ */}
        {achievements.length > 0 && (
          <motion.section
            id="achievements"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Achievements</h2>
            </div>

            <motion.div
              variants={cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-3"
            >
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  variants={cardVariant}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-3 rounded-xl p-4 bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Trophy className="w-5 h-5 text-amber-400/70 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                      <div>
                        <span className="text-sm font-medium text-zinc-200">{ach.title}</span>
                        {ach.description && (
                          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{ach.description}</p>
                        )}
                      </div>
                      {ach.date && (
                        <span className="text-xs text-zinc-600 shrink-0">{formatDate(ach.date)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* ════════════════  RESUME CTA (mid-page)  ════════════════ */}
        {profile.resumeUrl && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-6 py-24 text-center"
          >
            <p className="text-zinc-500 text-sm mb-6">Interested in working together?</p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.35)]"
            >
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #A855F7, #D946EF)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              />
              <span className="relative flex items-center gap-2.5">
                <Download className="w-5 h-5" />
                Download Resume
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.section>
        )}

        {/* ════════════════  FOOTER  ════════════════ */}
        <footer className="max-w-4xl mx-auto px-6 py-16 border-t border-white/[0.05]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} {personalInfo.fullName || 'Portfolio'}. All rights reserved.
            </p>

            {hasSocials && (
              <div className="flex items-center gap-3">
                {Object.entries(socialLinks).map(
                  ([key, val]) =>
                    val && (
                      <a
                        key={key}
                        href={val}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-600 hover:text-zinc-300 transition-colors"
                      >
                        {key === 'github' && <Github className="w-4 h-4" />}
                        {key === 'linkedin' && <Linkedin className="w-4 h-4" />}
                        {key === 'twitter' && <Twitter className="w-4 h-4" />}
                        {key === 'youtube' && <Youtube className="w-4 h-4" />}
                        {!['github', 'linkedin', 'twitter', 'youtube'].includes(key) && (
                          <Globe className="w-4 h-4" />
                        )}
                      </a>
                    ),
                )}
              </div>
            )}
          </motion.div>
        </footer>
      </div>
    </div>
  );
}

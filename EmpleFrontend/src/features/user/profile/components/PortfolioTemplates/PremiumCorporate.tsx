import React from 'react';
import { UserProfile } from '../../types';
import { Github, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Code, ExternalLink } from 'lucide-react';

export default function PremiumCorporate({ profile }: { profile: Partial<UserProfile> }) {
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getImageUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans selection:bg-slate-900 selection:text-white">
      {/* Navigation / Header Area */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight text-slate-900">
            {profile.personalInfo?.fullName || 'Professional'}
          </div>
          <div className="flex gap-4 items-center">
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {profile.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {profile.personalInfo?.email && (
              <a href={`mailto:${profile.personalInfo.email}`} className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">
                Contact Me
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-24 space-y-24">
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 leading-tight">
              Driving innovation through <span className="font-semibold">{profile.personalInfo?.headline || 'Excellence'}</span>.
            </h1>
            {profile.personalInfo?.location && (
              <p className="text-lg text-slate-500 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-5 h-5" /> {profile.personalInfo.location}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            {profile.profilePhoto ? (
              <img 
                src={getImageUrl(profile.profilePhoto)} 
                alt={profile.personalInfo?.fullName || 'Profile'} 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl shadow-slate-200"
                loading="lazy"
              />
            ) : (
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center bg-slate-100 text-6xl text-slate-400 font-light shadow-2xl shadow-slate-200">
                {getInitials(profile.personalInfo?.fullName)}
              </div>
            )}
          </div>
        </section>

        {/* Executive Summary (Bio) */}
        {profile.about?.bio && (
          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-8">Executive Summary</h2>
            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed whitespace-pre-wrap">
              "{profile.about.bio}"
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {profile.experience && profile.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <Briefcase className="w-6 h-6 text-slate-900" />
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Professional Experience</h2>
            </div>
            <div className="space-y-12">
              {profile.experience.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
                  <div className="md:w-1/4 pt-1">
                    <p className="text-sm font-medium text-slate-500">
                      {new Date(exp.startDate!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — 
                      {exp.currentRole ? ' Present' : ` ${new Date(exp.endDate!).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    </p>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                    <h4 className="text-lg text-slate-600 mb-4 font-medium">{exp.company}</h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies (Skills) */}
        {profile.skills && Object.values(profile.skills).some(arr => arr?.length > 0) && (
          <section className="bg-slate-50 rounded-3xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-4">Core Competencies</h2>
              <p className="text-slate-500">A comprehensive overview of technical and professional proficiencies.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {Object.entries(profile.skills).map(([category, skills]) => {
                if (!skills || skills.length === 0) return null;
                return (
                  <div key={category}>
                    <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-6 border-b border-slate-200 pb-2">
                      {category.replace('_', ' ')}
                    </h3>
                    <ul className="space-y-3">
                      {skills.map((skill: string, i: number) => (
                        <li key={i} className="text-slate-700 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Selected Projects */}
        {profile.projects && profile.projects.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <Code className="w-6 h-6 text-slate-900" />
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Selected Initiatives</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {profile.projects.map((project, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-slate-100 transition-shadow bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
                    <div className="flex gap-3 text-slate-400">
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors"><Github className="w-5 h-5"/></a>}
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors"><ExternalLink className="w-5 h-5"/></a>}
                    </div>
                  </div>
                  <p className="text-slate-600 mb-8 leading-relaxed line-clamp-4">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-12">
              <GraduationCap className="w-6 h-6 text-slate-900" />
              <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">Academic Background</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.education.map((edu, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{edu.institution}</h3>
                    <p className="text-slate-600 font-medium mb-1">{edu.degree} in {edu.branch}</p>
                    <p className="text-slate-400 text-sm">{edu.startYear} — {edu.endYear}</p>
                  </div>
                  {edu.cgpa && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <p className="text-sm font-medium text-slate-900">Score / CGPA: {edu.cgpa}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm mt-24">
        <p>&copy; {new Date().getFullYear()} {profile.personalInfo?.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
}

import React from 'react';
import { UserProfile } from '../../types';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function CyberDeveloper({ profile }: { profile: Partial<UserProfile> }) {
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getImageUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-cyan-50 font-mono relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        backgroundPosition: 'center center'
      }}></div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Header Section */}
        <header className="border-l-4 border-cyan-500 pl-6 mb-16 relative">
          <div className="absolute -left-[5px] top-0 w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
          <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative group">
              {profile.profilePhoto ? (
                <img 
                  src={getImageUrl(profile.profilePhoto)} 
                  alt={profile.personalInfo?.fullName || 'Profile'} 
                  className="w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-cyan-500/50 grayscale hover:grayscale-0 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  loading="lazy"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-cyan-950 border-2 border-cyan-500/50 text-4xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  {getInitials(profile.personalInfo?.fullName)}
                </div>
              )}
              <div className="absolute inset-0 border border-cyan-400 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none"></div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                {profile.personalInfo?.fullName || 'SYS.ADMIN'}
              </h1>
              <h2 className="text-xl md:text-2xl text-cyan-300/80">
                &gt; {profile.personalInfo?.headline || 'INITIALIZING_'}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-sm text-cyan-600/80 justify-center md:justify-start pt-2">
                {profile.personalInfo?.email && (
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4"/> {profile.personalInfo.email}</span>
                )}
                {profile.personalInfo?.location && (
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {profile.personalInfo.location}</span>
                )}
                {profile.socialLinks?.github && (
                  <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors"><Github className="w-4 h-4"/> GitHub</a>
                )}
                {profile.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors"><Linkedin className="w-4 h-4"/> LinkedIn</a>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* About Section */}
        {profile.about?.bio && (
          <section className="mb-16">
            <h3 className="text-sm text-cyan-500/60 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/60"></span>
              SYS.ABOUT
            </h3>
            <div className="p-6 bg-cyan-950/20 border border-cyan-900/50 backdrop-blur-sm relative">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>
              <p className="text-cyan-100/80 leading-relaxed whitespace-pre-wrap">
                {profile.about.bio}
              </p>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {profile.skills && Object.values(profile.skills).some(arr => arr?.length > 0) && (
          <section className="mb-16">
            <h3 className="text-sm text-cyan-500/60 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/60"></span>
              SYS.MODULES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(profile.skills).map(([category, skills]) => {
                if (!skills || skills.length === 0) return null;
                return (
                  <div key={category} className="border border-cyan-900/50 bg-[#050b14] p-4 relative group hover:border-cyan-500/50 transition-colors">
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h4 className="text-xs uppercase text-cyan-400 mb-3 tracking-widest">{category.replace('_', ' ')}</h4>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {skills.map((skill: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 bg-cyan-950/50 text-cyan-200 border border-cyan-800/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {profile.experience && profile.experience.length > 0 && (
          <section className="mb-16">
            <h3 className="text-sm text-cyan-500/60 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/60"></span>
              SYS.EXPERIENCE
            </h3>
            <div className="space-y-8 pl-4 border-l border-cyan-900/50">
              {profile.experience.map((exp, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-cyan-900 group-hover:bg-cyan-400 transition-colors"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-lg font-bold text-cyan-200">{exp.role}</h4>
                    <span className="text-xs text-cyan-500/60 font-mono tracking-widest">
                      {new Date(exp.startDate!).getFullYear()} - {exp.currentRole ? 'PRESENT' : new Date(exp.endDate!).getFullYear()}
                    </span>
                  </div>
                  <h5 className="text-sm text-blue-400 mb-3">{exp.company}</h5>
                  <p className="text-sm text-cyan-100/60 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {profile.projects && profile.projects.length > 0 && (
          <section className="mb-16">
            <h3 className="text-sm text-cyan-500/60 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/60"></span>
              SYS.PROJECTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map((project, i) => (
                <div key={i} className="group border border-cyan-900/50 bg-[#050b14] p-6 hover:border-cyan-400 transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h4 className="text-lg font-bold text-cyan-100">{project.name}</h4>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-400 transition-colors"><Github className="w-5 h-5"/></a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-cyan-600 hover:text-cyan-400 transition-colors"><ExternalLink className="w-5 h-5"/></a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-cyan-100/60 mb-4 relative z-10 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-blue-900/30 text-blue-300">
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

        {/* Education Section */}
        {profile.education && profile.education.length > 0 && (
          <section className="mb-16">
            <h3 className="text-sm text-cyan-500/60 uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-cyan-500/60"></span>
              SYS.EDUCATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.education.map((edu, i) => (
                <div key={i} className="border border-cyan-900/50 p-5 bg-cyan-950/10">
                  <h4 className="text-cyan-200 font-bold mb-1">{edu.degree} in {edu.branch}</h4>
                  <h5 className="text-sm text-blue-400 mb-3">{edu.institution}</h5>
                  <div className="flex justify-between items-center text-xs text-cyan-500/60 font-mono tracking-wider">
                    <span>{edu.startYear} - {edu.endYear}</span>
                    {edu.cgpa && <span>SCORE: {edu.cgpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

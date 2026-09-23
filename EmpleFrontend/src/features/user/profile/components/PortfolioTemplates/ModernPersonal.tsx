import React from 'react';
import { UserProfile } from '../../types';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Calendar, Code2, Sparkles, GraduationCap } from 'lucide-react';

export default function ModernPersonal({ profile }: { profile: Partial<UserProfile> }) {
  const getInitials = (name?: string) => {
    if (!name) return 'ME';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getImageUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* Vibrant Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-fuchsia-400/20 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-16 md:pt-24 space-y-20">
        
        {/* Hero Area Glass Card */}
        <section className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              {profile.profilePhoto ? (
                <img 
                  src={getImageUrl(profile.profilePhoto)} 
                  alt={profile.personalInfo?.fullName || 'Profile'} 
                  className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white z-10"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full bg-white border-4 border-white flex items-center justify-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-fuchsia-500 z-10">
                  {getInitials(profile.personalInfo?.fullName)}
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-sm font-semibold text-indigo-600 shadow-sm">
                <Sparkles className="w-4 h-4" /> Hello, I am
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                {profile.personalInfo?.fullName || 'A Creative Dev'}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-slate-600">
                {profile.personalInfo?.headline || 'Building cool things for the web.'}
              </h2>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                {profile.socialLinks?.github && (
                  <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 hover:text-indigo-600 hover:scale-110 transition-all shadow-sm">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.socialLinks?.linkedin && (
                  <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-slate-700 hover:text-indigo-600 hover:scale-110 transition-all shadow-sm">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.personalInfo?.email && (
                  <a href={`mailto:${profile.personalInfo.email}`} className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-indigo-600 hover:scale-105 transition-all shadow-md flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Say Hi!
                  </a>
                )}
                {profile.personalInfo?.location && (
                  <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/60 text-slate-600 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-fuchsia-500" /> {profile.personalInfo.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bio / About Section */}
        {profile.about?.bio && (
          <section className="text-center max-w-3xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">About Me</h3>
            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
              {profile.about.bio}
            </p>
          </section>
        )}

        {/* Grid Layout for Skills & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Skills Glass Panel */}
          {profile.skills && Object.values(profile.skills).some(arr => arr?.length > 0) && (
            <section className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-xl shadow-indigo-100/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Code2 className="w-6 h-6 text-indigo-500" /> My Toolkit
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {Object.entries(profile.skills).map(([category, skills]) => {
                  if (!skills || skills.length === 0) return null;
                  return (
                    <div key={category}>
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                        {category.replace('_', ' ')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-white text-slate-700 rounded-lg text-sm font-medium shadow-sm border border-slate-100 hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
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

          {/* Education Glass Panel */}
          {profile.education && profile.education.length > 0 && (
            <section className="lg:col-span-1 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-[2rem] p-8 text-white shadow-xl shadow-fuchsia-200/50">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-fuchsia-200" /> Education
              </h3>
              <div className="space-y-8">
                {profile.education.map((edu, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-white/20">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white"></div>
                    <h4 className="font-bold text-lg leading-tight mb-1">{edu.degree}</h4>
                    <p className="text-indigo-100 font-medium text-sm mb-2">{edu.branch}</p>
                    <p className="text-white/80 font-semibold mb-2">{edu.institution}</p>
                    <div className="flex justify-between items-center text-xs font-medium text-white/60 bg-white/10 rounded-lg px-3 py-2">
                      <span>{edu.startYear} - {edu.endYear}</span>
                      {edu.cgpa && <span>GPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Experience Section */}
        {profile.experience && profile.experience.length > 0 && (
          <section className="bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50">
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">Work Experience</h3>
            <div className="space-y-12">
              {profile.experience.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                  <div className="md:w-1/3 md:text-right">
                    <h4 className="text-xl font-bold text-slate-900">{exp.company}</h4>
                    <p className="text-indigo-600 font-medium flex items-center md:justify-end gap-2 mt-1">
                      <Calendar className="w-4 h-4" /> 
                      {new Date(exp.startDate!).getFullYear()} — {exp.currentRole ? 'Present' : new Date(exp.endDate!).getFullYear()}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors border-4 border-white shadow-sm z-10"></div>
                    {i !== profile.experience!.length - 1 && <div className="flex-1 w-0.5 bg-slate-200 my-2"></div>}
                  </div>
                  <div className="md:w-1/2 pb-8 md:pb-0">
                    <h4 className="text-xl font-bold text-slate-800 mb-3">{exp.role}</h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {profile.projects && profile.projects.length > 0 && (
          <section>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.projects.map((project, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"><Github className="w-4 h-4"/></a>}
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-colors"><ExternalLink className="w-4 h-4"/></a>}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{project.name}</h4>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-4">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
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

      </div>
    </div>
  );
}

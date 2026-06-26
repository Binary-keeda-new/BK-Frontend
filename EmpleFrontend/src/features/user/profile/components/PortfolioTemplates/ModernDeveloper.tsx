import React from 'react';
import { UserProfile } from '../../types';
import { Github, Linkedin, Twitter, ExternalLink, Mail, MapPin } from 'lucide-react';

export function ModernDeveloper({ profile }: { profile: UserProfile }) {
  const { personalInfo = {}, about = {}, skills = {}, projects = [], experience = [] } = profile;
  
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Hero */}
        <header className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16 border-b border-gray-800">
          {profile.profilePhoto && <img src={profile.profilePhoto.startsWith('http') ? profile.profilePhoto : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}`} className="w-24 h-24 rounded-full border border-gray-800 object-cover" alt="Profile" />}
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 tracking-tight">
            {personalInfo.fullName || 'Developer Name'}
          </h1>
          <p className="text-xl text-gray-400 font-light">{personalInfo.headline}</p>
          <div className="flex gap-4 pt-4">
            {profile.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github /></a>}
            {profile.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>}
            {profile.socialLinks?.twitter && <a href={profile.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>}
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-white transition-colors"><Mail /></a>}
          </div>
        </header>

        {/* About */}
        {about.bio && (
          <section className="py-16 border-b border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">About</h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">{about.bio}</p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="py-16 border-b border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Selected Work</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {projects.map((proj, i) => (
                <div key={i} className="group rounded-2xl bg-gray-900/50 border border-gray-800 p-6 hover:bg-gray-800/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-100">{proj.name}</h3>
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white"><ExternalLink className="w-5 h-5" /></a>}
                  </div>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies?.map(tech => <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{tech}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="py-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">Experience</h2>
            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12">
                  <div className="md:w-1/4 text-sm text-gray-500 shrink-0">
                    {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} — {exp.currentRole ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-100">{exp.role}</h3>
                    <p className="text-gray-400 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
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

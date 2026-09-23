import React from 'react';
import { UserProfile } from '../../types';
import { Terminal, Github, Linkedin, Mail, Globe, MapPin } from 'lucide-react';

export default function HackerTerminal({ profile }: { profile: Partial<UserProfile> }) {
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getImageUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
  };

  const Prompt = ({ path = '~' }) => (
    <span className="text-green-500 mr-2 font-bold">visitor@{profile.username || 'guest'}:{path}$</span>
  );

  return (
    <div className="min-h-screen bg-black text-[#33ff00] font-mono p-4 md:p-8 overflow-x-hidden selection:bg-[#33ff00] selection:text-black">
      <div className="max-w-4xl mx-auto border border-[#33ff00]/30 rounded-md p-1 bg-[#050505] shadow-[0_0_15px_rgba(51,255,0,0.1)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#33ff00]/30 pb-2 mb-4 px-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-xs text-[#33ff00]/50 flex items-center gap-2">
            <Terminal className="w-3 h-3" /> bash - 80x24
          </div>
        </div>

        <div className="p-4 space-y-6">
          
          {/* Boot Sequence */}
          <div className="space-y-1 opacity-80">
            <p>Loading kernel...</p>
            <p>Mounting filesystems...</p>
            <p>Starting profile daemon... [OK]</p>
            <p className="mt-4">Welcome to {profile.personalInfo?.fullName}'s secure terminal.</p>
            <p>Type 'help' for a list of available commands.</p>
          </div>

          {/* Profile Identity */}
          <div className="mt-8">
            <p><Prompt path="~" /> <span className="text-white">whoami</span></p>
            
            <div className="mt-4 flex flex-col md:flex-row gap-6 border border-[#33ff00]/20 p-4 bg-[#0a0a0a]">
              {profile.profilePhoto ? (
                <img 
                  src={getImageUrl(profile.profilePhoto)} 
                  alt="Profile" 
                  className="w-24 h-24 object-cover border border-[#33ff00]"
                  loading="lazy"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center border border-[#33ff00] text-2xl font-bold">
                  {getInitials(profile.personalInfo?.fullName)}
                </div>
              )}
              
              <div className="flex-1 space-y-2">
                <p><span className="text-[#33ff00]/60">NAME:</span> {profile.personalInfo?.fullName}</p>
                <p><span className="text-[#33ff00]/60">ROLE:</span> {profile.personalInfo?.headline}</p>
                {profile.personalInfo?.location && <p><span className="text-[#33ff00]/60">LOC:</span> {profile.personalInfo.location}</p>}
                
                <div className="flex gap-4 mt-4 pt-2 border-t border-[#33ff00]/20">
                  {profile.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">[GITHUB]</a>}
                  {profile.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">[LINKEDIN]</a>}
                  {profile.personalInfo?.email && <a href={`mailto:${profile.personalInfo.email}`} className="hover:text-white transition-colors">[EMAIL]</a>}
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.about?.bio && (
            <div>
              <p><Prompt path="~/about" /> <span className="text-white">cat bio.txt</span></p>
              <div className="mt-2 pl-4 border-l-2 border-[#33ff00]/30 text-[#33ff00]/90 whitespace-pre-wrap">
                {profile.about.bio}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills && Object.values(profile.skills).some(arr => arr?.length > 0) && (
            <div>
              <p><Prompt path="~/skills" /> <span className="text-white">ls -la modules/</span></p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profile.skills).map(([category, skills]) => {
                  if (!skills || skills.length === 0) return null;
                  return (
                    <div key={category} className="mb-2">
                      <p className="text-[#33ff00]/70 font-bold mb-1">drwxr-xr-x {category}</p>
                      <p className="pl-4 break-words">
                        {skills.map((s: string) => `[${s}]`).join(' ')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Experience */}
          {profile.experience && profile.experience.length > 0 && (
            <div>
              <p><Prompt path="~/exp" /> <span className="text-white">tail -f history.log</span></p>
              <div className="mt-2 space-y-6">
                {profile.experience.map((exp, i) => (
                  <div key={i} className="pl-4 border-l border-[#33ff00]/20 relative">
                    <div className="absolute -left-1.5 top-1.5 text-[#33ff00] text-xs">&gt;</div>
                    <p className="font-bold text-white">{exp.role} @ {exp.company}</p>
                    <p className="text-xs text-[#33ff00]/60 mb-2">
                      [{new Date(exp.startDate!).getFullYear()} - {exp.currentRole ? 'NOW' : new Date(exp.endDate!).getFullYear()}]
                    </p>
                    <p className="text-sm opacity-80 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {profile.projects && profile.projects.length > 0 && (
            <div>
              <p><Prompt path="~/projects" /> <span className="text-white">tree .</span></p>
              <div className="mt-2 space-y-4">
                {profile.projects.map((project, i) => (
                  <div key={i} className="border border-[#33ff00]/20 p-4 hover:bg-[#33ff00]/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-white">├── {project.name}</p>
                      <div className="flex gap-2">
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white"><Github className="w-4 h-4"/></a>}
                        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-white"><Globe className="w-4 h-4"/></a>}
                      </div>
                    </div>
                    <p className="pl-6 text-sm mb-3 opacity-80 line-clamp-2">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <p className="pl-6 text-xs text-[#33ff00]/60">
                        STACK: {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <div>
              <p><Prompt path="~/edu" /> <span className="text-white">grep -i "degree" certs.txt</span></p>
              <div className="mt-2 space-y-2 font-mono text-sm">
                {profile.education.map((edu, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-2 bg-[#111]">
                    <span className="text-yellow-500">[{edu.startYear}-{edu.endYear}]</span>
                    <span className="text-white font-bold">{edu.degree} {edu.branch}</span>
                    <span className="text-[#33ff00]/60">@ {edu.institution}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blinking Cursor */}
          <div className="pt-8 flex">
            <Prompt path="~" /> <span className="w-2 h-5 bg-[#33ff00] animate-pulse inline-block"></span>
          </div>

        </div>
      </div>
    </div>
  );
}

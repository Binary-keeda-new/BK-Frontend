import React from 'react';
import { UserProfile } from '../../types';
import { Crosshair, Cpu, Hexagon, Database, Code, Shield, GitCommit, FileDigit, Boxes, Activity, Link as LinkIcon, Download } from 'lucide-react';

export function EngineeringBlueprint({ profile }: { profile: UserProfile }) {
  const { personalInfo, about, education, experience, projects, skills, certifications, achievements, socialLinks } = profile;

  return (
    <div className="min-h-screen bg-[#071324] text-[#8ab4f8] font-mono selection:bg-[#8ab4f8] selection:text-[#071324] overflow-x-hidden relative"
      style={{
        backgroundImage: `
          linear-gradient(rgba(138, 180, 248, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(138, 180, 248, 0.05) 1px, transparent 1px),
          linear-gradient(rgba(138, 180, 248, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(138, 180, 248, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        backgroundPosition: '-1px -1px'
      }}
    >
      {/* CAD Overlay Border */}
      <div className="fixed inset-4 border-2 border-[#1a365d] pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-8 h-8 border-r-2 border-b-2 border-[#8ab4f8]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-l-2 border-b-2 border-[#8ab4f8]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-r-2 border-t-2 border-[#8ab4f8]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-l-2 border-t-2 border-[#8ab4f8]" />
        <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 bg-[#071324] px-4 text-xs tracking-[0.2em] text-[#4a6b9c]">
          REV. {(new Date().getFullYear() + '').split('').join('.')}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 md:px-16 py-20 relative z-10">
        
        {/* Title Block (CAD Style) */}
        <section className="mb-20 border border-[#1a365d] bg-[#0c1b33]/80 p-8 flex flex-col md:flex-row gap-8 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5">
            <Hexagon className="w-64 h-64 -mt-16 -mr-16" />
          </div>
          
          {profile.profilePhoto && (
            <div className="w-32 h-32 md:w-40 md:h-40 border border-[#8ab4f8] p-1 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-[#8ab4f8]/10 animate-pulse" />
              <img src={profile.profilePhoto} alt={personalInfo?.fullName} className="w-full h-full object-cover filter contrast-125 brightness-90 sepia-[.3] hue-rotate-[190deg]" />
              <Crosshair className="absolute -bottom-3 -right-3 text-[#8ab4f8] bg-[#071324]" size={20} />
            </div>
          )}
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Cpu size={16} className="text-[#8ab4f8]" />
                <span className="text-xs tracking-widest text-[#4a6b9c]">SYS.OP. ID: {profile.username?.toUpperCase() || 'UNKNOWN'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-2">
                {personalInfo?.fullName || 'NO_NAME_SPECIFIED'}
              </h1>
              <h2 className="text-xl text-[#8ab4f8] mb-6">
                &gt; {personalInfo?.headline || 'SYSTEM_ENGINEER'}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#4a6b9c] border-t border-[#1a365d] pt-4">
              {personalInfo?.email && <div><span className="block text-[#8ab4f8]/50 mb-1">EMAIL</span>{personalInfo.email}</div>}
              {personalInfo?.location && <div><span className="block text-[#8ab4f8]/50 mb-1">LOCATION</span>{personalInfo.location}</div>}
              {personalInfo?.website && <div><span className="block text-[#8ab4f8]/50 mb-1">PORTAL</span><a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:text-[#8ab4f8] underline decoration-[#1a365d] underline-offset-4">ACCESS</a></div>}
              {profile.resumeUrl && <div><span className="block text-[#8ab4f8]/50 mb-1">DOCUMENTS</span><a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-[#8ab4f8] flex items-center gap-1"><Download size={12}/> DOWNLOAD_CV</a></div>}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* About / Abstract */}
            {(about?.bio || about?.professionalSummary) && (
              <section>
                <div className="flex items-center gap-4 mb-6 border-b border-[#1a365d] pb-2">
                  <FileDigit className="text-[#8ab4f8]" />
                  <h3 className="text-lg uppercase tracking-widest text-white">Project Abstract</h3>
                </div>
                <div className="bg-[#0c1b33]/50 p-6 border-l-2 border-[#8ab4f8] text-sm leading-relaxed text-[#a0c0f9]">
                  {about.bio && <p className="mb-4">{about.bio}</p>}
                  {about.professionalSummary && <p>{about.professionalSummary}</p>}
                  {about.careerObjective && <p className="mt-4 italic text-[#4a6b9c]">OBJ: {about.careerObjective}</p>}
                </div>
              </section>
            )}

            {/* Experience / Revision History */}
            {experience && experience.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6 border-b border-[#1a365d] pb-2">
                  <GitCommit className="text-[#8ab4f8]" />
                  <h3 className="text-lg uppercase tracking-widest text-white">Revision History (EXP)</h3>
                </div>
                <div className="space-y-8 pl-4 border-l border-dashed border-[#1a365d]">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 bg-[#8ab4f8] rounded-full shadow-[0_0_10px_#8ab4f8]" />
                      <div className="text-xs text-[#4a6b9c] mb-1 font-bold">
                        [ {exp.startDate ? new Date(exp.startDate).getFullYear() : '0000'} - {exp.currentRole ? 'HEAD' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '0000')} ]
                      </div>
                      <h4 className="text-xl text-white uppercase mb-1">{exp.role}</h4>
                      <div className="text-sm text-[#8ab4f8] mb-3">@ {exp.company}</div>
                      {exp.description && (
                        <p className="text-sm text-[#7a9bc9] leading-relaxed border border-[#1a365d] bg-[#0c1b33]/30 p-4">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects / Schematics */}
            {projects && projects.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6 border-b border-[#1a365d] pb-2">
                  <Boxes className="text-[#8ab4f8]" />
                  <h3 className="text-lg uppercase tracking-widest text-white">System Schematics (PRJ)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="border border-[#1a365d] bg-[#0c1b33]/40 group hover:border-[#8ab4f8]/50 transition-colors duration-300">
                      <div className="border-b border-[#1a365d] p-2 bg-[#071324] flex justify-between items-center">
                        <span className="text-xs text-[#4a6b9c]">FIG {idx + 1}.0</span>
                        <div className="flex gap-2">
                          {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[#4a6b9c] hover:text-[#8ab4f8]"><Code size={14}/></a>}
                          {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[#4a6b9c] hover:text-[#8ab4f8]"><LinkIcon size={14}/></a>}
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg text-white uppercase mb-2">{proj.name}</h4>
                        {proj.description && <p className="text-xs text-[#7a9bc9] mb-4 line-clamp-3">{proj.description}</p>}
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {proj.technologies.map(tech => (
                              <span key={tech} className="text-[10px] px-1.5 py-0.5 bg-[#1a365d]/50 text-[#8ab4f8] border border-[#1a365d]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Skills / BOM */}
            {skills && Object.values(skills).some(arr => arr && arr.length > 0) && (
              <section className="border border-[#1a365d] bg-[#0c1b33]/80 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-[#1a365d] pb-2">
                  <Database className="text-[#8ab4f8]" size={18} />
                  <h3 className="text-base uppercase tracking-widest text-white">Bill of Materials</h3>
                </div>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, items]) => {
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={category}>
                        <h4 className="text-xs text-[#4a6b9c] uppercase mb-2">[{category.replace('_', ' ')}]</h4>
                        <div className="flex flex-wrap gap-2">
                          {items.map(skill => (
                            <div key={skill} className="text-xs border border-[#1a365d] px-2 py-1 text-[#8ab4f8] bg-[#071324] flex items-center gap-2 group hover:border-[#8ab4f8] transition-colors cursor-default">
                              <span className="w-1 h-1 bg-[#4a6b9c] rounded-full group-hover:bg-[#8ab4f8]" />
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Education & Certs */}
            <section className="border border-[#1a365d] bg-[#0c1b33]/80 p-6 backdrop-blur-sm">
               <div className="flex items-center gap-3 mb-6 border-b border-[#1a365d] pb-2">
                  <Shield className="text-[#8ab4f8]" size={18} />
                  <h3 className="text-base uppercase tracking-widest text-white">Compliance (EDU)</h3>
                </div>
                
                {education && education.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {education.map((edu, idx) => (
                      <div key={idx} className="text-sm">
                        <div className="text-white font-bold uppercase">{edu.institution}</div>
                        <div className="text-[#8ab4f8]">{edu.degree} {edu.branch && `// ${edu.branch}`}</div>
                        <div className="text-xs text-[#4a6b9c] mt-1">T: {edu.startYear} - {edu.endYear}</div>
                      </div>
                    ))}
                  </div>
                )}

                {(certifications && certifications.length > 0) && (
                  <div>
                    <h4 className="text-xs text-[#4a6b9c] uppercase mb-3">Certifications</h4>
                    <ul className="space-y-3">
                      {certifications.map((cert, idx) => (
                        <li key={idx} className="text-sm flex flex-col gap-1">
                          <span className="text-white flex items-center gap-2">
                            {cert.name}
                            {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="text-[#4a6b9c] hover:text-[#8ab4f8]"><LinkIcon size={12}/></a>}
                          </span>
                          <span className="text-[#7a9bc9] text-xs">ISSUER: {cert.issuer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </section>

            {/* Connections */}
            {socialLinks && Object.values(socialLinks).some(val => !!val) && (
              <section className="border border-[#1a365d] bg-[#0c1b33]/80 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-[#1a365d] pb-2">
                  <Activity className="text-[#8ab4f8]" size={18} />
                  <h3 className="text-base uppercase tracking-widest text-white">External Nodes</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <a key={platform} href={url} target="_blank" rel="noreferrer" className="text-xs uppercase text-[#4a6b9c] hover:text-[#8ab4f8] flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#1a365d] group-hover:bg-[#8ab4f8] rounded-full animate-pulse" />
                        {platform}
                      </a>
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        </div>
        
      </main>
    </div>
  );
}

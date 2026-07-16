import React from 'react';
import { UserProfile } from '../../types';
import { Shield, BookOpen, Scroll, Target, Flame, Sparkles, Gem, ArrowRight, ExternalLink, Globe, Github } from 'lucide-react';

export function RpgCharacterSheet({ profile }: { profile: UserProfile }) {
  const { personalInfo, about, education, experience, projects, skills, certifications, achievements, socialLinks } = profile;

  return (
    <div className="min-h-screen bg-[#0f0f13] text-[#e4e4e7] font-sans selection:bg-[#fbbf24] selection:text-[#0f0f13] pb-32"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 0%, #27272a 0%, #0f0f13 50%, #09090b 100%)'
      }}
    >
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        
        {/* Header / Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 relative">
          
          {/* Avatar Panel */}
          <div className="lg:w-1/3 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-[#fbbf24] to-[#ea580c] rounded-t-full rounded-b-xl opacity-70 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#18181b] border-2 border-[#3f3f46] rounded-t-full rounded-b-xl p-2 w-56 h-72 md:w-64 md:h-80 flex items-center justify-center overflow-hidden">
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt={personalInfo?.fullName} className="w-full h-full object-cover rounded-t-full rounded-b-lg filter sepia-[.2] contrast-125" />
                ) : (
                  <Shield size={64} className="text-[#52525b]" />
                )}
                
                {/* Level Badge */}
                <div className="absolute -bottom-4 bg-[#18181b] border-2 border-[#fbbf24] px-4 py-1 rounded-full shadow-[0_0_15px_#fbbf2455]">
                  <span className="text-xs uppercase tracking-widest text-[#fbbf24] font-bold">Lvl {experience ? experience.length * 3 + (projects?.length || 0) : 1}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Character Details */}
          <div className="lg:w-2/3 flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 mb-4 drop-shadow-sm">
              {personalInfo?.fullName || profile.username || 'Wanderer'}
            </h1>
            <h2 className="text-xl md:text-2xl text-[#fbbf24] font-serif italic mb-8">
              {personalInfo?.headline || 'Seeker of Knowledge'}
            </h2>
            
            {(about?.bio || about?.professionalSummary) && (
              <div className="bg-[#18181b]/50 border border-[#3f3f46] rounded-lg p-6 relative overflow-hidden backdrop-blur-sm max-w-3xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-50"></div>
                {about.bio && <p className="text-gray-300 leading-relaxed mb-4">{about.bio}</p>}
                {about.professionalSummary && <p className="text-gray-400 leading-relaxed">{about.professionalSummary}</p>}
              </div>
            )}
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
              {personalInfo?.location && (
                <div className="px-4 py-2 bg-[#18181b] border border-[#3f3f46] rounded-md text-sm text-gray-400">
                  <span className="text-[#fbbf24] mr-2">Realm:</span> {personalInfo.location}
                </div>
              )}
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#18181b] border border-[#3f3f46] hover:border-[#fbbf24] hover:text-white rounded-md text-sm text-gray-400 transition-colors flex items-center gap-2">
                  <Github size={14}/> Github
                </a>
              )}
              {personalInfo?.website && (
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#18181b] border border-[#3f3f46] hover:border-[#fbbf24] hover:text-white rounded-md text-sm text-gray-400 transition-colors flex items-center gap-2">
                  <Globe size={14}/> Base
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Quest Timeline (Experience) */}
            {experience && experience.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <Scroll className="text-[#fbbf24] w-8 h-8" />
                  <h3 className="text-3xl font-serif text-white">Quest Log</h3>
                  <div className="h-px bg-gradient-to-r from-[#3f3f46] to-transparent flex-1 ml-4"></div>
                </div>
                
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#fbbf24] before:via-[#3f3f46] before:to-transparent">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#09090b] bg-[#18181b] group-[.is-active]:bg-[#fbbf24] text-[#09090b] shadow-[0_0_15px_#fbbf2433] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Flame size={16} className="text-[#09090b]" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#18181b] border border-[#3f3f46] p-6 rounded-xl hover:border-[#fbbf24]/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-lg text-white">{exp.role}</h4>
                          <span className="text-xs text-[#fbbf24] uppercase font-bold bg-[#fbbf24]/10 px-2 py-1 rounded">
                            {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} - {exp.currentRole ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 mb-4">{exp.company} {exp.employmentType && `· ${exp.employmentType}`}</div>
                        {exp.description && <p className="text-sm text-gray-300 leading-relaxed">{exp.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Arsenal (Projects) */}
            {projects && projects.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <Target className="text-[#fbbf24] w-8 h-8" />
                  <h3 className="text-3xl font-serif text-white">Arsenal & Artifacts</h3>
                  <div className="h-px bg-gradient-to-r from-[#3f3f46] to-transparent flex-1 ml-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="group bg-[#18181b] border border-[#3f3f46] rounded-xl overflow-hidden hover:border-[#fbbf24]/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                      {proj.thumbnail && (
                        <div className="h-40 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] to-transparent z-10"></div>
                          <img src={proj.thumbnail} alt={proj.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                      )}
                      <div className={`p-6 ${proj.thumbnail ? '-mt-10 relative z-20' : ''}`}>
                        <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                          {proj.name}
                          <div className="flex gap-2">
                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#fbbf24]"><Github size={16}/></a>}
                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#fbbf24]"><ExternalLink size={16}/></a>}
                          </div>
                        </h4>
                        {proj.description && <p className="text-sm text-gray-400 mb-6 line-clamp-3">{proj.description}</p>}
                        
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {proj.technologies.map(tech => (
                              <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-[#27272a] text-[#a1a1aa] rounded border border-[#3f3f46]">
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

          {/* Right Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Skill Trees */}
            {skills && Object.values(skills).some(arr => arr && arr.length > 0) && (
              <section className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3f3f46]">
                  <Sparkles className="text-[#fbbf24]" size={20} />
                  <h3 className="text-xl font-serif text-white">Skill Tree</h3>
                </div>
                
                <div className="space-y-8">
                  {Object.entries(skills).map(([category, items]) => {
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={category}>
                        <h4 className="text-sm uppercase tracking-widest text-[#fbbf24] mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#fbbf24] rotate-45"></div>
                          {category.replace('_', ' ')}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {items.map((skill, sIdx) => (
                            <div key={skill} className="flex items-center gap-2">
                              <div className="text-sm text-gray-300">{skill}</div>
                              {sIdx < items.length - 1 && <ArrowRight size={12} className="text-[#3f3f46]" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Education & Achievements */}
            <section className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3f3f46]">
                <BookOpen className="text-[#fbbf24]" size={20} />
                <h3 className="text-xl font-serif text-white">Lore & Academics</h3>
              </div>
              
              {education && education.length > 0 && (
                <div className="space-y-6 mb-8">
                  {education.map((edu, idx) => (
                    <div key={idx} className="relative pl-4 border-l-2 border-[#3f3f46]">
                      <div className="absolute -left-1.5 top-1.5 w-2.5 h-2.5 bg-[#18181b] border-2 border-[#fbbf24] rotate-45"></div>
                      <div className="font-bold text-white mb-1">{edu.institution}</div>
                      <div className="text-sm text-[#fbbf24]">{edu.degree} {edu.branch && `in ${edu.branch}`}</div>
                      <div className="text-xs text-gray-500 mt-1">{edu.startYear} - {edu.endYear}</div>
                    </div>
                  ))}
                </div>
              )}

              {(certifications && certifications.length > 0) && (
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <Gem size={14}/> Certifications
                  </h4>
                  <ul className="space-y-4">
                    {certifications.map((cert, idx) => (
                      <li key={idx} className="bg-[#09090b] border border-[#27272a] p-3 rounded text-sm">
                        <div className="font-bold text-gray-200 mb-1">{cert.name}</div>
                        <div className="text-xs text-[#fbbf24]">Granted by: {cert.issuer}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            
          </div>
        </div>

      </main>
    </div>
  );
}

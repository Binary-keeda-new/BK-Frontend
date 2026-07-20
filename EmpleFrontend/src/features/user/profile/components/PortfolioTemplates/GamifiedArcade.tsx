import React from 'react';
import { UserProfile } from '../../types';
import { Gamepad2, Award, Trophy, Star, Sparkles, Map, Swords, Package, Key, ExternalLink, Skull } from 'lucide-react';

export function GamifiedArcade({ profile }: { profile: UserProfile }) {
  const { personalInfo, about, education, experience, projects, skills, certifications, achievements, socialLinks } = profile;

  // Simple "Level" calculation based on experience + projects
  const expLevel = (experience?.length || 0) * 5 + (projects?.length || 0) * 2 + 1;

  return (
    <div className="min-h-screen bg-[#11052C] text-white font-mono selection:bg-[#F20587] selection:text-white pb-32" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
      
      {/* Top HUD bar */}
      <div className="sticky top-0 z-50 bg-[#11052C]/90 border-b-4 border-[#F20587] p-4 flex justify-between items-center shadow-[0_4px_20px_#F2058744] backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-[#3D087B] border-2 border-[#F20587] p-2 flex items-center justify-center rounded text-[#F20587]">
            <Gamepad2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider text-[#F20587]">{personalInfo?.fullName || 'Player 1'}</h1>
            <div className="text-xs text-[#F20587] opacity-80">CLASS: {personalInfo?.headline || 'ADVENTURER'}</div>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="text-center hidden sm:block">
            <div className="text-xs text-[#F4D160] mb-1">HP</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-[#F20587] border-2 border-white rounded-sm shadow-[0_0_8px_#F20587]"></div>)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[#F4D160] mb-1">LVL</div>
            <div className="text-2xl font-black text-white drop-shadow-[0_2px_0_#F20587]">{expLevel}</div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pt-12 space-y-16">
        
        {/* Character Info */}
        <section className="flex flex-col md:flex-row gap-8 bg-[#3D087B]/40 border-4 border-[#3D087B] p-6 rounded-xl shadow-[0_0_15px_#3D087B] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F20587] opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex-shrink-0 flex flex-col items-center gap-4 relative z-10">
            {profile.profilePhoto ? (
              <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-[#F4D160] p-1 bg-[#11052C] rounded-lg shadow-[0_0_20px_#F4D16066]">
                <img src={profile.profilePhoto} alt="Avatar" className="w-full h-full object-cover rounded pixelated" style={{ imageRendering: 'pixelated' }} />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-[#F4D160] bg-[#11052C] rounded-lg shadow-[0_0_20px_#F4D16066] flex items-center justify-center text-[#F4D160]">
                <Skull size={48} />
              </div>
            )}
            <div className="bg-[#11052C] border-2 border-[#F20587] text-[#F20587] text-xs px-3 py-1 font-bold rounded">STATUS: ONLINE</div>
          </div>

          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-[#F4D160]" />
              <h2 className="text-2xl font-bold uppercase text-[#F4D160] drop-shadow-[2px_2px_0_#11052C]">Character Stats</h2>
            </div>
            
            {(about?.bio || about?.professionalSummary) && (
              <div className="bg-[#11052C] border-2 border-[#3D087B] p-4 rounded text-sm leading-relaxed mb-6 text-gray-300">
                {about.bio && <p className="mb-2">{about.bio}</p>}
                {about.professionalSummary && <p>{about.professionalSummary}</p>}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {personalInfo?.location && (
                <div className="bg-[#11052C] border-2 border-[#3D087B] p-2 text-center rounded">
                  <div className="text-[10px] text-[#F20587] mb-1">ZONE</div>
                  <div className="text-xs truncate">{personalInfo.location}</div>
                </div>
              )}
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noreferrer" className="bg-[#11052C] border-2 border-[#3D087B] p-2 text-center rounded hover:border-[#F4D160] hover:text-[#F4D160] transition-colors cursor-pointer group">
                  <div className="text-[10px] text-[#F20587] mb-1 group-hover:text-[#F4D160]">GUILD</div>
                  <div className="text-xs truncate">GitHub</div>
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="bg-[#11052C] border-2 border-[#3D087B] p-2 text-center rounded hover:border-[#F4D160] hover:text-[#F4D160] transition-colors cursor-pointer group">
                  <div className="text-[10px] text-[#F20587] mb-1 group-hover:text-[#F4D160]">FACTION</div>
                  <div className="text-xs truncate">LinkedIn</div>
                </a>
              )}
              {personalInfo?.website && (
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="bg-[#11052C] border-2 border-[#3D087B] p-2 text-center rounded hover:border-[#F4D160] hover:text-[#F4D160] transition-colors cursor-pointer group">
                  <div className="text-[10px] text-[#F20587] mb-1 group-hover:text-[#F4D160]">BASE</div>
                  <div className="text-xs truncate">Website</div>
                </a>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Questline (Experience) */}
          <div className="lg:col-span-2 space-y-12">
            
            {experience && experience.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Map className="text-[#F4D160] w-8 h-8" />
                  <h2 className="text-3xl font-black uppercase tracking-widest text-white drop-shadow-[2px_4px_0_#F20587]">Main Quests</h2>
                </div>
                
                <div className="space-y-6">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="group bg-[#11052C] border-4 border-[#3D087B] p-6 rounded-xl hover:border-[#F20587] transition-colors relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#F20587] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        LEVEL {experience.length - idx}
                      </div>
                      <h3 className="text-xl font-bold text-[#F4D160] mb-1 uppercase">{exp.role}</h3>
                      <h4 className="text-sm text-gray-400 mb-4 uppercase">@ {exp.company} // {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} - {exp.currentRole ? 'PRESENT' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}</h4>
                      
                      {exp.description && (
                        <div className="text-sm text-gray-300 leading-relaxed bg-[#3D087B]/30 p-4 border border-[#3D087B] rounded">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Treasure Chests (Projects) */}
            {projects && projects.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <Package className="text-[#F20587] w-8 h-8" />
                  <h2 className="text-3xl font-black uppercase tracking-widest text-white drop-shadow-[2px_4px_0_#3D087B]">Rare Loot</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="bg-[#3D087B]/40 border-4 border-[#3D087B] rounded-xl hover:border-[#F4D160] hover:scale-105 transition-all duration-300 flex flex-col h-full overflow-hidden">
                      <div className="h-32 bg-[#11052C] relative overflow-hidden flex items-center justify-center border-b-4 border-[#3D087B]">
                        {proj.thumbnail ? (
                          <img src={proj.thumbnail} alt={proj.name} className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                        ) : (
                          <Key size={48} className="text-[#3D087B]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11052C] to-transparent"></div>
                        <h3 className="absolute bottom-3 left-4 right-4 text-xl font-black uppercase text-white truncate drop-shadow-[2px_2px_0_#F20587]">{proj.name}</h3>
                      </div>
                      
                      <div className="p-4 flex-1 flex flex-col">
                        {proj.description && <p className="text-xs text-gray-300 mb-4 line-clamp-3 leading-relaxed">{proj.description}</p>}
                        
                        <div className="mt-auto">
                          {proj.technologies && proj.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {proj.technologies.slice(0,4).map(tech => (
                                <span key={tech} className="text-[9px] px-1.5 py-0.5 bg-[#F20587] text-white uppercase rounded-sm font-bold">
                                  {tech}
                                </span>
                              ))}
                              {proj.technologies.length > 4 && <span className="text-[9px] text-[#F4D160]">+{proj.technologies.length - 4}</span>}
                            </div>
                          )}
                          
                          <div className="flex gap-2 border-t-2 border-[#3D087B] pt-3">
                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 text-gray-400 hover:text-[#F4D160]"><ExternalLink size={12}/> SOURCE</a>}
                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 text-gray-400 hover:text-[#F4D160]"><ExternalLink size={12}/> PLAY</a>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Inventory */}
          <div className="space-y-12">
            
            {/* Skill Inventory */}
            {skills && Object.values(skills).some(arr => arr && arr.length > 0) && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Swords className="text-[#F4D160] w-6 h-6" />
                  <h2 className="text-2xl font-black uppercase tracking-wider text-white drop-shadow-[2px_2px_0_#F20587]">Inventory</h2>
                </div>
                
                <div className="bg-[#11052C] border-4 border-[#3D087B] p-5 rounded-xl space-y-6">
                  {Object.entries(skills).map(([category, items]) => {
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={category}>
                        <h3 className="text-xs text-[#F20587] uppercase mb-3 border-b-2 border-[#3D087B] pb-1">{category.replace('_', ' ')}</h3>
                        <div className="flex flex-wrap gap-2">
                          {items.map((skill: string) => (
                            <span key={skill} className="text-xs px-2 py-1 bg-[#3D087B] text-white rounded cursor-default hover:bg-[#F4D160] hover:text-[#11052C] transition-colors font-bold shadow-[0_2px_0_#22044d]">
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

            {/* Achievements / Badges */}
            {(certifications && certifications.length > 0 || achievements && achievements.length > 0) && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="text-[#F20587] w-6 h-6" />
                  <h2 className="text-2xl font-black uppercase tracking-wider text-white drop-shadow-[2px_2px_0_#F4D160]">Badges</h2>
                </div>
                
                <div className="space-y-3">
                  {certifications?.map((cert, idx) => (
                    <div key={`cert-${idx}`} className="flex items-start gap-3 bg-[#3D087B]/40 border-2 border-[#3D087B] p-3 rounded-lg hover:border-[#F4D160] transition-colors">
                      <div className="bg-[#F20587] p-2 rounded-full text-white mt-1">
                        <Award size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#F4D160] uppercase">{cert.name}</div>
                        <div className="text-xs text-gray-400 uppercase">{cert.issuer}</div>
                      </div>
                    </div>
                  ))}
                  {achievements?.map((ach, idx) => (
                    <div key={`ach-${idx}`} className="flex items-start gap-3 bg-[#3D087B]/40 border-2 border-[#3D087B] p-3 rounded-lg hover:border-[#F20587] transition-colors">
                      <div className="bg-[#F4D160] p-2 rounded-full text-[#11052C] mt-1">
                        <Star size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white uppercase">{ach.title}</div>
                        {ach.date && <div className="text-[10px] text-gray-400 mt-1">{new Date(ach.date).getFullYear()}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}

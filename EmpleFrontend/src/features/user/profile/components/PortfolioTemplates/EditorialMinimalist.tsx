import React from 'react';
import { UserProfile } from '../../types';
import { ExternalLink, Mail, MapPin, Globe, Phone } from 'lucide-react';

export function EditorialMinimalist({ profile }: { profile: UserProfile }) {
  const { personalInfo, about, education, experience, projects, skills, certifications, achievements, socialLinks } = profile;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] font-sans selection:bg-black selection:text-white pb-32">
      {/* Header / Hero */}
      <header className="px-6 md:px-12 lg:px-24 pt-24 pb-16 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          {profile.profilePhoto && (
            <img 
              src={profile.profilePhoto} 
              alt={personalInfo?.fullName || 'Profile'} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover grayscale mb-8"
            />
          )}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
            {personalInfo?.fullName || profile.username || 'Anonymous'}
          </h1>
          {personalInfo?.headline && (
            <p className="text-xl md:text-3xl font-light text-gray-500 max-w-3xl leading-snug tracking-tight">
              {personalInfo.headline}
            </p>
          )}
          
          <div className="flex flex-wrap gap-6 mt-12 text-sm uppercase tracking-widest font-semibold text-gray-400">
            {personalInfo?.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-black transition-colors">
                <Mail className="w-4 h-4" /> {personalInfo.email}
              </a>
            )}
            {personalInfo?.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {personalInfo.location}
              </span>
            )}
            {personalInfo?.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
            {personalInfo?.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {personalInfo.phone}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* About Section */}
        {(about?.bio || about?.professionalSummary || about?.careerObjective) && (
          <section className="py-20 border-b border-black/10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 md:col-span-1">About</h2>
            <div className="md:col-span-3 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
              {about.bio && <p className="mb-6">{about.bio}</p>}
              {about.professionalSummary && <p className="mb-6 text-gray-600">{about.professionalSummary}</p>}
              {about.careerObjective && <p className="text-gray-600 italic">{about.careerObjective}</p>}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="py-20 border-b border-black/10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 md:col-span-1">Experience</h2>
            <div className="md:col-span-3 flex flex-col gap-16">
              {experience.map((exp, idx) => (
                <div key={idx} className="group">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-bold tracking-tight">{exp.role}</h3>
                    <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                      {exp.startDate ? new Date(exp.startDate).getFullYear() : ''} — {exp.currentRole ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}
                    </span>
                  </div>
                  <h4 className="text-lg text-gray-500 mb-4">{exp.company} {exp.employmentType && `· ${exp.employmentType}`}</h4>
                  {exp.description && <p className="text-gray-700 leading-relaxed max-w-2xl">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="py-20 border-b border-black/10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 md:col-span-1">Selected Works</h2>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
              {projects.map((proj, idx) => (
                <div key={idx} className="group flex flex-col">
                  {proj.thumbnail ? (
                    <div className="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden">
                      <img src={proj.thumbnail} alt={proj.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gray-200 mb-6 flex items-center justify-center">
                      <span className="text-4xl font-black text-gray-300 tracking-tighter">{proj.name.substring(0, 2).toUpperCase()}</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {proj.name}
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors"><ExternalLink className="w-4 h-4" /></a>}
                  </h3>
                  {proj.description && <p className="text-gray-600 text-sm mb-4 leading-relaxed">{proj.description}</p>}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {proj.technologies.map(tech => (
                        <span key={tech} className="text-xs border border-black/10 px-2 py-1 uppercase tracking-wider text-gray-500">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && Object.values(skills).some(arr => arr && arr.length > 0) && (
          <section className="py-20 border-b border-black/10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 md:col-span-1">Capabilities</h2>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-12">
              {Object.entries(skills).map(([category, items]) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={category}>
                    <h3 className="text-sm uppercase tracking-widest font-bold mb-4 border-b border-black/10 pb-2 inline-block">{category.replace('_', ' ')}</h3>
                    <ul className="flex flex-col gap-2">
                      {items.map(skill => (
                        <li key={skill} className="text-gray-700 text-lg">{skill}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-20">
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-8">Education</h2>
              <div className="flex flex-col gap-8">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-bold">{edu.institution}</h3>
                    <p className="text-gray-600">{edu.degree} {edu.branch ? `in ${edu.branch}` : ''}</p>
                    <p className="text-sm font-mono text-gray-400 mt-1">{edu.startYear} — {edu.endYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
            <section>
              <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-8">Recognitions</h2>
              <div className="flex flex-col gap-8">
                {certifications?.map((cert, idx) => (
                  <div key={`cert-${idx}`}>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {cert.name}
                      {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors"><ExternalLink className="w-3 h-3" /></a>}
                    </h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                    {cert.date && <p className="text-sm font-mono text-gray-400 mt-1">{new Date(cert.date).getFullYear()}</p>}
                  </div>
                ))}
                {achievements?.map((ach, idx) => (
                  <div key={`ach-${idx}`}>
                    <h3 className="text-lg font-bold">{ach.title}</h3>
                    {ach.description && <p className="text-gray-600 mt-1">{ach.description}</p>}
                    {ach.date && <p className="text-sm font-mono text-gray-400 mt-1">{new Date(ach.date).getFullYear()}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer / Socials */}
        <footer className="pt-20 pb-12 flex flex-col items-center justify-center border-t border-black/10">
          {socialLinks && Object.values(socialLinks).some(link => !!link) && (
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {Object.entries(socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <a key={platform} href={url} target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">
                    {platform}
                  </a>
                );
              })}
            </div>
          )}
          <p className="text-xs text-gray-400 font-mono">© {new Date().getFullYear()} {personalInfo?.fullName || profile.username}. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
}

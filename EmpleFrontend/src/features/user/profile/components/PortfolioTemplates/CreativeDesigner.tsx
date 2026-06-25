import React from 'react';
import { UserProfile } from '../../types';

export function CreativeDesigner({ profile }: { profile: UserProfile }) {
  const { personalInfo = {}, about = {}, projects = [] } = profile;
  
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-serif">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <header className="text-center mb-32">
          {profile.profilePhoto && <img src={profile.profilePhoto.startsWith('http') ? profile.profilePhoto : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}`} className="w-32 h-32 rounded-full mx-auto mb-8 shadow-xl" alt="Profile" />}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">{personalInfo.fullName}</h1>
          <p className="text-2xl md:text-4xl text-stone-500 italic mb-8">{personalInfo.headline}</p>
          <div className="max-w-2xl mx-auto text-lg text-stone-600 leading-relaxed">
            {about.professionalSummary || about.bio}
          </div>
        </header>

        {projects.length > 0 && (
          <section className="space-y-32">
            {projects.map((proj, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2">
                  <div className="aspect-video bg-stone-300 rounded-lg overflow-hidden shadow-2xl relative group">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>
                <div className="md:w-1/2 space-y-6">
                  <h3 className="text-4xl font-bold">{proj.name}</h3>
                  <p className="text-stone-600 text-lg leading-relaxed">{proj.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {proj.technologies?.map(tech => <span key={tech} className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{tech}</span>)}
                  </div>
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="inline-block mt-4 pb-1 border-b-2 border-stone-900 font-bold hover:text-stone-600 hover:border-stone-600 transition-colors">
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

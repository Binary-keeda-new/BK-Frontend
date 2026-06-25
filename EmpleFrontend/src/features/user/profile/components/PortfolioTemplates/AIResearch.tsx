import React from 'react';
import { UserProfile } from '../../types';
import { BookOpen, FileText, CheckCircle } from 'lucide-react';

export function AIResearch({ profile }: { profile: UserProfile }) {
  const { personalInfo = {}, about = {}, education = [], achievements = [], certifications = [] } = profile;
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <header className="border-b-4 border-slate-900 pb-12 mb-12">
          <h1 className="text-5xl font-bold mb-4">{personalInfo.fullName}</h1>
          <p className="text-2xl text-slate-600 mb-6">{personalInfo.headline}</p>
          <div className="text-slate-700 max-w-3xl leading-relaxed text-lg">
            {about.bio}
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-16">
            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-slate-800"><BookOpen /> Education & Research</h2>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="pl-4 border-l-2 border-slate-300">
                    <h3 className="text-xl font-bold">{edu.degree} in {edu.branch}</h3>
                    <p className="text-slate-600 font-semibold">{edu.institution} | {edu.startYear} - {edu.endYear}</p>
                    {edu.description && <p className="mt-2 text-slate-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements/Publications */}
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-slate-800"><FileText /> Publications & Achievements</h2>
              <ul className="space-y-4">
                {achievements.map((ach, i) => (
                  <li key={i} className="bg-white p-6 shadow-sm border border-slate-200 rounded-lg">
                    <h4 className="font-bold text-lg">{ach.title}</h4>
                    <p className="text-slate-600 mt-2">{ach.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold mb-6 border-b pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.ai_ml?.map(skill => (
                  <span key={skill} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-md text-sm font-medium">{skill}</span>
                ))}
                {profile.skills?.languages?.map(skill => (
                  <span key={skill} className="bg-slate-200 text-slate-800 px-3 py-1 rounded-md text-sm font-medium">{skill}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-6 border-b pb-2">Certifications</h2>
              <ul className="space-y-4">
                {certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-800 leading-tight">{cert.name}</h4>
                      <p className="text-sm text-slate-500">{cert.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

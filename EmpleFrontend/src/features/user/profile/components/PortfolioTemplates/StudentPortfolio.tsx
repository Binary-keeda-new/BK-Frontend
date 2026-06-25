import React from 'react';
import { UserProfile } from '../../types';

export function StudentPortfolio({ profile }: { profile: UserProfile }) {
  const { personalInfo = {}, education = [], projects = [] } = profile;
  
  return (
    <div className="min-h-screen bg-indigo-50 text-indigo-950 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-48 w-full"></div>
          
          <div className="px-8 pb-12 relative">
            <div className="-mt-20 mb-6">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto.startsWith('http') ? profile.profilePhoto : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.profilePhoto}`} className="w-40 h-40 rounded-full border-8 border-white bg-white object-cover" alt="Profile" />
              ) : (
                <div className="w-40 h-40 rounded-full border-8 border-white bg-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-400">
                  {personalInfo.fullName?.charAt(0) || 'S'}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
            <p className="text-xl text-indigo-600 mb-6">{personalInfo.headline}</p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Education</h2>
                <div className="space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                      <h3 className="font-bold text-lg">{edu.institution}</h3>
                      <p className="text-indigo-600 font-medium">{edu.degree} - {edu.branch}</p>
                      <p className="text-sm text-gray-500 mt-2">{edu.startYear} - {edu.endYear} | CGPA: {edu.cgpa}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Key Projects</h2>
                <div className="space-y-6">
                  {projects.map((proj, i) => (
                    <div key={i} className="group border-2 border-transparent hover:border-indigo-100 bg-white shadow-sm p-6 rounded-2xl transition-all">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600">{proj.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{proj.description}</p>
                      <div className="flex gap-2 flex-wrap">
                        {proj.technologies?.slice(0, 4).map(tech => (
                          <span key={tech} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {profile.resumeUrl && (
              <div className="mt-16 text-center">
                <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.resumeUrl}`} target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all">
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

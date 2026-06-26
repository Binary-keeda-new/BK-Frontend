'use client';

import React from 'react';
import { TemplateType } from '../../types';
import { ExternalLink, AlertCircle } from 'lucide-react';

export function TemplateSelector({ selected, onChange, username, isPublished }: { selected: TemplateType, onChange: (t: TemplateType) => void, username?: string, isPublished?: boolean }) {
  const templates: { id: TemplateType; name: string; desc: string; color: string }[] = [
    { id: 'modern-developer', name: 'Modern Developer', desc: 'Sleek, dark-mode inspired by Vercel & Linear.', color: 'from-gray-900 to-black' },
    { id: 'creative-designer', name: 'Creative Designer', desc: 'Visual-first, fluid layout for creatives.', color: 'from-fuchsia-500 to-purple-600' },
    { id: 'ai-research', name: 'AI / Research', desc: 'Clean, academic layout for publications and projects.', color: 'from-blue-600 to-indigo-700' },
    { id: 'student', name: 'Student Portfolio', desc: 'Education-focused, bright and welcoming.', color: 'from-emerald-400 to-teal-500' },
  ];

  const canView = username && isPublished;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Portfolio Template</h2>
          <p className="mt-1" style={{ color: 'var(--muted)' }}>Select how your public profile will look to visitors.</p>
        </div>
        
        {canView ? (
          <a 
            href={`/u/${username}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 shadow-sm"
            style={{ background: 'var(--orange)', color: '#fff' }}
          >
            <span>View Live Portfolio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium opacity-60 cursor-not-allowed" style={{ background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
            <AlertCircle className="w-4 h-4" />
            <span>{!username ? 'Set Username to View' : 'Publish to View Live'}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {templates.map((tpl) => {
          const isActive = selected === tpl.id;
          return (
            <div 
              key={tpl.id}
              onClick={() => onChange(tpl.id)}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                isActive ? 'shadow-md ring-2 ring-[var(--orange-dim)]' : 'hover:border-gray-500'
              }`}
              style={{
                borderColor: isActive ? 'var(--orange)' : 'var(--border)',
                background: 'var(--surface2)'
              }}
            >
              <div className={`h-24 w-full bg-gradient-to-r ${tpl.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
              <div className="p-5" style={{ background: 'var(--surface2)' }}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold" style={{ color: 'var(--text)' }}>{tpl.name}</h3>
                  {isActive && <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}>Active</span>}
                </div>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>{tpl.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {!canView && (
        <div className="mt-6 p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Your portfolio is not public yet</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {!username 
                ? 'Please go to the "Personal Info" tab and set a Username, then click "Publish Portfolio" at the top.' 
                : 'You have a username set, but the profile is still a draft. Click "Publish Portfolio" at the top to make it visible.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

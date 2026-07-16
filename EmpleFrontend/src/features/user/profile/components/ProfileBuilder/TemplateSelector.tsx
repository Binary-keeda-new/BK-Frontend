'use client';

import React from 'react';
import { TemplateType } from '../../types';
import { ExternalLink, AlertCircle, Eye, CheckCircle } from 'lucide-react';

export function TemplateSelector({ selected, onChange, username, isPublished }: { selected: TemplateType, onChange: (t: TemplateType) => void, username?: string, isPublished?: boolean }) {
  const templates: { id: TemplateType; name: string; desc: string; color: string; pattern: string }[] = [
    { 
      id: 'engineering-blueprint', 
      name: 'Engineering Blueprint', 
      desc: 'Tesla meets Apple engineering. Dark navy blueprint backgrounds with technical grids and CAD aesthetics.', 
      color: 'bg-slate-900',
      pattern: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)'
    },
    { 
      id: 'gamified-arcade', 
      name: 'Gamified Arcade', 
      desc: 'Modern indie game UI. Pixel-art typography, XP progress bars, and treasure chest projects.', 
      color: 'bg-purple-900',
      pattern: 'repeating-linear-gradient(45deg, #1e1b4b 25%, transparent 25%, transparent 75%, #1e1b4b 75%, #1e1b4b), repeating-linear-gradient(45deg, #1e1b4b 25%, #2e1065 25%, #2e1065 75%, #1e1b4b 75%, #1e1b4b)'
    },
    { 
      id: 'editorial-minimalist', 
      name: 'Editorial Minimalist', 
      desc: 'Swiss Grid layout. Huge typography, large negative space, and magazine-style elegance.', 
      color: 'bg-gray-100',
      pattern: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)'
    },
    { 
      id: 'rpg-character-sheet', 
      name: 'Character Sheet', 
      desc: 'Professional RPG dark UI. Character stats, quest timelines, and premium dark gradients.', 
      color: 'bg-zinc-950',
      pattern: 'linear-gradient(135deg, #3f3f46 25%, transparent 25%) -50px 0, linear-gradient(225deg, #3f3f46 25%, transparent 25%) -50px 0, linear-gradient(315deg, #3f3f46 25%, transparent 25%), linear-gradient(45deg, #3f3f46 25%, transparent 25%)'
    },
  ];

  const canView = username && isPublished;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-4" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Portfolio Template</h2>
          <p className="mt-1" style={{ color: 'var(--muted)' }}>Select a premium template for your public profile.</p>
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
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 flex flex-col ${
                isActive ? 'shadow-md ring-2 ring-[var(--orange-dim)]' : 'hover:border-gray-500'
              }`}
              style={{
                borderColor: isActive ? 'var(--orange)' : 'var(--border)',
                background: 'var(--surface2)'
              }}
            >
              {/* Thumbnail Area */}
              <div 
                className={`h-36 w-full ${tpl.color} relative overflow-hidden border-b`}
                style={{ borderColor: 'var(--border)' }}
              >
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: tpl.pattern,
                    backgroundSize: '20px 20px'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <h3 className="text-lg font-bold text-white tracking-wide shadow-black drop-shadow-md">{tpl.name}</h3>
                </div>
                {isActive && (
                  <div className="absolute top-3 right-3 bg-[var(--orange)] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-3 h-3" />
                    Selected
                  </div>
                )}
              </div>

              {/* Description & Actions */}
              <div className="p-5 flex flex-col flex-1" style={{ background: 'var(--surface2)' }}>
                <p className="text-sm mb-6 flex-1" style={{ color: 'var(--muted)' }}>{tpl.desc}</p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => onChange(tpl.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    style={{ 
                      background: isActive ? 'var(--orange)' : 'var(--surface)', 
                      color: isActive ? '#fff' : 'var(--text)',
                      border: isActive ? 'none' : '1px solid var(--border)'
                    }}
                  >
                    {isActive ? 'Active Template' : 'Select Template'}
                  </button>
                  {canView && (
                    <a
                      href={`/u/${username}?preview=${tpl.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-lg border transition-colors flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
                      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                      title="Preview Live"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                </div>
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

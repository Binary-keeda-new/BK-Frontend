'use client';

import React, { useEffect, useRef } from 'react';
import { Education, Experience, Project, Certification } from '../../types';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

const inputClass = "w-full p-2.5 border rounded-lg outline-none focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] transition-all placeholder:text-gray-500";
const inputStyle = { background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' };
const cardStyle = { background: 'var(--surface2)', borderColor: 'var(--border)' };

function ErrorMsg({ show, text = "This section is required for publishing." }: { show: boolean, text?: string }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-1 mt-2 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
      <AlertCircle className="w-4 h-4" />
      <span>{text}</span>
    </div>
  );
}

export function EducationForm({ data, onChange, errors = [], autoFocusField }: { data: Education[], onChange: (d: Education[]) => void, errors?: string[], autoFocusField?: string }) {
  const add = () => onChange([...data, { institution: '', degree: '', branch: '', startYear: '', endYear: '' }]);
  const remove = (index: number) => onChange(data.filter((_, i) => i !== index));
  const update = (index: number, field: keyof Education, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (autoFocusField === 'education_list' && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [autoFocusField]);

  const hasError = errors.includes('education_list');

  return (
    <div ref={containerRef} className={`space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 p-4 rounded-xl ${hasError ? 'border-2 border-red-500 bg-red-500/5' : ''}`}>
      <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Education <span style={{ color: 'var(--orange)' }}>*</span></h2>
          <ErrorMsg show={hasError} text="At least one complete education entry is required." />
        </div>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 font-medium transition-colors rounded-lg shadow-sm" style={{ background: 'var(--orange)', color: '#fff' }}>
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>
      {data.map((item, i) => (
        <div key={i} className="p-5 border rounded-2xl space-y-4 relative" style={cardStyle}>
          <button onClick={() => remove(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Institution <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={item.institution || ''} onChange={e => update(i, 'institution', e.target.value)} className={inputClass} style={inputStyle} placeholder="University Name" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Degree <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={item.degree || ''} onChange={e => update(i, 'degree', e.target.value)} className={inputClass} style={inputStyle} placeholder="B.Tech, B.Sc" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Branch <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={item.branch || ''} onChange={e => update(i, 'branch', e.target.value)} className={inputClass} style={inputStyle} placeholder="Computer Science" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>CGPA/Score</label><input type="text" value={item.cgpa || ''} onChange={e => update(i, 'cgpa', e.target.value)} className={inputClass} style={inputStyle} placeholder="8.5" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Start Year <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={item.startYear || ''} onChange={e => update(i, 'startYear', e.target.value)} className={inputClass} style={inputStyle} placeholder="2018" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>End Year <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={item.endYear || ''} onChange={e => update(i, 'endYear', e.target.value)} className={inputClass} style={inputStyle} placeholder="2022" /></div>
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-center py-8" style={{ color: 'var(--muted2)' }}>No education details added.</p>}
    </div>
  );
}

export function ExperienceForm({ data, onChange, errors = [], autoFocusField }: { data: Experience[], onChange: (d: Experience[]) => void, errors?: string[], autoFocusField?: string }) {
  const add = () => onChange([...data, { company: '', role: '', employmentType: '', currentRole: false }]);
  const remove = (index: number) => onChange(data.filter((_, i) => i !== index));
  const update = (index: number, field: keyof Experience, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Experience</h2>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 font-medium transition-colors rounded-lg shadow-sm" style={{ background: 'var(--orange)', color: '#fff' }}>
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>
      {data.map((item, i) => (
        <div key={i} className="p-5 border rounded-2xl space-y-4 relative" style={cardStyle}>
          <button onClick={() => remove(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Company</label><input type="text" value={item.company || ''} onChange={e => update(i, 'company', e.target.value)} className={inputClass} style={inputStyle} placeholder="Google" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Role</label><input type="text" value={item.role || ''} onChange={e => update(i, 'role', e.target.value)} className={inputClass} style={inputStyle} placeholder="Software Engineer" /></div>
            <div className="space-y-1 md:col-span-2"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Description</label><textarea value={item.description || ''} onChange={e => update(i, 'description', e.target.value)} className={inputClass} style={inputStyle} rows={3} placeholder="Worked on..." /></div>
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-center py-8" style={{ color: 'var(--muted2)' }}>No experience added.</p>}
    </div>
  );
}

export function ProjectsForm({ data, onChange, errors = [], autoFocusField }: { data: Project[], onChange: (d: Project[]) => void, errors?: string[], autoFocusField?: string }) {
  const add = () => onChange([...data, { name: '', description: '', githubUrl: '', liveUrl: '' }]);
  const remove = (index: number) => onChange(data.filter((_, i) => i !== index));
  const update = (index: number, field: keyof Project, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (autoFocusField === 'projects_list' && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [autoFocusField]);

  const hasError = errors.includes('projects_list');

  return (
    <div ref={containerRef} className={`space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 p-4 rounded-xl ${hasError ? 'border-2 border-red-500 bg-red-500/5' : ''}`}>
      <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Projects <span style={{ color: 'var(--orange)' }}>*</span></h2>
          <ErrorMsg show={hasError} text="At least one project is required." />
        </div>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 font-medium transition-colors rounded-lg shadow-sm" style={{ background: 'var(--orange)', color: '#fff' }}>
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
      {data.map((item, i) => (
        <div key={i} className="p-5 border rounded-2xl space-y-4 relative" style={cardStyle}>
          <button onClick={() => remove(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Project Name <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={item.name || ''} onChange={e => update(i, 'name', e.target.value)} className={inputClass} style={inputStyle} placeholder="E-commerce App" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Technologies (comma separated) <span style={{ color: 'var(--orange)' }}>*</span></label><input type="text" value={(item.technologies || []).join(', ')} onChange={e => update(i, 'technologies', e.target.value.split(',').map(s=>s.trim()))} className={inputClass} style={inputStyle} placeholder="React, Node.js" /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>GitHub URL</label><input type="text" value={item.githubUrl || ''} onChange={e => update(i, 'githubUrl', e.target.value)} className={inputClass} style={inputStyle} placeholder="https://github.com/..." /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Live Demo URL</label><input type="text" value={item.liveUrl || ''} onChange={e => update(i, 'liveUrl', e.target.value)} className={inputClass} style={inputStyle} placeholder="https://..." /></div>
            <div className="space-y-1 md:col-span-2"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Description <span style={{ color: 'var(--orange)' }}>*</span></label><textarea value={item.description || ''} onChange={e => update(i, 'description', e.target.value)} className={inputClass} style={inputStyle} rows={2} /></div>
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-center py-8" style={{ color: 'var(--muted2)' }}>No projects added.</p>}
    </div>
  );
}

export function CertificationsForm({ data, onChange, errors = [], autoFocusField }: { data: Certification[], onChange: (d: Certification[]) => void, errors?: string[], autoFocusField?: string }) {
  const add = () => onChange([...data, { name: '', issuer: '', url: '' }]);
  const remove = (index: number) => onChange(data.filter((_, i) => i !== index));
  const update = (index: number, field: keyof Certification, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Certifications</h2>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 font-medium transition-colors rounded-lg shadow-sm" style={{ background: 'var(--orange)', color: '#fff' }}>
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>
      {data.map((item, i) => (
        <div key={i} className="p-5 border rounded-2xl space-y-4 relative" style={cardStyle}>
          <button onClick={() => remove(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Name</label><input type="text" value={item.name || ''} onChange={e => update(i, 'name', e.target.value)} className={inputClass} style={inputStyle} placeholder="AWS Certified..." /></div>
            <div className="space-y-1"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Issuer</label><input type="text" value={item.issuer || ''} onChange={e => update(i, 'issuer', e.target.value)} className={inputClass} style={inputStyle} placeholder="Amazon" /></div>
            <div className="space-y-1 md:col-span-2"><label className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Credential URL</label><input type="url" value={item.url || ''} onChange={e => update(i, 'url', e.target.value)} className={inputClass} style={inputStyle} placeholder="https://..." /></div>
          </div>
        </div>
      ))}
      {data.length === 0 && <p className="text-center py-8" style={{ color: 'var(--muted2)' }}>No certifications added.</p>}
    </div>
  );
}

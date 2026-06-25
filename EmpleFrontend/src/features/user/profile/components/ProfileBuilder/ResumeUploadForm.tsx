'use client';

import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { UploadCloud, File, Image as ImageIcon } from 'lucide-react';
import { uploadAdminImage } from '@/shared/services/upload.service';

export function ResumeUploadForm({ profile, onChange }: { profile: Partial<UserProfile>, onChange: (v: Partial<UserProfile>) => void }) {
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState('');

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const token = (await import('@descope/nextjs-sdk/client')).getSessionToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/admin/uploads/document`, {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange({ resumeUrl: data.data.url });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    setError('');
    try {
      const url = await uploadAdminImage(file);
      onChange({ profilePhoto: url });
    } catch (err: any) {
      setError(err.message || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${path}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold border-b pb-4" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Resume & Media</h2>
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Photo */}
        <div className="p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          {profile.profilePhoto ? (
            <div className="relative mb-4">
              <img src={getImageUrl(profile.profilePhoto)} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 shadow-lg" style={{ borderColor: 'var(--surface)' }} />
              <button onClick={() => onChange({ profilePhoto: undefined })} className="absolute bottom-0 right-0 rounded-full p-2 shadow transition-colors" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}><TrashIcon /></button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}>
              <ImageIcon className="w-10 h-10" />
            </div>
          )}
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Profile Photo</h3>
          <p className="text-xs mb-4 text-center" style={{ color: 'var(--muted)' }}>JPG, PNG (max 5MB)</p>
          <label className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium transition-colors" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
            {uploadingPhoto ? 'Uploading...' : 'Browse Image'}
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
          </label>
        </div>

        {/* Resume */}
        <div className="p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          {profile.resumeUrl ? (
            <div className="flex flex-col items-center mb-4 text-emerald-500">
              <File className="w-16 h-16 mb-2" />
              <span className="font-medium">Resume Uploaded</span>
              <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${profile.resumeUrl}`} target="_blank" rel="noreferrer" className="text-xs hover:underline mt-1" style={{ color: 'var(--orange)' }}>View Resume</a>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}>
              <UploadCloud className="w-10 h-10" />
            </div>
          )}
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Upload Resume</h3>
          <p className="text-xs mb-4 text-center" style={{ color: 'var(--muted)' }}>PDF, DOCX (max 10MB)</p>
          <label className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium transition-colors" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
            {uploadingResume ? 'Uploading...' : (profile.resumeUrl ? 'Replace Resume' : 'Browse File')}
            <input type="file" className="hidden" accept=".pdf,.doc,.docx,application/pdf,application/msword" onChange={handleResumeUpload} disabled={uploadingResume} />
          </label>
        </div>
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-red-400 transition-colors"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
  );
}

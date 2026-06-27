'use client';

import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { UploadCloud, FileText, Image as ImageIcon, CheckCircle2, Trash2, Eye, RefreshCw, Loader2 } from 'lucide-react';
import { uploadAdminImage } from '@/shared/services/upload.service';

export function ResumeUploadForm({ 
  profile, 
  onChange 
}: { 
  profile: Partial<UserProfile>, 
  onChange: (v: Partial<UserProfile>) => void 
}) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [error, setError] = useState('');
  const [localFile, setLocalFile] = useState<File | null>(null);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingResume(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const token = (await import('@descope/nextjs-sdk/client')).getSessionToken();
      const headers = { ...(token ? { Authorization: `Bearer ${token}` } : {}) };
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/admin/uploads/document`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Upload failed');
      }
      
      setLocalFile(file);
      onChange({ resumeUrl: data.data.url });
    } catch (err: any) {
      console.error(err);
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

  const removeResume = () => {
    onChange({ resumeUrl: undefined });
    setLocalFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold border-b pb-4" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Resume & Media</h2>
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Photo */}
        <div className="p-6 border rounded-2xl flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-md" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          {profile.profilePhoto ? (
            <div className="relative mb-6 group">
              <img src={getImageUrl(profile.profilePhoto)} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 shadow-lg transition-transform group-hover:scale-105" style={{ borderColor: 'var(--surface)' }} />
              <button onClick={() => onChange({ profilePhoto: undefined })} className="absolute bottom-0 right-0 rounded-full p-2.5 shadow-lg transition-colors bg-red-500 text-white hover:bg-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}>
              <ImageIcon className="w-10 h-10" />
            </div>
          )}
          <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>Profile Photo</h3>
          <p className="text-sm mb-6 text-center" style={{ color: 'var(--muted)' }}>JPG, PNG (max 5MB)</p>
          <label className="cursor-pointer px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2" style={{ background: 'var(--orange)', color: '#fff' }}>
            {uploadingPhoto ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
            {uploadingPhoto ? 'Uploading...' : 'Browse Image'}
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
          </label>
        </div>

        {/* Resume */}
        <div className="p-6 border rounded-2xl flex flex-col items-center justify-center transition-all shadow-sm hover:shadow-md" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          {profile.resumeUrl ? (
            <div className="w-full flex flex-col animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-emerald-500 mb-1">Resume Uploaded Successfully</h3>
              </div>
              
              <div className="w-full p-4 rounded-xl border mb-6 space-y-3" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>File Name</span>
                  <span className="text-sm font-medium truncate max-w-[150px]" style={{ color: 'var(--text)' }}>
                    {localFile?.name || profile.resumeUrl.split('/').pop()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Size</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {localFile ? formatFileSize(localFile.size) : 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Date</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {localFile ? new Date().toLocaleDateString() : 'Previously Uploaded'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <a href={getImageUrl(profile.resumeUrl)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-colors hover:bg-opacity-50" style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--surface)' }}>
                  <Eye className="w-4 h-4" /> Preview
                </a>
                <label className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-colors hover:bg-opacity-50" style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'var(--surface)' }}>
                  <RefreshCw className="w-4 h-4" /> Replace
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,application/pdf,application/msword" onChange={handleResumeUpload} disabled={uploadingResume} />
                </label>
              </div>
              <button onClick={removeResume} className="mt-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors w-full">
                <Trash2 className="w-4 h-4" /> Remove Resume
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner" style={{ background: 'var(--orange-dim)', color: 'var(--orange)' }}>
                {uploadingResume ? <Loader2 className="w-10 h-10 animate-spin" /> : <FileText className="w-10 h-10" />}
              </div>
              <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>Upload Resume</h3>
              <p className="text-sm mb-6 text-center" style={{ color: 'var(--muted)' }}>PDF, DOCX (max 10MB)</p>
              
              <label className="cursor-pointer px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-2" style={{ background: 'var(--orange)', color: '#fff' }}>
                {uploadingResume ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                {uploadingResume ? 'Uploading...' : 'Browse File'}
                <input type="file" className="hidden" accept=".pdf,.doc,.docx,application/pdf,application/msword" onChange={handleResumeUpload} disabled={uploadingResume} />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

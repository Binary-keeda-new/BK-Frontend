'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

interface ResumeUploaderProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const MAX_SIZE = 5 * 1024 * 1024;

function getFileExtension(name: string): string {
  return name.slice(name.lastIndexOf('.')).toLowerCase();
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ResumeUploader({ file, onFileSelect, error }: ResumeUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState('');

  const validateAndSelect = useCallback(
    (selectedFile: File) => {
      setLocalError('');
      if (!ALLOWED_TYPES.includes(selectedFile.type)) {
        setLocalError('Invalid file type. Allowed: PDF, DOCX, TXT');
        return;
      }
      if (selectedFile.size > MAX_SIZE) {
        setLocalError(`File too large (${formatFileSize(selectedFile.size)}). Max 5 MB.`);
        return;
      }
      onFileSelect(selectedFile);
    },
    [onFileSelect]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSelect(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSelect(f);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setLocalError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const displayError = error || localError;
  const ext = file ? getFileExtension(file.name) : '';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Upload size={20} style={{ color: 'var(--orange)' }} />
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted2)' }}>
          Resume Upload
        </h2>
      </div>

      <div
        className={`ats-upload-zone ${dragOver ? 'ats-upload-zone--dragover' : ''} ${file ? 'ats-upload-zone--has-file' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        id="ats-resume-dropzone"
      >
        <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" onChange={handleInputChange} style={{ display: 'none' }} id="ats-resume-input" />

        {file ? (
          <>
            <div className="ats-upload-zone__icon" style={{ background: 'rgba(34, 197, 94, 0.12)' }}>
              <CheckCircle size={24} style={{ color: '#4ade80' }} />
            </div>
            <p className="ats-upload-zone__title" style={{ color: '#4ade80' }}>File Ready</p>
            <div className="ats-upload-zone__file-info">
              <FileText size={14} />
              <span style={{ fontWeight: 700 }}>{file.name}</span>
              <span style={{ opacity: 0.7 }}>({formatFileSize(file.size)})</span>
              <span style={{ padding: '2px 8px', borderRadius: '50px', background: 'rgba(34, 197, 94, 0.2)', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                {ext.replace('.', '')}
              </span>
            </div>
            <button onClick={handleRemove} style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#f87171', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={14} /> Remove File
            </button>
          </>
        ) : (
          <>
            <div className="ats-upload-zone__icon">
              <Upload size={24} style={{ color: 'var(--orange)' }} />
            </div>
            <p className="ats-upload-zone__title">Drop your resume here</p>
            <p className="ats-upload-zone__subtitle">PDF, DOCX, or TXT — Max 5 MB</p>
            <button type="button" style={{ borderRadius: '50px', fontSize: '11px', pointerEvents: 'none', padding: '8px 20px', background: 'transparent', border: '1px solid var(--orange)', color: 'var(--orange)', fontWeight: 700, cursor: 'pointer' }}>
              Select File
            </button>
            <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--orange-dim)', color: 'var(--orange)', padding: '4px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: 600 }}>
              <span style={{ width: '16px', height: '16px', background: 'var(--orange)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>i</span>
              Use standard fonts for better scanning
            </div>
          </>
        )}
      </div>

      {displayError && (
        <div className="ats-error-banner" style={{ marginTop: '12px' }}>{displayError}</div>
      )}
    </div>
  );
}

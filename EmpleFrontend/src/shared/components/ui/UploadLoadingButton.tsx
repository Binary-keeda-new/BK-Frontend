import React from 'react';
import { Loader2, UploadCloud } from 'lucide-react';

export interface UploadLoadingButtonProps {
  isLoading: boolean;
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function UploadLoadingButton({ 
  isLoading, 
  label, 
  accept, 
  onChange,
  icon,
  className = '',
  style
}: UploadLoadingButtonProps) {
  return (
    <label 
      className={`cursor-pointer px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 min-w-[150px] ${
        isLoading ? 'opacity-80 cursor-not-allowed pointer-events-none' : 'hover:opacity-90'
      } ${className}`} 
      style={style || { background: 'var(--orange)', color: '#fff' }}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : (icon || <UploadCloud className="w-4 h-4 shrink-0" />)}
        <span>{isLoading ? 'Uploading...' : label}</span>
      </span>
      <input 
        type="file" 
        className="hidden" 
        accept={accept} 
        onChange={onChange} 
        disabled={isLoading} 
      />
    </label>
  );
}

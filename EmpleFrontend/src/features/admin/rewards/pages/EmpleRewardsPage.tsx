'use client';

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2, Download, Search } from 'lucide-react';
import { useSession } from '@descope/nextjs-sdk/client';

type RewardScope = 'selected' | 'all';

interface PreviewData {
  totalUploadedEmails: number;
  validEmailsFound: number;
  invalidEmailFormatCount: number;
  usersFound: number;
  usersMissing: number;
  duplicateEmails: number;
  totalCoinsToDistribute: number;
}

interface ExecutionResult {
  batchId: string;
  successCount: number;
  failureCount: number;
  totalCoinsDistributed: number;
  failedUsers: { email: string, reason: string, timestamp: string }[];
  successUsers: { email: string, userId: string, timestamp: string }[];
}

export default function EmpleRewardsPage() {
  const { sessionToken } = useSession();
  
  const [scope, setScope] = useState<RewardScope>('selected');
  const [amount, setAmount] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  
  const [file, setFile] = useState<File | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [fileError, setFileError] = useState<string>('');
  
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [progress, setProgress] = useState(0); // Optional visual state, though actual execution is single blocking API right now.
  const [result, setResult] = useState<ExecutionResult | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setFile(null);
    setEmails([]);
    setFileError('');
    setPreviewData(null);
    setResult(null);
  };

  const handleScopeChange = (newScope: RewardScope) => {
    setScope(newScope);
    resetState();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFileError('');
    setPreviewData(null);
    
    const validExtensions = ['xlsx', 'xls', 'csv'];
    const ext = uploadedFile.name.split('.').pop()?.toLowerCase();
    
    if (!ext || !validExtensions.includes(ext)) {
      setFileError('Invalid file type. Please upload an Excel (.xlsx, .xls) or CSV file.');
      return;
    }
    
    setFile(uploadedFile);
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
        
        if (data.length === 0) {
          setFileError('The uploaded file is empty.');
          return;
        }
        
        // Find Email column
        const headers = data[0].map(h => String(h).trim().toLowerCase());
        const emailColIdx = headers.indexOf('email');
        
        if (emailColIdx === -1) {
          setFileError('Could not find an "Email" column in the uploaded file.');
          return;
        }
        
        const extractedEmails: string[] = [];
        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          if (row[emailColIdx]) {
            extractedEmails.push(String(row[emailColIdx]).trim());
          }
        }
        
        if (extractedEmails.length > 5000) {
          setFileError('Maximum 5000 users allowed per batch.');
          return;
        }
        
        setEmails(extractedEmails);
      } catch (err) {
        setFileError('Error reading file. Make sure it is a valid Excel or CSV.');
      }
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const generatePreview = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) > 10000) {
      alert('Please enter a valid reward amount between 1 and 10000.');
      return;
    }
    if (scope === 'selected' && emails.length === 0) {
      alert('Please upload a valid file first.');
      return;
    }

    setPreviewLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/admin/rewards/bulk/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
        },
        body: JSON.stringify({
          scope,
          emails,
          amount: Number(amount)
        })
      });
      
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Preview failed');
      }
      setPreviewData(data.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setPreviewLoading(false);
    }
  };

  const executeRewards = async () => {
    if (!title) {
      alert('Please enter a Reward Title.');
      setShowConfirm(false);
      return;
    }
    
    setShowConfirm(false);
    setExecuting(true);
    setProgress(10); // Fake initial progress since API is blocking right now.
    
    // Animate fake progress to simulate chunking UI until websocket/polling is implemented.
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 5, 90));
    }, 500);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/admin/rewards/bulk/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {})
        },
        body: JSON.stringify({
          scope,
          emails,
          amount: Number(amount),
          title,
          reason
        })
      });
      
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Execution failed');
      }
      setProgress(100);
      setResult(data.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      clearInterval(progressInterval);
      setExecuting(false);
    }
  };

  const downloadCSV = (type: 'success' | 'failed') => {
    if (!result) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    if (type === 'success') {
      csvContent += "Email,User ID,Coins,Reward Title,Batch ID,Timestamp\n";
      const safeTitle = title.replace(/"/g, '""');
      result.successUsers.forEach(u => {
        csvContent += `${u.email},${u.userId},${amount},"${safeTitle}",${result.batchId},${u.timestamp}\n`;
      });
    } else {
      csvContent += "Email,Reason,Timestamp\n";
      result.failedUsers.forEach(u => {
        // Escape quotes
        const safeReason = u.reason.replace(/"/g, '""');
        csvContent += `${u.email},"${safeReason}",${u.timestamp}\n`;
      });
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}-rewards-${result.batchId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderProgressBar = () => {
    const filled = Math.floor((progress / 100) * 20);
    const empty = 20 - filled;
    return (
      <div className="font-mono text-center text-[var(--clr-accent)] mt-4">
        {'█'.repeat(filled)}{'░'.repeat(empty)} {progress}%
      </div>
    );
  };

  if (result) {
    return (
      <div className="p-6 md:p-10 text-[var(--clr-text)] max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Reward Distribution Complete</h1>
        <div className="bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-6 text-lg mb-8">
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[var(--clr-border)] pb-2">
                <span className="text-[var(--clr-text2)]">Batch ID</span>
                <span className="font-mono font-medium">{result.batchId}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--clr-border)] pb-2">
                <span className="text-[var(--clr-text2)]">Users Rewarded</span>
                <span className="font-bold text-green-500">{result.successCount}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--clr-border)] pb-2">
                <span className="text-[var(--clr-text2)]">Total Coins Distributed</span>
                <span className="font-bold text-[var(--clr-accent)]">{result.totalCoinsDistributed}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[var(--clr-border)] pb-2">
                <span className="text-[var(--clr-text2)]">Failed</span>
                <span className={`font-bold ${result.failureCount > 0 ? 'text-red-500' : 'text-gray-400'}`}>{result.failureCount}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-end mt-8">
            <button
              onClick={() => { resetState(); setAmount(''); setTitle(''); setReason(''); }}
              className="px-6 py-3 rounded-xl border border-[var(--clr-border)] text-sm font-semibold hover:bg-[var(--clr-surface2)] transition-colors"
            >
              Start New Batch
            </button>
            <button
              onClick={() => downloadCSV('success')}
              className="px-6 py-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-semibold hover:bg-green-500/20 transition-colors flex items-center gap-2"
            >
              <Download size={16}/> Success CSV
            </button>
            {result.failureCount > 0 && (
              <button
                onClick={() => downloadCSV('failed')}
                className="px-6 py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-semibold hover:bg-red-500/20 transition-colors flex items-center gap-2"
              >
                <Download size={16}/> Failed CSV
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 text-[var(--clr-text)] max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Emple Rewards</h1>
      <p className="text-[var(--clr-text2)] mb-8">Distribute Impel Coins to multiple users in bulk.</p>

      {/* Scope Selector */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-[var(--clr-text2)] mb-3">Reward Scope</label>
        <div className="flex gap-4">
          <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${scope === 'selected' ? 'border-[var(--clr-accent)] bg-[var(--clr-accent)]/10 ring-1 ring-[var(--clr-accent)]' : 'border-[var(--clr-border)] hover:bg-[var(--clr-surface2)]'}`}>
            <input type="radio" name="scope" value="selected" checked={scope === 'selected'} onChange={() => handleScopeChange('selected')} className="w-5 h-5 accent-[var(--clr-accent)]" />
            <div className="flex flex-col">
              <span className="font-semibold">Selected Users (Excel)</span>
              <span className="text-xs text-[var(--clr-text2)]">Upload a custom list of emails</span>
            </div>
          </label>
          <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${scope === 'all' ? 'border-[var(--clr-accent)] bg-[var(--clr-accent)]/10 ring-1 ring-[var(--clr-accent)]' : 'border-[var(--clr-border)] hover:bg-[var(--clr-surface2)]'}`}>
            <input type="radio" name="scope" value="all" checked={scope === 'all'} onChange={() => handleScopeChange('all')} className="w-5 h-5 accent-[var(--clr-accent)]" />
            <div className="flex flex-col">
              <span className="font-semibold">Reward All Existing Users</span>
              <span className="text-xs text-[var(--clr-text2)]">Global distribution to active accounts</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Upload Section */}
        {scope === 'selected' && (
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-[var(--clr-text2)]">1. Upload Recipients</label>
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all bg-[var(--clr-surface)] ${fileError ? 'border-red-500 bg-red-500/5' : 'border-[var(--clr-border)] hover:border-[var(--clr-accent)] cursor-pointer'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <>
                  <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-semibold truncate w-full max-w-xs">{file.name}</span>
                  <span className="text-xs text-[var(--clr-text2)] mt-1">{emails.length} potential emails found</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-[var(--clr-surface2)] text-[var(--clr-text2)] rounded-full flex items-center justify-center mb-3 group-hover:text-[var(--clr-accent)] group-hover:bg-[var(--clr-accent)]/10 transition-colors">
                    <FileText size={24} />
                  </div>
                  <span className="font-semibold">Browse Excel or CSV</span>
                  <span className="text-xs text-[var(--clr-text2)] mt-1">Must contain an "Email" column</span>
                </>
              )}
              <input type="file" className="hidden" ref={fileInputRef} accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            </div>
            {fileError && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14}/> {fileError}</p>}
          </div>
        )}

        {/* Form Details */}
        <div className={`space-y-4 ${scope === 'all' ? 'md:col-span-2 md:max-w-md' : ''}`}>
          <div>
            <label className="block text-sm font-semibold text-[var(--clr-text2)] mb-1">Coins to Reward *</label>
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="e.g. 100"
              className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--clr-accent)]"
              min="1"
              max="10000"
            />
            <p className="text-xs text-[var(--clr-text2)] mt-1">Maximum 10000 coins per execution</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--clr-text2)] mb-1">Reward Title *</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Diwali Celebration"
              className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--clr-accent)]"
              maxLength={100}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--clr-text2)] mb-1">Reason (Optional)</label>
            <input 
              type="text" 
              value={reason} 
              onChange={e => setReason(e.target.value)} 
              placeholder="e.g. Rewarding all users during Diwali 2026"
              className="w-full bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--clr-accent)]"
              maxLength={200}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-[var(--clr-border)] pt-6 mb-8">
        <button 
          onClick={generatePreview} 
          disabled={previewLoading || (scope === 'selected' && !file)}
          className="bg-[var(--clr-surface2)] hover:bg-[var(--clr-surface3)] text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {previewLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          Generate Preview
        </button>
      </div>

      {previewData && (
        <div className="bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-2">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Preview Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {scope === 'selected' && (
              <>
                <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)]">
                  <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Uploaded</div>
                  <div className="text-xl font-bold">{previewData.totalUploadedEmails}</div>
                </div>
                <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)]">
                  <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Valid Format</div>
                  <div className="text-xl font-bold">{previewData.validEmailsFound}</div>
                </div>
                <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)]">
                  <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Invalid Format</div>
                  <div className="text-xl font-bold text-red-400">{previewData.invalidEmailFormatCount}</div>
                </div>
                <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)]">
                  <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Duplicates Removed</div>
                  <div className="text-xl font-bold text-yellow-500">{previewData.duplicateEmails}</div>
                </div>
              </>
            )}
            
            <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)]">
              <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Users Found</div>
              <div className="text-2xl font-bold text-green-500">{previewData.usersFound}</div>
            </div>
            
            {scope === 'selected' && (
              <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-border)]">
                <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Users Missing</div>
                <div className="text-xl font-bold text-red-400">{previewData.usersMissing}</div>
              </div>
            )}
            
            <div className="p-4 bg-[var(--clr-bg)] rounded-xl border border-[var(--clr-accent)]/30 md:col-span-2 flex items-center justify-between">
              <div>
                <div className="text-[var(--clr-text2)] text-xs font-semibold uppercase tracking-wider mb-1">Total Coins Required</div>
                <div className="text-2xl font-bold text-[var(--clr-accent)]">{previewData.totalCoinsToDistribute}</div>
              </div>
              <button 
                onClick={() => setShowConfirm(true)}
                disabled={previewData.usersFound === 0}
                className="bg-[var(--clr-accent)] hover:brightness-110 text-white px-6 py-2.5 rounded-lg font-bold disabled:opacity-50"
              >
                Distribute Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Confirm Distribution</h3>
            <p className="text-[var(--clr-text2)] mb-6">
              You are about to reward <strong className="text-white">{previewData?.usersFound} users</strong> with <strong className="text-white">{amount} coins</strong> each.<br/><br/>
              Total Cost: <strong className="text-[var(--clr-accent)] text-xl">{previewData?.totalCoinsToDistribute} Coins</strong>
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirm(false)} className="px-5 py-2.5 rounded-xl border border-[var(--clr-border)] font-semibold hover:bg-[var(--clr-surface2)] transition-colors">Cancel</button>
              <button onClick={executeRewards} className="px-5 py-2.5 rounded-xl bg-[var(--clr-accent)] text-white font-bold hover:brightness-110 transition-colors">Confirm & Execute</button>
            </div>
          </div>
        </div>
      )}

      {/* Execution Overlay */}
      {executing && (
        <div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black/90 p-4">
          <div className="bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-[var(--clr-accent)] animate-spin mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Rewarding users...</h3>
            <p className="text-[var(--clr-text2)] mb-4">Please do not close this window.</p>
            {renderProgressBar()}
          </div>
        </div>
      )}

    </div>
  );
}

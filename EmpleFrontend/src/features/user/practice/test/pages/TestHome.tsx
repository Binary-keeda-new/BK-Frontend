'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '@descope/nextjs-sdk/client';
import TestList from './TestList';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';

export default function TestHome() {
  const [isTestFullscreenMode, setIsTestFullscreenMode] = useState(false);
  const { isAuthenticated, isSessionLoading } = useSession() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'error' }[]>([]);

  useEffect(() => {
    if (!isSessionLoading && !isAuthenticated) {
      const testId = searchParams?.get('testId');
      if (testId) {
        setToasts([
          {
            id: Date.now().toString(),
            message: 'Please log in to access this shared test.',
            type: 'error',
          },
        ]);
        setTimeout(() => {
          router.replace('/auth/login');
        }, 2500);
      } else {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, isSessionLoading, router, searchParams]);

  if (isSessionLoading || (!isAuthenticated && searchParams?.get('testId'))) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <ToastContainer toasts={toasts} />
        <p className="text-sm text-[var(--clr-text2)]">Redirecting to login...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className={isTestFullscreenMode ? 'fixed inset-0 z-[999] bg-[var(--bg)] overflow-y-auto' : ''}>
      <ToastContainer toasts={toasts} />
      <TestList onFullscreenModeChange={setIsTestFullscreenMode} />
    </div>
  );
}
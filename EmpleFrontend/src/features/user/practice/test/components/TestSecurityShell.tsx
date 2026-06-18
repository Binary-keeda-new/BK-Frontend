'use client';

import { useEffect } from 'react';

type TestSecuritySettings = {
  noCopyPaste?: boolean;
  blockKeyboard?: boolean;
  noLostFocus?: boolean;
  noMinimize?: boolean;
  noDevTools?: boolean;
};

type Props = {
  settings?: TestSecuritySettings;
  children: React.ReactNode;
  onViolation?: (type: string) => void;
};

export default function TestSecurityShell({
  settings,
  children,
  onViolation,
}: Props) {
  useEffect(() => {
    if (!settings?.noCopyPaste) return;

    const block = (e: ClipboardEvent) => {
      e.preventDefault();
      onViolation?.('copy_paste');
    };

    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('paste', block);

    return () => {
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('paste', block);
    };
  }, [settings?.noCopyPaste, onViolation]);

  useEffect(() => {
    if (!settings?.blockKeyboard) return;

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const blocked =
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) ||
        (e.ctrlKey && ['u', 's', 'p'].includes(key)) ||
        (e.metaKey && ['u', 's', 'p'].includes(key));

      if (blocked) {
        e.preventDefault();
        onViolation?.('keyboard');
      }
    };

    window.addEventListener('keydown', blockKeys);

    return () => {
      window.removeEventListener('keydown', blockKeys);
    };
  }, [settings?.blockKeyboard, onViolation]);

  useEffect(() => {
    if (!settings?.noLostFocus) return;

    const onBlur = () => {
      onViolation?.('lost_focus');
    };

    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('blur', onBlur);
    };
  }, [settings?.noLostFocus, onViolation]);

  useEffect(() => {
    if (!settings?.noMinimize) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        onViolation?.('minimize_or_tab_hidden');
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [settings?.noMinimize, onViolation]);

  useEffect(() => {
    if (!settings?.noDevTools) return;

    const interval = window.setInterval(() => {
      const threshold = 160;

      const devToolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (devToolsOpen) {
        onViolation?.('devtools');
      }
    }, 1500);

    return () => window.clearInterval(interval);
  }, [settings?.noDevTools, onViolation]);

  return <>{children}</>;
}
'use client';

import { useEffect } from 'react';

type TestSecuritySettings = {
  noCopyPaste?: boolean;
  blockKeyboard?: boolean;
  noLostFocus?: boolean;
  noMinimize?: boolean;
  noDevTools?: boolean;
  noExitScreen?: boolean;
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
  const report = (type: string) => {
    console.log('SECURITY VIOLATION:', type);
    onViolation?.(type);
  };

  useEffect(() => {
    console.log('SECURITY SETTINGS:', settings);
  }, [settings]);

  useEffect(() => {
    if (!settings?.noCopyPaste) return;

    const blockClipboard = (e: ClipboardEvent) => {
      console.log('CLIPBOARD EVENT:', e.type);
      e.preventDefault();
      e.stopPropagation();
      report(`clipboard_${e.type}`);
    };

    window.addEventListener('copy', blockClipboard, true);
    window.addEventListener('cut', blockClipboard, true);
    window.addEventListener('paste', blockClipboard, true);
    document.addEventListener('copy', blockClipboard, true);
    document.addEventListener('cut', blockClipboard, true);
    document.addEventListener('paste', blockClipboard, true);

    return () => {
      window.removeEventListener('copy', blockClipboard, true);
      window.removeEventListener('cut', blockClipboard, true);
      window.removeEventListener('paste', blockClipboard, true);
      document.removeEventListener('copy', blockClipboard, true);
      document.removeEventListener('cut', blockClipboard, true);
      document.removeEventListener('paste', blockClipboard, true);
    };
  }, [settings?.noCopyPaste]);

  useEffect(() => {
    if (!settings?.blockKeyboard) return;

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const blocked =
        e.key === 'F12' ||
        (e.metaKey && ['c', 'v', 'x', 's', 'p', 'u'].includes(key)) ||
        (e.ctrlKey && ['c', 'v', 'x', 's', 'p', 'u'].includes(key)) ||
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key));

      if (blocked) {
        console.log('KEYBOARD BLOCKED:', e.key);
        e.preventDefault();
        e.stopPropagation();
        report(`keyboard_${e.key}`);
      }
    };

    window.addEventListener('keydown', blockKeys, true);
    document.addEventListener('keydown', blockKeys, true);

    return () => {
      window.removeEventListener('keydown', blockKeys, true);
      document.removeEventListener('keydown', blockKeys, true);
    };
  }, [settings?.blockKeyboard]);

  useEffect(() => {
    if (!settings?.noLostFocus) return;

    const onBlur = () => report('lost_focus');

    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('blur', onBlur);
    };
  }, [settings?.noLostFocus]);

  useEffect(() => {
    if (!settings?.noMinimize) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        report('tab_hidden_or_minimized');
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [settings?.noMinimize]);

  useEffect(() => {
    if (!settings?.noExitScreen) return;

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        report('exit_fullscreen');
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [settings?.noExitScreen]);

  useEffect(() => {
    if (!settings?.noDevTools) return;

    const interval = window.setInterval(() => {
      const threshold = 160;

      const open =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (open) {
        report('devtools_open');
      }
    }, 1500);

    return () => window.clearInterval(interval);
  }, [settings?.noDevTools]);

  return <>{children}</>;
}
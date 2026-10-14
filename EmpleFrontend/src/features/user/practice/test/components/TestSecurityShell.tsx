'use client';

import { useEffect, useRef } from 'react';

type TestSecuritySettings = {
  noCopyPaste?: boolean;
  blockKeyboard?: boolean;
  noLostFocus?: boolean;
  noMinimize?: boolean;
  noDevTools?: boolean;
  noExitScreen?: boolean;
  noBackNavigation?: boolean;
  noRightClick?: boolean;
};

type Props = {
  settings?: TestSecuritySettings;
  children: React.ReactNode;
  isActive?: boolean;
  onViolation?: (type: string) => void;
};

export default function TestSecurityShell({
  settings,
  children,
  isActive = true,
  onViolation,
}: Props) {
  const lastClipboardReportRef = useRef<{ type: string; time: number }>({
    type: '',
    time: 0,
  });
  const lastNavigationReportRef = useRef<number>(0);
  const lastFocusIncidentRef = useRef<number>(0);
  const lastFullscreenIncidentRef = useRef<number>(0);
  const wasInFullscreenRef = useRef<boolean>(false);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const report = (type: string) => {
    if (!isActive) return;
    console.log('SECURITY VIOLATION:', type);
    onViolation?.(type);
  };

  const reportFullscreenExit = () => {
    if (!isActive) return;
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    const now = Date.now();
    if (now - lastFullscreenIncidentRef.current < 800) {
      console.log('SUPPRESSED CORRELATED FULLSCREEN INCIDENT');
      return;
    }
    lastFullscreenIncidentRef.current = now;
    lastFocusIncidentRef.current = now;
    report('fullscreen_exit');
  };

  const reportFocusIncident = (type: string) => {
    if (!isActive) return;
    const now = Date.now();
    if (now - lastFullscreenIncidentRef.current < 800) {
      console.log('SUPPRESSED CORRELATED FOCUS/FULLSCREEN INCIDENT:', type);
      return;
    }
    if (now - lastFocusIncidentRef.current < 800) {
      console.log('SUPPRESSED CORRELATED FOCUS INCIDENT:', type);
      return;
    }
    lastFocusIncidentRef.current = now;
    report(type);
  };

  const reportClipboardAction = (type: string) => {
    if (!isActive) return;
    const now = Date.now();
    if (
      lastClipboardReportRef.current.type === type &&
      now - lastClipboardReportRef.current.time < 400
    ) {
      console.log('SUPPRESSED DUPLICATE CLIPBOARD VIOLATION:', type);
      return;
    }
    lastClipboardReportRef.current = { type, time: now };
    report(type);
  };

  useEffect(() => {
    console.log('SECURITY SETTINGS:', settings);
  }, [settings]);

  useEffect(() => {
    if (settings?.noRightClick === false) return;

    const handleContextMenu = (e: MouseEvent) => {
      console.log('RIGHT CLICK EVENT BLOCKED');
      e.preventDefault();
      e.stopPropagation();
      report('right_click_attempt');
    };

    window.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('contextmenu', handleContextMenu, true);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
    };
  }, [settings?.noRightClick]);

  useEffect(() => {
    if (settings?.noBackNavigation === false) return;

    window.history.pushState({ testSecurityShell: true }, '', window.location.href);

    const handlePopState = () => {
      console.log('BACK NAVIGATION EVENT DETECTED');
      window.history.pushState({ testSecurityShell: true }, '', window.location.href);
      const now = Date.now();
      if (now - lastNavigationReportRef.current < 800) {
        console.log('SUPPRESSED DUPLICATE NAVIGATION VIOLATION');
        return;
      }
      lastNavigationReportRef.current = now;
      report('navigation_attempt');
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [settings?.noBackNavigation]);

  useEffect(() => {
    if (!isActive || settings?.noCopyPaste === false) return;

    const blockClipboard = (e: ClipboardEvent) => {
      console.log('CLIPBOARD EVENT:', e.type);
      e.preventDefault();
      e.stopPropagation();
      reportClipboardAction(`${e.type}_attempt`);
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
    if (settings?.blockKeyboard === false) return;

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      const isCopy = ['c'].includes(key) && (e.metaKey || e.ctrlKey);
      const isPaste = ['v'].includes(key) && (e.metaKey || e.ctrlKey);
      const isCut = ['x'].includes(key) && (e.metaKey || e.ctrlKey);

      const blocked =
        e.key === 'F12' ||
        (e.metaKey && ['s', 'p', 'u'].includes(key)) ||
        (e.ctrlKey && ['s', 'p', 'u'].includes(key)) ||
        (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        isCopy || isPaste || isCut;

      if (blocked) {
        console.log('KEYBOARD BLOCKED:', e.key);
        e.preventDefault();
        e.stopPropagation();
        
        if (isCopy) reportClipboardAction('copy_attempt');
        else if (isPaste) reportClipboardAction('paste_attempt');
        else if (isCut) reportClipboardAction('cut_attempt');
        else report('blocked_keyboard_shortcut');
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
    if (!isActive || settings?.noLostFocus === false) return;

    const onBlur = () => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = setTimeout(() => {
        const isFs = Boolean(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        );
        if (!isFs) {
          if (wasInFullscreenRef.current) {
            wasInFullscreenRef.current = false;
            reportFullscreenExit();
          }
        } else {
          reportFocusIncident('focus_lost');
        }
      }, 200);
    };

    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('blur', onBlur);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, [isActive, settings?.noLostFocus]);

  useEffect(() => {
    if (!isActive || settings?.noMinimize === false) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        reportFocusIncident('tab_hidden');
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [isActive, settings?.noMinimize]);

  useEffect(() => {
    if (!isActive) return;

    const checkIsFs = () => Boolean(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    // Sync initial state
    if (checkIsFs()) {
      wasInFullscreenRef.current = true;
    }

    const checkFullscreen = () => {
      const isFs = checkIsFs();

      if (isFs) {
        wasInFullscreenRef.current = true;
        return;
      }

      // If we were in fullscreen and now document.fullscreenElement is null
      if (wasInFullscreenRef.current) {
        wasInFullscreenRef.current = false;
        reportFullscreenExit();
      }
    };

    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('MSFullscreenChange', checkFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      document.removeEventListener('mozfullscreenchange', checkFullscreen);
      document.removeEventListener('MSFullscreenChange', checkFullscreen);
    };
  }, [isActive]);

  useEffect(() => {
    if (settings?.noDevTools === false) return;

    let alreadyReported = false;

    const interval = window.setInterval(() => {
      const threshold = 160;

      const open =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;

      if (open && !alreadyReported) {
        alreadyReported = true;
        report('devtools_detected');
      }

      if (!open) {
        alreadyReported = false;
      }
    }, 1500);

    return () => window.clearInterval(interval);
  }, [settings?.noDevTools]);

  return <>{children}</>;
}
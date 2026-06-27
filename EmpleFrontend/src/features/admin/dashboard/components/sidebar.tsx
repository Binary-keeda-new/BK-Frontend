//'use client';
//
//import Image from 'next/image';
//import { useState } from 'react';
//import { useRouter } from 'next/navigation';
//
//export type AdminSection =
//  | 'dashboard'
//  | 'practice'
//  | 'quizzes'
//  | 'tests'
//  | 'question-bank'
//  | 'question-bank-detail'
//  | 'coding-problems'
//  | 'jobs'
//  | 'blogs'
//  | 'quiz-preview'
//  | 'quiz-edit'
//  | 'quiz-create'
//  | 'test-edit';
//
//const NAV_ITEMS: {
//  label: string;
//  key: AdminSection;
//  icon: React.ReactNode;
//}[] = [
//  {
//    label: 'Dashboard',
//    key: 'dashboard',
//    icon: (
//      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//        <rect x="3" y="3" width="7" height="7" rx="1.5" />
//        <rect x="14" y="3" width="7" height="7" rx="1.5" />
//        <rect x="3" y="14" width="7" height="7" rx="1.5" />
//        <rect x="14" y="14" width="7" height="7" rx="1.5" />
//      </svg>
//    ),
//  },
//  {
//    label: 'Quizzes',
//    key: 'quizzes',
//    icon: (
//      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
//      </svg>
//    ),
//  },
//  {
//    label: 'Tests',
//    key: 'tests',
//    icon: (
//      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//        <rect x="2" y="2" width="20" height="20" rx="2" />
//        <path d="M7 12l3 3 7-7" />
//      </svg>
//    ),
//  },
//  {
//    label: 'Question Bank',
//    key: 'question-bank',
//    icon: (
//      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//        <rect x="2" y="7" width="20" height="14" rx="2" />
//        <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
//        <line x1="8" y1="13" x2="16" y2="13" />
//        <line x1="8" y1="17" x2="13" y2="17" />
//      </svg>
//    ),
//  },
//  {
//    label: 'Coding Problems',
//    key: 'coding-problems',
//    icon: (
//      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//        <polyline points="16 18 22 12 16 6" />
//        <polyline points="8 6 2 12 8 18" />
//      </svg>
//    ),
//  },
//  {
//  label: 'Jobs',
//  key: 'jobs',
//  icon: (
//    <svg
//      width="17"
//      height="17"
//      viewBox="0 0 24 24"
//      fill="none"
//      stroke="currentColor"
//      strokeWidth="2"
//    >
//      <rect x="2" y="7" width="20" height="14" rx="2" />
//      <path d="M16 3v4M8 3v4M3 11h18" />
//    </svg>
//  ),
//},
//{
//  label: 'Blogs',
//  key: 'blogs',
//  icon: (
//    <svg
//      width="17"
//      height="17"
//      viewBox="0 0 24 24"
//      fill="none"
//      stroke="currentColor"
//      strokeWidth="2"
//    >
//      <path d="M4 4h16v16H4z" />
//      <path d="M8 8h8M8 12h8M8 16h5" />
//    </svg>
//  ),
//},
//];
//
//type SidebarProps = {
//  activeSection: AdminSection;
//  onSectionChange: (section: AdminSection) => void;
//};
//
//export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
//  const [collapsed, setCollapsed] = useState(false);
//  const router = useRouter();
//
//  return (
//    <aside
//<<<<<<< Updated upstream
//      className={[
//        'sticky top-0 z-20 h-screen flex-shrink-0 border-r border-[var(--clr-border)]',
//        'bg-[var(--clr-surface)] transition-all duration-300',
//        collapsed ? 'w-[66px]' : 'w-[220px]',
//      ].join(' ')}
//    >
//      <div className="relative flex h-full flex-col overflow-hidden">
//        <div className="relative flex h-16 items-center border-b border-[var(--clr-border)] px-4">
//          <div className="relative h-[42px] flex-1">
//            {!collapsed ? (
//              <Image
//                src="/logo-final.png"
//                alt="Logo"
//                fill
//                className="object-contain object-left"
//                priority
//              />
//            ) : (
//              <Image
//                src="/logo-isolated.png"
//                alt="Logo icon"
//                fill
//                className="object-contain object-left"
//                priority
//              />
//            )}
//=======
//      className={`
//        relative z-20 h-screen flex-shrink-0 transition-all duration-300
//        ${collapsed ? 'w-[66px]' : 'w-[220px]'}
//        bg-[var(--clr-surface)] border-r border-[var(--clr-border)] overflow-hidden
//      `}
//    >
//      <div className="flex h-full w-[220px] flex-col">
//        <div className="flex h-16 items-center gap-2 overflow-hidden border-b border-[var(--clr-border)] px-4">
//          <div className={`relative h-[60px] transition-all duration-300 ${collapsed ? 'w-[80px]' : 'w-[200px]'}`}>
//            <Image
//              src="/logo-final.png"
//              alt="Logo"
//              fill
//              className={`object-contain transition-opacity duration-300 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
//            />
//            <Image
//              src="/logo-isolated.png"
//              alt="Logo icon"
//              fill
//              className={`object-contain transition-opacity duration-300 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
//            />
//>>>>>>> Stashed changes
//          </div>
//
//          <button
//            type="button"
//            onClick={() => setCollapsed((c) => !c)}
//<<<<<<< Updated upstream
//            className={[
//              'absolute -right-3 top-1/2 z-30 flex h-7 w-7 -translate-y-1/2 items-center justify-center',
//              'rounded-full border border-[var(--clr-border2)] bg-[var(--clr-surface2)]',
//              'text-[var(--clr-text3)] shadow-md transition-all duration-300',
//              'hover:bg-[var(--clr-accent)] hover:text-white',
//            ].join(' ')}
//            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//          >
//            <svg
//              width="11"
//              height="11"
//              viewBox="0 0 12 12"
//              stroke="currentColor"
//              strokeWidth="2"
//              className={`transition-transform duration-300 ${
//                collapsed ? 'scale-x-[-1]' : ''
//              }`}
//=======
//            className={`
//              fixed top-8 z-[200] flex h-6 w-6 items-center justify-center
//              rounded-full border border-[var(--clr-border2)]
//              bg-[var(--clr-surface2)] text-[var(--clr-text3)]
//              shadow-md transition-all duration-300
//              hover:bg-[var(--clr-accent)] hover:text-white
//              ${collapsed ? 'left-[53px]' : 'left-[207px]'}
//            `}
//          >
//            <svg
//              width="11" height="11" viewBox="0 0 12 12"
//              stroke="currentColor" strokeWidth="2"
//              className={`transition-transform duration-300 ${collapsed ? 'scale-x-[-1]' : ''}`}
//>>>>>>> Stashed changes
//            >
//              <polyline points="8,2 4,6 8,10" />
//            </svg>
//          </button>
//        </div>
//
//<<<<<<< Updated upstream
//        <nav className="flex-1 overflow-y-auto px-2 py-3">
//          <div className="flex flex-col gap-1">
//            {NAV_ITEMS.map(({ label, key, icon }) => {
//              const isActive = activeSection === key;
//
//              return (
//                <button
//                  key={key}
//                  type="button"
//                  onClick={() => onSectionChange(key)}
//                  title={collapsed ? label : undefined}
//                  className={[
//                    'flex items-center rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-all',
//                    isActive
//                      ? 'bg-[var(--clr-accent)] text-white shadow-md'
//                      : 'text-[var(--clr-text2)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]',
//                    collapsed ? 'justify-center' : 'gap-3',
//                  ].join(' ')}
//                >
//                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
//                    {icon}
//                  </span>
//
//                  {!collapsed && (
//                    <span className="truncate whitespace-nowrap">{label}</span>
//                  )}
//                </button>
//              );
//            })}
//          </div>
//=======
//        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-3">
//          {NAV_ITEMS.map(({ label, key, icon }) => {
//            const isActive = activeSection === key;
//            return (
//              <button
//                key={key}
//                type="button"
//                onClick={() => {
//                  onSectionChange(key);
//                  router.push(`/${key}`);
//                }}
//                title={collapsed ? label : undefined}
//                className={`
//                  flex items-center gap-3 rounded-lg px-2.5 py-2
//                  text-left text-sm font-medium transition-all
//                  ${isActive
//                    ? 'bg-[var(--clr-accent)] text-white shadow-md'
//                    : 'text-[var(--clr-text2)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]'}
//                `}
//              >
//                <span className="flex h-7 w-7 items-center justify-center">{icon}</span>
//                <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'opacity-100'}`}>
//                  {label}
//                </span>
//              </button>
//            );
//          })}
//>>>>>>> Stashed changes
//        </nav>
//      </div>
//    </aside>
//  );
//}

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type AdminSection =
  | 'dashboard'
  | 'practice'
  | 'quizzes'
  | 'tests'
  | 'question-bank'
  | 'question-bank-detail'
  | 'coding-problems'
  | 'coding-problem-edit'
  | 'jobs'
  | 'blogs'
  | 'sessions'
  | 'events'
  | 'quiz-preview'
  | 'quiz-edit'
  | 'quiz-create'
  | 'test-edit';

const NAV_ITEMS: {
  label: string;
  key: AdminSection;
  icon: React.ReactNode;
  href?: string;
}[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Quizzes',
    key: 'quizzes',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    label: 'Tests',
    key: 'tests',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 12l3 3 7-7" />
      </svg>
    ),
  },
  {
    label: 'Question Bank',
    key: 'question-bank',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    label: 'Coding Problems',
    key: 'coding-problems',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
  label: 'Jobs',
  key: 'jobs',
  icon: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
},
{
  label: 'Blogs',
  key: 'blogs',
  icon: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  ),
},
{
  label: 'Sessions',
  key: 'sessions',
  icon: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="8" rx="2"/>
      <line x1="12" y1="3" x2="12" y2="7"/>
      <line x1="12" y1="15" x2="12" y2="21"/>
    </svg>
  ),
},
    label: 'Jobs',
    key: 'jobs',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
    ),
  },
  {
    label: 'Blogs',
    key: 'blogs',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: 'Events',
    key: 'events',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
];

type SidebarProps = {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
};

export default function Sidebar({
  activeSection,
  onSectionChange,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <aside
      className={[
        'sticky top-0 z-20 h-screen flex-shrink-0 border-r border-[var(--clr-border)]',
        'bg-[var(--clr-surface)] transition-all duration-300',
        collapsed ? 'w-[66px]' : 'w-[220px]',
      ].join(' ')}
    >
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="relative flex h-16 items-center border-b border-[var(--clr-border)] px-4">
          <div className="relative h-[42px] flex-1">
            {!collapsed ? (
              <Image
                src="/logo-final.png"
                alt="Logo"
                fill
                className="object-contain object-left"
                priority
              />
            ) : (
              <Image
                src="/logo-isolated.png"
                alt="Logo icon"
                fill
                className="object-contain object-left"
                priority
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={[
              'absolute -right-3 top-1/2 z-30 flex h-7 w-7 -translate-y-1/2 items-center justify-center',
              'rounded-full border border-[var(--clr-border2)] bg-[var(--clr-surface2)]',
              'text-[var(--clr-text3)] shadow-md transition-all duration-300',
              'hover:bg-[var(--clr-accent)] hover:text-white',
            ].join(' ')}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-300 ${
                collapsed ? 'scale-x-[-1]' : ''
              }`}
            >
              <polyline points="8,2 4,6 8,10" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, key, icon, href }) => {
              const isActive = activeSection === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onSectionChange(key);
                    if (href) router.push(href);
                  }}
                  title={collapsed ? label : undefined}
                  className={[
                    'flex items-center rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[var(--clr-accent)] text-white shadow-md'
                      : 'text-[var(--clr-text2)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]',
                    collapsed ? 'justify-center' : 'gap-3',
                  ].join(' ')}
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center">
                    {icon}
                  </span>

                  {!collapsed && (
                    <span className="truncate whitespace-nowrap">{label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Sidebar, { type AdminSection } from './sidebar';
import Topbar from './topbar';
import DashboardContent from './dashboardContent';
import QuestionBankPage from '@/features/admin/question-bank/pages/QuestionBankPage';
import QuestionBankDetailPage from '@/features/admin/question-bank/pages/QuestionBankDetail';
import AdminJobsPage from "@/features/admin/jobs/pages/AdminJobsPage";
export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] =
    useState<AdminSection>('dashboard');
  const [selectedQuestionBankId, setSelectedQuestionBankId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    setMobileOpen(false);

    if (section !== 'question-bank-detail') {
      setSelectedQuestionBankId(null);
    }
  };

  const goToQuestionBankList = () => {
    setActiveSection('question-bank');
    setSelectedQuestionBankId(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardContent
            onOpenQuestionBank={() => setActiveSection('question-bank')}
          />
        );

      case 'question-bank':
        return (
          <QuestionBankPage
            onEditQuestionBank={(id) => {
              setSelectedQuestionBankId(id);
              setActiveSection('question-bank-detail');
            }}
          />
        );

      case 'question-bank-detail':
        return selectedQuestionBankId ? (
          <QuestionBankDetailPage
            id={selectedQuestionBankId}
            onBackToQuestionBanks={goToQuestionBankList}
          />
        ) : (
          <QuestionBankPage
            onEditQuestionBank={(id) => {
              setSelectedQuestionBankId(id);
              setActiveSection('question-bank-detail');
            }}
          />
        );

      case 'practice':
        return (
          <div className="p-6 text-white md:p-10">
            Practice content goes here.
          </div>
        );

      case 'quizzes':
        return (
          <div className="p-6 text-white md:p-10">
            Quizzes content goes here.
          </div>
        );

      case 'tests':
        return (
          <div className="p-6 text-white md:p-10">Tests content goes here.</div>
        );

      case 'coding-problems':
        return (
          <div className="p-6 text-white md:p-10">
            Coding problems content goes here.
          </div>
        );
        case 'jobs':
        return <AdminJobsPage />;

      default:
        return (
          <DashboardContent
            onOpenQuestionBank={() => setActiveSection('question-bank')}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--clr-bg)]">
      <div className="hidden flex-shrink-0 md:flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-[299]
            bg-black/50 backdrop-blur-sm
            md:hidden
          "
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 bottom-0 z-[300]
          transform transition-transform duration-300 ease-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
      >
        <div className="h-full shadow-2xl">
          <Sidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />

        <main
          id="main-content"
          className="flex-1 overflow-x-hidden overflow-y-auto"
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
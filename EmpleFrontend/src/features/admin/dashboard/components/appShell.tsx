'use client';

import { useEffect, useState } from 'react';
import Sidebar, { type AdminSection } from './sidebar';
import Topbar from './topbar';
import DashboardContent from './dashboardContent';
import QuestionBankPage from '@/features/admin/question-bank/pages/QuestionBankPage';
import QuestionBankDetailPage from '@/features/admin/question-bank/pages/QuestionBankDetail';
import AdminJobsPage from '@/features/admin/jobs/pages/AdminJobsPage';
import QuizPreviewContent from '@/features/admin/quiz/components/quizPreviewContent';
import QuizzesContent from '../../quiz/components/quizContent';
import QuizEdit from '../../quiz/components/QuizEdit';
import QuizForm from '../../quiz/components/QuizForm';

interface AppShellProps {
  initialSection?: AdminSection;
  quizId?: number;
}

export default function AppShell({
  initialSection = 'dashboard',
  quizId,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<AdminSection>(initialSection);
  const [selectedQuestionBankId, setSelectedQuestionBankId] = useState<
    string | null
  >(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
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
      case 'quiz-preview':
        return <QuizPreviewContent quizId={quizId || 0} />;

case 'quizzes':
  return (
    <QuizzesContent
      onCreateQuiz={() => setActiveSection('quiz-create')}
      onEditQuiz={(id) => {
        setSelectedQuizId(id);
        setActiveSection('quiz-edit');
      }}
    />
  );

  case 'quiz-edit':
  return selectedQuizId ? (
    <QuizEdit
      quizId={selectedQuizId}
      onClose={() => setActiveSection('quizzes')}
    />
  ) : (
    <QuizzesContent
      onCreateQuiz={() => setActiveSection('quiz-create')}
      onEditQuiz={(id) => {
        setSelectedQuizId(id);
        setActiveSection('quiz-edit');
      }}
    />
  );
  
  case 'quiz-create':
  return (
    <QuizForm
      theme="dark"
      onClose={() => setActiveSection('quizzes')}
    />
  );

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
          <div className="p-6 text-[var(--clr-text)] md:p-10">
            Practice content goes here.
          </div>
        );

      case 'tests':
        return (
          <div className="p-6 text-[var(--clr-text)] md:p-10">
            Tests content goes here.
          </div>
        );

      case 'coding-problems':
        return (
          <div className="p-6 text-[var(--clr-text)] md:p-10">
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
  <div className="flex h-screen overflow-hidden bg-[var(--clr-bg)]">
    <div className="hidden md:block">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
    </div>

    {mobileOpen && (
      <div
        className="fixed inset-0 z-[299] bg-black/50 backdrop-blur-sm md:hidden"
        onClick={() => setMobileOpen(false)}
      />
    )}

    <div
      className={`fixed inset-y-0 left-0 z-[300] transform transition-transform duration-300 ease-out md:hidden ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
    </div>

    <div className="flex min-w-0 flex-1 flex-col bg-[var(--clr-bg)]">
      <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />

      <main
        id="main-content"
        className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto"
      >
        {renderContent()}
      </main>
    </div>
  </div>
);
}
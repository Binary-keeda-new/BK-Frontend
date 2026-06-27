'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppAuth } from '@/providers/AppAuthProvider';

import Sidebar, { type AdminSection } from './sidebar';
import Topbar from './topbar';
import DashboardContent from './dashboardContent';
import QuestionBankPage from '@/features/admin/question-bank/pages/QuestionBankPage';
import QuestionBankDetailPage from '@/features/admin/question-bank/pages/QuestionBankDetail';
import AdminJobsPage from '@/features/admin/jobs/pages/AdminJobsPage';
import AdminBlogsPage from '@/features/admin/blogs/pages/AdminBlogsPage';
import AdminSessionsPage from '@/features/admin/sessions/pages/AdminSessionsPage';
import QuizPreviewContent from '@/features/admin/quiz/components/quizPreviewContent';
import QuizzesContent from '../../quiz/components/quizList';
import QuizEdit from '../../quiz/components/QuizEdit';
import QuizForm from '../../quiz/components/QuizForm';
import CodingProblemsPage from '@/features/admin/coding-problems/pages/codingProblemsPage';
import CodingProblemEditorPage from '@/features/admin/coding-problems/pages/codingProblemEditorPage';

interface AppShellProps {
  initialSection?: AdminSection;
  quizId?: number;
}

export default function AppShell({
  initialSection = 'dashboard',
  quizId,
}: AppShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, loading, isAdmin } = useAppAuth();

  const sectionFromUrl =
    (searchParams.get('section') as AdminSection) || initialSection;
  const quizIdFromUrl = searchParams.get('quizId');
  const questionBankIdFromUrl = searchParams.get('questionBankId');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<AdminSection>(sectionFromUrl);
  const [selectedQuestionBankId, setSelectedQuestionBankId] = useState<
    string | null
  >(questionBankIdFromUrl);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(
    quizId?.toString() || quizIdFromUrl
  );
  const [quizListRefreshKey, setQuizListRefreshKey] = useState(0);

const [testListRefreshKey, setTestListRefreshKey] = useState(0);
const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
  null
);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/auth/login');
      return;
    }

    if (!isAdmin) {
      router.replace('/user/dashboard');
    }
  }, [loading, user, isAdmin, router]);

  useEffect(() => {
    setActiveSection(sectionFromUrl);
    setSelectedQuizId(quizId?.toString() || quizIdFromUrl);
    setSelectedQuestionBankId(questionBankIdFromUrl);
  }, [sectionFromUrl, quizIdFromUrl, questionBankIdFromUrl, quizId]);

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

  const updateUrl = ({
    section,
    quizId,
    questionBankId,
  }: {
    section: AdminSection;
    quizId?: string | null;
    questionBankId?: string | null;
  }) => {
    const params = new URLSearchParams();

    params.set('section', section);

    if (quizId) {
      params.set('quizId', quizId);
    }

    if (questionBankId) {
      params.set('questionBankId', questionBankId);
    }

    router.push(`/dashboard?${params.toString()}`);
  };

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    setMobileOpen(false);

    const nextQuizId =
      section === 'quiz-edit' || section === 'quiz-preview'
        ? selectedQuizId
        : null;

    const nextQuestionBankId =
      section === 'question-bank-detail' ? selectedQuestionBankId : null;

    if (section !== 'question-bank-detail') {
      setSelectedQuestionBankId(null);
    }

    if (section !== 'quiz-edit' && section !== 'quiz-preview') {
      setSelectedQuizId(null);
    }

    updateUrl({
      section,
      quizId: nextQuizId,
      questionBankId: nextQuestionBankId,
    });
  };

  const goToQuestionBankList = () => {
    setActiveSection('question-bank');
    setSelectedQuestionBankId(null);

    updateUrl({
      section: 'question-bank',
      questionBankId: null,
    });
  };

  const goToQuizList = () => {
    setActiveSection('quizzes');
    setSelectedQuizId(null);

    updateUrl({
      section: 'quizzes',
      quizId: null,
    });
  };

  const openQuizEdit = (id: string) => {
    setSelectedQuizId(id);
    setActiveSection('quiz-edit');

    updateUrl({
      section: 'quiz-edit',
      quizId: id,
    });
  };

  const openQuizPreview = (id: string) => {
    setSelectedQuizId(id);
    setActiveSection('quiz-preview');

    updateUrl({
      section: 'quiz-preview',
      quizId: id,
    });
  };

  const openQuestionBankDetail = (id: string) => {
    setSelectedQuestionBankId(id);
    setActiveSection('question-bank-detail');

    updateUrl({
      section: 'question-bank-detail',
      questionBankId: id,
    });
  };
  
  const openCodingProblemEdit = (id: string) => {
  setSelectedProblemId(id);
  setActiveSection('coding-problem-edit');
};

  const openTestEdit = (id: string) => {
  setSelectedTestId(id);
  setActiveSection('test-edit');

  updateUrl({
    section: 'test-edit',
  });
};

  const renderContent = () => {
    switch (activeSection) {
      case 'quiz-preview':
        return selectedQuizId ? (
          <QuizPreviewContent
            quizId={selectedQuizId}
            onBack={() => {
              setQuizListRefreshKey((prev) => prev + 1);
              goToQuizList();
            }}
          />
        ) : (
          <QuizzesContent
            refreshKey={quizListRefreshKey}
            onCreateQuiz={() => handleSectionChange('quiz-create')}
            onEditQuiz={openQuizEdit}
            onPreviewQuiz={openQuizPreview}
          />
        );

      case 'quizzes':
        return (
          <QuizzesContent
            refreshKey={quizListRefreshKey}
            onCreateQuiz={() => handleSectionChange('quiz-create')}
            onEditQuiz={openQuizEdit}
            onPreviewQuiz={openQuizPreview}
          />
        );

      case 'quiz-edit':
        return selectedQuizId ? (
          <QuizEdit
            quizId={selectedQuizId}
            onClose={() => {
              setQuizListRefreshKey((prev) => prev + 1);
              goToQuizList();
            }}
          />
        ) : (
          <QuizzesContent
            refreshKey={quizListRefreshKey}
            onCreateQuiz={() => handleSectionChange('quiz-create')}
            onEditQuiz={openQuizEdit}
            onPreviewQuiz={openQuizPreview}
          />
        );

      case 'quiz-create':
        return (
          <QuizForm
            onClose={goToQuizList}
            onSuccess={() => {
              setQuizListRefreshKey((prev) => prev + 1);
              goToQuizList();
            }}
          />
        );

      case 'dashboard':
        return (
          <DashboardContent
            onOpenQuestionBank={() => handleSectionChange('question-bank')}
          />
        );

      case 'question-bank':
        return <QuestionBankPage onEditQuestionBank={openQuestionBankDetail} />;

      case 'question-bank-detail':
        return selectedQuestionBankId ? (
          <QuestionBankDetailPage
            id={selectedQuestionBankId}
            onBackToQuestionBanks={goToQuestionBankList}
          />
        ) : (
          <QuestionBankPage onEditQuestionBank={openQuestionBankDetail} />
        );

      case 'jobs':
        return <AdminJobsPage />;

      case 'blogs':
        return <AdminBlogsPage />;

      case 'sessions':
        return <AdminSessionsPage />;

      case 'practice':
        return (
          <div className="p-6 text-[var(--clr-text)] md:p-10">
            Practice content goes here.
          </div>
        );

      case 'tests':
  return (
    <div className='p-6 text-[var(--clr-text)] md:p-10'>
      test content goes here.
    </div>
  );


      /*case 'coding-problems':
        return (
          <div className="p-6 text-[var(--clr-text)] md:p-10">
            Coding problems content goes here.
          </div>
        );*/

        /*case 'coding-problems':
          return <CodingProblemsPage />;*/

        case 'coding-problems':
           return (
             <CodingProblemsPage
               onEditProblem={openCodingProblemEdit}
             />
           );

        case 'coding-problem-edit':
            return selectedProblemId ? (
              <CodingProblemEditorPage
                problemId={selectedProblemId}
              />
            ) : (
              <CodingProblemsPage
                onEditProblem={openCodingProblemEdit}
              />
            );

      default:
        return (
          <DashboardContent
            onOpenQuestionBank={() => handleSectionChange('question-bank')}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--clr-bg)] text-[var(--clr-text)]">
        Loading...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

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
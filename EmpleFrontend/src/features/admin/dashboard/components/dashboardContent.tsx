
'use client';

import { useState } from 'react';
import ActionCard from './actionCard';
import QuizForm from '../../quiz/components/QuizForm';
import { apiRequest } from '@/shared/utils/api';
import CreateCodingProblemModal from '@/features/admin/coding-problems/components/createCodingProblemModal';

type CreateQuestionBankResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

type DashboardContentProps = {
  onOpenQuestionBank: () => void;
  onCreateTest?: () => void;
};

export default function DashboardContent({
  onOpenQuestionBank,
  onCreateTest,
}: DashboardContentProps) {
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isQuizFormOpen, setIsQuizFormOpen] = useState(false);
  const [isCodingProblemOpen, setIsCodingProblemOpen] =
  useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleCreateQuiz = (): void => {
    setIsQuizFormOpen(true);
  };

  const handleCreateTest = (): void => {
  onCreateTest?.();
};


  const handleCodingProblems = (): void => {
  setIsCodingProblemOpen(true);
};

const handleCloseCodingProblem = (): void => {
  setIsCodingProblemOpen(false);
};

  const handleOpenQuestionBank = (): void => {
    setIsQuestionBankOpen(true);
  };

  const handleCloseQuestionBank = (): void => {
    if (loading) return;
    setIsQuestionBankOpen(false);
  };

  const handleQuizCreated = (): void => {
    console.log('handleQuizCreated fired');
  setIsQuizFormOpen(false);
  setSnackbarMessage('Quiz has been created successfully.');

  setTimeout(() => {
    setSnackbarMessage(null);
  }, 3000);
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
): Promise<void> => {
  e.preventDefault();

  try {
    setLoading(true);

    await apiRequest<CreateQuestionBankResponse>(
      '/api/v1/admin/question-banks',
      {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      }
    );

    setIsQuestionBankOpen(false);
    setSnackbarMessage('Question bank has been created successfully.');
    setFormData({
      title: '',
      description: '',
    });

    setTimeout(() => {
      setSnackbarMessage(null);
      onOpenQuestionBank();
    }, 3000);
  } catch (error) {
    console.error('Create question bank failed:', error);
  } finally {
    setLoading(false);
  }
};
  if (isQuizFormOpen) {
    return (
      <div className="w-full max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <QuizForm onClose={() => setIsQuizFormOpen(false)} onSuccess={handleQuizCreated} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-[22px] font-extrabold leading-tight text-[var(--clr-text)] sm:text-3xl lg:text-4xl">
            Admin <span className="text-[var(--clr-accent)]">Dashboard</span>
          </h1>

          <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--clr-text2)] sm:text-base">
            Manage your platform content and track overall performance.
          </p>
        </div>

        <div
          className="
            grid grid-cols-1 gap-3
            sm:grid-cols-2 sm:gap-4
            lg:grid-cols-4
          "
        >
          <ActionCard
            title="Create Quiz"
            description="Build interactive quizzes with various question types."
            onPrimary={handleCreateQuiz}
            onSecondary={handleCreateQuiz}
          />

          <ActionCard
            title="Create Test"
            description="Design comprehensive formal examinations and tests."
            onPrimary={handleCreateTest}
            onSecondary={handleCreateTest}
            showDocIcon
          />

          <ActionCard
            title="Add Question Bank"
            description="Manage and organise your pool of reusable questions."
            onPrimary={handleOpenQuestionBank}
            onSecondary={handleOpenQuestionBank}
            variant="bank"
          />

          <ActionCard
            title="Coding Problems"
            description="Create and manage coding challenges for technical assessments."
            onPrimary={handleCodingProblems}
            onSecondary={handleCodingProblems}
            variant="code"
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </div>

      {isQuestionBankOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-3xl bg-[var(--clr-surface,#13141b)] p-6 shadow-2xl ring-1 ring-white/10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--clr-text)]">
                  Create Question Bank
                </h3>
                <p className="mt-2 text-sm text-[var(--clr-text2)]">
                  Enter the basic details to create a new question bank.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseQuestionBank}
                className="rounded-full bg-[var(--clr-bg,#0a0b0e)] px-3 py-1 text-sm text-[var(--clr-text2)] ring-1 ring-white/10 transition hover:text-[var(--clr-text)]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter question bank title"
                  required
                  className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-[var(--clr-accent)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--clr-text)]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter question bank description"
                  rows={4}
                  required
                  className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-[var(--clr-accent)]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseQuestionBank}
                  className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-5 py-3 text-sm font-medium text-[var(--clr-text2)] ring-1 ring-white/10 transition hover:text-[var(--clr-text)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CreateCodingProblemModal
  isOpen={isCodingProblemOpen}
  onClose={handleCloseCodingProblem}
  onSuccess={() => {
    setIsCodingProblemOpen(false);

    window.location.href =
      '/dashboard?section=coding-problems';
  }}
/>


     {snackbarMessage && (
  <div className="fixed bottom-6 right-6 z-[60] rounded-2xl bg-green-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
    {snackbarMessage}
  </div>
)}
    </>
  );
}
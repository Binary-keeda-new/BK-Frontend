'use client';

import { useEffect, useRef, useState } from 'react';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';
import {
  EyeIcon,
  EditIcon,
  TrashIcon,
} from '../../dashboard/components/icons';

interface Quiz {
  _id: string;
  title: string;
  description?: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  status: 'draft' | 'published' | 'archived';
  createdAt?: string;
  updatedAt?: string;
}

type QuizzesContentProps = {
  onEditQuiz?: (quizId: string) => void;
  onCreateQuiz?: () => void;
  onPreviewQuiz?: (quizId: string) => void;
};

interface QuizListResponse {
  success: boolean;
  message: string;
  data: Quiz[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const PAGE_SIZE = 5;
const API_BASE = 'http://localhost:5000/api/v1/admin';

export default function QuizzesContent({
  onEditQuiz,
  onCreateQuiz,
  onPreviewQuiz,
}: QuizzesContentProps) {
  const [page, setPage] = useState(1);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  const [toasts, setToasts] = useState<
    { id: number; message: string; type: 'success' | 'error' }[]
  >([]);
  const toastId = useRef(0);

  const addToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const fetchQuizzes = async (currentPage: number) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/quizzes?page=${currentPage}&limit=${PAGE_SIZE}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      const result: QuizListResponse = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch quizzes');
      }

      setQuizzes(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
      setTotalItems(result.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      setQuizzes([]);
      setTotalPages(1);
      setTotalItems(0);
      addToast(
        error instanceof Error ? error.message : 'Failed to fetch quizzes',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes(page);
  }, [page]);

  const handleDeleteQuiz = async () => {
    if (!quizToDelete) return;

    try {
      setDeleteLoading(true);

      const res = await fetch(`${API_BASE}/quizzes/${quizToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to delete quiz');
      }

      addToast('Quiz deleted successfully!', 'success');
      setQuizToDelete(null);

      if (quizzes.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchQuizzes(page);
      }
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      addToast(
        error instanceof Error ? error.message : 'Failed to delete quiz',
        'error'
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDuplicateQuiz = async (quizId: string) => {
    try {
      const res = await fetch(`${API_BASE}/quizzes/${quizId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to duplicate quiz');
      }

      addToast('Quiz duplicated successfully!', 'success');
      fetchQuizzes(page);
    } catch (error) {
      console.error('Failed to duplicate quiz:', error);
      addToast(
        error instanceof Error ? error.message : 'Failed to duplicate quiz',
        'error'
      );
    }
  };

  const start = (page - 1) * PAGE_SIZE;

  return (
    <>
      <ToastContainer toasts={toasts} />

      <div className="w-full max-w-[1060px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--clr-text)] sm:text-3xl">
              Quizzes <span className="text-[var(--clr-accent)]">List</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--clr-text2)]">
              Manage and monitor all available quizzes on the platform.
            </p>
          </div>

          <button
            onClick={onCreateQuiz}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--clr-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <span className="text-base leading-none">+</span>
            Create Quiz
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--clr-border)] bg-[var(--clr-surface2)]">
                  {[
                    'Title',
                    'Category',
                    'Subcategory',
                    'Marks',
                    'Status',
                    'Actions',
                  ].map((col) => (
                    <th
                      key={col}
                      className={`px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)] ${
                        col === 'Actions' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-[var(--clr-text2)]"
                    >
                      Loading quizzes...
                    </td>
                  </tr>
                ) : quizzes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-[var(--clr-text2)]"
                    >
                      No quizzes found.
                    </td>
                  </tr>
                ) : (
                  quizzes.map((quiz) => (
                    <tr
                      key={quiz._id}
                      className="border-b border-[var(--clr-border)] transition hover:bg-[var(--clr-surface2)]"
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--clr-text)]">
                        {quiz.title}
                      </td>

                      <td className="px-4 py-3 text-[var(--clr-text2)]">
                        {quiz.category}
                      </td>

                      <td className="px-4 py-3 text-[var(--clr-text2)]">
                        {quiz.subcategory}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded-md bg-[var(--clr-accent3)] px-2 py-1 text-xs font-bold text-[var(--clr-accent)]">
                          {quiz.totalMarks}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {quiz.status === 'published' ? (
                          <span className="flex w-fit items-center gap-1 rounded-md border border-green-500/20 bg-green-500/10 px-2 py-1 text-xs font-bold text-green-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Published
                          </span>
                        ) : quiz.status === 'draft' ? (
                          <span className="flex w-fit items-center gap-1 rounded-md border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-xs font-bold text-yellow-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            Draft
                          </span>
                        ) : (
                          <span className="flex w-fit items-center gap-1 rounded-md border border-gray-500/20 bg-gray-500/10 px-2 py-1 text-xs font-bold text-gray-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Archived
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onPreviewQuiz?.(quiz._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--clr-border2)] text-[var(--clr-text3)] transition hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => onEditQuiz?.(quiz._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--clr-border2)] text-blue-500 transition hover:bg-blue-100"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDuplicateQuiz(quiz._id)}
                            className="rounded-md border px-2 py-1 text-xs font-medium text-[var(--clr-text2)] transition hover:bg-[var(--clr-surface2)]"
                          >
                            Duplicate
                          </button>

                          <button
                            onClick={() => setQuizToDelete(quiz)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-500 transition hover:bg-red-100"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--clr-border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-[var(--clr-text3)]">
              {totalItems === 0
                ? 'Showing 0 results'
                : `Showing ${start + 1} to ${Math.min(
                    start + quizzes.length,
                    totalItems
                  )} of ${totalItems}`}
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-md border px-3 py-1 text-sm disabled:opacity-40"
              >
                Prev
              </button>

              <button className="rounded-md bg-[var(--clr-accent)] px-3 py-1 text-sm font-bold text-white">
                {page}
              </button>

              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-md border px-3 py-1 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {quizToDelete && (
          <>
            <div
              onClick={() => !deleteLoading && setQuizToDelete(null)}
              className="fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm"
            />

            <div className="fixed left-1/2 top-1/2 z-[401] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--clr-border2)] bg-[var(--clr-surface)] p-6 shadow-2xl">
              <h3 className="mb-2 text-lg font-bold text-[var(--clr-text)]">
                Delete Quiz
              </h3>

              <p className="mb-4 text-sm text-[var(--clr-text2)]">
                Delete <strong>{quizToDelete.title}</strong>?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setQuizToDelete(null)}
                  disabled={deleteLoading}
                  className="rounded-full border px-4 py-2 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteQuiz}
                  disabled={deleteLoading}
                  className="rounded-full bg-red-500 px-4 py-2 text-white disabled:opacity-60"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import ConfirmDeleteModal from '../components/confirmDeleteModal';
import { apiRequest } from '@/shared/utils/api';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface CodingProblem {
  _id: string;
  title: string;
  difficulty: string;
  topics?: string[];
  status: string;
}

interface CodingProblemsPageProps {
  onEditProblem: (id: string) => void;
  onPreviewProblem: (
    id: string
  ) => void;
}

export default function CodingProblemsPage({
  onEditProblem,
  onPreviewProblem,
}: CodingProblemsPageProps) {
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [problemToDelete, setProblemToDelete] =
  useState<CodingProblem | null>(null);

const [isDeleting, setIsDeleting] =
  useState(false);

  const fetchProblems = async () => {
  try {
    const data = await apiRequest<{ data: CodingProblem[] }>('/api/v1/admin/coding-problems');
    setProblems(data.data || []);
  } catch (error) {
    console.error(
      'Failed to fetch coding problems:',
      error
    );
  } finally {
    setLoading(false);
  }
};

const handleDeleteProblem = async () => {
  if (!problemToDelete) return;

  try {
    setIsDeleting(true);

    await apiRequest(`/api/v1/admin/coding-problems/${problemToDelete._id}`, {
      method: 'DELETE',
    });

    setProblems((prev) =>
      prev.filter(
        (problem) =>
          problem._id !== problemToDelete._id
      )
    );

    setProblemToDelete(null);
  } catch (error) {
    console.error(error);
    alert('Failed to delete problem.');
  } finally {
    setIsDeleting(false);
  }
};

  useEffect(() => {
    const fetchProblemsList = async () => {
      try {
        const data = await apiRequest<{ data: CodingProblem[] }>('/api/v1/admin/coding-problems');
        setProblems(data.data || []);
      } catch (error) {
        console.error('Failed to fetch coding problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemsList();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-[var(--clr-text)]">
          Loading coding problems...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--clr-text)]">
            Coding Problems
          </h1>

          <p className="mt-1 text-sm text-[var(--clr-text2)]">
            Manage and edit coding challenges.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--clr-border)]">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Difficulty
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Topics
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {problems.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-[var(--clr-text2)]"
                >
                  No coding problems found.
                </td>
              </tr>
            ) : (
              problems.map((problem) => (
                <tr
                  key={problem._id}
                  className="border-b border-[var(--clr-border)] last:border-0"
                >
                  <td className="px-6 py-4 font-medium text-[var(--clr-text)]">
                    {problem.title}
                  </td>

                  <td className="px-6 py-4 text-[var(--clr-text)]">
                    {problem.difficulty}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {problem.topics?.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-[var(--clr-accent)]/10 px-2 py-1 text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-500">
                      {problem.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                         onPreviewProblem(
                           problem._id
                         )
                       }
                        className="text-[var(--clr-text2)] transition hover:text-blue-500"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditProblem(problem._id)}
                        className="text-[var(--clr-text2)] transition hover:text-green-500"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                         onClick={() =>
                           setProblemToDelete(problem)
                         }
                         className="text-[var(--clr-text2)] transition hover:text-red-500"
                       >  
                       <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        open={!!problemToDelete}
        title="Delete Coding Problem"
        message={`Are you sure you want to delete "${problemToDelete?.title}"? This action cannot be undone.`}
        loading={isDeleting}
        onCancel={() =>
          setProblemToDelete(null)
        }
        onConfirm={handleDeleteProblem}
      />
    </div>
  );
}
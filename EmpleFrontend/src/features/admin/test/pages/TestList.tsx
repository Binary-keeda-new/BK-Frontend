'use client';

import { useEffect, useRef, useState } from 'react';
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';
import { EyeIcon, EditIcon, TrashIcon } from '../../dashboard/components/icons';
import { apiRequest } from '@/shared/utils/api';
import CreateTest from '../components/CreateTest';

interface Test {
  _id: string;
  title: string;
  description?: string;
  totalSections: number;
  status?: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

type TestsContentProps = {
  refreshKey?: number;
  onEditTest?: (testId: string) => void;
  onPreviewTest?: (testId: string) => void;
};

interface TestListResponse {
  success: boolean;
  message: string;
  data: Test[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const PAGE_SIZE = 5;

export default function TestsContent({
  refreshKey,
  onEditTest,
  onPreviewTest,
}: TestsContentProps) {
  const [page, setPage] = useState(1);
  const [tests, setTests] = useState<Test[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [testToDelete, setTestToDelete] = useState<Test | null>(null);

  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false);
  const [localRefreshKey, setLocalRefreshKey] = useState(0);

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

  const buildTestListPath = (currentPage: number) => {
    const params = new URLSearchParams({
      page: String(currentPage),
      limit: String(PAGE_SIZE),
    });

    if (search.trim()) params.set('search', search.trim());

    return `/api/v1/admin/tests?${params.toString()}`;
  };

  const fetchTests = async (currentPage: number) => {
    try {
      setLoading(true);

      const result = await apiRequest<TestListResponse>(
        buildTestListPath(currentPage),
        {
          method: 'GET',
        }
      );

      setTests(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
      setTotalItems(result.pagination?.total || 0);
    } catch (error) {
      console.error('Failed to fetch tests:', error);
      setTests([]);
      setTotalPages(1);
      setTotalItems(0);
      addToast(
        error instanceof Error ? error.message : 'Failed to fetch tests',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests(page);
  }, [page, search, refreshKey, localRefreshKey]);

  const handleSearchSubmit = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSearch('');
    setPage(1);
  };

  const handleDeleteTest = async () => {
    if (!testToDelete) return;

    try {
      setDeleteLoading(true);

      await apiRequest<{ success: boolean; message: string }>(
        `/api/v1/admin/tests/${testToDelete._id}`,
        {
          method: 'DELETE',
        }
      );

      addToast('Test deleted successfully!', 'success');
      setTestToDelete(null);

      if (tests.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        fetchTests(page);
      }
    } catch (error) {
      console.error('Failed to delete test:', error);
      addToast(
        error instanceof Error ? error.message : 'Failed to delete test',
        'error'
      );
    } finally {
      setDeleteLoading(false);
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
              Tests <span className="text-[var(--clr-accent)]">List</span>
            </h1>
            <p className="mt-1 text-sm text-[var(--clr-text2)]">
              Manage MCQ and coding based tests on the platform.
            </p>
          </div>

          <button
            onClick={() => setIsCreateTestOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--clr-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <span className="text-base leading-none">+</span>
            Create Test
          </button>
        </div>

        <div className="mb-5 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4">
          <div className="grid gap-3 md:grid-cols-[1.5fr_auto]">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit();
              }}
              placeholder="Search by test title..."
              className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-4 py-2.5 text-sm text-[var(--clr-text)] outline-none"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSearchSubmit}
                className="rounded-xl bg-[var(--clr-accent)] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Search
              </button>
              <button
                onClick={handleResetFilters}
                className="rounded-xl border border-[var(--clr-border)] px-4 py-2.5 text-sm font-semibold text-[var(--clr-text2)]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--clr-border)] bg-[var(--clr-surface2)]">
                  {['Title', 'Description', 'Sections', 'Status', 'Actions'].map(
                    (col) => (
                      <th
                        key={col}
                        className={`px-4 py-3 text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)] ${
                          col === 'Actions' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-[var(--clr-text2)]"
                    >
                      Loading tests...
                    </td>
                  </tr>
                ) : tests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-[var(--clr-text2)]"
                    >
                      No tests found.
                    </td>
                  </tr>
                ) : (
                  tests.map((test) => (
                    <tr
                      key={test._id}
                      className="border-b border-[var(--clr-border)] transition hover:bg-[var(--clr-surface2)]"
                    >
                      <td className="px-4 py-3 font-semibold text-[var(--clr-text)]">
                        {test.title}
                      </td>

                      <td className="max-w-[280px] truncate px-4 py-3 text-[var(--clr-text2)]">
                        {test.description || '-'}
                      </td>

                      <td className="px-4 py-3">
                        <span className="rounded-md bg-[var(--clr-accent3)] px-2 py-1 text-xs font-bold text-[var(--clr-accent)]">
                          {test.totalSections ?? 0}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-[var(--clr-text2)]">
                        {test.status || 'draft'}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => onPreviewTest?.(test._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--clr-border2)] text-[var(--clr-text3)] transition hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => onEditTest?.(test._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--clr-border2)] text-blue-500 transition hover:bg-blue-100"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => setTestToDelete(test)}
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
                    start + tests.length,
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

        <CreateTest
          isOpen={isCreateTestOpen}
          onClose={() => setIsCreateTestOpen(false)}
          onSuccess={() => {
            setIsCreateTestOpen(false);
            setLocalRefreshKey((prev) => prev + 1);
            addToast('Test created successfully!', 'success');
          }}
        />

        {testToDelete && (
          <>
            <div
              onClick={() => !deleteLoading && setTestToDelete(null)}
              className="fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm"
            />

            <div className="fixed left-1/2 top-1/2 z-[401] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--clr-border2)] bg-[var(--clr-surface)] p-6 shadow-2xl">
              <h3 className="mb-2 text-lg font-bold text-[var(--clr-text)]">
                Delete Test
              </h3>

              <p className="mb-2 text-sm text-[var(--clr-text2)]">
                Delete <strong>{testToDelete.title}</strong>?
              </p>

              <p className="mb-4 text-xs text-[var(--clr-text3)]">
                Tests with submissions cannot be deleted.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setTestToDelete(null)}
                  disabled={deleteLoading}
                  className="rounded-full border px-4 py-2 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDeleteTest}
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
'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTestSectionReview, type TestSectionReviewResponse } from '../services/test.service';
import type { UserTestSection } from '../types/test.types';

type Props = {
  attemptId: string;
  section: UserTestSection;
  sectionIndex: number;
  onBack: () => void;
};

export default function TestCodingReview({
  attemptId,
  section,
  sectionIndex,
  onBack,
}: Props) {
  const [review, setReview] = useState<TestSectionReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const problems = section.codingProblemIds || [];

  useEffect(() => {
    const loadReview = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getTestSectionReview(attemptId, section._id);
        setReview(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load coding review');
      } finally {
        setLoading(false);
      }
    };

    void loadReview();
  }, [attemptId, section._id]);

  const submissions = review?.codingSubmissions || [];

  const submissionByProblemId = useMemo(() => {
    return submissions.reduce<Record<string, (typeof submissions)[number]>>(
      (map, submission) => {
        map[String(submission.problemId)] = submission;
        return map;
      },
      {}
    );
  }, [submissions]);

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <button
        onClick={onBack}
        className="mb-5 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted2)]"
      >
        Back to Review Sections
      </button>

      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="text-xs font-semibold tracking-[0.08em] text-sky-400">
          SECTION {sectionIndex + 1}
        </p>

        <h1 className="mt-2 text-2xl font-extrabold text-[var(--text)]">
          Coding Review
        </h1>

        {loading ? (
          <p className="mt-4 text-sm text-[var(--muted2)]">Loading review...</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        ) : !problems.length ? (
          <p className="mt-4 text-sm text-[var(--muted2)]">
            No coding problems found for this section.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {problems.map((problem, index) => {
              const submission = submissionByProblemId[problem._id];

              return (
                <div
                  key={problem._id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5"
                >
                  <p className="text-xs font-semibold text-sky-400">
                    Problem {index + 1}
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-[var(--text)]">
                    {problem.title}
                  </h2>

                  <p className="mt-2 text-sm text-[var(--muted2)]">
                    {problem.difficulty} · {problem.recommendedTime} min
                  </p>

                  {!submission ? (
                    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted2)]">
                      No submission found for this problem.
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text)]">
                        <p>
                          <span className="font-semibold">Language:</span>{' '}
                          {submission.language || '-'}
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold">Result:</span>{' '}
                          {submission.accepted ? 'Accepted' : 'Not Accepted'}
                        </p>
                        <p className="mt-1">
                          <span className="font-semibold">Passed:</span>{' '}
                          {submission.passedCount || 0} / {submission.totalCount || 0}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[var(--border)] bg-black/30 p-4">
                        <p className="mb-2 text-xs font-semibold text-[var(--muted2)]">
                          Submitted Code
                        </p>
                        <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-xs text-[var(--text)]">
                          {submission.sourceCode || '-'}
                        </pre>
                      </div>

                      {submission.results?.length ? (
                        <div className="space-y-2">
                          {submission.results.map((result: any, resultIndex: number) => (
                            <div
                              key={`${problem._id}-${resultIndex}`}
                              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--muted2)]"
                            >
                              <p
                                className={
                                  result.passed ? 'text-emerald-400' : 'text-red-400'
                                }
                              >
                                Test Case {resultIndex + 1}:{' '}
                                {result.passed ? 'Passed' : 'Failed'}
                              </p>

                              <p className="mt-2">
                                <span className="font-semibold text-[var(--text)]">
                                  Input:
                                </span>{' '}
                                {result.input || '-'}
                              </p>

                              <p className="mt-1">
                                <span className="font-semibold text-[var(--text)]">
                                  Expected:
                                </span>{' '}
                                {result.expectedOutput || '-'}
                              </p>

                              <p className="mt-1">
                                <span className="font-semibold text-[var(--text)]">
                                  Output:
                                </span>{' '}
                                {result.actualOutput || '-'}
                              </p>

                              {result.status?.description && (
                                <p className="mt-1">
                                  <span className="font-semibold text-[var(--text)]">
                                    Status:
                                  </span>{' '}
                                  {result.status.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
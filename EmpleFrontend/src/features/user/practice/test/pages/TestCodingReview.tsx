import { useEffect, useState } from 'react';
import { getTestSectionReview } from '../services/test.service';
import type { UserTestSection } from '../types/test.types';
import type { TestCodingReviewItem } from '../services/test.service';

type Props = {
  attemptId: string;
  section: UserTestSection;
  sectionIndex: number;
  onBack: () => void;
};

type CodingReviewData = {
  attemptId: string;
  sectionId: string;
  type: 'coding';
  submissions: TestCodingReviewItem[];
};

export default function TestCodingReview({
  attemptId,
  section,
  sectionIndex,
  onBack,
}: Props) {
  const [review, setReview] = useState<CodingReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReview = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getTestSectionReview(attemptId, section._id);
        setReview(data as unknown as CodingReviewData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load coding review');
      } finally {
        setLoading(false);
      }
    };

    void loadReview();
  }, [attemptId, section._id]);

  const submissions = review?.submissions || [];

  return (
    <main className="mx-auto w-full max-w-5xl p-6">
      <button
        onClick={onBack}
        className="mb-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--muted2)] hover:bg-[var(--surface2)]"
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
        ) : submissions.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted2)]">
            No coding submissions found for this section.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {submissions.map((submission, index) => {
              const problem = submission.problem || {};
              const title = problem.title || `Problem ${index + 1}`;

              return (
                <div
                  key={submission.problemId || index}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-sky-400">
                        Problem {index + 1}
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-[var(--text)]">
                        {title}
                      </h2>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[var(--text)]">
                        Score: {submission.score || 0} / {submission.maxMarks || 0}
                      </p>
                      <span className="mt-1 inline-block rounded-md bg-[var(--bg)] px-2 py-1 text-xs text-[var(--muted2)] capitalize">
                        {submission.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text)]">
                      <p>
                        <span className="font-semibold text-[var(--muted2)]">Language:</span>{' '}
                        {submission.language || '-'}
                      </p>
                      <p className="mt-1">
                        <span className="font-semibold text-[var(--muted2)]">Test Cases:</span>{' '}
                        <span className="text-emerald-500 font-bold">{submission.passedTestCases || 0}</span> / {submission.totalTestCases || 0} Passed
                      </p>
                      
                      {submission.status === 'internal_error' && (
                        <p className="mt-2 text-amber-500">
                          Execution encountered an infrastructure error. Technical review required.
                        </p>
                      )}
                    </div>

                    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted2)]">
                        Submitted Code
                      </p>
                      {submission.sourceCode ? (
                        <pre className="max-h-[500px] overflow-auto whitespace-pre text-[13px] leading-relaxed text-[var(--text)]">
                          {submission.sourceCode}
                        </pre>
                      ) : (
                        <p className="text-sm text-[var(--muted2)] italic">No code was submitted.</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
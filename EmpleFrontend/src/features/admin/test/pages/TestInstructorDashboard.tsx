'use client';


import { useEffect, useState } from 'react';
import { getAdminTestReport } from './adminTestReport.service';
import type { TestReport } from './testReport.types';
import TestMCQAnalytics from '../components/TestMCQAnalytics';
import TestOverview from '../components/TestOverview';
import ScoreDistributionChart from '../components/ScoreDistributionChart';
import SubmissionTimelineChart from '../components/SubmissionTimelineChart'; 

type Props = {
  testId: string;
  onBack: () => void;
  onReviewAttempt?: (attemptId: string) => void;
};

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'mcq', label: 'MCQ Analytics' },
  { id: 'coding', label: 'Coding Analytics' },
  { id: 'leaderboard', label: 'Leaderboard' },
] as const;

type TabId = (typeof tabs)[number]['id'];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
      {children}
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold text-[var(--clr-accent)]">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-[var(--clr-text3)]">{sub}</p>}
    </div>
  );
}

function formatDuration(seconds: number) {
  if (!seconds) return '0m';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}


export default function TestInstructorDashboard({
  testId,
  onBack,
  onReviewAttempt,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [report, setReport] = useState<TestReport | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  getAdminTestReport(testId)
    .then(setReport)
    .finally(() => setLoading(false));
}, [testId]);

if (loading) {
  return <div className="p-8 text-[var(--clr-text2)]">Loading test report...</div>;
}

if (!report) {
  return <div className="p-8 text-[var(--clr-text2)]">No report found.</div>;
}

  return (
    <div className="w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <button
        onClick={onBack}
        className="mb-5 rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm font-semibold text-[var(--clr-text2)] transition hover:bg-[var(--clr-surface2)]"
      >
        Back to tests
      </button>

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--clr-text3)]">
          Assessment Analytics
        </p>

        <h1 className="mt-1 text-2xl font-extrabold text-[var(--clr-text)] sm:text-3xl">
          {report.test.title} <span className="text-[var(--clr-accent)]">Report</span>
        </h1>

        <p className="mt-1 text-sm text-[var(--clr-text2)]">
          {report.test.description || 'Mixed assessment analytics for MCQ and coding sections.'}
        </p>

        <p className="mt-1 text-xs text-[var(--clr-text3)]">
          Test ID: {testId}
        </p>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <MetricCard label="Total Attempts" value={report.summary.totalAttempts} sub="All attempts" />
        <MetricCard label="MCQ Sections" value={report.summary.mcqSections} sub="Question-based sections" />
        <MetricCard label="Coding Sections" value={report.summary.codingSections} sub="Coding rounds" />
        <MetricCard label="Average Score" value={report.summary.averageScore} sub="Across attempts" />
        <MetricCard label="Completion" value={`${report.summary.completionRate}%`} sub={`${report.summary.submittedAttempts} submitted`} />
        <MetricCard label="Avg Duration" value={formatDuration(report.summary.averageDurationSeconds)} sub="Per attempt" />
      </div>

      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              activeTab === tab.id
                ? 'bg-[var(--clr-accent)] text-white'
                : 'text-[var(--clr-text2)] hover:bg-[var(--clr-surface2)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
  <div className="flex flex-col gap-5">
    <TestOverview report={report} />

    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <ScoreDistributionChart leaderboard={report.leaderboard} />
      </Card>
      <Card>
        <h2 className="text-lg font-bold text-[var(--clr-text)]">
          AI Summary
        </h2>
        <p className="mt-2 text-sm text-[var(--clr-text2)]">
          AI-generated faculty summary will come here after backend report
          aggregation is connected.
        </p>
      </Card>
    </div>
  </div>
)}

      {activeTab === 'mcq' && (
  <TestMCQAnalytics
    questionAccuracy={report.mcq.questionAccuracy}
  />
)}

      {activeTab === 'coding' && (
  <div className="flex flex-col gap-5">
    <div className="grid gap-4 md:grid-cols-6">
      <MetricCard
        label="Coding Submissions"
        value={report.coding.totalSubmissions}
        sub="Submitted solutions"
      />

      <MetricCard
        label="Accepted"
        value={report.coding.acceptedSubmissions}
        sub={`${report.coding.acceptanceRate}% acceptance`}
      />

      <MetricCard
        label="Acceptance Rate"
        value={`${report.coding.acceptanceRate}%`}
        sub="Across all coding problems"
      />

      <MetricCard
        label="Avg Exec Time"
        value={`${report.coding.avgExecTimeMs}s`}
        sub="Per test case"
      />

      <MetricCard
        label="Avg Memory"
        value={`${report.coding.avgMemoryKb}KB`}
        sub="Per test case"
      />

      <MetricCard
        label="Avg Attempts"
        value={report.coding.avgAttemptsPerProblem}
        sub="Per problem"
      />
    </div>
    
    <Card>
      <SubmissionTimelineChart timeline={report.coding.submissionTimeline} />
    </Card>

    <Card>
      <h2 className="text-lg font-bold text-[var(--clr-text)]">
        Language Distribution
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--clr-border)]">
              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                Language
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                Submissions
              </th>
            </tr>
          </thead>

          <tbody>
            {report.coding.languageDistribution.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-3 py-6 text-center text-[var(--clr-text2)]"
                >
                  No coding submissions yet.
                </td>
              </tr>
            ) : (
              report.coding.languageDistribution.map((item) => (
                <tr
                  key={item.language}
                  className="border-b border-[var(--clr-border)]"
                >
                  <td className="px-3 py-3 text-[var(--clr-text)]">
                    {item.language}
                  </td>

                  <td className="px-3 py-3 font-bold text-[var(--clr-accent)]">
                    {item.count}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>

    <Card>
  <h2 className="text-lg font-bold text-[var(--clr-text)]">
    Problem-wise Coding Analytics
  </h2>

  <div className="mt-4 overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-[var(--clr-border)]">
          {[
            'Problem',
            'Total Submissions',
            'Accepted',
            'Acceptance Rate',
            'Average Time',
          ].map((h) => (
            <th
              key={h}
              className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {report.coding.problemWiseAnalytics.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="px-3 py-6 text-center text-[var(--clr-text2)]"
            >
              No coding submissions yet.
            </td>
          </tr>
        ) : (
          report.coding.problemWiseAnalytics.map((problem) => (
            <tr
              key={problem.problemId}
              className="border-b border-[var(--clr-border)]"
            >
              <td className="px-3 py-3">
  <p className="font-semibold text-[var(--clr-text)]">
    {problem.problemTitle}
  </p>
  <p className="text-xs text-[var(--clr-text3)]">
    {problem.difficulty || problem.problemId}
  </p>
</td>

              <td className="px-3 py-3 text-[var(--clr-text2)]">
                {problem.total}
              </td>

              <td className="px-3 py-3 text-emerald-500 font-bold">
                {problem.accepted}
              </td>

              <td className="px-3 py-3 font-bold text-[var(--clr-accent)]">
                {problem.acceptanceRate}%
              </td>

              <td className="px-3 py-3 text-[var(--clr-text2)]">
                {problem.averageTimeTakenSeconds
                  ? `${Math.floor(problem.averageTimeTakenSeconds / 60)
                      .toString()
                      .padStart(2, '0')}:${(problem.averageTimeTakenSeconds % 60)
                      .toString()
                      .padStart(2, '0')}`
                  : '00:00'}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</Card>
  </div>
)}

      {activeTab === 'leaderboard' && (
  <Card>
    <h2 className="text-lg font-bold text-[var(--clr-text)]">
      Leaderboard
    </h2>

    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--clr-border)]">
            {['Rank', 'User', 'Score', 'Submitted At', 'Review'].map((h) => (
              <th
                key={h}
                className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {report.leaderboard.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-center text-[var(--clr-text2)]">
                No submitted attempts yet.
              </td>
            </tr>
          ) : (
            report.leaderboard.map((student) => (
              <tr key={student.attemptId} className="border-b border-[var(--clr-border)]">
                <td className="px-3 py-3 font-bold text-[var(--clr-text)]">
                  #{student.rank}
                </td>
                <td className="px-3 py-3 text-[var(--clr-text2)]">
                  {student.email}
                </td>
                <td className="px-3 py-3 font-bold text-[var(--clr-accent)]">
                  {student.score}
                </td>
                <td className="px-3 py-3 text-[var(--clr-text3)]">
                  {student.submittedAt
                    ? new Date(student.submittedAt).toLocaleString()
                    : '-'}
                </td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => onReviewAttempt?.(student.attemptId)}
                    className="rounded-lg border border-[var(--clr-border)] px-3 py-1.5 text-xs font-bold text-[var(--clr-text2)]"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </Card>
)}
    </div>
  );
}
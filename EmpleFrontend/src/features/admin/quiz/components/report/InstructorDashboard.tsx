'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';

import { getAdminQuizReport } from './adminQuizReport.service';
import type { QuizReport } from './quizReport.types';
import { Eye } from 'lucide-react';

type Props = {
  quizId: string;
  onBack: () => void;
  onReviewAttempt?: (attemptId: string) => void;
};

const CHART_COLORS = {
  blue: '#3B82F6',
  purple: '#8B5CF6',
  green: '#10B981',
  orange: '#F97316',
  red: '#EF4444',
  cyan: '#06B6D4',
  card: '#172033',
  grid: '#243050',
  muted: '#94A3B8',
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-4">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
        {children}
      </div>
      {sub && <div className="mt-1 text-xs text-[var(--clr-text3)]">{sub}</div>}
    </div>
  );
}

function ProgressBar({
  value,
  max = 100,
  color = CHART_COLORS.blue,
}: {
  value: number;
  max?: number;
  color?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--clr-border)]">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
  color = CHART_COLORS.blue,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div
      className="rounded-2xl border border-[var(--clr-border)] bg-[#172033] p-4 shadow-sm"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold" style={{ color }}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-[var(--clr-text3)]">{sub}</p>}
    </div>
  );
}

function getAccuracyColor(value: number) {
  if (value >= 70) return CHART_COLORS.green;
  if (value >= 45) return CHART_COLORS.orange;
  return CHART_COLORS.red;
}

export default function InstructorDashboard({ quizId, onBack, onReviewAttempt }: Props) {
  const [report, setReport] = useState<QuizReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeQ, setActiveQ] = useState<string | null>(null);

  useEffect(() => {
    getAdminQuizReport(quizId)
      .then(setReport)
      .finally(() => setLoading(false));
  }, [quizId]);

  if (loading) {
    return (
      <div className="w-full max-w-[1060px] px-4 py-8 text-[var(--clr-text2)]">
        Loading report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="w-full max-w-[1060px] px-4 py-8 text-[var(--clr-text2)]">
        No report found.
      </div>
    );
  }

  const questionChartData = report.questionAccuracy.map((q) => ({
    name: q.q,
    accuracy: q.accuracy,
    skipped: q.skipped,
  }));

  const scatterData = report.questionAccuracy.map((q) => ({
    name: q.q,
    accuracy: q.accuracy,
    skipped: q.skipped,
  }));

  const optionDistData = report.questionAccuracy.map((q) => ({
    q: q.q,
    ...q.optionDistribution,
  }));

  return (
    <div className="w-full max-w-[1060px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <button
        onClick={onBack}
        className="mb-5 rounded-xl border border-[var(--clr-border)] px-4 py-2 text-sm font-semibold text-[var(--clr-text2)] transition hover:bg-[var(--clr-surface2)]"
      >
        Back to quizzes
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[var(--clr-text)] sm:text-3xl">
          Quiz <span className="text-[#F97316]">Report</span>
        </h1>
        <p className="mt-1 text-sm text-[var(--clr-text2)]">
          Student attempt analytics and question-wise performance.
        </p>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Attempts"
          value={report.summary.totalAttempts}
          sub="Submitted attempts"
          color={CHART_COLORS.blue}
        />
        <MetricCard
          label="Total Questions"
          value={report.summary.totalQuestions}
          sub="In this quiz"
          color={CHART_COLORS.purple}
        />
        <MetricCard
          label="Max Marks"
          value={report.summary.maxMarks}
          sub="Total possible score"
          color={CHART_COLORS.green}
        />
        <MetricCard
          label="Average Score"
          value={report.summary.averageScore}
          sub="Across all attempts"
          color={CHART_COLORS.orange}
        />
      </div>

      <div className="flex flex-col gap-5">
        <Card>
          <SectionTitle sub="Per-question breakdown from student attempts">
            Question Intelligence
          </SectionTitle>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--clr-border)]">
                  {[
                    'Q#',
                    'Question',
                    'Type',
                    'Accuracy',
                    'Attempted',
                    'Correct',
                    'Incorrect',
                    'Skipped',
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
                {report.questionAccuracy.map((row) => {
                  const accuracyColor = getAccuracyColor(row.accuracy);

                  return (
                    <tr
                      key={row.questionId}
                      onClick={() =>
                        setActiveQ(
                          activeQ === row.questionId ? null : row.questionId
                        )
                      }
                      className="cursor-pointer border-b border-[var(--clr-border)] transition hover:bg-[var(--clr-surface2)]"
                    >
                      <td className="px-3 py-3 font-bold text-[var(--clr-text)]">
                        {row.q}
                      </td>

                      <td className="max-w-[280px] px-3 py-3 text-[var(--clr-text2)]">
                        <div className="line-clamp-2">{row.question}</div>
                      </td>

                      <td className="px-3 py-3 text-[var(--clr-text2)]">
                        {row.questionType}
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex min-w-[120px] items-center gap-2">
                          <div className="flex-1">
                            <ProgressBar
                              value={row.accuracy}
                              color={accuracyColor}
                            />
                          </div>
                          <span
                            className="text-xs font-bold"
                            style={{ color: accuracyColor }}
                          >
                            {row.accuracy}%
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3 text-[var(--clr-text2)]">
                        {row.attempted}
                      </td>
                      <td className="px-3 py-3 text-emerald-500">
                        {row.correct}
                      </td>
                      <td className="px-3 py-3 text-red-500">
                        {row.incorrect}
                      </td>
                      <td className="px-3 py-3 text-orange-500">
                        {row.skipped}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <SectionTitle sub="Question accuracy and skipped count">
              Accuracy Overview
            </SectionTitle>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={questionChartData}>
                <CartesianGrid
                  stroke={CHART_COLORS.grid}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: CHART_COLORS.muted, fontSize: 11 }}
                />
                <YAxis tick={{ fill: CHART_COLORS.muted, fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: '#172033',
                    border: `1px solid ${CHART_COLORS.grid}`,
                    borderRadius: 12,
                    color: '#F1F5F9',
                  }}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                  {questionChartData.map((item) => (
                    <Cell key={item.name} fill={getAccuracyColor(item.accuracy)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <SectionTitle sub="Accuracy vs skipped questions">
              Difficulty Signal
            </SectionTitle>

            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart>
                <CartesianGrid
                  stroke={CHART_COLORS.grid}
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="accuracy"
                  name="Accuracy"
                  tick={{ fill: CHART_COLORS.muted, fontSize: 11 }}
                />
                <YAxis
                  dataKey="skipped"
                  name="Skipped"
                  tick={{ fill: CHART_COLORS.muted, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#172033',
                    border: `1px solid ${CHART_COLORS.grid}`,
                    borderRadius: 12,
                    color: '#F1F5F9',
                  }}
                />
                <Scatter data={scatterData} fill={CHART_COLORS.blue} />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <SectionTitle sub="How students selected options per question">
            Option Distribution
          </SectionTitle>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--clr-border)]">
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                    Q#
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                    Options Selected
                  </th>
                </tr>
              </thead>

              <tbody>
                {optionDistData.map((row) => {
                  const { q, ...options } = row;

                  return (
                    <tr key={q} className="border-b border-[var(--clr-border)]">
                      <td className="px-3 py-3 font-bold text-[var(--clr-text)]">
                        {q}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(options).map(([option, count]) => (
                            <span
                              key={option}
                              className="rounded-full bg-[#172033] px-3 py-1 text-xs font-semibold text-[var(--clr-text2)]"
                            >
                              {option}: {count as number}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SectionTitle sub="Students ranked by marks obtained">
            Leaderboard
          </SectionTitle>

          <div className="overflow-x-auto">
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
                {report.leaderboard.map((student) => (
                  <tr
                    key={student.userId}
                    className="border-b border-[var(--clr-border)] transition hover:bg-[var(--clr-surface2)]"
                  >
                    <td className="px-3 py-3 font-bold text-[var(--clr-text)]">
                      #{student.rank}
                    </td>
                    <td className="px-3 py-3 text-[var(--clr-text2)]">
                      {student.email}
                    </td>
                    <td className="px-3 py-3 font-bold text-[#F97316]">
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
    title="View Review"
    className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--clr-border2)] text-[var(--clr-text3)] transition hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]"
  >
    <Eye className="h-4 w-4" />
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
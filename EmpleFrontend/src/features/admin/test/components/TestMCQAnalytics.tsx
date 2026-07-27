'use client';

import React, {  useState } from 'react';
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


type Props = {
  questionAccuracy: any[];
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

// function MetricCard({
//   label,
//   value,
//   sub,
//   color = CHART_COLORS.blue,
// }: {
//   label: string;
//   value: string | number;
//   sub?: string;
//   color?: string;
// }) {
//   return (
//     <div
//       className="rounded-2xl border border-[var(--clr-border)] bg-[#172033] p-4 shadow-sm"
//       style={{ borderLeft: `4px solid ${color}` }}
//     >
//       <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--clr-text3)]">
//         {label}
//       </p>
//       <p className="mt-2 text-2xl font-extrabold" style={{ color }}>
//         {value}
//       </p>
//       {sub && <p className="mt-1 text-xs text-[var(--clr-text3)]">{sub}</p>}
//     </div>
//   );
// }

function getAccuracyColor(value: number) {
  if (value >= 70) return CHART_COLORS.green;
  if (value >= 45) return CHART_COLORS.orange;
  return CHART_COLORS.red;
}

export default function TestMCQAnalytics({ questionAccuracy }: Props) {
  const [activeQ, setActiveQ] = useState<string | null>(null);

 



 const questionChartData = questionAccuracy.map((q) => ({
  name: q.q,
  accuracy: q.accuracy,
  skipped: q.skipped,
}));

const scatterData = questionAccuracy.map((q) => ({
  name: q.q,
  accuracy: q.accuracy,
  skipped: q.skipped,
}));

const optionDistData = questionAccuracy.map((q) => ({
  q: q.q,
  ...q.optionDistribution,
}));

  return (
    

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
                {questionAccuracy.map((row) => {
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
      </div>
  );
}
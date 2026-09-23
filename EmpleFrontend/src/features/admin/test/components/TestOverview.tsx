import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Target, CheckCircle2, XCircle, TrendingUp, AlertTriangle, Code2 } from 'lucide-react';
import type { TestReport } from '../pages/testReport.types';

type Props = {
  report: TestReport;
};

const COLORS = ['#F15A22', '#FDF2E9'];

export default function TestOverview({ report }: Props) {
  const { summary, leaderboard } = report;

  const scoreDistribution = useMemo(() => {
    const maxScore = summary.averageScore > 0 ? Math.max(...leaderboard.map(item => item.score), 100) : 100;
    
    // Create 5 buckets: 0-20%, 21-40%, 41-60%, 61-80%, 81-100%
    const buckets = [
      { range: '0-20%', min: 0, max: 20, count: 0 },
      { range: '21-40%', min: 21, max: 40, count: 0 },
      { range: '41-60%', min: 41, max: 60, count: 0 },
      { range: '61-80%', min: 61, max: 80, count: 0 },
      { range: '81-100%', min: 81, max: 100, count: 0 },
    ];

    leaderboard.forEach(item => {
      const percentage = (item.score / (maxScore || 1)) * 100;
      const bucket = buckets.find(b => percentage >= b.min && percentage <= b.max);
      if (bucket) {
        bucket.count += 1;
      }
    });

    return buckets;
  }, [leaderboard, summary.averageScore]);

  const completionData = [
    { name: 'Completed', value: summary.submittedAttempts },
    { name: 'In Progress', value: summary.totalAttempts - summary.submittedAttempts },
  ];

  const mcqInsights = useMemo(() => {
    const arr = (report.mcq?.questionAccuracy || []) as any[];
    if (!arr.length) return null;
    
    const sorted = [...arr].sort((a, b) => b.accuracy - a.accuracy);
    const easiest = sorted[0];
    const hardest = sorted[sorted.length - 1];
    
    const avg = arr.reduce((acc, curr) => acc + curr.accuracy, 0) / arr.length;
    
    return { easiest, hardest, average: Math.round(avg) };
  }, [report.mcq]);

  const codingInsights = useMemo(() => {
    const arr = report.coding?.problemWiseAnalytics || [];
    if (!arr.length) return null;
    
    const sorted = [...arr].sort((a, b) => b.acceptanceRate - a.acceptanceRate);
    const easiest = sorted[0];
    const hardest = sorted[sorted.length - 1];
    
    const avg = arr.reduce((acc, curr) => acc + curr.acceptanceRate, 0) / arr.length;
    
    return { easiest, hardest, average: Math.round(avg) };
  }, [report.coding]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <h2 className="text-lg font-bold text-[var(--clr-text)]">Score Distribution</h2>
          <p className="mt-1 mb-6 text-sm text-[var(--clr-text2)]">
            Distribution of candidate scores as percentages of the top score.
          </p>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--clr-border)" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: 'var(--clr-text2)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--clr-text2)', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'var(--clr-surface2)' }}
                  contentStyle={{ backgroundColor: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '8px' }}
                  labelStyle={{ color: 'var(--clr-text)', fontWeight: 'bold' }}
                />
                <Bar dataKey="count" fill="var(--clr-accent)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <h2 className="text-lg font-bold text-[var(--clr-text)]">Completion Rate</h2>
          <p className="mt-1 mb-2 text-sm text-[var(--clr-text2)]">
            Ratio of submitted attempts vs total started attempts.
          </p>

          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--clr-surface)', border: '1px solid var(--clr-border)', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '13px', color: 'var(--clr-text2)' }} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-15px' }}>
              <div className="text-center">
                <span className="text-3xl font-extrabold text-[var(--clr-text)]">{summary.completionRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(mcqInsights || codingInsights) && (
        <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="text-[var(--clr-accent)]" size={20} />
            <h2 className="text-lg font-bold text-[var(--clr-text)]">Performance Insights</h2>
          </div>
          
          <div className="grid gap-5 md:grid-cols-2">
            {mcqInsights && (
              <div className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4">
                <div className="mb-3 flex items-center gap-2 text-[var(--clr-text)]">
                  <Target size={18} />
                  <h3 className="font-bold">MCQ Health</h3>
                  <span className="ml-auto rounded-full bg-[var(--clr-surface)] px-2 py-1 text-xs font-bold text-[var(--clr-accent)] border border-[var(--clr-border)]">
                    {mcqInsights.average}% Avg Accuracy
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg bg-[var(--clr-surface)] p-3 border border-[var(--clr-border)]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--clr-text3)] mb-1">
                      <CheckCircle2 size={14} className="text-green-500" />
                      HIGHEST ACCURACY
                    </div>
                    <div className="text-sm font-medium text-[var(--clr-text)] truncate">
                      {mcqInsights.easiest.q}: {mcqInsights.easiest.question}
                    </div>
                    <div className="mt-1 text-xs text-[var(--clr-text2)]">
                      <span className="font-bold text-green-500">{mcqInsights.easiest.accuracy}%</span> success rate
                    </div>
                  </div>

                  <div className="rounded-lg bg-[var(--clr-surface)] p-3 border border-[var(--clr-border)]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--clr-text3)] mb-1">
                      <AlertTriangle size={14} className="text-red-500" />
                      LOWEST ACCURACY
                    </div>
                    <div className="text-sm font-medium text-[var(--clr-text)] truncate">
                      {mcqInsights.hardest.q}: {mcqInsights.hardest.question}
                    </div>
                    <div className="mt-1 text-xs text-[var(--clr-text2)]">
                      <span className="font-bold text-red-500">{mcqInsights.hardest.accuracy}%</span> success rate
                    </div>
                  </div>
                </div>
              </div>
            )}

            {codingInsights && (
              <div className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-4">
                <div className="mb-3 flex items-center gap-2 text-[var(--clr-text)]">
                  <Code2 size={18} />
                  <h3 className="font-bold">Coding Health</h3>
                  <span className="ml-auto rounded-full bg-[var(--clr-surface)] px-2 py-1 text-xs font-bold text-[var(--clr-accent)] border border-[var(--clr-border)]">
                    {codingInsights.average}% Avg Acceptance
                  </span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="rounded-lg bg-[var(--clr-surface)] p-3 border border-[var(--clr-border)]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--clr-text3)] mb-1">
                      <CheckCircle2 size={14} className="text-green-500" />
                      HIGHEST ACCEPTANCE
                    </div>
                    <div className="text-sm font-medium text-[var(--clr-text)] truncate">
                      {codingInsights.easiest.problemTitle}
                    </div>
                    <div className="mt-1 text-xs text-[var(--clr-text2)]">
                      <span className="font-bold text-green-500">{codingInsights.easiest.acceptanceRate}%</span> success rate
                    </div>
                  </div>

                  <div className="rounded-lg bg-[var(--clr-surface)] p-3 border border-[var(--clr-border)]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--clr-text3)] mb-1">
                      <AlertTriangle size={14} className="text-red-500" />
                      LOWEST ACCEPTANCE
                    </div>
                    <div className="text-sm font-medium text-[var(--clr-text)] truncate">
                      {codingInsights.hardest.problemTitle}
                    </div>
                    <div className="mt-1 text-xs text-[var(--clr-text2)]">
                      <span className="font-bold text-red-500">{codingInsights.hardest.acceptanceRate}%</span> success rate
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

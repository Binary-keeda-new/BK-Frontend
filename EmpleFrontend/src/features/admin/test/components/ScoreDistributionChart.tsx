'use client';

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { LeaderboardItem } from '../pages/testReport.types';

type Props = {
  leaderboard: LeaderboardItem[];
};

// NOTE: buckets currently assume `score` is already on a comparable scale
// (e.g. percentage or a fixed max). TestReport has no maxMarks field today,
// so this buckets the raw score value as-is. If scores turn out to be on
// varying scales per test, this will need a maxMarks-based % conversion.
const BANDS = [
  { label: '0-20', min: 0, max: 20, color: '#EF4444' },
  { label: '21-40', min: 21, max: 40, color: '#F97316' },
  { label: '41-60', min: 41, max: 60, color: '#3B82F6' },
  { label: '61-80', min: 61, max: 80, color: '#10B981' },
  { label: '81-100', min: 81, max: 100, color: '#06B6D4' },
];

export default function ScoreDistributionChart({ leaderboard }: Props) {
  const data = BANDS.map((band) => ({
    name: band.label,
    count: leaderboard.filter(
      (student) => student.score >= band.min && student.score <= band.max
    ).length,
    color: band.color,
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-[var(--clr-text)]">
        Score Distribution
      </h2>
      <p className="mt-1 text-sm text-[var(--clr-text2)]">
        Score band distribution
      </p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 20, left: 0, right: 0 }}>
          <CartesianGrid stroke="#243050" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: '#172033',
              border: '1px solid #243050',
              borderRadius: 12,
              color: '#F1F5F9',
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
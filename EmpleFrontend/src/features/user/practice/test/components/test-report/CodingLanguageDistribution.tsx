'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { formatPercentage, LanguageAggregation } from './report.utils';
import { Terminal } from 'lucide-react';

type Props = {
  data: LanguageAggregation[];
  totalSubmissions: number;
};

// Vibrant coding language colors
const COLORS = [
  '#0EA5E9', // sky-500
  '#F59E0B', // amber-500
  '#8B5CF6', // violet-500
  '#10B981', // emerald-500
  '#F43F5E', // rose-500
  '#6366F1', // indigo-500
];

const CustomTooltip = ({ active, payload, totalSubmissions }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = totalSubmissions > 0 ? (data.count / totalSubmissions) * 100 : 0;
    
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
        <p className="font-bold text-[var(--text)]">{data.language}</p>
        <p className="mt-1 text-sm text-[var(--muted2)]">
          Submissions: <span className="font-bold text-[var(--text)]">{data.count}</span>
        </p>
        <p className="text-sm text-[var(--muted2)]">
          Share: <span className="font-bold text-[var(--text)]">{formatPercentage(percentage)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload, totalSubmissions }: any) => {
  return (
    <ul className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
      {payload.map((entry: any, index: number) => {
        const percentage = totalSubmissions > 0 ? (entry.payload.count / totalSubmissions) * 100 : 0;
        return (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span
              className="block h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="font-medium text-[var(--text)]">
              {entry.payload.language} ({formatPercentage(percentage)})
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default function CodingLanguageDistribution({ data, totalSubmissions }: Props) {
  if (!data || data.length === 0) return null;

  const isSingleLanguage = data.length === 1;

  return (
    <div className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--muted)]">
      <h3 className="mb-2 text-lg font-bold text-[var(--text)]">Language Usage</h3>
      <p className="mb-6 text-sm text-[var(--muted2)]">Languages used across coding submissions.</p>

      {isSingleLanguage ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 text-center">
          <div className="mb-4 rounded-full bg-blue-500/10 p-4 text-blue-500">
            <Terminal className="h-8 w-8" />
          </div>
          <h4 className="mb-1 text-2xl font-bold text-[var(--text)]">{data[0].language}</h4>
          <p className="text-sm text-[var(--muted2)]">
            Used for all <span className="font-bold text-[var(--text)]">{data[0].count}</span> coding submissions
          </p>
          <div className="mt-4 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-500">
            100% Share
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={5}
                dataKey="count"
                nameKey="language"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip totalSubmissions={totalSubmissions} />} />
              <Legend content={<CustomLegend totalSubmissions={totalSubmissions} />} verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AggregationResult, formatPercentage } from './report.utils';
import { Target, Hash, CheckCircle2 } from 'lucide-react';

type Props = {
  data: AggregationResult[];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as AggregationResult;
    return (
      <div className="rounded-xl  bg-[var(--surface)] p-4 shadow-lg min-w-[200px]">
        <p className="mb-3 font-bold text-[var(--text)] border-b border-[var(--border)] pb-2">{data.name}</p>
        
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--muted2)]">Accuracy:</span>
            <span className="font-bold text-[var(--text)]">{formatPercentage(data.accuracy)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted2)]">Attempted:</span>
            <span className="font-medium text-[var(--text)]">{data.attempted} / {data.total}</span>
          </div>
          <div className="flex justify-between text-emerald-500">
            <span>Correct:</span>
            <span className="font-medium">{data.correct}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Incorrect:</span>
            <span className="font-medium">{data.incorrect}</span>
          </div>
          <div className="flex justify-between text-amber-500">
            <span>Skipped:</span>
            <span className="font-medium">{data.skipped}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function McqTopicPerformance({ data }: Props) {
  if (!data || data.length === 0) return null;

  // Sort: strongest topics first
  const sortedData = [...data].sort((a, b) => b.accuracy - a.accuracy);

  const isSingleTopic = sortedData.length === 1;

  return (
    <div className="rounded-3xl  bg-[var(--surface)] p-6 shadow-sm">
      <h3 className="mb-1 text-lg font-bold text-[var(--text)]">Topic Performance</h3>
      <p className="mb-6 text-sm text-[var(--muted2)]">Accuracy breakdown by topic category.</p>

      {isSingleTopic ? (
        // Compact card for single topic
        <div className="rounded-2xl  bg-[var(--bg)] p-5">
          <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h4 className="font-bold text-[var(--text)] text-lg">{sortedData[0].name}</h4>
            <div className="flex items-center gap-2 rounded-lg bg-[var(--orange)]/10 px-3 py-1.5 text-[var(--orange)]">
              <Target className="h-4 w-4" />
              <span className="font-bold">{formatPercentage(sortedData[0].accuracy)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-[var(--muted2)]">Attempted</p>
              <p className="font-semibold text-[var(--text)] mt-0.5">{sortedData[0].attempted} / {sortedData[0].total}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted2)]">Correct</p>
              <p className="font-semibold text-emerald-500 mt-0.5">{sortedData[0].correct}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted2)]">Incorrect</p>
              <p className="font-semibold text-red-500 mt-0.5">{sortedData[0].incorrect}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted2)]">Skipped</p>
              <p className="font-semibold text-amber-500 mt-0.5">{sortedData[0].skipped}</p>
            </div>
          </div>
        </div>
      ) : (
        // Horizontal Bar Chart for multiple topics
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tick={{ fill: 'var(--muted2)', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 500 }}
                width={100}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => val.length > 15 ? val.substring(0, 12) + '...' : val}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--border)', opacity: 0.2 }} />
              <Bar 
                dataKey="accuracy" 
                fill="var(--orange)" 
                radius={[0, 4, 4, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

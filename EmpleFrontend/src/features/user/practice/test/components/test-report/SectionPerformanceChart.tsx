'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

type Props = {
  sections: Array<{
    title: string;
    accuracyOrAcceptanceRate: number;
    type: 'mcq' | 'coding';
  }>;
};

// Helper to truncate long text
const truncateText = (text: string | undefined | null, maxLength: number = 15) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Custom tooltip renderer
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isMcq = data.type === 'mcq';
    return (
      <div className="rounded-2xl /80 bg-[var(--surface)]/90 p-4 shadow-xl backdrop-blur-md">
        <p className="mb-2 font-extrabold text-[var(--text)]">{data.fullTitle}</p>
        <p className="flex items-center justify-between gap-6 text-sm">
          <span className="font-semibold uppercase tracking-wider text-[var(--muted2)] text-xs">
            {isMcq ? 'Accuracy' : 'Acceptance'}
          </span>
          <span className={`font-black text-lg ${isMcq ? 'text-emerald-500' : 'text-sky-500'}`}>
            {payload[0].value}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function SectionPerformanceChart({ sections }: Props) {
  if (!sections || sections.length === 0) return null;

  const data = sections.map((s) => ({
    name: truncateText(s.title),
    fullTitle: s.title || 'Untitled Section',
    value: s.accuracyOrAcceptanceRate,
    type: s.type,
  }));

  const useRadar = sections.length >= 4;

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        {useRadar ? (
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="var(--border)" strokeOpacity={0.5} />
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 600 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: 'var(--muted2)', fontSize: 10 }}
              tickCount={5}
              axisLine={false}
            />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#f15a22"
              strokeWidth={3}
              fill="#f15a22"
              fillOpacity={0.2}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface)', opacity: 0.4 }} />
          </RadarChart>
        ) : (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f15a22" stopOpacity={1} />
                <stop offset="100%" stopColor="#f15a22" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text)', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted2)', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface)', opacity: 0.4 }} />
            <Bar 
              dataKey="value" 
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

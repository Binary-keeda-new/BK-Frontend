'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Props = {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
};

const COLORS = {
  correct: '#10B981', // emerald-500
  incorrect: '#EF4444', // red-500
  skipped: '#F59E0B', // amber-500
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl  bg-[var(--surface)] p-3 shadow-lg">
        <p className="font-bold text-[var(--text)] capitalize">{data.name}</p>
        <p className="text-sm text-[var(--muted2)]">
          Count: <span className="font-bold text-[var(--text)]">{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom Legend to ensure text is visible and accessible
const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 text-sm mt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span 
            className="block h-3 w-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
            aria-hidden="true"
          />
          <span className="font-medium text-[var(--text)] capitalize">
            {entry.value} ({entry.payload.value})
          </span>
        </li>
      ))}
    </ul>
  );
};

export default function McqDistributionChart({ correct, incorrect, skipped, total }: Props) {
  if (total === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center rounded-2xl  bg-[var(--bg)] p-4 text-center">
        <p className="text-sm font-medium text-[var(--muted2)]">No MCQ data available</p>
      </div>
    );
  }

  const data = [
    { name: 'correct', value: correct, color: COLORS.correct },
    { name: 'incorrect', value: incorrect, color: COLORS.incorrect },
    { name: 'skipped', value: skipped, color: COLORS.skipped },
  ].filter(item => item.value > 0); // Hide zero-value slices

  return (
    <div className="flex h-[300px] w-full flex-col">
      <h3 className="sr-only">MCQ Question Distribution</h3>
      <div className="relative flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Total Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-8">
          <span className="text-3xl font-extrabold text-[var(--text)]">{total}</span>
          <span className="text-xs font-medium text-[var(--muted2)] uppercase tracking-wider">Total</span>
        </div>
      </div>
    </div>
  );
}

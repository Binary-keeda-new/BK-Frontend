'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SubmissionTimelineItem } from '../pages/testReport.types';

type Props = {
  timeline: SubmissionTimelineItem[];
};

function formatHour(hour: number) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}${period}`;
}

export default function SubmissionTimelineChart({ timeline }: Props) {
  const data = timeline.map((item) => ({
    name: formatHour(item.hour),
    count: item.count,
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-[var(--clr-text)]">Submission Timeline</h2>
      <p className="mt-1 text-sm text-[var(--clr-text2)]">Submission volume by hour</p>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 20, left: 0, right: 0 }}>
          <CartesianGrid stroke="#243050" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#172033', border: '1px solid #243050', borderRadius: 12, color: '#F1F5F9' }}
          />
          <Area type="monotone" dataKey="count" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
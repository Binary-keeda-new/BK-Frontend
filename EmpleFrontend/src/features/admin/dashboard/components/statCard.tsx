'use client';

import type { StatCardProps } from "../types";
import { ArrowUpIcon } from './icons';

export default function StatCard({
  label,
  value,
  delta,
  deltaLabel,
}: StatCardProps) {
  return (
    <div
      className="
        flex flex-col gap-1.5
        p-4 sm:p-5 lg:p-6
        rounded-2xl
        border border-[var(--clr-border)]
        bg-[var(--clr-surface)]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:border-[var(--clr-border2)]
      "
    >
      {/* Label */}
      <p
        className="
          text-[10px] sm:text-xs
          font-bold uppercase tracking-widest
          text-[var(--clr-text3)]
        "
      >
        {label}
      </p>

      {/* Value */}
      <p
        className="
          font-extrabold
          text-[26px] sm:text-3xl lg:text-[40px]
          leading-none tracking-tight
          text-[var(--clr-text)]
        "
      >
        {value}
      </p>

      {/* Delta */}
      {delta && deltaLabel && (
        <p
          className="
            flex items-center gap-1
            mt-1
            text-[11px] sm:text-xs
            font-bold
            text-green-500
          "
        >
          <span className="flex text-green-500">
            <ArrowUpIcon />
          </span>
          {deltaLabel}
        </p>
      )}
    </div>
  );
}
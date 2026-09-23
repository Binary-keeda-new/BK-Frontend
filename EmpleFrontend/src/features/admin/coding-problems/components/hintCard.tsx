'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  hint: string;
  number: number;
}

export default function HintCard({
  hint,
  number,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--clr-border)]">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex w-full items-center justify-between p-5 text-left font-medium"
      >
        <span>
          Hint {number}
        </span>

        <ChevronDown
          className={`transition-transform ${
            open
              ? 'rotate-180'
              : ''
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 leading-7">
          {hint}
        </div>
      )}
    </div>
  );
}
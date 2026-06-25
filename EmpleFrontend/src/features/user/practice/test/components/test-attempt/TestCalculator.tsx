'use client';

import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const buttons = [
  '7',
  '8',
  '9',
  '/',
  '4',
  '5',
  '6',
  '*',
  '1',
  '2',
  '3',
  '-',
  '0',
  '.',
  '=',
  '+',
];

export default function TestCalculator({ open, onClose }: Props) {
  const [value, setValue] = useState('');

  if (!open) return null;

  const handleClick = (item: string) => {
    if (item === '=') {
      try {
        const result = Function(`"use strict"; return (${value || '0'})`)();

        if (Number.isFinite(result)) {
          setValue(String(result));
        }
      } catch {
        setValue('Error');
      }

      return;
    }

    setValue((prev) => (prev === 'Error' ? item : prev + item));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[750] w-[280px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-[var(--text)]">Calculator</p>

        <button
          onClick={onClose}
          className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs text-[var(--muted2)]"
        >
          ✕
        </button>
      </div>

      <input
        value={value}
        readOnly
        className="mb-3 w-full rounded-xl border border-[var(--border)] bg-[var(--surface2)] px-3 py-3 text-right text-lg font-bold text-[var(--text)] outline-none"
      />

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => setValue('')}
          className="col-span-2 rounded-xl border border-[var(--border)] px-3 py-3 text-sm font-bold text-[var(--text)]"
        >
          AC
        </button>

        <button
          onClick={() => setValue((prev) => prev.slice(0, -1))}
          className="rounded-xl border border-[var(--border)] px-3 py-3 text-sm font-bold text-[var(--text)]"
        >
          DEL
        </button>

        <button
          onClick={() => handleClick('/')}
          className="rounded-xl bg-[var(--orange)] px-3 py-3 text-sm font-bold text-white"
        >
          /
        </button>

        {buttons
          .filter((btn) => btn !== '/')
          .map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`rounded-xl px-3 py-3 text-sm font-bold ${
                ['+', '-', '*', '='].includes(btn)
                  ? 'bg-[var(--orange)] text-white'
                  : 'border border-[var(--border)] text-[var(--text)]'
              }`}
            >
              {btn}
            </button>
          ))}
      </div>
    </div>
  );
}
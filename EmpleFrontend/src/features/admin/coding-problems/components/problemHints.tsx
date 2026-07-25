'use client';

import HintCard from './hintCard';

interface Props {
  hints: string[];
}

export default function ProblemHints({
  hints,
}: Props) {
  if (hints.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold">
        Hints
      </h2>

      <div className="space-y-4">
        {hints.map(
          (hint, index) => (
            <HintCard
              key={index}
              hint={hint}
              number={index + 1}
            />
          )
        )}
      </div>
    </section>
  );
}
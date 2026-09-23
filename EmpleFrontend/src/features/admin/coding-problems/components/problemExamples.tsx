'use client';

import ExampleCard from './exampleCard';
import type { Example } from '../types/previewProblem';

interface Props {
  examples: Example[];
}

export default function ProblemExamples({
  examples,
}: Props) {
  if (examples.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Examples
      </h2>

      <div className="space-y-6">
        {examples.map(
          (example, index) => (
            <ExampleCard
              key={index}
              index={index + 1}
              {...example}
            />
          )
        )}
      </div>
    </section>
  );
}
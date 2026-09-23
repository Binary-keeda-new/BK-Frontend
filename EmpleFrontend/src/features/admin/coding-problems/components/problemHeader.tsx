'use client';

import DifficultyBadge from './difficultyBadge';
import TopicBadge from './topicBadge';
import { Clock3 } from 'lucide-react';
import { PreviewCodingProblem } from '../types/previewProblem';

interface Props {
  problem: PreviewCodingProblem;
}

export default function ProblemHeader({
  problem,
}: Props) {
  return (
    <section>

      <h1 className="mb-6 text-5xl font-bold">
        {problem.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3">

        <DifficultyBadge
          difficulty={problem.difficulty}
        />

        {(problem.topics ?? []).map(
          (topic) => (
            <TopicBadge
              key={topic}
              topic={topic}
            />
          )
        )}

        <div className="ml-auto flex items-center gap-2 rounded-full border border-[var(--clr-border)] px-4 py-2">

          <Clock3 size={16} />

        </div>

      </div>

    </section>
  );
}
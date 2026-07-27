'use client';

import ProblemHeader from './problemHeader';
import ProblemDescription from './problemDescription';
import ProblemExamples from './problemExamples';
import ProblemConstraints from './problemConstraints';
import ProblemHints from './problemHints';

import { Eye } from 'lucide-react';
import { PreviewCodingProblem } from '../types/previewProblem';

interface Props {
  problem: PreviewCodingProblem;
}

export default function ProblemPanel({
  problem,
}: Props) {
   console.log('ProblemPanel:', problem);  
    return (
    <div className="mx-auto max-w-6xl px-8 py-10">

      {/* Preview Banner */}

      <div className="mb-10 flex items-center justify-between rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] px-6 py-4">

        <div>
          <h2 className="text-xl font-semibold">
            Preview Mode
          </h2>

          <p className="mt-1 text-sm text-[var(--clr-text2)]">
            This is exactly how candidates will view this coding problem.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[var(--clr-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--clr-accent)]">
          <Eye size={18} />
          Read Only
        </div>

      </div>

      <ProblemHeader problem={problem} />

      <div className="my-10 border-t border-[var(--clr-border)]" />

      <ProblemDescription
        statement={problem.statement}
      />

      <div className="my-10 border-t border-[var(--clr-border)]" />

      <ProblemExamples
        examples={problem.examples}
      />

      <div className="my-10 border-t border-[var(--clr-border)]" />

      <ProblemConstraints
        constraints={problem.constraints}
      />

      <div className="my-10 border-t border-[var(--clr-border)]" />

      <ProblemHints
        hints={problem.hints}
      />

    </div>
  );
}
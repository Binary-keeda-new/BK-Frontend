'use client';

interface Props {
  statement: string;
}

export default function ProblemDescription({
  statement,
}: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Problem Description
      </h2>

      <div className="whitespace-pre-wrap leading-8 text-[var(--clr-text2)]">
        {statement}
      </div>
    </section>
  );
}
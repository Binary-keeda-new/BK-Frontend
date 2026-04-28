import React from "react";

type Props = {
  children: React.ReactNode;
  sectionLabel: string;
  divider: string;
};

export default function QuizEditSectionTitle({
  children,
  sectionLabel,
  divider,
}: Props) {
  return (
    <div
      className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.09em]"
      style={{ color: sectionLabel }}
    >
      <div className="h-px w-5 flex-shrink-0 bg-[var(--clr-accent)]" />
      {children}
      <div className="h-px flex-1" style={{ background: divider }} />
    </div>
  );
}
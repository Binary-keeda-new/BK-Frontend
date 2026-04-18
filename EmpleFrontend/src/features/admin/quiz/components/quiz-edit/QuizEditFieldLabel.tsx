import React from "react";

type Props = {
  children: React.ReactNode;
  color: string;
};

export default function QuizEditFieldLabel({ children, color }: Props) {
  return (
    <div
      className="mb-2 text-[11px] font-semibold uppercase tracking-[0.07em]"
      style={{ color }}
    >
      {children}
    </div>
  );
}
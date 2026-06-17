import React from "react";

interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalSection({
  title,
  children,
}: LegalSectionProps) {
  return (
    <section className="mb-20">
      <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
        {title}
      </h2>

      <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

      <div className="max-w-4xl text-base md:text-lg leading-8 text-[var(--clr-text2)] space-y-6">
        {children}
      </div>
    </section>
  );
}
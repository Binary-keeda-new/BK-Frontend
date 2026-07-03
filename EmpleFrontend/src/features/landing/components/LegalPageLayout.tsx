import React from "react";
import LegalNavbar from "./LegalNavbar";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[var(--clr-bg)] text-[var(--clr-text)]">
      <LegalNavbar />

      <section className="container mx-auto px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 pt-40 md:pt-48 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <h1
            className="
              font-['Nunito']
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-extrabold
              text-[var(--clr-text)]
              tracking-tight
            "
          >
            {title}
          </h1>

          <div className="mt-4 h-1 w-16 rounded-full bg-[var(--clr-accent)]" />

          <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
            {subtitle}
          </p>
        </div>

        <div className="mt-20">
          {children}
        </div>
      </section>
    </main>
  );
}
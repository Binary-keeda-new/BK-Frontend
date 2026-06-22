import LegalPageLayout from "@/features/landing/components/LegalPageLayout";

export default function AboutUsPage() {
  return (
    <LegalPageLayout
      title="About Emple"
      subtitle="Empowering the next generation of tech talent through AI-powered learning and career development."
    >
      {/* Who We Are */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Who We Are
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          Emple is an all-in-one career development platform built for
          ambitious students and professionals. We bring together learning,
          interview preparation, resume optimisation, assessments, and
          AI-powered career guidance into a single experience.
        </p>
      </section>

      {/* Mission + Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <section>
          <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
            Mission
          </h2>

          <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

          <p className="max-w-xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
            To make career growth accessible through structured learning,
            practical preparation, and intelligent guidance.
          </p>
        </section>

        <section>
          <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
            Vision
          </h2>

          <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

          <p className="max-w-xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
            To become the most trusted platform helping learners and
            professionals achieve their career goals with confidence.
          </p>
        </section>
      </div>

      {/* What We Offer */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          What We Offer
        </h2>

        <div className="mb-8 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "AI Roadmaps",
            "Mock Interviews",
            "ATS Scanner",
            "Career Guidance",
            "Assessments",
            "Learning Resources",
          ].map((item) => (
            <div
              key={item}
              className="
                rounded-xl
                border
                border-[var(--clr-border)]
                bg-[var(--clr-surface)]
                p-4
                text-sm
                text-[var(--clr-text2)]
                transition-all
                duration-200
                hover:border-[var(--clr-accent)]
                hover:text-[var(--clr-accent)]
              "
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Commitment */}
      <section>
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Our Commitment
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          We are committed to creating tools, resources, and experiences
          that help learners navigate their careers more effectively and
          unlock their full potential.
        </p>
      </section>
    </LegalPageLayout>
  );
}
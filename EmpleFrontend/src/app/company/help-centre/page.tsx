import LegalPageLayout from "@/features/landing/components/LegalPageLayout";

export default function HelpCentrePage() {
  return (
    <LegalPageLayout
      title="Help Centre"
      subtitle="Find answers to common questions and get the support you need to make the most of Emple."
    >
      {/* Getting Started */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Getting Started
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          Create your account, explore learning resources, complete
          assessments, and start building your personalised career
          roadmap. Emple is designed to help you learn, prepare, and
          grow in one place.
        </p>
      </section>

      {/* Account Support */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Account Support
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          Having trouble signing in or accessing your account? Ensure
          you're using the correct email address and authentication
          method. If issues persist, contact our support team for
          assistance.
        </p>
      </section>

      {/* Learning & Assessments */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Learning & Assessments
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          Access structured learning paths, skill assessments, AI-powered
          roadmaps, and interview preparation tools to improve your
          technical and professional capabilities.
        </p>
      </section>

      {/* Technical Issues */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Technical Issues
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          If you encounter bugs, loading issues, or unexpected platform
          behaviour, try refreshing the page or clearing your browser
          cache. If the issue continues, please report it to our team.
        </p>
      </section>

      {/* Need More Help */}
      <section>
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Need More Help?
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)] mb-6">
          If you couldn't find the answer you're looking for, we're here
          to help.
        </p>

        <a
          href="mailto:binarykeeda.education@gmail.com"
          className="text-[var(--clr-accent)] text-base md:text-lg font-medium hover:underline"
        >
          binarykeeda.education@gmail.com
        </a>
      </section>
    </LegalPageLayout>
  );
}
import LegalPageLayout from "@/features/landing/components/LegalPageLayout";

export default function ContactUsPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      subtitle="Questions, feedback, partnerships, or support? We'd love to hear from you."
    >
      {/* Support */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Support
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)] mb-6">
          If you need help with your account, learning resources,
          assessments, or platform features, our team is here to assist.
        </p>

        <a
          href="mailto:binarykeeda.education@gmail.com"
          className="text-[var(--clr-accent)] text-base md:text-lg font-medium hover:underline"
        >
          binarykeeda.education@gmail.com
        </a>
      </section>

      {/* Partnerships */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Partnerships & Collaborations
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          Interested in collaborating with Emple, hosting workshops,
          sponsoring events, or exploring educational partnerships?
          We'd be happy to connect and discuss opportunities.
        </p>
      </section>

      {/* Response Time */}
      <section className="mb-20">
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Response Time
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <p className="max-w-3xl text-base md:text-lg leading-8 text-[var(--clr-text2)]">
          Our team typically responds to enquiries within
          24–48 business hours.
        </p>
      </section>

      {/* Connect */}
      <section>
        <h2 className="font-['Nunito'] text-xl md:text-2xl font-bold text-[var(--clr-text)] mb-4">
          Connect With Us
        </h2>

        <div className="mb-6 h-[2px] w-10 rounded-full bg-[var(--clr-accent)]" />

        <div className="flex flex-col gap-4 text-base md:text-lg">
          <a
            href="https://www.instagram.com/emple.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--clr-text2)] hover:text-[var(--clr-accent)] transition-colors"
          >
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/company/binarykeeda-education/posts/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--clr-text2)] hover:text-[var(--clr-accent)] transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://youtube.com/@emplelearning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--clr-text2)] hover:text-[var(--clr-accent)] transition-colors"
          >
            YouTube
          </a>
        </div>
      </section>
    </LegalPageLayout>
  );
}
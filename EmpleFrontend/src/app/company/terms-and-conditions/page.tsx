import LegalPageLayout from "@/features/landing/components/LegalPageLayout";
import LegalSection from "@/features/landing/components/LegalSection";

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using Emple and its services."
    >
      <LegalSection title="Acceptance of Terms">
        <p>
          By accessing or using Emple, you agree to comply with and be
          bound by these Terms & Conditions. If you do not agree with
          these terms, you should discontinue use of the platform.
        </p>
      </LegalSection>

      <LegalSection title="Eligibility">
        <p>
          Users must provide accurate information and comply with all
          applicable laws and regulations while using the platform.
        </p>
      </LegalSection>

      <LegalSection title="User Accounts">
        <p>
          Users are responsible for maintaining the confidentiality of
          their account credentials and for all activities occurring
          under their account.
        </p>
      </LegalSection>

      <LegalSection title="Platform Usage">
        <p>
          Users agree not to misuse the platform, interfere with its
          operation, attempt unauthorized access, or engage in unlawful
          activities while using Emple.
        </p>
      </LegalSection>

      <LegalSection title="AI-Generated Content Disclaimer">
        <p>
          Certain features, articles, images, recommendations,
          roadmaps, assessments, and other materials available through
          Emple may be generated or assisted by artificial intelligence
          technologies.
        </p>

        <p>
          While reasonable efforts are made to review and improve
          content quality, AI-generated content may contain
          inaccuracies, omissions, outdated information, or unintended
          errors.
        </p>

        <p>
          AI-generated content is provided for informational and
          educational purposes only and should not be considered
          professional, legal, financial, employment, medical, or
          career advice.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All platform content, software, branding, logos, designs,
          educational materials, text, graphics, and proprietary
          features are owned by Emple or its licensors and are
          protected by applicable intellectual property laws.
        </p>

        <p>
          Users may not reproduce, distribute, modify, or commercially
          exploit platform content without prior written permission.
        </p>
      </LegalSection>

      <LegalSection title="Paid Plans & Subscriptions">
        <p>
          Emple may offer free and paid subscription plans that provide
          access to premium features, assessments, AI-powered tools,
          learning resources, and additional services.
        </p>

        <p>
          By purchasing a paid plan, users agree to the pricing,
          billing cycle, and payment terms presented at the time of
          purchase.
        </p>

        <p>
          Emple reserves the right to modify pricing, subscription
          plans, and available features at any time.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          Emple does not guarantee employment outcomes, interview
          success, educational results, career advancement, or the
          accuracy of AI-generated outputs.
        </p>

        <p>
          To the maximum extent permitted by law, Emple shall not be
          liable for any direct, indirect, incidental, consequential,
          or special damages arising from use of the platform.
        </p>
      </LegalSection>

      <LegalSection title="Changes to Services">
        <p>
          We may modify, suspend, or discontinue parts of the platform
          at any time without prior notice.
        </p>
      </LegalSection>

      <LegalSection title="Termination">
        <p>
          We reserve the right to suspend or terminate accounts that
          violate these Terms & Conditions or applicable laws.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          If you have questions regarding these Terms & Conditions,
          please contact us at:
        </p>

        <a
          href="mailto:binarykeeda.education@gmail.com"
          className="text-[var(--clr-accent)] hover:underline"
        >
          binarykeeda.education@gmail.com
        </a>
      </LegalSection>
    </LegalPageLayout>
  );
}
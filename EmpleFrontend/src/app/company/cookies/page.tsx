import LegalPageLayout from "@/features/landing/components/LegalPageLayout";
import LegalSection from "@/features/landing/components/LegalSection";

export default function CookiesPolicyPage() {
  return (
    <LegalPageLayout
      title="Cookies Policy"
      subtitle="Learn how Emple uses cookies and similar technologies to improve your experience on our platform."
    >
      <LegalSection title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you
          visit a website. They help websites remember information about
          your visit, preferences, and interactions, making future visits
          more efficient and personalized.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Cookies">
        <p>
          Emple uses cookies and similar technologies to enhance platform
          functionality, improve performance, and provide a better user
          experience.
        </p>

        <p>
          Cookies may be used to remember user preferences, maintain
          secure sessions, improve navigation, and analyze how users
          interact with our platform.
        </p>
      </LegalSection>

      <LegalSection title="Types of Cookies We Use">
        <p>
          <strong>Essential Cookies</strong> – Required for the platform
          to function properly, including authentication, security, and
          account access.
        </p>

        <p>
          <strong>Performance Cookies</strong> – Help us understand how
          visitors interact with the platform by collecting anonymous
          usage and performance information.
        </p>

        <p>
          <strong>Preference Cookies</strong> – Store user settings and
          preferences to provide a more personalized experience.
        </p>

        <p>
          <strong>Analytics Cookies</strong> – Allow us to measure and
          improve platform performance through aggregated usage data.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          We may use trusted third-party services for analytics,
          authentication, payment processing, hosting, and other platform
          operations. These providers may use cookies or similar
          technologies in accordance with their own privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="Advertising and Analytics">
        <p>
          Emple may use analytics tools and advertising services to
          better understand user engagement, improve content, and support
          platform growth.
        </p>

        <p>
          These services may use cookies to collect information about
          website activity and user interactions in a privacy-conscious
          manner.
        </p>
      </LegalSection>

      <LegalSection title="Managing Cookies">
        <p>
          Most web browsers allow users to manage, disable, or delete
          cookies through browser settings.
        </p>

        <p>
          Please note that disabling certain cookies may affect the
          functionality and user experience of the platform.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this Cookies Policy periodically to reflect
          changes in technology, legal requirements, or platform
          functionality.
        </p>

        <p>
          Updated versions will be posted on this page with a revised
          effective date when applicable.
        </p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>
          If you have any questions regarding our use of cookies or this
          Cookies Policy, please contact us at:
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
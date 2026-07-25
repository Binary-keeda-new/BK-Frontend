"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const sections = [
  { id: "information-we-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How We Use Information" },
  { id: "information-sharing", title: "3. Information Sharing" },
  { id: "data-security", title: "4. Data Security" },
  { id: "your-rights", title: "5. Your Data Rights" },
  { id: "third-party", title: "6. Third-Party Services" },
  { id: "changes", title: "7. Changes to Policy" },
  { id: "contact", title: "8. Contact Us" },
];

export default function PrivacyContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex-grow pt-[100px] w-full max-w-7xl mx-auto px-6 pb-24">
      {/* Header */}
      <div className="py-12 border-b border-gray-800 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 pb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-lg">
          Effective Date: June 2026
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 relative">
        {/* Sidebar */}
        <div className="lg:w-1/4 hidden lg:block">
          <div className="sticky top-[100px]">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Contents</h3>
            <nav className="flex flex-col border-l border-gray-800">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left py-2.5 pl-4 -ml-[1px] border-l-2 text-sm transition-colors duration-200
                      ${isActive 
                        ? 'border-orange-500 text-orange-400 font-medium' 
                        : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                      }`}
                  >
                    {section.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 max-w-3xl">
          <div className="space-y-12 text-gray-300 leading-relaxed text-justify">
            <p className="text-lg text-gray-300 mb-8">
              We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and share your data when you use Emple.
            </p>
              
            <section id="information-we-collect" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <p>We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-gray-600">
                  <li><strong className="text-white font-medium">Personal Information Provided by You:</strong> Names, phone numbers, email addresses, usernames, passwords, contact preferences, and other similar information.</li>
                  <li><strong className="text-white font-medium">Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number and the security code.</li>
                </ul>
              </div>
            </section>

            <section id="how-we-use" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4">
                <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-gray-600">
                  <li>To facilitate account creation and logon process.</li>
                  <li>To post testimonials with your consent.</li>
                  <li>Request feedback and to contact you about your use of our Website.</li>
                  <li>To manage user accounts and keep them in working order.</li>
                  <li>To send administrative information to you.</li>
                </ul>
              </div>
            </section>

            <section id="information-sharing" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing and Disclosure</h2>
              <div className="space-y-4">
                <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-gray-600">
                  <li><strong className="text-white font-medium">Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                  <li><strong className="text-white font-medium">Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                </ul>
              </div>
            </section>

            <section id="data-security" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
            </section>

            <section id="your-rights" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Data Rights</h2>
              <p>Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request form by contacting us.</p>
            </section>

            <section id="third-party" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Services</h2>
              <p>Our website may contain links to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. We are not responsible for the privacy policies or other practices employed by other websites or third parties.</p>
            </section>

            <section id="changes" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to This Policy</h2>
              <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.</p>
            </section>

            <section id="contact" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p>If you have questions or comments about this notice, you may email us at:</p>
              <address className="mt-4 not-italic text-gray-400">
                Email: <a href="mailto:binarykeeda.education@gmail.com" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">binarykeeda.education@gmail.com</a>
              </address>
            </section>
          </div>
          
          <hr className="border-gray-800 my-16" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
            <div>
              <h3 className="text-white font-medium mb-1">Have questions about our terms?</h3>
              <p className="text-sm text-gray-400">Review our Terms of Service to understand the rules and guidelines.</p>
            </div>
            <Link href="/terms" className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors whitespace-nowrap">
              View Terms of Service
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

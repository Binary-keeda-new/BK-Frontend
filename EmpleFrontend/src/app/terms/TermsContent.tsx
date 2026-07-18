"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "description", title: "2. Description of Service" },
  { id: "registration", title: "3. User Registration" },
  { id: "acceptable-use", title: "4. Acceptable Use Policy" },
  { id: "intellectual-property", title: "5. Content and IP" },
  { id: "subscription", title: "6. Subscription & Billing" },
  { id: "disclaimer", title: "7. Disclaimer of Warranties" },
  { id: "contact", title: "8. Contact Information" },
];

export default function TermsContent() {
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
          Terms of Service
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
              Please read these Terms of Service carefully before using our platform. These terms govern your access to and use of Emple.
            </p>

            <section id="acceptance" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4">
                <p>By accessing or using the Emple website, services, or applications, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you do not have permission to access the Service.</p>
                <p>We may update these terms periodically. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after such modifications will constitute your acknowledgment of the modified Terms.</p>
              </div>
            </section>

            <section id="description" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>Emple provides an online platform that offers learning resources, interview preparation tools, and related content. You understand and agree that the Service is provided "AS-IS" and that we assume no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings.</p>
            </section>

            <section id="registration" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Registration and Security</h2>
              <p>To use certain features of the Service, you must register for an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-gray-600">
                <li>Provide true, accurate, current, and complete information about yourself.</li>
                <li>Maintain the security of your password and identification.</li>
                <li>Maintain and promptly update the registration data to keep it accurate and complete.</li>
                <li>Accept all responsibility for any and all activities that occur under your account.</li>
              </ul>
            </section>

            <section id="acceptable-use" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use Policy</h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-gray-600">
                <li>Violate any local, state, national, or international law.</li>
                <li>Transmit any material that is abusive, harassing, tortious, defamatory, vulgar, pornographic, or otherwise objectionable.</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
                <li>Attempt to gain unauthorized access to any portion of the Service.</li>
                <li>Reproduce, duplicate, copy, sell, trade, resell or exploit for any commercial purposes, any portion of the Service.</li>
              </ul>
            </section>

            <section id="intellectual-property" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Content and Intellectual Property</h2>
              <div className="space-y-4">
                <p><strong className="text-white font-medium">AI-Generated Content:</strong> All educational content, interview questions, tutorials, and materials provided on the Emple platform are generated by Artificial Intelligence (AI). This content is provided as-is and is considered to be in the public domain or coincidentally aligns with public domain knowledge.</p>
                <p><strong className="text-white font-medium">Platform Fees:</strong> We do not charge users for the content itself. Any fees, subscriptions, or charges associated with your account are strictly <strong>platform access fees</strong>. These fees are intended solely to cover the costs of utilizing our software platform, accessing our interactive tools, and maintaining the infrastructure of our service.</p>
                <p>The Service's original codebase, software, design, features, and functionality remain the exclusive property of Emple and its licensors.</p>
              </div>
            </section>
            
            <section id="subscription" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Subscription and Billing (if applicable)</h2>
              <p>Some parts of the Service may be billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Depending on the type of subscription you choose, your subscription will automatically renew at the end of each billing cycle unless you cancel it.</p>
            </section>

            <section id="disclaimer" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Disclaimer of Warranties</h2>
              <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
            </section>

            <section id="contact" className="scroll-mt-[100px]">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <address className="mt-4 not-italic text-gray-400">
                Email: <a href="mailto:binarykeeda.education@gmail.com" className="text-orange-400 hover:text-orange-300 hover:underline transition-colors">binarykeeda.education@gmail.com</a>
              </address>
            </section>
          </div>
          
          <hr className="border-gray-800 my-16" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-900/30 p-6 rounded-lg border border-gray-800/50">
            <div>
              <h3 className="text-white font-medium mb-1">Looking for our Privacy Policy?</h3>
              <p className="text-sm text-gray-400">Learn how we collect, use, and protect your data.</p>
            </div>
            <Link href="/privacy-policy" className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors whitespace-nowrap">
              View Privacy Policy
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

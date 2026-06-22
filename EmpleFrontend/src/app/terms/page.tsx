import React from 'react';
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import "@/app/landing/landing.css";

export const metadata = { title: "Terms of Service | Emple" };

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="flex-grow pt-[100px] max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-6">Last updated: June 2026</p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed mb-4">By accessing and using Emple, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">2. Use of Resources</h2>
          <p className="text-gray-300 leading-relaxed mb-4">Our public resources, including blogs, interview questions, and tutorials, are provided for your personal, non-commercial use. Premium features require an authenticated account.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">3. User Conduct</h2>
          <p className="text-gray-300 leading-relaxed mb-4">You agree not to misuse our services or help anyone else do so. You must not attempt to bypass access controls to premium resources.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

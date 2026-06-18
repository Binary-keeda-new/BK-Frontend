import React from 'react';
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import "@/features/landing/landing.css";

export const metadata = { title: "Privacy Policy | Emple" };

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="flex-grow pt-[100px] max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-6">Last updated: June 2026</p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">1. Information We Collect</h2>
          <p className="text-gray-300 leading-relaxed mb-4">We collect information you provide directly to us when you create an account, such as your name and email address. For our AdSense partners, we do not share personally identifying information without consent.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">2. How We Use Information</h2>
          <p className="text-gray-300 leading-relaxed mb-4">We use the information we collect to provide, maintain, and improve our services, track your learning progress, and communicate with you about updates.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">3. Third-Party Services & Advertising</h2>
          <p className="text-gray-300 leading-relaxed mb-4">We may use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to this website or other websites.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import "@/features/landing/landing.css";

export const metadata = { title: "Cookie Policy | Emple" };

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="flex-grow pt-[100px] max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-gray-400 mb-6">Last updated: June 2026</p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">What are Cookies?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used in order to make websites work, or work more efficiently.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">How We Use Cookies</h2>
          <ul className="list-disc pl-6 text-gray-300 leading-relaxed mb-4 space-y-2">
            <li><strong>Essential Cookies:</strong> Required to authenticate users and prevent fraudulent use of user accounts.</li>
            <li><strong>Performance & Analytics:</strong> Used to track how our users navigate and interact with the platform.</li>
            <li><strong>Advertising:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

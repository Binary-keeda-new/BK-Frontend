import React from 'react';
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import "@/app/landing/landing.css";
import PrivacyContent from "./PrivacyContent";

export const metadata = { title: "Privacy Policy | Emple" };

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white selection:bg-orange-500/30">
      <Navbar />
      <PrivacyContent />
      <Footer />
    </div>
  );
}

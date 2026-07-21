import React from 'react';
import Navbar from "@/features/landing/components/Navbar";
import Footer from "@/features/landing/components/Footer";
import "@/app/landing/landing.css";
import TermsContent from "./TermsContent";

export const metadata = { title: "Terms of Service | Emple" };

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white selection:bg-orange-500/30">
      <Navbar />
      <TermsContent />
      <Footer />
    </div>
  );
}

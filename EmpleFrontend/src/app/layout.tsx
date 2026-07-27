import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./landing/landing.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "../providers/ThemeContext";
import { AuthProvider } from "@descope/nextjs-sdk";
import { AppAuthProvider } from "@/providers/AppAuthProvider";
import { WalletProvider } from "@/providers/WalletProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { DeviceSessionProvider } from "@/providers/DeviceSessionProvider";
import HelpChatWidget from "@/shared/components/help-chatbot/HelpChatWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Emple — Career & Learning Platform",
    template: "%s | Emple",
  },
  description: "Your all-in-one platform for SDE prep, career paths, job listings and learning resources.",
  metadataBase: new URL("https://www.emple.in"),
  openGraph: {
    title: "Emple — Career & Learning Platform",
    description: "Your all-in-one platform for SDE prep, career paths, job listings and learning resources.",
    url: "https://www.emple.in",
    siteName: "Emple",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emple — Career & Learning Platform",
    description: "Your all-in-one platform for SDE prep, career paths, job listings and learning resources.",
    site: "@emple_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.emple.in",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Emple",
              url: "https://www.emple.in",
              logo: "https://www.emple.in/logo-final.png",
              description: "Your all-in-one platform for SDE prep, career paths, job listings and learning resources.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "binarykeeda.education@gmail.com",
                contactType: "customer support",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Emple",
              url: "https://www.emple.in",
              description: "Career and Learning Platform for SDE prep and placement",
            }),
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9381184853784761"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AuthProvider
          projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}
          sessionTokenViaCookie={{
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
          }}
        >
          <AppAuthProvider>
            <DeviceSessionProvider>
              <NotificationProvider>
                <WalletProvider>
                  <ThemeProvider>
                    {children}
                    <HelpChatWidget />
                  </ThemeProvider>
                </WalletProvider>
              </NotificationProvider>
            </DeviceSessionProvider>
          </AppAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
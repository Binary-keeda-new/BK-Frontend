import type { Metadata } from "next";
import "./globals.css";
import "./landing/landing.css";
import { ThemeProvider } from "../providers/ThemeContext";
import { AuthProvider } from "@descope/nextjs-sdk";
import { AppAuthProvider } from "@/providers/AppAuthProvider";
import { WalletProvider } from "@/providers/WalletProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";
import HelpChatWidget from "@/shared/components/help-chatbot/HelpChatWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Emple – Dashboard",
  description: "Emple learning dashboard",
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9381184853784761"
          crossOrigin="anonymous"
        ></script>
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
            <NotificationProvider>
              <WalletProvider>
                <ThemeProvider>
                  {children}
                  <HelpChatWidget />
                </ThemeProvider>
              </WalletProvider>
            </NotificationProvider>
          </AppAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
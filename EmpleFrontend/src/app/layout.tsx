import type { Metadata } from "next";
import "./globals.css";
import "./landing/landing.css";
import { ThemeProvider } from "../providers/ThemeContext";
import { AuthProvider } from "@descope/nextjs-sdk";

export const metadata: Metadata = {
  title: "Emple – Dashboard",
  description: "Emple learning dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" data-scroll-behavior="smooth">
      <body>
        <AuthProvider projectId="P3AFT1HC6a3KqpVTxFonLtKOOBxb">
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
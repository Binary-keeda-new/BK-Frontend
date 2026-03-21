

// import type { Metadata } from "next";
// import "../app/globals.css";
// import { ThemeProvider } from "../view/user/contexts/ThemeContext";
// import { AuthProvider } from '@descope/nextjs-sdk';

// export const metadata: Metadata = {
//   title: "Emple – Dashboard",
//   description: "Emple learning dashboard",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID!}>
//       <html lang="en" suppressHydrationWarning>
//         <body>
//           <ThemeProvider>{children}</ThemeProvider>
//         </body>
//       </html>
//     </AuthProvider>
//   );
// }


import type { Metadata } from "next";
import "../app/globals.css";
import { ThemeProvider } from "../view/user/contexts/ThemeContext";
import { AuthProvider } from '@descope/nextjs-sdk';

export const metadata: Metadata = {
  title: "Emple – Dashboard",
  description: "Emple learning dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark" data-scroll-behavior="smooth">
      <body>
        {/* <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID!}> */}
        <AuthProvider projectId="P3AFT1HC6a3KqpVTxFonLtKOOBxb">
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
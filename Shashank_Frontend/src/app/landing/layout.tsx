// import type { Metadata } from 'next'

// import '../globals.css'
// import './landing.css'

// export const metadata: Metadata = {
//   title: 'Emple – Land Your Dream Job',
//   description:
//     'Your AI-powered Placement Preparation Ecosystem — practice coding interviews, score your resume against ATS, track applications, and follow expert career roadmaps.',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" data-theme="dark">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>{children}</body>
//     </html>
//   )
// }


// // import type { Metadata } from 'next'
// // import './landing.css'

// // export const metadata: Metadata = {
// //   title: 'Emple – Land Your Dream Job',
// //   description: 'Your AI-powered Placement Preparation Ecosystem',
// // }

// // export default function LandingLayout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <>
// //       <link rel="preconnect" href="https://fonts.googleapis.com" />
// //       <link
// //         href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
// //         rel="stylesheet"
// //       />
// //       {children}
// //     </>
// //   )
// // }


import type { Metadata } from 'next'

import '../globals.css'
import './landing.css'

export const metadata: Metadata = {
  title: 'Emple – Land Your Dream Job',
  description:
    'Your AI-powered Placement Preparation Ecosystem — practice coding interviews, score your resume against ATS, track applications, and follow expert career roadmaps.',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
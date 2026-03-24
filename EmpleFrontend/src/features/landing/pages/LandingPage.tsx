// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useSession } from '@descope/nextjs-sdk/client'
// import Navbar from '@/features/landing/components/Navbar'
// import Hero from '@/features/landing/components/Hero'
// import Marquee from '@/features/landing/components/Marquee'
// import Features from '@/features/landing/components/Features'
// import HowItWorks from '@/features/landing/components/HowItWorks'
// import Pricing from '@/features/landing/components/Pricing'
// import Testimonials from '@/features/landing/components/Testimonials'
// import CTABand from '@/features/landing/components/CTABand'
// import Footer from '@/features/landing/components/Footer'

// export default function LandingPage() {
//   const { session, isSessionLoading } = useSession() as any
//   const router = useRouter()

//   const isLoggedIn = Boolean(session?.token)

//   useEffect(() => {
//     if (!isSessionLoading && isLoggedIn) {
//       router.replace('/user/dashboard')
//     }
//   }, [isSessionLoading, isLoggedIn, router])

//   if (isSessionLoading) return null
//   if (isLoggedIn) return null

//   return (
//     <>
//       <Navbar />
//       <main>
//         <Hero />
//         <Marquee />
//         <Features />
//         <HowItWorks />
//         <Pricing />
//         <Testimonials />
//         <CTABand />
//       </main>
//       <Footer />
//     </>
//   )
// }
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@descope/nextjs-sdk/client'
import Navbar from '@/features/landing/components/Navbar'
import Hero from '@/features/landing/components/Hero'
import Marquee from '@/features/landing/components/Marquee'
import Features from '@/features/landing/components/Features'
import HowItWorks from '@/features/landing/components/HowItWorks'
import Pricing from '@/features/landing/components/Pricing'
import Testimonials from '@/features/landing/components/Testimonials'
import CTABand from '@/features/landing/components/CTABand'
import Footer from '@/features/landing/components/Footer'

export default function LandingPage() {
  const { session, isSessionLoading } = useSession() as any
  const router = useRouter()

  const isLoggedIn = Boolean(session?.token)

  useEffect(() => {
    if (!isSessionLoading && isLoggedIn) {
      router.replace('/user/dashboard')
    }
  }, [isSessionLoading, isLoggedIn, router])

  if (isSessionLoading) return null
  if (isLoggedIn) return null

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTABand />
      </main>
      <Footer />
    </>
  )
}
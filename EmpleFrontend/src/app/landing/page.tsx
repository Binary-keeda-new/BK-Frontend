
// import Navbar from '@/view/landing/components/Navbar'
// import Hero from '@/view/landing/components/Hero'
// import Marquee from '@/view/landing/components/Marquee'
// import Features from '@/view/landing/components/Features'
// import HowItWorks from '@/view/landing/components/HowItWorks'
// import Pricing from '@/view/landing/components/Pricing'
// import Testimonials from '@/view/landing/components/Testimonials'
// import CTABand from '@/view/landing/components/CTABand'
// import Footer from '@/view/landing/components/Footer'


// export default function LandingPage() {
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
import Navbar from '@/view/landing/components/Navbar'
import Hero from '@/view/landing/components/Hero'
import Marquee from '@/view/landing/components/Marquee'
import Features from '@/view/landing/components/Features'
import HowItWorks from '@/view/landing/components/HowItWorks'
import Pricing from '@/view/landing/components/Pricing'
import Testimonials from '@/view/landing/components/Testimonials'
import CTABand from '@/view/landing/components/CTABand'
import Footer from '@/view/landing/components/Footer'

export default function LandingPage() {
  const { session, isSessionLoading } = useSession() as any
  const router = useRouter()

  useEffect(() => {
    if (!isSessionLoading && session?.token) {
      router.replace('/user/dashboard')
    }
  }, [session, isSessionLoading])

  if (isSessionLoading) return null

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

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
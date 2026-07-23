import Link from 'next/link'
import { LOGO_URL } from '@/shared/constants/assets'
import { Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="flex items-center">
              <Link href="/">
                <img
                  src={LOGO_URL}
                  alt="emple"
                  className="h-[75px] w-auto"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>

            <p className="footer-desc">
              The all-in-one career development platform for the next generation of tech talent.
            </p>

            <div className="footer-socials">
              <Link className="footer-social" href="https://www.instagram.com/emple.in/" target="_blank" aria-label="Instagram">
                <Instagram size={18} />
              </Link>
              <Link className="footer-social" href="https://www.linkedin.com/company/binarykeeda-education/posts/" target="_blank" aria-label="LinkedIn">
                <Linkedin size={18} />
              </Link>
              <Link className="footer-social" href="https://youtube.com/@emplelearning?si=RnPxlX1PmXML9Zew" target="_blank" aria-label="YouTube">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4 text-[12px] text-[var(--clr-text2)]">
            <div className="footer-col-head">Company</div>
            <Link href="/#about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/company/help-centre">Help Centre</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4 text-[12px] text-[var(--clr-text2)]">
            <div className="footer-col-head">Legal</div>
            <Link href="/company/privacy-policy">Privacy Policy</Link>
            <Link href="/company/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/company/cookies">Cookies</Link>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 Binary Keeda Pvt Ltd<em> </em>. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  )
}
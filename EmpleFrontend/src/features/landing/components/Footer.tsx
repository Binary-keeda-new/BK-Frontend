import Link from 'next/link'

const footerCols = [
  {
    head: 'Product',
    links: ['Features', 'Pricing', 'Roadmaps', 'AI Interview', 'ATS Scanner', 'Tech Shop'],
  },
  {
    head: 'Company',
    links: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'],
  },
  {
    head: 'Resources',
    links: ['Documentation', 'API', 'Community', 'Help Centre', 'Status'],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand-wrap">
              <div className="nav-logo-box" style={{ width: 32, height: 32 }}>
                <span style={{ fontSize: 15 }}>e</span>
              </div>
              <span className="nav-wordmark"><em>e</em>mple</span>
            </div>
            <p className="footer-desc">
              The all-in-one career development platform for the next generation of tech talent.
            </p>
            <div className="footer-socials">
              {[
                { label: 'Twitter', content: '𝕏' },
                { label: 'LinkedIn', content: 'in' },
                { label: 'GitHub', content: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                )},
                { label: 'Instagram', content: '📷' },
              ].map((s) => (
                <Link key={s.label} className="footer-social" href="#" aria-label={s.label}>
                  {s.content}
                </Link>
              ))}
            </div>
          </div>

          {footerCols.map((col) => (
            <div key={col.head}>
              <div className="footer-col-head">{col.head}</div>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link}><Link href="#">{link}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 <em>Emple</em>. All rights reserved.</div>
          <div className="footer-legal">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

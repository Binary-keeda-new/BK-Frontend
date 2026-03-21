'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isDark, setIsDark] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node) &&
        drawerRef.current && !drawerRef.current.contains(e.target as Node)
      ) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
  }

  const closeDrawer = () => setDrawerOpen(false)

  const scrollTo = (id: string) => {
    closeDrawer()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="nav"
        id="mainNav"
        style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.2)' : '' }}
      >
        <div className="container">
          <div className="nav-inner">
            <Link className="nav-brand" href="/landing">
              <div className="nav-logo-box"><span>e</span></div>
              <span className="nav-wordmark"><em>e</em>mple</span>
            </Link>

            <div className="nav-links">
              {['features', 'how', 'pricing', 'testimonials'].map((id) => (
                <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
                  {id === 'how' ? 'How It Works' : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
              <Link className="nav-link" href="#">Blog</Link>
            </div>

            <div className="nav-actions">
              <button className="btn-theme" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? '☀️' : '🌙'}
              </button>
              <Link className="btn-outline" href="/auth/login">Login</Link>
            <Link className="btn-cta" href="/auth/signup">Sign Up</Link>
              <button
                ref={hamburgerRef}
                className="btn-hamburger"
                onClick={() => setDrawerOpen((v) => !v)}
                aria-label="Open menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div ref={drawerRef} className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        {['features', 'how', 'pricing', 'testimonials'].map((id) => (
          <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
            {id === 'how' ? 'How It Works' : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <Link className="nav-link" href="#" onClick={closeDrawer}>Blog</Link>
        <div className="drawer-actions">
          {/* <Link className="btn-outline" href="/auth/login" onClick={closeDrawer}>Sign In</Link>
          <Link className="btn-cta" href="/auth/login" onClick={closeDrawer}>Login</Link> */}
          <Link className="btn-outline" href="/auth/login" onClick={closeDrawer}>Login</Link>
          <Link className="btn-cta" href="/auth/signup" onClick={closeDrawer}>Sign In</Link>
        </div>
      </div>
    </>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LOGO_URL } from '@/shared/constants/assets'

export default function Navbar() {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'how', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
  ]

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const expiry = localStorage.getItem('sessionExpiry')

    if (token) {
      // If no expiry set, consider logged in (existing sessions)
      if (!expiry || Date.now() < parseInt(expiry)) {
        setIsLoggedIn(true)
      } else {
        // Session expired
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        localStorage.removeItem('sessionExpiry')
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node) &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const closeDrawer = () => setDrawerOpen(false)

  const scrollTo = (id: string) => {
    closeDrawer()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="nav"
        style={{
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.2)' : '',
          backgroundColor: scrolled ? '#000' : 'transparent',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <div className="nav-inner nav-container">

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img
              src={LOGO_URL}
              alt="emple"
              className="h-[75px] w-auto"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* RIGHT SIDE */}
          <div className="nav-menu">

            {/* NAV LINKS */}
            <div className="nav-links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className="nav-link"
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              ))}

              <Link href="/team" className="nav-link">
                Team
              </Link>
            </div>

            {/* ACTIONS */}
            <div className="nav-actions">
              {isLoggedIn ? (
                <Link className="btn-cta" href="/user/dashboard">Dashboard</Link>
              ) : (
                <>
                  <Link className="btn-outline" href="/auth/login">Login</Link>
                  <Link className="btn-cta" href="/auth/signup">Sign Up</Link>
                </>
              )}

              <button
                ref={hamburgerRef}
                className="btn-hamburger"
                onClick={() => setDrawerOpen((v) => !v)}
                aria-label="Open menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div ref={drawerRef} className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className="nav-link"
            onClick={() => scrollTo(item.id)}
          >
            {item.label}
          </button>
        ))}

        <Link
          href="/team"
          className="nav-link flex justify-center items-center"
          onClick={closeDrawer}
        >
          Team
        </Link>

        <div className="drawer-actions">
          {isLoggedIn ? (
            <Link className="btn-cta" href="/user/dashboard" onClick={closeDrawer}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link className="btn-outline" href="/auth/login" onClick={closeDrawer}>
                Login
              </Link>
              <Link className="btn-cta" href="/auth/signup" onClick={closeDrawer}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
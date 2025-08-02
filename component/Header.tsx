"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiMenu, FiX, FiChevronDown, FiPhone, FiMail, FiUser } from "react-icons/fi"
import { MdOutlineShoppingCart } from "react-icons/md"
import "@/app/styles/header.css"
export default function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeAllDropdowns = () => {
    setActiveDropdown(null)
  }

  return (
    <header className={`modern-header ${isSticky ? "sticky" : ""}`}>
      {/* Top Bar */}
      {!isSticky && (
        <div className="header-top">
          <div className="container">
            <div className="top-content">
              <div className="contact-info">
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <span>+1 (800) 123-456722</span>
                </div>
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <span>info@pvclasses.com</span>
                </div>
              </div>
              <div className="top-actions">
                <Link href="/login" className="top-link">
                  <FiUser className="link-icon" />
                  <span>Login</span>
                </Link>
                <Link href="/register" className="top-link">
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo-section">
              <Link href="/" className="logo-link">
                <Image src="/images/logopv.png" alt="PVclasses Logo" width={100} height={100} priority />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/course" className="nav-link">
                    Courses
                  </Link>
                </li>
                  <li className="nav-item">
                  <Link href="/blog" className="nav-link">
                    Blog
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    onClick={() => toggleDropdown("profiles")}
                    onBlur={() => setTimeout(closeAllDropdowns, 150)}
                  >
                    Profiles
                    {/* <FiChevronDown className={`dropdown-icon ${activeDropdown === "profiles" ? "active" : ""}`} /> */}
                  </button>
                  <ul className={`dropdown-menu ${activeDropdown === "profiles" ? "active" : ""}`}>
                    {/* <li>
                      <Link href="/InstructorProfile" className="dropdown-link">
                        Instructor Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/userProfile" className="dropdown-link">
                        User Profile
                      </Link>
                    </li>
                  </ul>
                </li>
              
                <li className="nav-item">
                  <Link href="/contact" className="nav-link">Contact</Link>
                </li>
                {/* <li className="nav-item">
                  <Link href="/cart" className="nav-link">
                    <MdOutlineShoppingCart size={20} />
                  </Link>
                </li> */}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* <Link href="/cart" className="cart-link">
                <MdOutlineShoppingCart className="cart-icon" />
                <span className="cart-badge">3</span>
              </Link> */}
              <Link href="/course" className="cta-button">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
              <FiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-header">
              <Link href="/" className="mobile-logo">
                <Image src="/images/logopv.png" alt="PVclasses Logo" width={100} height={80} />
              </Link>
              <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <FiX />
              </button>
            </div>
            <div className="mobile-content">
              <nav className="mobile-nav">
                <ul className="mobile-menu-list">
                  <li>
                    <Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/course" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Courses
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/InstructorProfile" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Instructor Profile
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/userProfile" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      User Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Contact
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="/cart" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                      Cart
                    </Link>
                  </li> */}
                </ul>
              </nav>
              <div className="mobile-actions">
                <Link href="/login" className="mobile-btn secondary" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="mobile-btn primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Register
                </Link>
              </div>
              <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>×</button>
            </div>
            <div className="mobile-menu-content">
              <ul className="mobile-nav-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/course">Courses</Link></li>
                <li><Link href="/InstructorProfile">Instructor Profile</Link></li>
                <li><Link href="/userProfile">User Profile</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/cart">Cart</Link></li>
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

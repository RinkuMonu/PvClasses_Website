"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/header.css";
import { ContextData } from "@/utils/context";

export default function Header() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { token } = ContextData();

  const toggleDropdown = (key: string) => {
    setDropdown((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuItems = [
    { label: "Home", href: "/" },
    { label: "Register", href: "/register" },
    { label: "Courses", href: "/course" },
    { label: "Instructor Profiles", href: "/InstructorProfile" },
    { label: "User Profiles", href: "/userProfile" },
    { label: "Cart", href: "/cart" },
    // { label: "Notes", href: "/books" },
    { label: "Login", href: "/login" },
  ];

  return (
    <header
      className={`main-header header-style-one ${isSticky ? "is-sticky" : ""}`}
    >
      {!isSticky && (
        <div className="header-top">
          <div className="auto-container">
            <div className="clearfix">
              <div className="top-left pull-left clearfix">
                <ul className="info-list">
                  <li>
                    <span>Call Us:</span>
                    <a href="tel:+123-456-7890"> +1 (800) 123-456722</a>
                  </li>
                  <li>
                    <span>Email Us:</span>
                    <a href="mailto:info@yourcompany.com">
                      {" "}
                      info@yourcompany.com
                    </a>
                  </li>
                </ul>
              </div>
              {!token && (
                <div className="top-right pull-right clearfix">
                  <ul className="login-nav">
                    <li>
                      <Link href="/login">Log In</Link>
                    </li>
                    <li>
                      <Link href="/register">Register</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="header-upper">
        <div className="auto-container">
          <div className="clearfix">
            <div className="pull-left logo-box py-0">
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/images/logopv.png"
                    alt="PVclasses Logo"
                    width={100}
                    height={60}
                  />
                </Link>
              </div>
            </div>

            <div className="nav-outer clearfix">
              <div
                className="mobile-nav-toggler"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FaBarsStaggered />
              </div>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <>
                  <div
                    className="animated-backdrop position-fixed top-0 start-0 w-100 h-100 z-1040"
                    onClick={() => setIsMobileMenuOpen(false)}
                  ></div>

                  <div
                    className="animated-menu position-fixed top-0 start-0 h-100 bg-white shadow-sm z-1050 overflow-auto"
                    style={{ maxWidth: "320px", width: "100%" }}
                  >
                    <div className="offcanvas-header d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                      <Link href="/">
                        <Image
                          src="/images/logopv.png"
                          alt="PVclasses Logo"
                          width={100}
                          height={60}
                        />
                      </Link>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsMobileMenuOpen(false)}
                      />
                    </div>

                    <div className="offcanvas-body pt-2">
                      <ul className="list-unstyled">
                        {mobileMenuItems.map((item) => (
                          <li key={item.label} className="border-bottom">
                            <Link
                              href={item.href}
                              className="d-block px-4 py-2 text-dark text-decoration-none"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* Desktop Menu */}
              <nav className="main-menu show navbar-expand-md">
                <div
                  className="navbar-collapse collapse clearfix"
                  id="navbarSupportedContent"
                >
                  <ul className="navigation clearfix">
                    <li className="current">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="">
                      <Link href="/course">Courses</Link>
                    </li>
                    {/* <li className="">
                      <Link href="/books">Notes</Link>
                    </li> */}
                    <li className="dropdown">
                      <Link href="#">Profiles</Link>
                      <ul>
                        <li>
                          <Link href="/InstructorProfile">
                            Instructor Profile
                          </Link>
                        </li>
                        <li>
                          <Link href="/userProfile">User profile</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="">
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link href="/cart">
                        <MdOutlineShoppingCart />
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

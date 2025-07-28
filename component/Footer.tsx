"use client";

import Image from "next/image";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { FaPinterest } from "react-icons/fa";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Parallax } from "react-scroll-parallax";

export default function Footer() {
  return (
    <footer className="main-footer position-relative overflow-hidden py-5">
      {/* Parallax Background Layers */}
      <Parallax speed={-20}>
        <div
          className="pattern-layer absolute top-0 left-0"
          style={{
            backgroundImage: "url(/images/icons/icon-1.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            backgroundSize: "auto",
            zIndex: "-1",
          }}
        ></div>
      </Parallax>

      <Parallax speed={-10}>
        <div
          className="pattern-layer-two absolute top-0 right-0"
          style={{
            backgroundImage: "url(/images/icons/icon-3.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "auto",
            zIndex: "-1",
          }}
        ></div>
      </Parallax>

      <div className="container">
        {/* Widgets Section */}
        <div className="row gy-4">
          {/* Column Left */}
          <div className="col-lg-6">
            <div className="row">
              {/* Logo & About */}
              <div className="col-md-7">
                <div className="footer-widget logo-widget mb-4">
                  <div className="logo mb-3">
                    <a href="/">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={230}
                        height={60}
                      />
                    </a>
                  </div>
                  <p className="text-muted">
                    Replenish him third creature and meat blessed void a fruit
                    gathered you’re, they’re two waters own morning gathered
                    greater.
                  </p>
                  <div className="social-box mt-3">
                    <a href="#" className="me-2 text-decoration-none">
                      <FaFacebook />
                    </a>
                    <a href="#" className="me-2 text-decoration-none">
                      <BsInstagram />
                    </a>
                    <a href="#" className="me-2 text-decoration-none">
                      <FaXTwitter />
                    </a>
                    <a href="#" className="text-decoration-none">
                      <FaPinterest />
                    </a>
                  </div>
                  <div className="copyright mt-3 text-secondary small">
                    &copy; 2025 PVClasses
                  </div>
                </div>
              </div>

              {/* About Us Links */}
              <div className="col-md-5">
                <div className="footer-widget links-widget mb-4">
                  <h5 className="mb-3">About Us</h5>
                  <ul className="list-unstyled text-muted">
                    {/* <li><a href="#" className="text-decoration-none">Afficiates</a></li>
                    <li><a href="#" className="text-decoration-none">Partners</a></li>
                    <li><a href="#" className="text-decoration-none">Reviews</a></li> */}
                    <li>
                      <a href="/blogs" className="text-decoration-none">
                        Blogs
                      </a>
                    </li>
                    <li>
                      <a href="/InstructorProfile">Instructor Profile</a>
                    </li>
                    <li>
                      <a href="/course">Course Details</a>
                    </li>
                    <li>
                      <a href="/books">Books</a>
                    </li>
                    {/* <li><a href="#" className="text-decoration-none">Newsletter</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-6">
                <div className="footer-widget links-widget mb-4">
                  <h5 className="mb-3">Resource</h5>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <a href="/course" className="text-decoration-none">
                        SSC Course
                      </a>
                    </li>
                    <li>
                      <a href="/course" className="text-decoration-none">
                        UPSC Course
                      </a>
                    </li>
                    <li>
                      <a href="/course" className="text-decoration-none">
                        IAS Course
                      </a>
                    </li>
                    <li>
                      <a href="/course" className="text-decoration-none">
                        IPS Course
                      </a>
                    </li>
                    <li>
                      <a href="/course" className="text-decoration-none">
                        RAS Course
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-md-6">
                <div className="footer-widget links-widget mb-4">
                  <h5 className="mb-3">Quick Links</h5>
                  <ul className="list-unstyled text-muted">
                    <li>
                      <a href="/" className="text-decoration-none">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none">
                        Terms & Condition
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-decoration-none">
                        Refund & Cancellation Policy
                      </a>
                    </li>

                    <li>
                      <a href="/contact" className="text-decoration-none">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

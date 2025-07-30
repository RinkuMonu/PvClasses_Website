import Link from "next/link"
import { LuChevronRight, LuBookOpen, LuUsers, LuAward, LuPlay } from "react-icons/lu"

function ReadyToStart() {
  return (
    <section className="modern-cta-section">
      <div className="cta-container">
        {/* Main Content */}
        <div className="cta-content">
          <div className="">
            <div className="section-badge">
              <LuBookOpen className="badge-icon" />
              <span>Start Your Journey</span>
            </div>

            <h2 className="cta-title">Ready to get started?</h2>

            <p className="cta-description">
              Join thousands of students who have transformed their careers with our expert-led courses. Start your
              learning journey today and unlock your potential with hands-on projects and industry-recognized
              certifications.
            </p>

            <div className="buttons-container">
              <Link href="/course" className="primary-cta-btn">
                <span className="btn-text">Get Started</span>
                <LuChevronRight className="btn-icon" />
              </Link>
              <Link href="/course" className="secondary-cta-btn">
                <LuPlay className="play-icon" />
                <span className="btn-text" >All Courses</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="indicator">
                <LuUsers className="indicator-icon" />
                <span className="indicator-text">10,000+ Students</span>
              </div>
              <div className="indicator">
                <LuAward className="indicator-icon" />
                <span className="indicator-text">Industry Certified</span>
              </div>
              <div className="indicator">
                <div className="rating-stars">★★★★★</div>
                <span className="indicator-text">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Elements */}
        <div className="cta-visual">
          <div className="cards-container">
            <div className="visual-card card-1">
              <div className="card-icon">
                <LuBookOpen />
              </div>
              <div className="card-content">
                <h4>200+ Courses</h4>
                <p>Expert-led programs</p>
              </div>
            </div>

            <div className="visual-card card-2">
              <div className="card-icon">
                <LuUsers />
              </div>
              <div className="card-content">
                <h4>Live Sessions</h4>
                <p>Interactive learning</p>
              </div>
            </div>

            <div className="visual-card card-3">
              <div className="card-icon">
                <LuAward />
              </div>
              <div className="card-content">
                <h4>Certificates</h4>
                <p>Industry recognized</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="pattern-grid"></div>
        <div className="gradient-overlay"></div>
      </div>
    </section>
  )
}

export default ReadyToStart

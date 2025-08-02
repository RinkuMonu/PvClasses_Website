import Link from "next/link"
import { LuChevronRight, LuBookOpen, LuUsers, LuAward, LuPlay, LuStar } from "react-icons/lu"
import "@/app/styles/ready-to-start-styles.css"

function ReadyToStart() {
  return (
    <section className="edu-cta-wrapper">
      <div className="cta-main-container">
        {/* Main Content Section */}
        <div className="cta-content-area">
          <div className="content-inner-wrapper">
            <div className="journey-badge">
              <LuBookOpen className="journey-badge-icon" />
              <span className="journey-badge-text">Start Your Journey</span>
            </div>

            <h2 className="cta-main-heading">Ready to get started?</h2>

            <p className="cta-main-description">
              Join thousands of students who have transformed their careers with our expert-led courses. Start your
              learning journey today and unlock your potential with hands-on projects and industry-recognized
              certifications.
            </p>

            <div className="action-buttons-wrapper">
              <Link href="/course" className="primary-action-button">
                <span className="button-label">Get Started</span>
                <LuChevronRight className="button-arrow-icon" />
              </Link>
              <Link href="/course" className="secondary-action-button">
                <LuPlay className="button-play-icon" />
                <span className="button-label">All Courses</span>
              </Link>
            </div>

            {/* Trust and Social Proof */}
            <div className="social-proof-container">
              <div className="proof-indicator">
                <LuUsers className="proof-icon" />
                <span className="proof-text">10,000+ Students</span>
              </div>
              <div className="proof-indicator">
                <LuAward className="proof-icon" />
                <span className="proof-text">Industry Certified</span>
              </div>
              <div className="proof-indicator">
                <div className="rating-display">
                  <LuStar className="star-icon filled" />
                  <LuStar className="star-icon filled" />
                  <LuStar className="star-icon filled" />
                  <LuStar className="star-icon filled" />
                  <LuStar className="star-icon filled" />
                </div>
                <span className="proof-text">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Elements Section */}
        <div className="cta-visual-area">
          <div className="feature-cards-grid">
            <div className="feature-showcase-card card-primary">
              <div className="showcase-card-icon">
                <LuBookOpen />
              </div>
              <div className="showcase-card-details">
                <h4 className="card-title">200+ Courses</h4>
                <p className="card-subtitle">Expert-led programs</p>
              </div>
            </div>

            <div className="feature-showcase-card card-secondary">
              <div className="showcase-card-icon">
                <LuUsers />
              </div>
              <div className="showcase-card-details">
                <h4 className="card-title">Live Sessions</h4>
                <p className="card-subtitle">Interactive learning</p>
              </div>
            </div>

            <div className="feature-showcase-card card-tertiary">
              <div className="showcase-card-icon">
                <LuAward />
              </div>
              <div className="showcase-card-details">
                <h4 className="card-title">Certificates</h4>
                <p className="card-subtitle">Industry recognized</p>
              </div>
            </div>
          </div>

          {/* Decorative Animation Elements */}
          <div className="animated-decoration decoration-circle-1"></div>
          <div className="animated-decoration decoration-circle-2"></div>
          <div className="animated-decoration decoration-circle-3"></div>
        </div>
      </div>

      {/* Background Design Elements */}
      <div className="section-background-design">
        <div className="geometric-pattern-grid"></div>
        <div className="gradient-background-overlay"></div>
      </div>
    </section>
  )
}

export default ReadyToStart

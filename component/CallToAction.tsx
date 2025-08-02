  "use client"

import { useRouter } from "next/navigation"
import { FiBookOpen, FiUsers, FiAward, FiArrowRight, FiStar, FiTrendingUp } from "react-icons/fi"
import "@/app/styles/calltoaction.css"
export default function CallToAction() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/course")
  }

  return (
    <section className="hero-cta-section">
      <div className="hero-container">
        <div className="hero-layout">
          {/* Left Content */}
          <div className="h">
            <div className="content-badge">
              <FiTrendingUp className="badge-icon" />
              <span>Transform Your Career</span>
            </div>

            <h1 className="hero-title" style={{color:"#000"}}>
              Learn Skills That Matter,
              <span className="title-highlight"> Advance Your Future</span>
            </h1>

            <p className="hero-description">
              Join thousands of professionals who have transformed their careers with our expert-led courses. Get
              industry-relevant skills, hands-on projects, and career support that actually works.
            </p>

            <div className="hero-actions">
              <button className="cta-primary-btn" onClick={handleGetStarted}>
                <span>Start Learning Today</span>
                <FiArrowRight className="btn-arrow" />
              </button>
            </div>

            {/* Achievement Highlights */}
            <div className="achievement-highlights">
              <div className="highlight-item">
                <div className="highlight-number">50K+</div>
                <div className="highlight-text">Students</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">200+</div>
                <div className="highlight-text">Courses</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">4.9★</div>
                <div className="highlight-text">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Stats Panel */}
          <div className="stats-panel">
            <div className="panel-header">
              <h3 className="panel-title">Why Choose Us?</h3>
              <p className="panel-subtitle">Join our community of successful learners</p>
            </div>

            <div className="metrics-grid">
              <div className="metric-card card-primary">
                <div className="metric-icon icon-blue">
                  <FiUsers />
                </div>
                <div className="metric-info">
                  <div className="metric-value">50,000+</div>
                  <div className="metric-label">Active Students</div>
                </div>
              </div>

              <div className="metric-card card-secondary">
                <div className="metric-icon icon-cyan">
                  <FiBookOpen />
                </div>
                <div className="metric-info">
                  <div className="metric-value">200+</div>
                  <div className="metric-label">Expert Courses</div>
                </div>
              </div>

              <div className="metric-card card-success">
                <div className="metric-icon icon-green">
                  <FiAward />
                </div>
                <div className="metric-info">
                  <div className="metric-value">95%</div>
                  <div className="metric-label">Success Rate</div>
                </div>
              </div>

              <div className="metric-card card-warning">
                <div className="metric-icon icon-lime">
                  <FiStar />
                </div>
                <div className="metric-info">
                  <div className="metric-value">4.9/5</div>
                  <div className="metric-label">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>Industry-recognized certificates</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>Learn at your own pace</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>Expert instructor support</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>Hands-on projects & portfolio</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>Career guidance & job placement</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">✓</div>
                <span>Lifetime access to content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decoration-elements">
          <div className="deco-circle circle-1"></div>
          <div className="deco-circle circle-2"></div>
          <div className="deco-pattern"></div>
        </div>
      </div>
    </section>
  )
}

"use client"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"
import { PiBookOpenUserBold, PiStudentBold } from "react-icons/pi"
import { GiWorld } from "react-icons/gi"
import { FiTrendingUp } from "react-icons/fi"

export default function AchievementsSection() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.3 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="modern-achievements-section">
      <div className="achievements-container">
        {/* Section Header */}
        <div className="" style={{margin:"20px auto", textAlign:"center"}}>
          <div className="header-badge">
            <FiTrendingUp className="badge-icon" />
            <span>Our Impact</span>
          </div>
          <h2 className="section-title">Achievements That Speak Volumes</h2>
          <p className="section-description mb-5" style={{margin:"0 auto"}}>
            Our commitment to excellence in education has led to remarkable milestones. Join thousands of successful
            learners who have transformed their careers with our comprehensive courses.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {/* Total Courses */}
          <div className="achievement-card" ref={ref1}>
            <div className="card-background"></div>
            <div className="card-content">
              <div className="icon-wrapper icon-blue">
                <PiBookOpenUserBold className="achievement-icon" />
              </div>
              <div className="achievement-info">
                <div className="counter-wrapper">
                  <span className="counter-number">{inView1 && <CountUp end={50} duration={2.5} />}</span>
                  <span className="counter-suffix">+</span>
                </div>
                <h3 className="achievement-title">Expert Courses</h3>
                <p className="achievement-description">
                  Comprehensive courses designed by industry experts to give you practical, job-ready skills.
                </p>
              </div>
            </div>
          </div>

          {/* Total Students */}
          <div className="achievement-card featured" ref={ref2}>
            <div className="card-background"></div>
            <div className="card-content">
              <div className="icon-wrapper icon-cyan">
                <PiStudentBold className="achievement-icon" />
              </div>
              <div className="achievement-info">
                <div className="counter-wrapper">
                  <span className="counter-number">{inView2 && <CountUp end={45} duration={3} />}</span>
                  <span className="counter-suffix">K+</span>
                </div>
                <h3 className="achievement-title">Happy Students</h3>
                <p className="achievement-description">
                  Thousands of students have successfully completed our courses and advanced their careers.
                </p>
              </div>
            </div>
          </div>

          {/* Global Position */}
          <div className="achievement-card" ref={ref3}>
            <div className="card-background"></div>
            <div className="card-content">
              <div className="icon-wrapper icon-green">
                <GiWorld className="achievement-icon" />
              </div>
              <div className="achievement-info">
                <div className="counter-wrapper">
                  <span className="counter-number">{inView3 && <CountUp end={115} duration={4} />}</span>
                  <span className="counter-suffix"></span>
                </div>
                <h3 className="achievement-title">Countries Reached</h3>
                <p className="achievement-description">
                  Our global reach spans across multiple countries, making quality education accessible worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="additional-stats">
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Learning Opportunity</div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="pattern-grid"></div>
      </div>
    </section>
  )
}

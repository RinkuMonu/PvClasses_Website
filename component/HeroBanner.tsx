"use client"

import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { FiSearch, FiPlay, FiUsers, FiStar, FiTrendingUp } from "react-icons/fi"
import { LuGraduationCap, LuBookOpen, LuAward } from "react-icons/lu"
import "@/app/styles/herosection.css"
export default function HeroSection() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleGetStarted = () => {
    router.push("/course")
  }

  const handleWatchDemo = () => {
    console.log("Watch demo clicked")
  }

  return (
    <section className="main-banner-area mt-4">
      <div className="banner-container">
        <div className="banner-layout">
          {/* Main Content */}
          <div className="banner-content">
            <div className="content-intro">
              <div className="intro-badge">
                <LuGraduationCap className="badge-icon" />
                <span>Discover 20,000+ World-Class Courses</span>
              </div>

              <h1 className="banner-title">
                Learn Math, Science, English and <span className="title-highlight">Test Prep from our Experts</span>
              </h1>

              <p className="banner-description">
                Expand your knowledge and open doors to exciting careers with our comprehensive online education
                platform. Join thousands of successful learners today.
              </p>
            </div>

            {/* Search Section */}
            <div className="search-area">
              <form onSubmit={handleSubmit} className="search-wrapper">
                <div className="input-container">
                  <FiSearch className="input-icon" />
                  <input
                    type="search"
                    placeholder="What do you want to learn today?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                    required
                  />
                  <button type="submit" className="submit-button">
                    Search
                  </button>
                </div>
              </form>

              <div className="trending-searches">
                <span className="trending-label">Popular:</span>
                <div className="tag-list">
                  <button className="tag-item">Mathematics</button>
                  <button className="tag-item">Science</button>
                  <button className="tag-item">English</button>
                  <button className="tag-item">Test Prep</button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="main-cta-btn" onClick={handleGetStarted}>
                <span>Get Started</span>
                <LuBookOpen className="cta-icon" />
              </button>
              <button className="secondary-cta-btn" onClick={handleWatchDemo}>
                <FiPlay className="demo-icon" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="stats-display">
              <div className="stats-item">
                <div className="stats-number">50K+</div>
                <div className="stats-label">Students</div>
              </div>
              <div className="stats-item">
                <div className="stats-number">200+</div>
                <div className="stats-label">Courses</div>
              </div>
              <div className="stats-item">
                <div className="stats-number">4.9★</div>
                <div className="stats-label">Rating</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="banner-visual">
            <div className="image-wrapper">
              {/* Main Image */}
              <div className="primary-image">
                <img
                  src="https://validthemes.net/site-template/lerna/assets/img/illustration/1.png"
                  alt="Student learning online"
                  className="banner-image"
                />
              </div>

              {/* Floating Cards */}
              <div className="info-cards">
                {/* Rating Card */}
                <div className="info-card rating-widget">
                  <div className="widget-content">
                    <div className="score-value">4.9</div>
                    <div className="star-rating">
                      <FiStar className="star filled" />
                      <FiStar className="star filled" />
                      <FiStar className="star filled" />
                      <FiStar className="star filled" />
                      <FiStar className="star filled" />
                    </div>
                    <div className="score-label">Instructor Rating</div>
                  </div>
                </div>

                {/* Students Card */}
                <div className="info-card students-widget">
                  <div className="widget-content">
                    <div className="widget-icon">
                      <FiUsers />
                    </div>
                    <div className="widget-info">
                      <div className="widget-number">50,000+</div>
                      <div className="widget-text">Active Students</div>
                    </div>
                  </div>
                </div>

                {/* Achievement Card */}
                <div className="info-card achievement-widget">
                  <div className="widget-content">
                    <div className="widget-icon">
                      <LuAward />
                    </div>
                    <div className="widget-info">
                      <div className="widget-number">95%</div>
                      <div className="widget-text">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Trending Card */}
                <div className="info-card trending-widget">
                  <div className="widget-content">
                    <div className="widget-icon">
                      <FiTrendingUp />
                    </div>
                    <div className="widget-info">
                      <div className="widget-number">200+</div>
                      <div className="widget-text">Expert Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="background-decorations">
          <div className="decoration-shape shape-primary"></div>
          <div className="decoration-shape shape-secondary"></div>
          <div className="decoration-shape shape-tertiary"></div>
          <div className="pattern-overlay"></div>
        </div>
      </div>
    </section>
  )
}

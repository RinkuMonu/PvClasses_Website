"use client"

import { useState, useEffect } from "react"
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi"

export default function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Student",
      image: "/images/resource/author-1.jpg",
      rating: 5,
      text: "The courses here have completely transformed my understanding of programming. The instructors are incredibly knowledgeable and the hands-on projects helped me build a strong portfolio. I landed my dream job right after graduation!",
      course: "Full Stack Development",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Parent",
      image: "/images/resource/author-2.jpg",
      rating: 5,
      text: "As a parent, I'm amazed by the progress my daughter has made. The platform is user-friendly, the support is excellent, and the quality of education is outstanding. Worth every penny!",
      course: "Data Science Bootcamp",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Design Student",
      image: "/images/resource/author-3.jpg",
      rating: 5,
      text: "I never thought online learning could be this interactive and effective. The design courses are comprehensive, and the mentorship program helped me transition into my new career seamlessly.",
      course: "UI/UX Design",
    },
  ]

  const authors = [
    { id: 1, image: "/images/resource/author-1.jpg" },
    { id: 2, image: "/images/resource/author-2.jpg" },
    { id: 3, image: "/images/resource/author-3.jpg" },
    { id: 4, image: "/images/resource/author-4.jpg" },
    { id: 5, image: "/images/resource/author-5.jpg" },
    { id: 6, image: "/images/resource/author-6.jpg" },
    { id: 7, image: "/images/resource/author-7.jpg" },
    { id: 8, image: "/images/resource/author-8.jpg" },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="modern-testimonial-section">
      <div className="testimonial-container">
        {/* Section Header */}
        <div className="" style={{margin:"20px auto", textAlign:"center"}}>
          <div className="header-badge">
            <FiStar className="badge-icon" />
            <span>Testimonials</span>
          </div>
          <h2 className="section-title">Students &amp; Parents Opinion</h2>
          <p className="section-description mb-5" style={{margin:"0 auto"}}>
            Hear from our successful students and satisfied parents about their transformative learning experience with
            us.
          </p>
        </div>

        {/* Authors Circle */}
        {/* <div className="authors-circle">
          {authors.map((author, index) => (
            <div
              key={author.id}
              className={`author-avatar author-${index + 1}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={author.image || "/placeholder.svg"} alt={`Student ${author.id}`} />
            </div>
          ))}
          <div className="circle-center">
            <div className="center-content">
              <div className="student-count">1000+</div>
              <div className="center-label">Happy Students</div>
            </div>
          </div>
        </div> */}

        {/* Testimonial Carousel */}
        <div className="testimonial-carousel">
          <div className="carousel-container">
            <div className="testimonial-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="quote-icon">
                      {/* <FiQuote /> */}
                    </div>

                    <div className="testimonial-content">
                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="star filled" />
                        ))}
                      </div>

                      <p className="testimonial-text">"{testimonial.text}"</p>

                      <div className="testimonial-footer">
                        <div className="author-info">
                          <div className="author-image">
                            <img src={testimonial.image || "/images/resource/author-1.jpg"} alt={testimonial.name} />
                          </div>
                          <div className="author-details">
                            <h4 className="author-name">{testimonial.name}</h4>
                            <p className="author-role">{testimonial.role}</p>
                            <span className="course-tag">{testimonial.course}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="carousel-navigation">
            <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous testimonial">
              <FiChevronLeft />
            </button>
            <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next testimonial">
              <FiChevronRight />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="testimonial-stats">
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="background-elements">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
      </div>
    </section>
  )
}

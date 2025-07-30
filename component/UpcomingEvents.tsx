"use client"

import { useInView } from "react-intersection-observer"
import { FiCalendar, FiClock, FiArrowRight, FiUsers, FiStar, FiBookOpen } from "react-icons/fi"

export default function UpcomingEvents() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const events = [
    {
      id: 1,
      date: "25",
      month: "JAN",
      year: "2024",
      time: "10:00 AM - 1:00 PM",
      title: "Web Development Bootcamp",
      description:
        "Master modern web technologies in this intensive hands-on workshop. Learn React, Node.js, and deployment strategies.",
      categories: ["Web Dev", "React"],
      location: "Online",
      attendees: 45,
      price: "Free",
      instructor: "Sarah Chen",
      level: "Beginner",
      featured: true,
    },
    {
      id: 2,
      date: "15",
      month: "FEB",
      year: "2024",
      time: "2:00 PM - 5:00 PM",
      title: "UI/UX Design Masterclass",
      description: "Design thinking, user research, prototyping, and creating stunning user interfaces that convert.",
      categories: ["Design", "UI/UX"],
      location: "Hybrid",
      attendees: 32,
      price: "₹299",
      instructor: "Alex Rodriguez",
      level: "Intermediate",
      featured: false,
    },
    {
      id: 3,
      date: "08",
      month: "MAR",
      year: "2024",
      time: "11:00 AM - 4:00 PM",
      title: "Data Science Workshop",
      description:
        "Dive deep into data analysis, machine learning algorithms, and visualization techniques using Python.",
      categories: ["Data Science", "Python"],
      location: "Online",
      attendees: 28,
      price: "₹499",
      instructor: "Dr. Priya Sharma",
      level: "Advanced",
      featured: false,
    },
  ]

  return (
    <section className="events-section">
      <div className="container">
        {/* Section Header */}
        <div className="" style={{margin:"20px auto", textAlign:"center"}}>
          <div className="content">
            <div className="badge">
              <FiCalendar className="badge-icon" />
              <span>Upcoming Events</span>
            </div>
            <h2 className="section-title">Join Our Learning Events</h2>
            <p className="section-description mb-5" style={{margin:"0 auto"}}>
              Participate in our expert-led workshops, masterclasses, and networking events designed to enhance your
              skills and advance your career.
            </p>
          </div>
          {/* <a href="/event" className="view-all-btn">
            View All Events
            <FiArrowRight className="btn-icon" />
          </a> */}
        </div>

        {/* Events Grid */}
        <div ref={ref} className={`events-grid ${inView ? "fade-in" : ""}`}>
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`event-card ${event.featured ? "featured" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {event.featured && <div className="featured-label">Most Popular</div>}

              <div className="event-header">
                <div className="date-badge">
                  <div className="date-day">{event.date}</div>
                  <div className="date-month">{event.month}</div>
                </div>
                <div className="event-price">{event.price}</div>
              </div>

              <div className="event-body">
                <div className="event-meta">
                  <span className="level-tag">{event.level}</span>
                  <span className="location-tag">{event.location}</span>
                </div>

                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-details">
                  <div className="detail">
                    <FiClock className="detail-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="detail">
                    <FiUsers className="detail-icon" />
                    <span>{event.attendees} registered</span>
                  </div>
                  <div className="detail">
                    <FiStar className="detail-icon" />
                    <span>{event.instructor}</span>
                  </div>
                </div>

                <div className="event-categories">
                  {event.categories.map((category, idx) => (
                    <span key={idx} className="category-pill">
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="event-footer">
                {/* <button className="register-button">
                  <FiBookOpen className="register-icon" />
                  Register Now
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        
      </div>
    </section>
  )
}

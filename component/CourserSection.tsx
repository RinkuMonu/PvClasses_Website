"use client"

import api from "@/utils/axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { LuChevronRight, LuUsers, LuClock, LuStar } from "react-icons/lu"

// Course type definition
type Course = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  thumbnail: string
  instructor?: {
    name: string
  }
  students?: number
  duration?: string
  rating?: number
}

export default function CourseSection() {
  const [courses, setCourse] = useState<Course[]>([])
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([])
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses")
        if (!res?.data?.data) {
          console.error("No courses data found")
          return
        }
        setCourse(res?.data?.data)
      } catch (e) {
        console.error("Error fetching courses:", e)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchEnroll = async () => {
      try {
        const res = await api.get("/enrollments")
        const ids = res.data.data.map((enrollment: { course: { _id: string } }) => enrollment.course._id)
        setEnrolledCourseIds(ids)
      } catch (e) {
        console.error("Error fetching enrollments:", e)
      }
    }
    fetchEnroll()
  }, [])

  const getEnrollment = async (courseId: string) => {
    setLoadingCourseId(courseId)
    try {
      const res = await api.post(`/enrollments`, { courseId })
      if (res.status === 201) {
        toast.success("Successfully enrolled in the course!")
        const enrolledCourse = courses.find((c) => c._id === courseId)
        if (enrolledCourse) {
          setTimeout(() => {
            window.location.href = `/coursedetails/${enrolledCourse?.slug}`
          }, 1000)
        }
      } else {
        toast.error("Failed to enroll in the course.")
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Enrollment failed. Try again.")
    } finally {
      setLoadingCourseId(null)
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "16px 20px",
          },
        }}
      />

      <section className="modern-courses-section">
        <div className="courses-container">
          {/* Header Section */}
          <div className="section-header">
            <div className="content">
              <div className="badge">Featured Courses</div>
              <h2 className="section-title">Discover Our Top-Rated Courses</h2>
              <p className="section-description">
                Transform your career with our expertly crafted courses. Learn from industry professionals and gain the
                skills that matter in today's competitive market.
              </p>
              <Link href="/course" className="explore-btn">
                <span>Explore All Courses</span>
                <LuChevronRight className="btn-icon" />
              </Link>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {courses?.map((course) => (
              <div key={course._id} className="course-card">
                <div className="card-image-wrapper">
                  <Link href={`/coursedetails/${course.slug}`}>
                    <Image
                      src={course?.thumbnail || "/placeholder.svg"}
                      alt={course?.title || "Course Thumbnail"}
                      width={400}
                      height={240}
                      className="course-image"
                      quality={90}
                      priority
                    />
                  </Link>
                  <div className="image-overlay">
                    <div className="price-tag">₹{course.price.toLocaleString()}</div>
                  </div>
                </div>

                <div className="card-content">
                  <div className="course-meta">
                    <div className="instructor-info">
                      <span className="instructor-label">by</span>
                      <span className="instructor-name">{course?.instructor?.name}</span>
                    </div>
                    <div className="course-stats">
                      {course.rating && (
                        <div className="rating">
                          <LuStar className="star-icon" />
                          <span>{course.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link href={`/coursedetails/${course.slug}`}>
                    <h3 className="course-title">{course?.title}</h3>
                  </Link>

                  <p className="course-description">
                    {course.description.split(" ").slice(0, 12).join(" ")}
                    {course.description.split(" ").length > 12 && "..."}
                  </p>

                  <div className="course-footer">
                    <div className="course-info">
                      <div className="info-item">
                        <LuUsers className="info-icon" />
                        <span>{course.students || 0} students</span>
                      </div>
                      {course.duration && (
                        <div className="info-item">
                          <LuClock className="info-icon" />
                          <span>{course.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="course-action">
                      {enrolledCourseIds.includes(course._id) ? (
                        <Link href={`/coursedetails/${course?.slug}`}>
                          <button className="action-btn enrolled">Continue Learning</button>
                        </Link>
                      ) : (
                        <button
                          className="action-btn enroll"
                          onClick={(e) => {
                            e.preventDefault()
                            getEnrollment(course._id)
                          }}
                          disabled={loadingCourseId === course._id}
                        >
                          {loadingCourseId === course._id ? <div className="loading-spinner" /> : "Enroll Now"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

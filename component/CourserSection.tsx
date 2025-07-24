import api from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LuChevronRight } from "react-icons/lu";

// Optional: Define a Course type for clarity
type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
  instructor?: {
    name: string;
  };
  students?: number;
};

export default function CourserSection() {
  const [courses, setCourse] = useState<Course[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        if (!res?.data?.data) {
          console.error("No courses data found");
          return;
        }
        setCourse(res?.data?.data);
      } catch (e) {
        console.error("Error fetching courses:", e);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchEnroll = async () => {
      try {
        const res = await api.get("/enrollments");
        const ids = res.data.data.map(
          (enrollment: { course: { _id: string } }) => enrollment.course._id
        );
        setEnrolledCourseIds(ids);
      } catch (e) {
        console.error("Error fetching enrollments:", e);
      }
    };
    fetchEnroll();
  }, []);

  const getEnrollment = async (courseId: string) => {
    setLoadingCourseId(courseId);
    try {
      const res = await api.post(`/enrollments`, { courseId });
      if (res.status === 201) {
        toast.success("Successfully enrolled in the course!");
        const enrolledCourse = courses.find((c) => c._id === courseId);
        if (enrolledCourse) {
          setTimeout(() => {
            window.location.href = `/coursedetails/${enrolledCourse?.slug}`;
          }, 1000);
        }
      } else {
        toast.error("Failed to enroll in the course.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Enrollment failed. Try again."
      );
    } finally {
      setLoadingCourseId(null);
    }
  };

  return (
    <>
      <Toaster />
      <section className="courses-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="title-column col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="sec-title">
                  <h2>Our top courses</h2>
                  <div className="text">
                    Replenish him third creature and meat blessed void a fruit
                    gathered you’re, they’re two waters own morning gathered.
                  </div>
                </div>
                <a href="/course" className="theme-btn btn-style-three">
                  <span className="txt">
                    Get Started <LuChevronRight />
                  </span>
                </a>
              </div>
            </div>

            {courses?.map((course) => (
              <div
                key={course._id}
                className="cource-block col-lg-4 col-md-6 col-sm-12"
              >
                <Link
                  href={`/coursedetails/${course.slug}`}
                  className="inner-box-link"
                >
                  <div className="inner-box">
                    <div className="image">
                      <Image
                        src={course?.thumbnail}
                        alt={course?.title || "Default Title"}
                        width={500}
                        height={100}
                        className="img-fluid"
                        quality={100}
                        priority
                        style={{
                          borderRadius:"8px"
                        }}
                      />
                    </div>
                    <div className="lower-content">
                      <div className="clearfix">
                        <div className="pull-left">
                          <h5>{course?.title}</h5>
                          <span>by: {course?.instructor?.name}</span>
                        </div>
                        <div className="pull-right">
                          <div className="price">{course.price} INR</div>
                        </div>
                      </div>
                      <div className="text">
                        {course.description.split(" ").slice(0, 5).join(" ")}...
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="clearfix">
                  <div className="pull-left">
                    <div className="students">{course.students}</div>
                  </div>
                  <div className="pull-right">
                    {enrolledCourseIds.includes(course._id) ? (
                      <Link href={`coursedetails/${course?.slug}`}>
                        <button className="homeenroll">Watch now</button>
                      </Link>
                    ) : (
                      <button
                        className="homeenroll"
                        onClick={(e) => {
                          e.preventDefault();
                          getEnrollment(course._id);
                        }}
                        disabled={loadingCourseId === course._id}
                      >
                        {loadingCourseId === course._id ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          />
                        ) : (
                          "Enroll Now"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

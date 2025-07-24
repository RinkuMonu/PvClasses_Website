"use client"
import { FaPlay } from "react-icons/fa";
import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Head from "next/head";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import api from "@/utils/axios";
import Image from "next/image";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { FaUser } from "react-icons/fa6";

interface Instructor {
  _id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  enrollmentCount: number;
  totalLessons: number;
  price: number;
  thumbnail: string;
  instructor: Instructor;
}

interface Lesson {
  _id: string;
  title: string;
  content: string;
  duration: string;
  videourl: string;
  instructor: {
    _id: string;
    name: string;
  };
}

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
}

interface ReviewsResponse {
  data: Review[];
}

// interface PageProps {
//   params: {
//     courseId: string;
//   };
//   searchParams?: {
//     [key: string]: string | string[] | undefined;
//   };
// }

const CourseIntroSection = ({ courseId }: { courseId: string }) => {
  const [activeTab, setActiveTab] = useState("prod-overview");
  const [activeAccordion, setActiveAccordion] = useState<number>(-1);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [reviews, setReviews] = useState<ReviewsResponse>({ data: [] });
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  function getEmbedUrl(url: string) {
    if (!url) return "";

    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  }

  function getVideoId(url: string) {
    if (!url) return "";
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : "";
  }

  // Data arrays
  const tabs = [
    { id: "prod-overview", label: "Overview" },
    { id: "prod-curriculum", label: "Curriculum" },
    { id: "prod-announcement", label: "Announcement" },
    { id: "prod-faq", label: "FAQ" },
    { id: "prod-reviews", label: "Reviews" },
  ];

  const learnItems = [
    "Phasellus enim magna, varius et commodo ut.",
    "Sed consequat justo non mauris pretium at tempor justo.",
    "Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo",
    "Phasellus enim magna, varius et commodo ut.",
    "Phasellus enim magna, varius et commodo ut.",
    "Sed consequat justo non mauris pretium at tempor justo.",
    "Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo",
    "Phasellus enim magna, varius et commodo ut.",
  ];

  const requirements = [
    "Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo",
    "Ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel.",
    "Phasellus enim magna, varius et commodo ut.",
    "Varius et commodo ut, ultricies vitae velit. Ut nulla tellus.",
    "Phasellus enim magna, varius et commodo ut.",
  ];

  const curriculum = [
    {
      title: "UI/ UX Introduction",
      lessons: Array(3).fill({
        name: "What is UI/ UX Design?",
        duration: "35 Minutes",
      }),
    },
    {
      title: "Color Theory",
      lessons: Array(3).fill({
        name: "What is UI/ UX Design?",
        duration: "35 Minutes",
      }),
    },
    {
      title: "Basic Typography",
      lessons: Array(3).fill({
        name: "What is UI/ UX Design?",
        duration: "35 Minutes",
      }),
    },
    {
      title: "Wireframing & Prototyping",
      lessons: Array(3).fill({
        name: "What is UI/ UX Design?",
        duration: "35 Minutes",
      }),
    },
  ];

  const faqs = [
    {
      title: "Who we are?",
      lessons:
        "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      title: "What we are?",
      lessons:
        "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      title: "Basic Typography",
      lessons:
        "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      title: "Wireframing & Prototyping",
      lessons:
        "Understanding type hierarchy, readability, and font pairing strategies.",
    },
  ];

  const announcement = [
    {
      name: "Today Topics",
      duration: "35 Minutes",
      detail:
        "Introduction to UI principles and foundational concepts that will be discussed in today's session.",
    },
    {
      name: "Today Classes",
      duration: "35 Minutes",
      detail:
        "Practical classes focusing on prototyping and real-time user testing exercises.",
    },
    {
      name: "Typography",
      duration: "35 Minutes",
      detail:
        "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      name: "Wireframing",
      duration: "35 Minutes",
      detail:
        "Step-by-step creation of wireframes for mobile and web applications.",
    },
  ];

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await api.get<ReviewsResponse>(
          `courses/${courseId}/reviews`
        );
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReview();
  }, [courseId]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get<{ data: Course }>(
          `/courses/${courseId}`
        );
        setCourse(res?.data?.data);
      } catch (e) {
        console.error("Error fetching course:", e);
      }
    };

    fetchCourse();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      const res = await api.get<{ data: Lesson[]; isEnrolled: boolean }>(
        `/courses/${courseId}/lessons`
      );
      setLessons(res.data.data || []);
      setIsEnrolled(res?.data?.isEnrolled);
    } catch (e) {
      console.error("Error fetching lessons:", e);
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  const getEnrollment = async (courseId: string) => {
    setLoadingCourseId(courseId);
    try {
      const res = await api.post(`/enrollments`, { courseId });
      if (res.status === 201) {
        toast.success("Successfully enrolled in the course!");
        await fetchLessons();
      } else {
        toast.error("Failed to enroll in the course.");
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error?.response?.data?.message || "Enrollment failed. Try again."
      );
    } finally {
      setLoadingCourseId(null);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "prod-overview":
        return (
          <>
            <div className="course-overview">
              <div className="inner-box">
                <h4>{course?.title}</h4>
                <p>{course?.description}</p>
                <ul className="student-list">
                  <li>Total enroll Students : {course?.enrollmentCount}</li>
                  <li>
                    <FaStar className="fa fa-star" />
                    <FaStar className="fa fa-star" />
                    <FaStar className="fa fa-star" />
                    <FaStar className="fa fa-star" />
                    <FaStar className="fa fa-star" />
                  </li>
                  <li>Total Lessons: {course?.totalLessons}</li>
                </ul>
                <h3>What you&apos;ll learn?</h3>

                <ul className="review-list">
                  {learnItems.map((item, i) => (
                    <li key={i}>
                      <FaCheckCircle className="text-success me-2" size={12} />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
                <h3>Requirements</h3>
                <ul className="requirement-list">
                  {requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        );
      case "prod-curriculum":
        return (
          <ul className="accordion-box">
            {curriculum.map((section, i) => (
              <li key={i} className="accordion block">
                <div
                  className={`acc-btn ${activeAccordion === i ? "active" : ""}`}
                  onClick={() => toggleAccordion(i)}
                >
                  <div className="icon-outer">
                    <span className="icon">
                      {activeAccordion === i ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {section.title}
                </div>
                <div
                  className={`acc-content ${
                    activeAccordion === i ? "current" : ""
                  } `}
                >
                  {section.lessons.map((lesson, j) => (
                    <div key={j} className="content">
                      <div className="d-flex align-content-center justify-content-between">
                        <div className="pull-left d-flex align-content-center">
                          <a
                            href="https://www.youtube.com/watch?v=kxPCFljwJws"
                            className={`lightbox-image play-icon float ${
                              j % 2 !== 0 ? "pt-4" : ""
                            }`}
                          >
                            <span className="fa ">
                              <div className={`${j % 2 !== 0 ? "ripple" : ""}`}>
                                <FaPlay />
                              </div>
                            </span>
                          </a>
                          <div
                            className={`fs-6 ${j % 2 !== 0 ? "pt-3" : "pt-1"}`}
                          >
                            {lesson.name}
                          </div>
                        </div>

                        <div className="pull-right">
                          <div className="minutes">{lesson.duration}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        );
      case "prod-announcement":
        return (
          <div className="row">
            {announcement.map((item, index) => (
              <div className="px-5 mb-4" key={index}>
                <div className="card p-3 h-100 shadow-sm">
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-2 fw-bold">{item.name}</h5>
                    <p className="text-success mb-1">
                      <strong>Duration:</strong> {item.duration}
                    </p>
                  </div>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case "prod-faq":
        return (
          <ul className="accordion-box">
            {faqs.map((section, i) => (
              <li key={i} className="accordion block">
                <div
                  className={`acc-btn ${activeAccordion === i ? "active" : ""}`}
                  onClick={() => toggleAccordion(i)}
                >
                  <div className="icon-outer">
                    <span className="icon">
                      {activeAccordion === i ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                  </div>
                  {section.title}
                </div>
                <div
                  className={`acc-content ${
                    activeAccordion === i ? "current" : ""
                  }`}
                >
                  <div className="px-5 fs-6 pb-3">{section.lessons}</div>
                </div>
              </li>
            ))}
          </ul>
        );
      case "prod-reviews":
        return (
          <>
            {reviews.data.map((review) => (
              <div key={review._id} className="cource-review-box">
                <h4>{review?.user?.name}</h4>
                <div className="rating">
                  <FaStar className="fa fa-star" />
                  <FaStar className="fa fa-star" />
                  <FaStar className="fa fa-star" />
                  <FaStar className="fa fa-star" />
                  <FaStar className="fa fa-star" />
                  &ensp; {review?.rating} Reviews
                </div>
                <div className="text">{review?.comment}</div>
                <div className="helpful">Was this review helpful?</div>
                <ul className="like-option">
                  <li>
                    <IoMdCheckmark />
                  </li>
                  <li>
                    <RxCross2 />
                  </li>
                  <span className="report">Report</span>
                </ul>
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Toaster />
      <section className="page-title">
        <div className="auto-container">
          <h1>Course Introduction</h1>
        </div>
      </section>

      <Head>
        <title>{course?.title || "Course Details"}</title>
      </Head>

      <section className="intro-section">
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: "url(images/icons/icon-1.png)" }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: "url(images/icons/icon-2.png)" }}
        ></div>
        <div className="circle-one"></div>
        <div className="auto-container">
          <div className="sec-title">
            <h2>{course?.title || "Course Title Not Available"}</h2>
          </div>

          <div className="inner-container">
            <div className="row clearfix">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="intro-info-tabs">
                    <div className="intro-tabs tabs-box">
                      <ul className="tab-btns tab-buttons clearfix">
                        {tabs.map((tab) => (
                          <li
                            key={tab.id}
                            data-tab={`#${tab.id}`}
                            className={`tab-btn ${
                              activeTab === tab.id ? "active-btn" : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            {tab.label}
                          </li>
                        ))}
                      </ul>
                      <div className="tabs-content">
                        <div
                          className={`tab ${
                            activeTab === "prod-overview" ? "active-tab" : ""
                          }`}
                          id="prod-overview"
                        >
                          <div className="content">{renderTabContent()}</div>
                        </div>
                        <div
                          className={`tab ${
                            activeTab === "prod-curriculum" ? "active-tab" : ""
                          }`}
                          id="prod-curriculum"
                        >
                          <div className="content">{renderTabContent()}</div>
                        </div>
                        <div
                          className={`tab ${
                            activeTab === "prod-announcement"
                              ? "active-tab"
                              : ""
                          }`}
                          id="prod-announcement"
                        >
                          <div className="content">{renderTabContent()}</div>
                        </div>
                        <div
                          className={`tab ${
                            activeTab === "prod-faq" ? "active-tab" : ""
                          }`}
                          id="prod-faq"
                        >
                          <div className="content">{renderTabContent()}</div>
                        </div>
                        <div
                          className={`tab ${
                            activeTab === "prod-reviews" ? "active-tab" : ""
                          }`}
                          id="prod-reviews"
                        >
                          <div className="content">{renderTabContent()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column sticky-top">
                  <div
                    className="intro-img"
                    style={{ backgroundImage: "url(images/course-6.jpg)" }}
                  >
                    {course?.thumbnail && (
                      <Image
                        src={course.thumbnail}
                        alt={course?.title || "Course thumbnail"}
                        width={600}
                        height={400}
                        priority
                      />
                    )}
                  </div>
                  {!isEnrolled && (
                    <>
                      <div className="price"> price {course?.price}</div>
                      <div className="time-left mt-4">
                        23 hours left at this price!
                      </div>
                      <Link
                        href="/checkout"
                        className="theme-btn btn-style-two"
                      >
                        <span className="txt">
                          Buy Now <FaAngleRight />
                        </span>
                      </Link>
                    </>
                  )}
                  <>
                    <h2 className="reviewHead mt-4"> what&apos;s Student says:</h2>
                    {reviews.data.length > 0 ? (
                      <>
                        {reviews.data.map((review) => (
                          <div key={review._id} className="cource-review-box">
                            <div className="userReviewAvatar">
                              {review.user.avatar ? (
                                <Image
                                  src={review.user.avatar}
                                  alt={review.user.name || "User"}
                                  width={40}
                                  height={40}
                                  priority
                                />
                              ) : (
                                <FaUser size={40} />
                              )}
                              <h4>{review?.user?.name}</h4>
                            </div>
                            <div className="rating">
                              <FaStar className="fa fa-star" />
                              <FaStar className="fa fa-star" />
                              <FaStar className="fa fa-star" />
                              <FaStar className="fa fa-star" />
                              <FaStar className="fa fa-star" />
                              &ensp; {review?.rating} Reviews
                            </div>
                            <div className="text">
                              what&apos;s say: {review?.comment}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div>
                        <h5>No review right now...</h5>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
          <h3 className="InstructorHeading">Lesson in this course</h3>
          {lessons.length > 0 ? (
            <div className="row clearfix">
              {lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="student-block col-lg-4 col-md-4 col-sm-6"
                >
                  <div className="block-inner mb-5">
                    {isEnrolled ? (
                      getEmbedUrl(lesson?.videourl) ? (
                        <div
                          className="video-container"
                          style={{
                            position: "relative",
                            paddingBottom: "56.25%",
                            height: 0,
                          }}
                        >
                          <iframe
                            src={getEmbedUrl(lesson?.videourl)}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              borderRadius: "7px",
                            }}
                          ></iframe>
                        </div>
                      ) : (
                        <p>No Video URL</p>
                      )
                    ) : (
                      <div
                        className="mt-4"
                        style={{ position: "relative", borderRadius: "7px" }}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${getVideoId(
                            lesson?.videourl
                          )}/0.jpg`}
                          alt="Enroll to watch"
                          style={{
                            width: "100%",
                            height: "auto",
                            opacity: 0.8,
                            borderRadius: "7px",
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            if (course?._id) {
                              getEnrollment(course._id);
                            }
                          }}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#000000aa",
                            padding: "10px 20px",
                            color: "white",
                            borderRadius: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          {loadingCourseId === course?._id ? (
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span>Enrolling...</span>
                            </div>
                          ) : (
                            "Enroll Now"
                          )}
                        </button>
                      </div>
                    )}

                    <h4 className="text-secondary">{lesson?.title}</h4>
                    <span>{lesson?.content}</span>
                    <br />
                    <div>Duration: {lesson?.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No lesson found in this course</p>
            </div>
          )}

          <h3 className="InstructorHeading">Instructors</h3>
          <div className="row clearfix">
            <div className="student-block col-lg-4 col-md-4 col-sm-6">
              <div className="block-inner">
                <div className="image">
                  {course?.instructor?.avatar && (
                    <Image
                      src={course.instructor.avatar}
                      alt={course.instructor.name || "Instructor"}
                      width={400}
                      height={100}
                      priority
                    />
                  )}
                </div>
                <h2>{course?.instructor?.name}</h2>
                <span className="text-secondary">
                  {course?.instructor?.email}
                </span>
                <div className="text">{course?.instructor?.bio}</div>
                <div className="social-box">
                  <Link href="#" className="me-2">
                    <FaFacebookSquare size={30} />
                  </Link>
                  <Link href="#" className="me-2">
                    <FaTwitterSquare size={30} />
                  </Link>
                  <Link href="#" className="me-2">
                    <FaLinkedin size={30} />
                  </Link>
                  <Link href="#">
                    <FaGithub size={30} />
                  </Link>
                </div>
                <Link href="/InstructorProfile" className="more">
                  Know More <FaAngleRight className="text-success" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseIntroSection;
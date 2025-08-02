// "use client";
// import { FaPlay } from "react-icons/fa";
// import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import Head from "next/head";
// import "@/app/styles/bootstrap.css";
// import "@/app/styles/main.css";
// import "@/app/styles/responsive.css";
// import "@/app/styles/font-awesome.css";
// import Link from "next/link";
// import {
//   FaFacebookSquare,
//   FaTwitterSquare,
//   FaLinkedin,
//   FaGithub,
// } from "react-icons/fa";
// import { FaCheckCircle } from "react-icons/fa";
// import api from "@/utils/axios";
// import Image from "next/image";
// import { IoMdCheckmark } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import toast, { Toaster } from "react-hot-toast";
// import { AxiosError } from "axios";
// import { FaUser } from "react-icons/fa6";

// interface Instructor {
//   _id: string;
//   name: string;
//   email: string;
//   bio: string;
//   avatar: string;
// }

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   enrollmentCount: number;
//   totalLessons: number;
//   price: number;
//   thumbnail: string;
//   instructor: Instructor;
//   learningOutcomes?: string[];
//   requirements?: string[];
// }

// interface Lesson {
//   _id: string;
//   title: string;
//   content: string;
//   duration: string;
//   videourl: string;
//   instructor: {
//     _id: string;
//     name: string;
//   };
// }

// interface Review {
//   _id: string;
//   user: {
//     _id: string;
//     name: string;
//     avatar?: string;
//   };
//   rating: number;
//   comment: string;
// }
// //

// interface ReviewsResponse {
//   data: Review[];
// }

// // interface PageProps {
// //   params: {
// //     courseId: string;
// //   };
// //   searchParams?: {
// //     [key: string]: string | string[] | undefined;
// //   };
// // }

// const CourseIntroSection = ({ courseId }: { courseId: string }) => {
//   const [activeTab, setActiveTab] = useState("prod-overview");
//   const [activeAccordion, setActiveAccordion] = useState<number>(-1);
//   const [course, setCourse] = useState<Course | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [reviews, setReviews] = useState<ReviewsResponse>({ data: [] });
//   const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
//   const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

//   function getEmbedUrl(url: string) {
//     if (!url) return "";

//     const match = url.match(
//       /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
//     );
//     return match ? `https://www.youtube.com/embed/${match[1]}` : "";
//   }

//   function getVideoId(url: string) {
//     if (!url) return "";
//     const match = url.match(
//       /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
//     );
//     return match ? match[1] : "";
//   }

//   // Data arrays
//   const tabs = [
//     { id: "prod-overview", label: "Overview" },
//     { id: "prod-curriculum", label: "Curriculum" },
//     { id: "prod-announcement", label: "Announcement" },
//     { id: "prod-faq", label: "FAQ" },
//     { id: "prod-reviews", label: "Reviews" },
//   ];

//   const curriculum = [
//     {
//       title: "UI/ UX Introduction",
//       lessons: Array(3).fill({
//         name: "What is UI/ UX Design?",
//         duration: "35 Minutes",
//       }),
//     },
//     {
//       title: "Color Theory",
//       lessons: Array(3).fill({
//         name: "What is UI/ UX Design?",
//         duration: "35 Minutes",
//       }),
//     },
//     {
//       title: "Basic Typography",
//       lessons: Array(3).fill({
//         name: "What is UI/ UX Design?",
//         duration: "35 Minutes",
//       }),
//     },
//     {
//       title: "Wireframing & Prototyping",
//       lessons: Array(3).fill({
//         name: "What is UI/ UX Design?",
//         duration: "35 Minutes",
//       }),
//     },
//   ];

//   const faqs = [
//     {
//       title: "Who we are?",
//       lessons:
//         "Understanding type hierarchy, readability, and font pairing strategies.",
//     },
//     {
//       title: "What we are?",
//       lessons:
//         "Understanding type hierarchy, readability, and font pairing strategies.",
//     },
//     {
//       title: "Basic Typography",
//       lessons:
//         "Understanding type hierarchy, readability, and font pairing strategies.",
//     },
//     {
//       title: "Wireframing & Prototyping",
//       lessons:
//         "Understanding type hierarchy, readability, and font pairing strategies.",
//     },
//   ];

//   const announcement = [
//     {
//       name: "Today Topics",
//       duration: "35 Minutes",
//       detail:
//         "Introduction to UI principles and foundational concepts that will be discussed in today's session.",
//     },
//     {
//       name: "Today Classes",
//       duration: "35 Minutes",
//       detail:
//         "Practical classes focusing on prototyping and real-time user testing exercises.",
//     },
//     {
//       name: "Typography",
//       duration: "35 Minutes",
//       detail:
//         "Understanding type hierarchy, readability, and font pairing strategies.",
//     },
//     {
//       name: "Wireframing",
//       duration: "35 Minutes",
//       detail:
//         "Step-by-step creation of wireframes for mobile and web applications.",
//     },
//   ];

//   useEffect(() => {
//     const getReview = async () => {
//       try {
//         const res = await api.get<ReviewsResponse>(
//           `courses/${courseId}/reviews`
//         );
//         setReviews(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getReview();
//   }, [courseId]);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await api.get<{ data: Course }>(`/courses/${courseId}`);
//         setCourse(res?.data?.data);
        
//       } catch (e) {
//         console.error("Error fetching course:", e);
//       }
//     };

//     fetchCourse();
//   }, [courseId]);

//   const fetchLessons = async () => {
//     try {
//       const res = await api.get<{ data: Lesson[]; isEnrolled: boolean }>(
//         `/courses/${courseId}/lessons`
//       );
//       setLessons(res.data.data || []);
//       setIsEnrolled(res?.data?.isEnrolled);
//     } catch (e) {
//       console.error("Error fetching lessons:", e);
//     }
//   };

//   const toggleAccordion = (index: number) => {
//     setActiveAccordion(activeAccordion === index ? -1 : index);
//   };

//   const getEnrollment = async (courseId: string) => {
//     setLoadingCourseId(courseId);
//     try {
//       const res = await api.post(`/enrollments`, { courseId });
//       if (res.status === 201) {
//         toast.success("Successfully enrolled in the course!");
//         await fetchLessons();
//       } else {
//         toast.error("Failed to enroll in the course.");
//       }
//     } catch (err: unknown) {
//       const error = err as AxiosError<{ message: string }>;
//       toast.error(
//         error?.response?.data?.message || "Enrollment failed. Try again."
//       );
//     } finally {
//       setLoadingCourseId(null);
//     }
//   };

//   useEffect(() => {
//     fetchLessons();
//   }, [courseId]);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "prod-overview":
//         return (
//           <>
//             <div className="course-overview">
//               <div className="inner-box">
//                 <h4>{course?.title}</h4>
//                 <p>{course?.description}</p>
//                 <ul className="student-list">
//                   <li>Total enroll Students : {course?.enrollmentCount}</li>
//                   <li>
//                     <FaStar className="fa fa-star" />
//                     <FaStar className="fa fa-star" />
//                     <FaStar className="fa fa-star" />
//                     <FaStar className="fa fa-star" />
//                     <FaStar className="fa fa-star" />
//                   </li>
//                   <li>Total Lessons: {course?.totalLessons}</li>
//                 </ul>
//                 <h3>What you ll learn?</h3>
//                 <ul className="review-list">
//                   {course?.learningOutcomes?.flatMap((item, index) =>
//                     item
//                       .split(",")
//                       .filter((line) => line.trim() !== "") // empty line hatao
//                       .map((line, subIndex) => (
//                         <li key={`${index}-${subIndex}`}>
//                           <FaCheckCircle
//                             className="text-success me-2"
//                             size={12}
//                           />{" "}
//                           {line}
//                         </li>
//                       ))
//                   )}
//                 </ul>

//                 <h3>Requirements</h3>
//                 <ul className="requirement-list">
//                   {course?.requirements?.flatMap((item, index) =>
//                     item
//                       .split(",")
//                       .filter((line) => line.trim() !== "") // empty line hatao
//                       .map((line, subIndex) => (
//                         <li key={`${index}-${subIndex}`}>
//                           <FaCheckCircle
//                             className="text-success me-2"
//                             size={12}
//                           />{" "}
//                           {line}
//                         </li>
//                       ))
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </>
//         );
//       case "prod-curriculum":
//         return (
//           <ul className="accordion-box">
//             {curriculum.map((section, i) => (
//               <li key={i} className="accordion block">
//                 <div
//                   className={`acc-btn ${activeAccordion === i ? "active" : ""}`}
//                   onClick={() => toggleAccordion(i)}
//                 >
//                   <div className="icon-outer">
//                     <span className="icon">
//                       {activeAccordion === i ? <FaAngleUp /> : <FaAngleDown />}
//                     </span>
//                   </div>
//                   {section.title}
//                 </div>
//                 <div
//                   className={`acc-content ${
//                     activeAccordion === i ? "current" : ""
//                   } `}
//                 >
//                   {section.lessons.map((lesson, j) => (
//                     <div key={j} className="content">
//                       <div className="d-flex align-content-center justify-content-between">
//                         <div className="pull-left d-flex align-content-center">
//                           <a
//                             href="https://www.youtube.com/watch?v=kxPCFljwJws"
//                             className={`lightbox-image play-icon float ${
//                               j % 2 !== 0 ? "pt-4" : ""
//                             }`}
//                           >
//                             <span className="fa ">
//                               <div className={`${j % 2 !== 0 ? "ripple" : ""}`}>
//                                 <FaPlay />
//                               </div>
//                             </span>
//                           </a>
//                           <div
//                             className={`fs-6 ${j % 2 !== 0 ? "pt-3" : "pt-1"}`}
//                           >
//                             {lesson.name}
//                           </div>
//                         </div>

//                         <div className="pull-right">
//                           <div className="minutes">{lesson.duration}</div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         );
//       case "prod-announcement":
//         return (
//           <div className="row">
//             {announcement.map((item, index) => (
//               <div className="px-5 mb-4" key={index}>
//                 <div className="card p-3 h-100 shadow-sm">
//                   <div className="d-flex justify-content-between">
//                     <h5 className="mb-2 fw-bold">{item.name}</h5>
//                     <p className="text-success mb-1">
//                       <strong>Duration:</strong> {item.duration}
//                     </p>
//                   </div>
//                   <p>{item.detail}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         );
//       case "prod-faq":
//         return (
//           <ul className="accordion-box">
//             {faqs.map((section, i) => (
//               <li key={i} className="accordion block">
//                 <div
//                   className={`acc-btn ${activeAccordion === i ? "active" : ""}`}
//                   onClick={() => toggleAccordion(i)}
//                 >
//                   <div className="icon-outer">
//                     <span className="icon">
//                       {activeAccordion === i ? <FaAngleUp /> : <FaAngleDown />}
//                     </span>
//                   </div>
//                   {section.title}
//                 </div>
//                 <div
//                   className={`acc-content ${
//                     activeAccordion === i ? "current" : ""
//                   }`}
//                 >
//                   <div className="px-5 fs-6 pb-3">{section.lessons}</div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         );
//       case "prod-reviews":
//         return (
//           <>
//             {reviews.data.map((review) => (
//               <div key={review._id} className="cource-review-box">
//                 <h4>{review?.user?.name}</h4>
//                 <div className="rating">
//                   <FaStar className="fa fa-star" />
//                   <FaStar className="fa fa-star" />
//                   <FaStar className="fa fa-star" />
//                   <FaStar className="fa fa-star" />
//                   <FaStar className="fa fa-star" />
//                   &ensp; {review?.rating} Reviews
//                 </div>
//                 <div className="text">{review?.comment}</div>
//                 <div className="helpful">Was this review helpful?</div>
//                 <ul className="like-option">
//                   <li>
//                     <IoMdCheckmark />
//                   </li>
//                   <li>
//                     <RxCross2 />
//                   </li>
//                   <span className="report">Report</span>
//                 </ul>
//               </div>
//             ))}
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <section className="page-title">
//         <div className="auto-container">
//           <h1>Course Introduction</h1>
//         </div>
//       </section>

//       <Head>
//         <title>{course?.title || "Course Details"}</title>
//       </Head>

//       <section className="intro-section">
//         <div
//           className="patern-layer-one paroller"
//           data-paroller-factor="0.40"
//           data-paroller-factor-lg="0.20"
//           data-paroller-type="foreground"
//           data-paroller-direction="vertical"
//           style={{ backgroundImage: "url(images/icons/icon-1.png)" }}
//         ></div>
//         <div
//           className="patern-layer-two paroller"
//           data-paroller-factor="0.40"
//           data-paroller-factor-lg="-0.20"
//           data-paroller-type="foreground"
//           data-paroller-direction="vertical"
//           style={{ backgroundImage: "url(images/icons/icon-2.png)" }}
//         ></div>
//         <div className="circle-one"></div>
//         <div className="auto-container">
//           <div className="sec-title">
//             <h2>{course?.title || "Course Title Not Available"}</h2>
//           </div>

//           <div className="inner-container">
//             <div className="row clearfix">
//               <div className="content-column col-lg-8 col-md-12 col-sm-12">
//                 <div className="inner-column">
//                   <div className="intro-info-tabs">
//                     <div className="intro-tabs tabs-box">
//                       <ul className="tab-btns tab-buttons clearfix">
//                         {tabs.map((tab) => (
//                           <li
//                             key={tab.id}
//                             data-tab={`#${tab.id}`}
//                             className={`tab-btn ${
//                               activeTab === tab.id ? "active-btn" : ""
//                             }`}
//                             onClick={() => setActiveTab(tab.id)}
//                           >
//                             {tab.label}
//                           </li>
//                         ))}
//                       </ul>
//                       <div className="tabs-content">
//                         <div
//                           className={`tab ${
//                             activeTab === "prod-overview" ? "active-tab" : ""
//                           }`}
//                           id="prod-overview"
//                         >
//                           <div className="content">{renderTabContent()}</div>
//                         </div>
//                         <div
//                           className={`tab ${
//                             activeTab === "prod-curriculum" ? "active-tab" : ""
//                           }`}
//                           id="prod-curriculum"
//                         >
//                           <div className="content">{renderTabContent()}</div>
//                         </div>
//                         <div
//                           className={`tab ${
//                             activeTab === "prod-announcement"
//                               ? "active-tab"
//                               : ""
//                           }`}
//                           id="prod-announcement"
//                         >
//                           <div className="content">{renderTabContent()}</div>
//                         </div>
//                         <div
//                           className={`tab ${
//                             activeTab === "prod-faq" ? "active-tab" : ""
//                           }`}
//                           id="prod-faq"
//                         >
//                           <div className="content">{renderTabContent()}</div>
//                         </div>
//                         <div
//                           className={`tab ${
//                             activeTab === "prod-reviews" ? "active-tab" : ""
//                           }`}
//                           id="prod-reviews"
//                         >
//                           <div className="content">{renderTabContent()}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="video-column col-lg-4 col-md-12 col-sm-12">
//                 <div className="inner-column sticky-top">
//                   <div
//                     className="intro-img"
//                     style={{ backgroundImage: "url(images/course-6.jpg)" }}
//                   >
//                     {course?.thumbnail && (
//                       <Image
//                         src={course.thumbnail}
//                         alt={course?.title || "Course thumbnail"}
//                         width={600}
//                         height={400}
//                         priority
//                       />
//                     )}
//                   </div>
//                   {!isEnrolled && (
//                     <>
//                       <div className="price"> price {course?.price}</div>
//                       <div className="time-left mt-4">
//                         23 hours left at this price!
//                       </div>
//                       <div
//                         className="theme-btn btn-style-two "
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <button
//                           className="txt"
//                           style={{
//                             backgroundColor: "transparent",
//                             color: "black",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                           onClick={() => {
//                             if (course?._id) {
//                               getEnrollment(course._id);
//                             }
//                           }}
//                         >
//                           Buy Now <FaAngleRight />
//                         </button>
//                       </div>
//                     </>
//                   )}
//                   <>
//                     <h2 className="reviewHead mt-4">
//                       {" "}
//                       what&apos;s Student says:
//                     </h2>
//                     {reviews.data.length > 0 ? (
//                       <>
//                         {reviews.data.map((review) => (
//                           <div key={review._id} className="cource-review-box">
//                             <div className="userReviewAvatar">
//                               {review.user.avatar ? (
//                                 <Image
//                                   src={review.user.avatar}
//                                   alt={review.user.name || "User"}
//                                   width={40}
//                                   height={40}
//                                   priority
//                                 />
//                               ) : (
//                                 <FaUser size={40} />
//                               )}
//                               <h4>{review?.user?.name}</h4>
//                             </div>
//                             <div className="rating">
//                               <FaStar className="fa fa-star" />
//                               <FaStar className="fa fa-star" />
//                               <FaStar className="fa fa-star" />
//                               <FaStar className="fa fa-star" />
//                               <FaStar className="fa fa-star" />
//                               &ensp; {review?.rating} Reviews
//                             </div>
//                             <div className="text">
//                               what&apos;s say: {review?.comment}
//                             </div>
//                           </div>
//                         ))}
//                       </>
//                     ) : (
//                       <div>
//                         <h5>No review right now...</h5>
//                       </div>
//                     )}
//                   </>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <h3 className="InstructorHeading">Lesson in this course</h3>
//           {lessons.length > 0 ? (
//             <div className="row clearfix">
//               {lessons.map((lesson, i) => (
//                 <div
//                   key={i}
//                   className="student-block col-lg-4 col-md-4 col-sm-6"
//                 >
//                   <div className="block-inner mb-5">
//                     {isEnrolled ? (
//                       getEmbedUrl(lesson?.videourl) ? (
//                         <div
//                           className="video-container"
//                           style={{
//                             position: "relative",
//                             paddingBottom: "56.25%",
//                             height: 0,
//                           }}
//                         >
//                           <iframe
//                             src={getEmbedUrl(lesson?.videourl)}
//                             frameBorder="0"
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                             allowFullScreen
//                             style={{
//                               position: "absolute",
//                               top: 0,
//                               left: 0,
//                               width: "100%",
//                               height: "100%",
//                               borderRadius: "7px",
//                             }}
//                           ></iframe>
//                         </div>
//                       ) : (
//                         <p>No Video URL</p>
//                       )
//                     ) : (
//                       <div
//                         className="mt-4"
//                         style={{ position: "relative", borderRadius: "7px" }}
//                       >
//                         <img
//                           src={`https://img.youtube.com/vi/${getVideoId(
//                             lesson?.videourl
//                           )}/0.jpg`}
//                           alt="Enroll to watch"
//                           style={{
//                             width: "100%",
//                             height: "auto",
//                             opacity: 0.8,
//                             borderRadius: "7px",
//                           }}
//                         />
//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             if (course?._id) {
//                               getEnrollment(course._id);
//                             }
//                           }}
//                           style={{
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                             transform: "translate(-50%, -50%)",
//                             backgroundColor: "#000000aa",
//                             padding: "10px 20px",
//                             color: "white",
//                             borderRadius: "5px",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           {loadingCourseId === course?._id ? (
//                             <div className="d-flex align-items-center gap-2">
//                               <span
//                                 className="spinner-border spinner-border-sm"
//                                 role="status"
//                                 aria-hidden="true"
//                               ></span>
//                               <span>Enrolling...</span>
//                             </div>
//                           ) : (
//                             "Enroll Now"
//                           )}
//                         </button>
//                       </div>
//                     )}

//                     <h4 className="text-secondary">{lesson?.title}</h4>
//                     <span>{lesson?.content}</span>
//                     <br />
//                     <div>Duration: {lesson?.duration}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>
//               <p>No lesson found in this course</p>
//             </div>
//           )}

//           <h3 className="InstructorHeading">Instructors</h3>
//           <div className="row clearfix">
//             <div className="student-block col-lg-4 col-md-4 col-sm-6">
//               <div className="block-inner">
//                 <div className="image">
//                   {course?.instructor?.avatar && (
//                     <Image
//                       src={course.instructor.avatar}
//                       alt={course.instructor.name || "Instructor"}
//                       width={400}
//                       height={100}
//                       priority
//                     />
//                   )}
//                 </div>
//                 <h2>{course?.instructor?.name}</h2>
//                 <span className="text-secondary">
//                   {course?.instructor?.email}
//                 </span>
//                 <div className="text">{course?.instructor?.bio}</div>
//                 <div className="social-box">
//                   <Link href="#" className="me-2">
//                     <FaFacebookSquare size={30} />
//                   </Link>
//                   <Link href="#" className="me-2">
//                     <FaTwitterSquare size={30} />
//                   </Link>
//                   <Link href="#" className="me-2">
//                     <FaLinkedin size={30} />
//                   </Link>
//                   <Link href="#">
//                     <FaGithub size={30} />
//                   </Link>
//                 </div>
//                 {/* <Link href="/InstructorProfile" className="more">
//                   Know More <FaAngleRight className="text-success" />
//                 </Link> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default CourseIntroSection;







"use client"
import { FaPlay } from "react-icons/fa"
import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import { useEffect, useState } from "react"
import Head from "next/head"
import "@/app/styles/bootstrap.css"
import "@/app/styles/main.css"
import "@/app/styles/responsive.css"
import "@/app/styles/font-awesome.css"
// import "@/app/styles/course-detail-enhanced.css" // Add this new CSS file
import Link from "next/link"
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaGithub } from "react-icons/fa"
import { FaCheckCircle, FaClock, FaUsers, FaGraduationCap, FaBookOpen, FaAward } from "react-icons/fa"
import api from "@/utils/axios"
import Image from "next/image"
import { IoMdCheckmark } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import toast, { Toaster } from "react-hot-toast"
import type { AxiosError } from "axios"
import { FaUser } from "react-icons/fa6"

interface Instructor {
  _id: string
  name: string
  email: string
  bio: string
  avatar: string
}

interface Course {
  _id: string
  title: string
  description: string
  enrollmentCount: number
  totalLessons: number
  price: number
  thumbnail: string
  instructor: Instructor
  learningOutcomes?: string[]
  requirements?: string[]
}

interface Lesson {
  _id: string
  title: string
  content: string
  duration: string
  videourl: string
  instructor: {
    _id: string
    name: string
  }
}

interface Review {
  _id: string
  user: {
    _id: string
    name: string
    avatar?: string
  }
  rating: number
  comment: string
}

interface ReviewsResponse {
  data: Review[]
}

const CourseIntroSection = ({ courseId }: { courseId: string }) => {
  const [activeTab, setActiveTab] = useState("prod-overview")
  const [activeAccordion, setActiveAccordion] = useState<number>(-1)
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [reviews, setReviews] = useState<ReviewsResponse>({ data: [] })
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null)
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null)

  function getEmbedUrl(url: string) {
    if (!url) return ""
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : ""
  }

  function getVideoId(url: string) {
    if (!url) return ""
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : ""
  }

  // Data arrays
  const tabs = [
    { id: "prod-overview", label: "Overview", icon: <FaBookOpen size={16} /> },
    { id: "prod-curriculum", label: "Curriculum", icon: <FaGraduationCap size={16} /> },
    { id: "prod-announcement", label: "Announcement", icon: <FaAward size={16} /> },
    { id: "prod-faq", label: "FAQ", icon: <FaCheckCircle size={16} /> },
    { id: "prod-reviews", label: "Reviews", icon: <FaStar size={16} /> },
  ]

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
  ]

  const faqs = [
    {
      title: "Who we are?",
      lessons: "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      title: "What we are?",
      lessons: "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      title: "Basic Typography",
      lessons: "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      title: "Wireframing & Prototyping",
      lessons: "Understanding type hierarchy, readability, and font pairing strategies.",
    },
  ]

  const announcement = [
    {
      name: "Today Topics",
      duration: "35 Minutes",
      detail: "Introduction to UI principles and foundational concepts that will be discussed in today's session.",
    },
    {
      name: "Today Classes",
      duration: "35 Minutes",
      detail: "Practical classes focusing on prototyping and real-time user testing exercises.",
    },
    {
      name: "Typography",
      duration: "35 Minutes",
      detail: "Understanding type hierarchy, readability, and font pairing strategies.",
    },
    {
      name: "Wireframing",
      duration: "35 Minutes",
      detail: "Step-by-step creation of wireframes for mobile and web applications.",
    },
  ]

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await api.get<ReviewsResponse>(`courses/${courseId}/reviews`)
        setReviews(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getReview()
  }, [courseId])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get<{ data: Course }>(`/courses/${courseId}`)
        setCourse(res?.data?.data)
      } catch (e) {
        console.error("Error fetching course:", e)
      }
    }
    fetchCourse()
  }, [courseId])

  const fetchLessons = async () => {
    try {
      const res = await api.get<{ data: Lesson[]; isEnrolled: boolean }>(`/courses/${courseId}/lessons`)
      setLessons(res.data.data || [])
      setIsEnrolled(res?.data?.isEnrolled)
    } catch (e) {
      console.error("Error fetching lessons:", e)
    }
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? -1 : index)
  }

  const getEnrollment = async (courseId: string) => {
    setLoadingCourseId(courseId)
    try {
      const res = await api.post(`/enrollments`, { courseId })
      if (res.status === 201) {
        toast.success("Successfully enrolled in the course!")
        await fetchLessons()
      } else {
        toast.error("Failed to enroll in the course.")
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      toast.error(error?.response?.data?.message || "Enrollment failed. Try again.")
    } finally {
      setLoadingCourseId(null)
    }
  }

  useEffect(() => {
    fetchLessons()
  }, [courseId])

  const renderTabContent = () => {
    switch (activeTab) {
      case "prod-overview":
        return (
          <div className="course-detail-enhanced-overview">
            <div className="course-detail-enhanced-overview-content">
              <h4 className="course-detail-enhanced-overview-title">{course?.title}</h4>
              <p className="course-detail-enhanced-overview-description">{course?.description}</p>

              <div className="course-detail-enhanced-stats-grid">
                <div className="course-detail-enhanced-stat-item">
                  <FaUsers className="course-detail-enhanced-stat-icon" />
                  <div>
                    <span className="course-detail-enhanced-stat-number">{course?.enrollmentCount}</span>
                    <span className="course-detail-enhanced-stat-label">Students Enrolled</span>
                  </div>
                </div>
                <div className="course-detail-enhanced-stat-item">
                  <div className="course-detail-enhanced-rating-stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <span className="course-detail-enhanced-stat-label">5.0 Rating</span>
                </div>
                <div className="course-detail-enhanced-stat-item">
                  <FaBookOpen className="course-detail-enhanced-stat-icon" />
                  <div>
                    <span className="course-detail-enhanced-stat-number">{course?.totalLessons}</span>
                    <span className="course-detail-enhanced-stat-label">Total Lessons</span>
                  </div>
                </div>
              </div>

              <div className="course-detail-enhanced-section">
                <h3 className="course-detail-enhanced-section-title">
                  <FaGraduationCap className="course-detail-enhanced-section-icon" />
                  What you learn
                </h3>
                <ul className="course-detail-enhanced-outcomes-list">
                  {course?.learningOutcomes?.flatMap((item, index) =>
                    item
                      .split(",")
                      .filter((line) => line.trim() !== "")
                      .map((line, subIndex) => (
                        <li key={`${index}-${subIndex}`} className="course-detail-enhanced-outcome-item">
                          <FaCheckCircle className="course-detail-enhanced-check-icon" />
                          <span>{line.trim()}</span>
                        </li>
                      )),
                  )}
                </ul>
              </div>

              <div className="course-detail-enhanced-section">
                <h3 className="course-detail-enhanced-section-title">
                  <FaCheckCircle className="course-detail-enhanced-section-icon" />
                  Requirements
                </h3>
                <ul className="course-detail-enhanced-requirements-list">
                  {course?.requirements?.flatMap((item, index) =>
                    item
                      .split(",")
                      .filter((line) => line.trim() !== "")
                      .map((line, subIndex) => (
                        <li key={`${index}-${subIndex}`} className="course-detail-enhanced-requirement-item">
                          <FaCheckCircle className="course-detail-enhanced-check-icon" />
                          <span>{line.trim()}</span>
                        </li>
                      )),
                  )}
                </ul>
              </div>
            </div>
          </div>
        )

      case "prod-curriculum":
        return (
          <div className="course-detail-enhanced-curriculum">
            {curriculum.map((section, i) => (
              <div key={i} className="course-detail-enhanced-curriculum-section">
                <div
                  className={`course-detail-enhanced-curriculum-header ${
                    activeAccordion === i ? "course-detail-enhanced-active" : ""
                  }`}
                  onClick={() => toggleAccordion(i)}
                >
                  <div className="course-detail-enhanced-curriculum-title">
                    <span className="course-detail-enhanced-curriculum-icon">
                      {activeAccordion === i ? <FaAngleUp /> : <FaAngleDown />}
                    </span>
                    <h4>{section.title}</h4>
                  </div>
                  <span className="course-detail-enhanced-lesson-count">{section.lessons.length} lessons</span>
                </div>
                <div
                  className={`course-detail-enhanced-curriculum-content ${
                    activeAccordion === i ? "course-detail-enhanced-expanded" : ""
                  }`}
                >
                  {section.lessons.map((lesson, j) => (
                    <div key={j} className="course-detail-enhanced-lesson-item">
                      <div className="course-detail-enhanced-lesson-info">
                        <div className="course-detail-enhanced-play-button">
                          <FaPlay />
                        </div>
                        <span className="course-detail-enhanced-lesson-title">{lesson.name}</span>
                      </div>
                      <span className="course-detail-enhanced-lesson-duration">
                        <FaClock size={14} />
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case "prod-announcement":
        return (
          <div className="course-detail-enhanced-announcements">
            {announcement.map((item, index) => (
              <div key={index} className="course-detail-enhanced-announcement-card">
                <div className="course-detail-enhanced-announcement-header">
                  <h5 className="course-detail-enhanced-announcement-title">{item.name}</h5>
                  <div className="course-detail-enhanced-announcement-duration">
                    <FaClock size={14} />
                    <span>{item.duration}</span>
                  </div>
                </div>
                <p className="course-detail-enhanced-announcement-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        )

      case "prod-faq":
        return (
          <div className="course-detail-enhanced-faq">
            {faqs.map((section, i) => (
              <div key={i} className="course-detail-enhanced-faq-item">
                <div
                  className={`course-detail-enhanced-faq-question ${
                    activeAccordion === i ? "course-detail-enhanced-active" : ""
                  }`}
                  onClick={() => toggleAccordion(i)}
                >
                  <h4>{section.title}</h4>
                  <span className="course-detail-enhanced-faq-icon">
                    {activeAccordion === i ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </div>
                <div
                  className={`course-detail-enhanced-faq-answer ${
                    activeAccordion === i ? "course-detail-enhanced-expanded" : ""
                  }`}
                >
                  <p>{section.lessons}</p>
                </div>
              </div>
            ))}
          </div>
        )

      case "prod-reviews":
        return (
          <div className="course-detail-enhanced-reviews">
            {reviews.data.map((review) => (
              <div key={review._id} className="course-detail-enhanced-review-card">
                <div className="course-detail-enhanced-review-header">
                  <div className="course-detail-enhanced-reviewer-info">
                    <div className="course-detail-enhanced-reviewer-avatar">
                      {review.user.avatar ? (
                        <Image
                          src={review.user.avatar || "/placeholder.svg"}
                          alt={review.user.name}
                          width={50}
                          height={50}
                          className="course-detail-enhanced-avatar-image"
                        />
                      ) : (
                        <FaUser size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className="course-detail-enhanced-reviewer-name">{review?.user?.name}</h4>
                      <div className="course-detail-enhanced-review-rating">
                        <div className="course-detail-enhanced-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "course-detail-enhanced-star-filled"
                                  : "course-detail-enhanced-star-empty"
                              }
                            />
                          ))}
                        </div>
                        <span className="course-detail-enhanced-rating-text">{review?.rating} out of 5</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="course-detail-enhanced-review-comment">{review?.comment}</p>
                <div className="course-detail-enhanced-review-actions">
                  <span className="course-detail-enhanced-helpful-text">Was this review helpful?</span>
                  <div className="course-detail-enhanced-review-buttons">
                    <button className="course-detail-enhanced-helpful-btn course-detail-enhanced-yes">
                      <IoMdCheckmark />
                      Yes
                    </button>
                    <button className="course-detail-enhanced-helpful-btn course-detail-enhanced-no">
                      <RxCross2 />
                      No
                    </button>
                    <button className="course-detail-enhanced-report-btn">Report</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <Toaster />
      <div className="course-detail-enhanced-page">
        {/* Hero Section */}
        <section className="course-detail-enhanced-hero">
          <div className="course-detail-enhanced-hero-background">
            <div className="course-detail-enhanced-hero-overlay"></div>
          </div>
          <div className="course-detail-enhanced-container">
            <br />
            <div className="course-detail-enhanced-hero-content">
              <div className="course-detail-enhanced-breadcrumb">
                <Link href="/" className="course-detail-enhanced-breadcrumb-link">
                  Home
                </Link>
                <span className="course-detail-enhanced-breadcrumb-separator">→</span>
                <Link href="/courses" className="course-detail-enhanced-breadcrumb-link">
                  Courses
                </Link>
                <span className="course-detail-enhanced-breadcrumb-separator">→</span>
                <span className="course-detail-enhanced-breadcrumb-current">Course Details</span>
              </div>
              <h1 className="course-detail-enhanced-hero-title">{course?.title || "Course Title Not Available"}</h1>
              <p className="course-detail-enhanced-hero-subtitle">Master the skills you need to succeed</p>
            </div>
          </div>
        </section>

        <Head>
          <title>{course?.title || "Course Details"}</title>
        </Head>

        <section className="course-detail-enhanced-main">
          <div className="course-detail-enhanced-container">
            <div className="course-detail-enhanced-layout">
              {/* Main Content */}
              <div className="course-detail-enhanced-content">
                <div className="course-detail-enhanced-tabs-container">
                  <div className="course-detail-enhanced-tabs">
                    <div className="course-detail-enhanced-tab-buttons">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          className={`course-detail-enhanced-tab-button ${
                            activeTab === tab.id ? "course-detail-enhanced-active" : ""
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="course-detail-enhanced-tab-content">{renderTabContent()}</div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="course-detail-enhanced-sidebar">
                <div className="course-detail-enhanced-course-card">
                  <div className="course-detail-enhanced-course-thumbnail">
                    {course?.thumbnail && (
                      <Image
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course?.title || "Course thumbnail"}
                        width={400}
                        height={250}
                        className="course-detail-enhanced-thumbnail-image"
                        priority
                      />
                    )}
                  </div>

                  {!isEnrolled && (
                    <div className="course-detail-enhanced-pricing-section">
                      <div className="course-detail-enhanced-price-info">
                        <span className="course-detail-enhanced-price">₹{course?.price}</span>
                        <span className="course-detail-enhanced-original-price">₹{(course?.price || 0) * 1.5}</span>
                      </div>
                      <div className="course-detail-enhanced-discount-badge">50% OFF</div>
                      <div className="course-detail-enhanced-time-left">
                        <FaClock size={16} />
                        <span>23 hours left at this price!</span>
                      </div>
                      <button
                        className="course-detail-enhanced-enroll-button"
                        onClick={() => {
                          if (course?._id) {
                            getEnrollment(course._id)
                          }
                        }}
                        disabled={loadingCourseId === course?._id}
                      >
                        {loadingCourseId === course?._id ? (
                          <div className="course-detail-enhanced-loading">
                            <div className="course-detail-enhanced-spinner"></div>
                            <span>Enrolling...</span>
                          </div>
                        ) : (
                          <>
                            <span>Enroll Now</span>
                            <FaAngleRight />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="course-detail-enhanced-reviews-preview">
                    <h3 className="course-detail-enhanced-reviews-title">What Students Say</h3>
                    {reviews.data.length > 0 ? (
                      <div className="course-detail-enhanced-reviews-list">
                        {reviews.data.slice(0, 2).map((review) => (
                          <div key={review._id} className="course-detail-enhanced-review-preview">
                            <div className="course-detail-enhanced-review-user">
                              <div className="course-detail-enhanced-user-avatar">
                                {review.user.avatar ? (
                                  <Image
                                    src={review.user.avatar || "/placeholder.svg"}
                                    alt={review.user.name}
                                    width={40}
                                    height={40}
                                    className="course-detail-enhanced-avatar-small"
                                  />
                                ) : (
                                  <FaUser size={20} />
                                )}
                              </div>
                              <div>
                                <h5 className="course-detail-enhanced-user-name">{review?.user?.name}</h5>
                                <div className="course-detail-enhanced-user-rating">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      size={12}
                                      className={
                                        i < review.rating
                                          ? "course-detail-enhanced-star-filled"
                                          : "course-detail-enhanced-star-empty"
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="course-detail-enhanced-review-text">{review?.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="course-detail-enhanced-no-reviews">
                        <p>No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons Section */}
            <div className="course-detail-enhanced-lessons-section">
              <h3 className="course-detail-enhanced-section-heading">
                <FaPlay className="course-detail-enhanced-section-icon" />
                Lessons in this Course
              </h3>
              {lessons.length > 0 ? (
                <div className="course-detail-enhanced-lessons-grid">
                  {lessons.map((lesson, i) => (
                    <div key={i} className="course-detail-enhanced-lesson-card">
                      <div className="course-detail-enhanced-lesson-video">
                        {isEnrolled ? (
                          getEmbedUrl(lesson?.videourl) ? (
                            <div className="course-detail-enhanced-video-container">
                              <iframe
                                src={getEmbedUrl(lesson?.videourl)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="course-detail-enhanced-video-iframe"
                              ></iframe>
                            </div>
                          ) : (
                            <div className="course-detail-enhanced-no-video">
                              <p>No Video URL Available</p>
                            </div>
                          )
                        ) : (
                          <div className="course-detail-enhanced-video-preview">
                            <img
                              src={`https://img.youtube.com/vi/${getVideoId(lesson?.videourl)}/0.jpg`}
                              alt="Enroll to watch"
                              className="course-detail-enhanced-video-thumbnail"
                            />
                            <button
                              className="course-detail-enhanced-preview-overlay"
                              onClick={(e) => {
                                e.preventDefault()
                                if (course?._id) {
                                  getEnrollment(course._id)
                                }
                              }}
                            >
                              {loadingCourseId === course?._id ? (
                                <div className="course-detail-enhanced-loading">
                                  <div className="course-detail-enhanced-spinner"></div>
                                  <span>Enrolling...</span>
                                </div>
                              ) : (
                                <>
                                  <FaPlay size={24} />
                                  <span>Enroll to Watch</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="course-detail-enhanced-lesson-info">
                        <h4 className="course-detail-enhanced-lesson-title">{lesson?.title}</h4>
                        <p className="course-detail-enhanced-lesson-content">{lesson?.content}</p>
                        <div className="course-detail-enhanced-lesson-meta">
                          <span className="course-detail-enhanced-lesson-duration">
                            <FaClock size={14} />
                            {lesson?.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="course-detail-enhanced-no-lessons">
                  <FaBookOpen size={48} />
                  <h4>No lessons found</h4>
                  <p>This course does not have any lessons yet.</p>
                </div>
              )}
            </div>

            {/* Instructor Section */}
            <div className="course-detail-enhanced-instructor-section">
              <h3 className="course-detail-enhanced-section-heading">
                <FaUser className="course-detail-enhanced-section-icon" />
                Meet Your Instructor
              </h3>
              <div className="course-detail-enhanced-instructor-card">
                <div className="course-detail-enhanced-instructor-avatar">
                  {course?.instructor?.avatar && (
                    <Image
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name || "Instructor"}
                      width={120}
                      height={120}
                      className="course-detail-enhanced-instructor-image"
                      priority
                    />
                  )}
                </div>
                <div className="course-detail-enhanced-instructor-info">
                  <h2 className="course-detail-enhanced-instructor-name">{course?.instructor?.name}</h2>
                  <p className="course-detail-enhanced-instructor-email">{course?.instructor?.email}</p>
                  <p className="course-detail-enhanced-instructor-bio">{course?.instructor?.bio}</p>
                  <div className="course-detail-enhanced-instructor-social">
                    <Link href="#" className="course-detail-enhanced-social-link">
                      <FaFacebookSquare size={24} />
                    </Link>
                    <Link href="#" className="course-detail-enhanced-social-link">
                      <FaTwitterSquare size={24} />
                    </Link>
                    <Link href="#" className="course-detail-enhanced-social-link">
                      <FaLinkedin size={24} />
                    </Link>
                    <Link href="#" className="course-detail-enhanced-social-link">
                      <FaGithub size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default CourseIntroSection

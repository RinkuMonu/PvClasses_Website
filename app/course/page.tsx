// "use client";
// import { FaThLarge, FaList, FaSearch } from "react-icons/fa";
// import "@/app/styles/bootstrap.css";
// import "@/app/styles/main.css";
// import "@/app/styles/responsive.css";
// import "@/app/styles/font-awesome.css";
// import ReadyToStart from "@/component/ReadyToStart";
// import PopularCard from "@/component/PopularCard";
// import { useEffect, useState } from "react";
// import Pagination from "@/component/Pagination";
// import Image from "next/image";
// import api from "@/utils/axios";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa6";

// // const filters = {
// //   skillLevels: ["Beginner", "Intermediate", "Expert"],
// //   pricing: ["Free (14)", "Paid"],
// //   duration: ["5+ hours (30)", "10+ hours (20)", "15+ hours (5)"],
// //   category: ["UI/UX", "Development", "Marketing", "Data Science"],
// // };

// // const MIN = 0;
// // const MAX = 1000;
// // const STEP = 10;

// export default function Courses() {
//   const [viewType, setViewType] = useState<"grid" | "list">("grid");
//   const [courses, setCourse] = useState<Course[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [sort, setSort] = useState("");
//   const limit = 6;

//   interface Course {
//     _id: string;
//     title: string;
//     slug: string;
//     thumbnail?: string;
//     instructor?: {
//       name: string;
//     };
//     price: number;
//     averageRating?: number;
//   }

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get(
//           `/courses?page=${currentPage}&limit=${limit}&sort=${sort}`
//         );
//         setCourse(res?.data?.data || []);
//         console.log(res.data.data);
//         const totalCourses = res.data.total; // ✅ yahan se aayega
//         const totalPages = Math.ceil(totalCourses / limit); // limit = per page items
//         setTotalPages(totalPages);
//       } catch (e) {
//         console.error("Error fetching courses:", e);
//       }
//     };
//     fetchCourses();
//   }, [currentPage, limit, totalPages, sort]);

//   return (
//     <>
//       <section className="page-title">
//         <div className="auto-container">
//           <h1>Courses</h1>
//           <br /><br />
//           {/* <div className="search-boxed">
//             <div className="search-box">
//               <form method="post" action="contact.html">
//                 <div className="form-group">
//                   <input
//                     type="search"
//                     name="search-field"
//                     placeholder="What do you want to learn?"
//                     required
//                   />
//                   <button type="submit">
//                     <span className="icon">
//                       <FaSearch />
//                     </span>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div> */}
//         </div>
//       </section>

//       <div className="sidebar-page-container">
//         <div className="auto-container">
//           <div className="row clearfix">
//             {/* Content Side */}
//             <div className="content-side col-lg-12 col-md-12 col-sm-12">
//               <div className="our-courses">
//                 <div className="options-view  d-flex justify-content-between">
//                   <div className="pull-left">
//                     <h3>Browse UI/ UX Courses</h3>
//                   </div>
//                   <div className="pull-right clearfix">
//                     <ul className="list-view">
//                       <li className={viewType === "grid" ? "active" : ""}>
//                         <a
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setViewType("grid");
//                           }}
//                         >
//                           <FaThLarge />
//                         </a>
//                       </li>
//                       <li className={viewType === "list" ? "active" : ""}>
//                         <a
//                           href="#"
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setViewType("list");
//                           }}
//                         >
//                           <FaList />
//                         </a>
//                       </li>
//                     </ul>
//                     <div className="type-form">
//                       <div className="form-group">
//                         {/* <select className="custom-select-box"> */}
//                         <select
//                           value={sort}
//                           onChange={(e) => {
//                             setSort(e.target.value);
//                             setCurrentPage(1); // reset to page 1 on sort change
//                           }}
//                         >
//                           <option value="-createdAt">Newest First</option>
//                           <option value="createdAt">Oldest First</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   className={
//                     viewType === "grid"
//                       ? "row clearfix"
//                       : "course-list-container"
//                   }
//                 >
//                   {courses.map((course) => (
//                     <div
//                       className={
//                         viewType === "grid"
//                           ? "cource-block-two col-lg-4 col-md-6 col-sm-12"
//                           : "course-list-item col-12 mb-4"
//                       }
//                       key={course._id}
//                     >
//                       <Link href={`/coursedetails/${course?.slug}`}>
//                         <div
//                           className={`inner-box ${
//                             viewType === "list" ? "d-flex" : ""
//                           }`}
//                         >
//                           <div
//                             className={`image ${
//                               viewType === "list" ? "flex-shrink-0 me-4" : ""
//                             }`}
//                           >
//                             <Image
//                               src={
//                                 course?.thumbnail ||
//                                 "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
//                               }
//                               alt={course?.title || "Course Image"}
//                               width={550}
//                               height={550}
//                               className="img-fluid object-cover w-100"
//                               style={{
//                                 maxHeight:
//                                   viewType === "list" ? "150px" : "200px",
//                                 objectFit: "cover",
//                               }}
//                             />
//                           </div>
//                           <div className="lower-content">
//                             <h5 className="cousrcardHeading">
//                               {course?.title}
//                             </h5>
//                             <div className="instructor">
//                               By{" "}
//                               {course?.instructor?.name || "Unknown Instructor"}
//                             </div>
//                             <div className="price-rating d-flex justify-content-between">
//                               <span className="price">{course?.price} INR</span>
//                               <span className="rating">
//                                 {course?.averageRating || 0}{" "}
//                                 <FaStar className="text-warning" />
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             totalPages={totalPages}
//           />
//         </div>
//       </div>

//       <section className="popular-courses-section">
//         <div className="auto-container">
//           <div className="sec-title">
//             <h2>Most Popular Courses</h2>
//           </div>

//           <PopularCard />
//         </div>
//       </section>

//       <ReadyToStart />
//     </>
//   );
// }






"use client"
import { FaThLarge, FaList } from "react-icons/fa"
import "@/app/styles/bootstrap.css"
import "@/app/styles/main.css"
import "@/app/styles/responsive.css"
import "@/app/styles/font-awesome.css"
// import "@/app/styles/courses-enhanced.css" // Add this new CSS file
import ReadyToStart from "@/component/ReadyToStart"
import PopularCard from "@/component/PopularCard"
import { useEffect, useState } from "react"
import Pagination from "@/component/Pagination"
import Image from "next/image"
import api from "@/utils/axios"
import Link from "next/link"
import { FaStar, FaUser, FaBookOpen } from "react-icons/fa6"

export default function Courses() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [courses, setCourse] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sort, setSort] = useState("")
  const limit = 6

  interface Course {
    _id: string
    title: string
    slug: string
    thumbnail?: string
    instructor?: {
      name: string
    }
    price: number
    averageRating?: number
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(`/courses?page=${currentPage}&limit=${limit}&sort=${sort}`)
        setCourse(res?.data?.data || [])
        console.log(res.data.data)
        const totalCourses = res.data.total
        const totalPages = Math.ceil(totalCourses / limit)
        setTotalPages(totalPages)
      } catch (e) {
        console.error("Error fetching courses:", e)
      }
    }
    fetchCourses()
  }, [currentPage, limit, totalPages, sort])

  return (
    <>
      <section className="enhanced-page-title">
        <div className="auto-container">
          <div className="title-content">
            <h1 className="enhanced-main-title">Discover Amazing Courses</h1>
            <p className="enhanced-subtitle">Learn from industry experts and advance your career</p>
          </div>
        </div>
      </section>

      <div className="enhanced-sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-side col-lg-12 col-md-12 col-sm-12">
              <div className="enhanced-our-courses">
                <div className="enhanced-options-view">
                  <div className="enhanced-header-section">
                    <div className="enhanced-title-section">
                      <h3 className="enhanced-browse-title">
                        <FaBookOpen className="title-icon" />
                        Browse UI/UX Courses
                      </h3>
                      <span className="enhanced-course-count">{courses.length} courses available</span>
                    </div>

                    <div className="enhanced-controls-section">
                      <div className="enhanced-view-toggle">
                        <button
                          className={`enhanced-view-btn ${viewType === "grid" ? "active" : ""}`}
                          onClick={() => setViewType("grid")}
                        >
                          <FaThLarge />
                          <span>Grid</span>
                        </button>
                        <button
                          className={`enhanced-view-btn ${viewType === "list" ? "active" : ""}`}
                          onClick={() => setViewType("list")}
                        >
                          <FaList />
                          <span>List</span>
                        </button>
                      </div>

                      <div className="enhanced-sort-section">
                        <label className="sort-label">Sort by:</label>
                        <select
                          className="enhanced-sort-select"
                          value={sort}
                          onChange={(e) => {
                            setSort(e.target.value)
                            setCurrentPage(1)
                          }}
                        >
                          <option value="-createdAt">Newest First</option>
                          <option value="createdAt">Oldest First</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`enhanced-courses-container ${viewType === "list" ? "list-view" : "grid-view"}`}>
                  {courses.map((course) => (
                    <div
                      className={`enhanced-course-card ${viewType === "list" ? "list-card" : "grid-card"}`}
                      key={course._id}
                    >
                      <Link href={`/coursedetails/${course?.slug}`} className="enhanced-course-link">
                        <div className="enhanced-card-inner">
                          <div className="enhanced-image-container">
                            <Image
                              src={
                                course?.thumbnail ||
                                "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" ||
                                "/placeholder.svg"
                              }
                              alt={course?.title || "Course Image"}
                              width={550}
                              height={550}
                              className="enhanced-course-image"
                            />
                            <div className="enhanced-image-overlay">
                              <span className="enhanced-view-course">View Course</span>
                            </div>
                          </div>

                          <div className="enhanced-card-content">
                            <h5 className="enhanced-course-title">{course?.title}</h5>

                            <div className="enhanced-instructor-info">
                              <FaUser className="instructor-icon" />
                              <span>By {course?.instructor?.name || "Unknown Instructor"}</span>
                            </div>

                            <div className="enhanced-course-meta">
                              <div className="enhanced-price-section">
                                <span className="enhanced-price">₹{course?.price}</span>
                              </div>

                              <div className="enhanced-rating-section">
                                <div className="rating-stars">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={`star ${i < Math.floor(course?.averageRating || 0) ? "filled" : ""}`}
                                    />
                                  ))}
                                </div>
                                <span className="rating-number">{course?.averageRating?.toFixed(1) || "0.0"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {courses.length === 0 && (
                  <div className="enhanced-no-courses">
                    <FaBookOpen className="no-courses-icon" />
                    <h4>No courses found</h4>
                    <p>Try adjusting your search criteria or check back later for new courses.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="enhanced-pagination-wrapper">
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>

      <section className="popular-courses-section">
        <div className="auto-container">
          <div className="sec-title">
            <br />
            <h2>Most Popular Courses</h2>
          </div>
          <PopularCard />
        </div>
      </section>

      <ReadyToStart />
    </>
  )
}

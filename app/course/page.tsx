
// "use client"
// import { FaThLarge, FaList } from "react-icons/fa"
// import "@/app/styles/bootstrap.css"
// import "@/app/styles/main.css"
// import "@/app/styles/responsive.css"
// import "@/app/styles/font-awesome.css"
// // import "@/app/styles/courses-enhanced.css" // Add this new CSS file
// import ReadyToStart from "@/component/ReadyToStart"
// import PopularCard from "@/component/PopularCard"
// import { useEffect, useState } from "react"
// import Pagination from "@/component/Pagination"
// import Image from "next/image"
// import api from "@/utils/axios"
// import Link from "next/link"
// import { FaStar, FaUser, FaBookOpen } from "react-icons/fa6"

// export default function Courses() {
//   const [viewType, setViewType] = useState<"grid" | "list">("grid")
//   const [courses, setCourse] = useState<Course[]>([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [sort, setSort] = useState("")
//   const limit = 6

//   interface Course {
//     _id: string
//     title: string
//     slug: string
//     thumbnail?: string
//     instructor?: {
//       name: string
//     }
//     price: number
//     averageRating?: number
//   }

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get(`/courses?page=${currentPage}&limit=${limit}&sort=${sort}`)
//         setCourse(res?.data?.data || [])
//         console.log(res.data.data)
//         const totalCourses = res.data.total
//         const totalPages = Math.ceil(totalCourses / limit)
//         setTotalPages(totalPages)
//       } catch (e) {
//         console.error("Error fetching courses:", e)
//       }
//     }
//     fetchCourses()
//   }, [currentPage, limit, totalPages, sort])

//   return (
//     <>
//       <section className="enhanced-page-title">
//         <div className="auto-container">
//           <div className="title-content">
//             <h1 className="enhanced-main-title">Discover Amazing Courses</h1>
//             <p className="enhanced-subtitle">Learn from industry experts and advance your career</p>
//           </div>
//         </div>
//       </section>

//       <div className="enhanced-sidebar-page-container">
//         <div className="auto-container">
//           <div className="row clearfix">
//             <div className="content-side col-lg-12 col-md-12 col-sm-12">
//               <div className="enhanced-our-courses">
//                 <div className="enhanced-options-view">
//                   <div className="enhanced-header-section">
//                     <div className="enhanced-title-section">
//                       <h3 className="enhanced-browse-title">
//                         <FaBookOpen className="title-icon" />
//                         Browse UI/UX Courses
//                       </h3>
//                       <span className="enhanced-course-count">{courses.length} courses available</span>
//                     </div>

//                     <div className="enhanced-controls-section">
//                       <div className="enhanced-view-toggle">
//                         <button
//                           className={`enhanced-view-btn ${viewType === "grid" ? "active" : ""}`}
//                           onClick={() => setViewType("grid")}
//                         >
//                           <FaThLarge />
//                           <span>Grid</span>
//                         </button>
//                         <button
//                           className={`enhanced-view-btn ${viewType === "list" ? "active" : ""}`}
//                           onClick={() => setViewType("list")}
//                         >
//                           <FaList />
//                           <span>List</span>
//                         </button>
//                       </div>

//                       <div className="enhanced-sort-section">
//                         <label className="sort-label">Sort by:</label>
//                         <select
//                           className="enhanced-sort-select"
//                           value={sort}
//                           onChange={(e) => {
//                             setSort(e.target.value)
//                             setCurrentPage(1)
//                           }}
//                         >
//                           <option value="-createdAt">Newest First</option>
//                           <option value="createdAt">Oldest First</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={`enhanced-courses-container ${viewType === "list" ? "list-view" : "grid-view"}`}>
//                   {courses.map((course) => (
//                     <div
//                       className={`enhanced-course-card ${viewType === "list" ? "list-card" : "grid-card"}`}
//                       key={course._id}
//                     >
//                       <Link href={`/coursedetails/${course?.slug}`} className="enhanced-course-link">
//                         <div className="enhanced-card-inner">
//                           <div className="enhanced-image-container">
//                             <Image
//                               src={
//                                 course?.thumbnail ||
//                                 "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" ||
//                                 "/placeholder.svg"
//                               }
//                               alt={course?.title || "Course Image"}
//                               width={550}
//                               height={550}
//                               className="enhanced-course-image"
//                             />
//                             <div className="enhanced-image-overlay">
//                               <span className="enhanced-view-course">View Course</span>
//                             </div>
//                           </div>

//                           <div className="enhanced-card-content">
//                             <h5 className="enhanced-course-title">{course?.title}</h5>

//                             <div className="enhanced-instructor-info">
//                               <FaUser className="instructor-icon" />
//                               <span>By {course?.instructor?.name || "Unknown Instructor"}</span>
//                             </div>

//                             <div className="enhanced-course-meta">
//                               <div className="enhanced-price-section">
//                                 <span className="enhanced-price">₹{course?.price}</span>
//                               </div>

//                               <div className="enhanced-rating-section">
//                                 <div className="rating-stars">
//                                   {[...Array(5)].map((_, i) => (
//                                     <FaStar
//                                       key={i}
//                                       className={`star ${i < Math.floor(course?.averageRating || 0) ? "filled" : ""}`}
//                                     />
//                                   ))}
//                                 </div>
//                                 <span className="rating-number">{course?.averageRating?.toFixed(1) || "0.0"}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>

//                 {courses.length === 0 && (
//                   <div className="enhanced-no-courses">
//                     <FaBookOpen className="no-courses-icon" />
//                     <h4>No courses found</h4>
//                     <p>Try adjusting your search criteria or check back later for new courses.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="enhanced-pagination-wrapper">
//             <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
//           </div>
//         </div>
//       </div>

//       <section className="popular-courses-section">
//         <div className="auto-container">
//           <div className="sec-title">
//             <br />
//             <h2>Most Popular Courses</h2>
//           </div>
//           <PopularCard />
//         </div>
//       </section>

//       <ReadyToStart />
//     </>
//   )
// }




"use client"
import { FaThLarge, FaList } from "react-icons/fa"
import "@/app/styles/bootstrap.css"
import "@/app/styles/main.css"
import "@/app/styles/responsive.css"
import "@/app/styles/font-awesome.css"
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
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sort, setSort] = useState("-createdAt")
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
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

  interface Category {
    _id: string
    name: string
    slug: string
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories")
        setCategories(res.data.data || [])
      } catch (e) {
        console.error("Error fetching categories:", e)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let query = `/courses?page=${currentPage}&limit=${limit}&sort=${sort}`
        if (keyword) query += `&keyword=${keyword}`
        if (category) query += `&category=${category}`
        if (minPrice) query += `&price[gte]=${minPrice}`
        if (maxPrice) query += `&price[lte]=${maxPrice}`

        const res = await api.get(query)
        setCourses(res?.data?.data || [])
        const totalCourses = res.data.total
        setTotalPages(Math.ceil(totalCourses / limit))
      } catch (e) {
        console.error("Error fetching courses:", e)
      }
    }

    fetchCourses()
  }, [currentPage, sort, keyword, category, minPrice, maxPrice])

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
            <div className="col-lg-3 col-md-4">
              <div className="filter-sidebar-modern">
                <h4 className="filter-title">Filter Courses</h4>

                <div className="filter-group">
                  <label htmlFor="keyword" className="filter-label">Search</label>
                  <input
                    type="text"
                    id="keyword"
                    className="filter-input"
                    placeholder="Search by keyword..."
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>

                <div className="filter-group">
                  <label htmlFor="category" className="filter-label">Category</label>
                  <select
                    id="category"
                    className="filter-select"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value)
                      setCurrentPage(1)
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Price Range</label>
                  <div className="filter-price-range">
                    <input
                      type="number"
                      placeholder="Min"
                      className="filter-input"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value)
                        setCurrentPage(1)
                      }}
                    />
                    <span className="price-separator">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="filter-input"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value)
                        setCurrentPage(1)
                      }}
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label htmlFor="sort" className="filter-label">Sort By</label>
                  <select
                    id="sort"
                    className="filter-select"
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value)
                      setCurrentPage(1)
                    }}
                  >
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="content-side col-lg-9 col-md-8">
              <div className="enhanced-our-courses">
                <div className="enhanced-options-view">
                  <div className="enhanced-header-section d-flex justify-between align-center">
                    <div className="enhanced-title-section">
                      <h3 className="enhanced-browse-title">
                        <FaBookOpen className="title-icon" />
                        Browse Courses
                      </h3>
                      <span className="enhanced-course-count">{courses.length} courses found</span>
                    </div>

                    <div className="enhanced-view-toggle">
                      <button
                        className={`enhanced-view-btn ${viewType === "grid" ? "active" : ""}`}
                        onClick={() => setViewType("grid")}
                      >
                        <FaThLarge />
                      </button>
                      <button
                        className={`enhanced-view-btn ${viewType === "list" ? "active" : ""}`}
                        onClick={() => setViewType("list")}
                      >
                        <FaList />
                      </button>
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
                                "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
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
                              <span>By {course?.instructor?.name || "Unknown"}</span>
                            </div>

                            <div className="enhanced-course-meta">
                              <span className="enhanced-price">₹{course?.price}</span>

                              <div className="enhanced-rating-section">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`star ${i < Math.floor(course?.averageRating || 0) ? "filled" : ""}`}
                                  />
                                ))}
                                <span className="rating-number">
                                  {course?.averageRating?.toFixed(1) || "0.0"}
                                </span>
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
                    <p>Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>

              <div className="enhanced-pagination-wrapper">
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
              </div>
            </div>
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

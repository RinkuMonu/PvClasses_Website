"use client";
import { FaThLarge, FaList } from "react-icons/fa";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import ReadyToStart from "@/component/ReadyToStart";
import PopularCard from "@/component/PopularCard";
import { useEffect, useState } from "react";
import Pagination from "@/component/Pagination";
import Image from "next/image";
import api from "@/utils/axios";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

// const filters = {
//   skillLevels: ["Beginner", "Intermediate", "Expert"],
//   pricing: ["Free (14)", "Paid"],
//   duration: ["5+ hours (30)", "10+ hours (20)", "15+ hours (5)"],
//   category: ["UI/UX", "Development", "Marketing", "Data Science"],
// };

// const MIN = 0;
// const MAX = 1000;
// const STEP = 10;

export default function Courses() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [courses, setCourse] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const limit = 6;

  interface Course {
    _id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    instructor?: {
      name: string;
    };
    price: number;
    averageRating?: number;
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(
          `/courses?page=${currentPage}&limit=${limit}&sort=${sort}`
        );
        setCourse(res?.data?.data || []);
        const totalCourses = res.data.total; // ✅ yahan se aayega
        const totalPages = Math.ceil(totalCourses / limit); // limit = per page items
        setTotalPages(totalPages);
      } catch (e) {
        console.error("Error fetching courses:", e);
      }
    };
    fetchCourses();
  }, [currentPage, limit, totalPages, sort]);

  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Courses</h1>
          {/* <div className="search-boxed">
            <div className="search-box">
              <form method="post" action="contact.html">
                <div className="form-group">
                  <input
                    type="search"
                    name="search-field"
                    placeholder="What do you want to learn?"
                    required
                  />
                  <button type="submit">
                    <span className="icon">
                      <FaSearch />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </section>

      <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Content Side */}
            <div className="content-side col-lg-12 col-md-12 col-sm-12">
              <div className="our-courses">
                <div className="options-view  d-flex justify-content-between">
                  <div className="pull-left">
                    <h3>Browse UI/ UX Courses</h3>
                  </div>
                  <div className="pull-right clearfix">
                    <ul className="list-view">
                      <li className={viewType === "grid" ? "active" : ""}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setViewType("grid");
                          }}
                        >
                          <FaThLarge />
                        </a>
                      </li>
                      <li className={viewType === "list" ? "active" : ""}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setViewType("list");
                          }}
                        >
                          <FaList />
                        </a>
                      </li>
                    </ul>
                    <div className="type-form">
                      <div className="form-group">
                        {/* <select className="custom-select-box"> */}
                        <select
                          value={sort}
                          onChange={(e) => {
                            setSort(e.target.value);
                            setCurrentPage(1); // reset to page 1 on sort change
                          }}
                        >
                          <option value="-createdAt">Newest First</option>
                          <option value="createdAt">Oldest First</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    viewType === "grid"
                      ? "row clearfix"
                      : "course-list-container"
                  }
                >
                  {courses.map((course) => (
                    <div
                      className={
                        viewType === "grid"
                          ? "cource-block-two col-lg-4 col-md-6 col-sm-12"
                          : "course-list-item col-12 mb-4"
                      }
                      key={course._id}
                    >
                      <Link href={`/coursedetails/${course?.slug}`}>
                        <div
                          className={`inner-box ${
                            viewType === "list" ? "d-flex" : ""
                          }`}
                        >
                          <div
                            className={`image ${
                              viewType === "list" ? "flex-shrink-0 me-4" : ""
                            }`}
                          >
                            <Image
                              src={
                                course?.thumbnail ||
                                "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                              }
                              alt={course?.title || "Course Image"}
                              width={550}
                              height={550}
                              className="img-fluid object-cover w-100"
                              style={{
                                maxHeight:
                                  viewType === "list" ? "150px" : "200px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="lower-content">
                            <h5 className="cousrcardHeading">
                              {course?.title}
                            </h5>
                            <div className="instructor">
                              By{" "}
                              {course?.instructor?.name || "Unknown Instructor"}
                            </div>
                            <div className="price-rating d-flex justify-content-between">
                              <span className="price">{course?.price} INR</span>
                              <span className="rating">
                                {course?.averageRating || 0}{" "}
                                <FaStar className="text-warning" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Sidebar Side */}
            {/* <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
              <div className="sidebar-inner">
                <aside className="sidebar">
                  <div className="filter-widget">
                    <h5>Filter By</h5>

                    <div className="skills-box">
                      <div className="skills-form">
                        <span>Skill Level</span>
                        {filters.skillLevels.map((level, i) => (
                          <div className="radio-box" key={i}>
                            <input
                              type="radio"
                              name="skill"
                              id={`level-${i}`}
                              defaultChecked={i === 0}
                            />
                            <label htmlFor={`level-${i}`}>{level}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="skills-box-two">
                      <div className="skills-form-two">
                        <span>Pricing</span>
                        {filters.pricing.map((type, i) => (
                          <div className="radio-box" key={i}>
                            <input
                              type="radio"
                              name="price"
                              id={`price-${i}`}
                              defaultChecked={i === 0}
                            />
                            <label htmlFor={`price-${i}`}>{type}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="skills-box-three">
                      <div className="skills-form-three">
                        <span>Duration Time</span>
                        {filters.duration.map((dur, i) => (
                          <div className="radio-box-three" key={i}>
                            <input
                              type="radio"
                              name="duration"
                              id={`duration-${i}`}
                              defaultChecked={i === 0}
                            />
                            <label htmlFor={`duration-${i}`}>{dur}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="skills-box-three">
                      <div className="skills-form-three">
                        <span>Category</span>
                        {filters.category.map((cat, i) => (
                          <div className="radio-box-three" key={i}>
                            <input
                              type="radio"
                              name="category"
                              id={`cat-${i}`}
                              defaultChecked={i === 0}
                            />
                            <label htmlFor={`cat-${i}`}>{cat}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="skills-box-three ">
                      <div className="skills-form-three">
                        <span>Price Range</span>
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
                          <div className="align-items-center gap-1">
                            <label className="fw-semibold mb-0">Min</label>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "80px" }}
                              value={values[0]}
                              min={MIN}
                              max={values[1] - STEP}
                              onChange={(e) => {
                                const newMin = Math.min(
                                  Number(e.target.value),
                                  values[1] - STEP
                                );
                                setValues([newMin, values[1]]);
                              }}
                            />
                          </div>

                          <div className=" align-items-center gap-1">
                            <label className="fw-semibold mb-0">Max</label>
                            <input
                              type="number"
                              className="form-control"
                              style={{ width: "80px" }}
                              value={values[1]}
                              min={values[0] + STEP}
                              max={MAX}
                              onChange={(e) => {
                                const newMax = Math.max(
                                  Number(e.target.value),
                                  values[0] + STEP
                                );
                                setValues([values[0], newMax]);
                              }}
                            />
                          </div>
                        </div>

                        <Range
                          step={STEP}
                          min={MIN}
                          max={MAX}
                          values={values}
                          onChange={(vals) => setValues(vals)}
                          renderTrack={({ props, children }) => (
                            <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                height: "36px",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <div
                                ref={props.ref}
                                style={{
                                  height: "6px",
                                  width: "100%",
                                  borderRadius: "3px",
                                  background: "lightgray",
                                  alignSelf: "center",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    height: "100%",
                                    background: "#0d6efd",
                                    borderRadius: "3px",
                                    left: `${
                                      ((values[0] - MIN) / (MAX - MIN)) * 100
                                    }%`,
                                    width: `${
                                      ((values[1] - values[0]) / (MAX - MIN)) *
                                      100
                                    }%`,
                                  }}
                                />
                                {children}
                              </div>
                            </div>
                          )}
                          renderThumb={({ props }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "16px",
                                width: "16px",
                                backgroundColor: "#0d6efd",
                                borderRadius: "50%",
                                border: "2px solid white",
                                boxShadow: "0 0 3px rgba(0,0,0,0.3)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="mb-2 text-center">
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => setValues([MIN, MAX])}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div> */}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      <section className="popular-courses-section">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Most Popular Courses</h2>
          </div>

          <PopularCard />
        </div>
      </section>

      <ReadyToStart />
    </>
  );
}

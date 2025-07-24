"use client";
import { FaSearch, FaThLarge, FaList } from "react-icons/fa";
import Link from "next/link";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import ReadyToStart from "@/component/ReadyToStart";
import PopularCard from "@/component/PopularCard";
import "@/app/styles/font-awesome.css";
import CourseCard from "@/component/CourseCard";

// const filters = {
//   skillLevels: ["Beginner", "Intermediate", "Expert"],
//   pricing: ["Free (14)", "Paid"],
//   duration: ["5+ hours (30)", "10+ hours (20)", "15+ hours (5)"],
// };

export default function Blog() {
  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Blogs</h1>
          <div className="search-boxed">
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
          </div>
        </div>
      </section>

      <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Content Side */}
            <div className="content-side col-lg-9 col-md-12 col-sm-12">
              <div className="our-courses">
                <div className="options-view  d-flex justify-content-between">
                  <div className="pull-left">
                    <h3>Featured Posts</h3>
                  </div>
                  <div className="pull-right clearfix">
                    <ul className="list-view">
                      <li className="active">
                        <Link href="/course">
                          <FaThLarge />
                        </Link>
                      </li>
                      <li>
                        <Link href="/course-list">
                          <FaList />
                        </Link>
                      </li>
                    </ul>
                    <div className="type-form">
                      <div className="form-group">
                        <select className="custom-select-box">
                          <option>Newest</option>
                          <option>Old</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <CourseCard viewType="grid" />
              </div>
            </div>

            <div className="sidebar-side style-two col-lg-3 col-md-12 col-sm-12">
              <div className="sidebar-inner sticky-top">
                <aside className="sidebar">
                  <div className="sidebar-widget popular-posts">
                    <div className="sidebar-title">
                      <h5>Recent Posts</h5>
                    </div>

                    <div className="widget-content">
                      <article className="post">
                        <div className="post-inner">
                          <figure className="post-thumb">
                            <a href="/blogdetails">
                              <img src="images/book-2.jpg" alt="" />
                            </a>
                          </figure>
                          <div className="text">
                            <a href="/blogdetails">Writing a Simple App</a>
                          </div>
                          <div className="post-info">By Steve Krug</div>
                        </div>
                      </article>

                      <article className="post">
                        <div className="post-inner">
                          <figure className="post-thumb">
                            <Link href="/blogdetails">
                              <img src="images/book-2.jpg" alt="" />
                            </Link>
                          </figure>
                          <div className="text">
                            <a href="/blogdetails">Writing a Simple App</a>
                          </div>
                          <div className="post-info">By Steve Krug</div>
                        </div>
                      </article>

                      <article className="post">
                        <div className="post-inner">
                          <figure className="post-thumb">
                            <Link href="/blogdetails">
                              <img src="images/book-2.jpg" alt="" />
                            </Link>
                          </figure>
                          <div className="text">
                            <Link href="/blogdetails">
                              Writing a Simple App
                            </Link>
                          </div>
                          <div className="post-info">By Steve Krug</div>
                        </div>
                      </article>
                    </div>
                  </div>

                  <div className="sidebar-widget popular-tags">
                    <div className="sidebar-title">
                      <h5>Tags</h5>
                    </div>

                    <div className="widget-content">
                      <a href="#">#Webdesign</a>
                      <a href="#">#Mobileapp</a>
                      <a href="#">#Design</a>
                      <a href="#">#Hack</a>
                      <a href="#">#Webdesign</a>
                      <a href="#">#Hack</a>
                      <a href="#">#Design</a>
                      <a href="#">#Hack</a>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {/* <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          /> */}
        </div>
      </div>

      <section className="popular-courses-section">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Most Popular Posts</h2>
          </div>

          <PopularCard />
        </div>
      </section>

      <ReadyToStart />
    </>
  );
}

// "use client";
// import { FaSearch, FaThLarge, FaList } from "react-icons/fa";
// import Link from "next/link";
// import "@/app/styles/bootstrap.css";
// import "@/app/styles/main.css";
// import "@/app/styles/responsive.css";
// import ReadyToStart from "@/component/ReadyToStart";
// import PopularCard from "@/component/PopularCard";
// import "@/app/styles/font-awesome.css";
// import CourseCard from "@/component/CourseCard";

// // const filters = {
// //   skillLevels: ["Beginner", "Intermediate", "Expert"],
// //   pricing: ["Free (14)", "Paid"],
// //   duration: ["5+ hours (30)", "10+ hours (20)", "15+ hours (5)"],
// // };

// export default function Blog() {
//   return (
//     <>
//       <section className="page-title">
//         <div className="auto-container">
//           <h1>Blogs</h1>
//           <div className="search-boxed">
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
//           </div>
//         </div>
//       </section>

//       <div className="sidebar-page-container">
//         <div className="auto-container">
//           <div className="row clearfix">
//             {/* Content Side */}
//             <div className="content-side col-lg-9 col-md-12 col-sm-12">
//               <div className="our-courses">
//                 <div className="options-view  d-flex justify-content-between">
//                   <div className="pull-left">
//                     <h3>Featured Posts</h3>
//                   </div>
//                   <div className="pull-right clearfix">
//                     <ul className="list-view">
//                       <li className="active">
//                         <Link href="/course">
//                           <FaThLarge />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/course-list">
//                           <FaList />
//                         </Link>
//                       </li>
//                     </ul>
//                     <div className="type-form">
//                       <div className="form-group">
//                         <select className="custom-select-box">
//                           <option>Newest</option>
//                           <option>Old</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <CourseCard viewType="grid" />
//               </div>
//             </div>

//             <div className="sidebar-side style-two col-lg-3 col-md-12 col-sm-12">
//               <div className="sidebar-inner sticky-top">
//                 <aside className="sidebar">
//                   <div className="sidebar-widget popular-posts">
//                     <div className="sidebar-title">
//                       <h5>Recent Posts</h5>
//                     </div>

//                     <div className="widget-content">
//                       <article className="post">
//                         <div className="post-inner">
//                           <figure className="post-thumb">
//                             <a href="/blogdetails">
//                               <img src="images/book-2.jpg" alt="" />
//                             </a>
//                           </figure>
//                           <div className="text">
//                             <a href="/blogdetails">Writing a Simple App</a>
//                           </div>
//                           <div className="post-info">By Steve Krug</div>
//                         </div>
//                       </article>

//                       <article className="post">
//                         <div className="post-inner">
//                           <figure className="post-thumb">
//                             <Link href="/blogdetails">
//                               <img src="images/book-2.jpg" alt="" />
//                             </Link>
//                           </figure>
//                           <div className="text">
//                             <a href="/blogdetails">Writing a Simple App</a>
//                           </div>
//                           <div className="post-info">By Steve Krug</div>
//                         </div>
//                       </article>

//                       <article className="post">
//                         <div className="post-inner">
//                           <figure className="post-thumb">
//                             <Link href="/blogdetails">
//                               <img src="images/book-2.jpg" alt="" />
//                             </Link>
//                           </figure>
//                           <div className="text">
//                             <Link href="/blogdetails">
//                               Writing a Simple App
//                             </Link>
//                           </div>
//                           <div className="post-info">By Steve Krug</div>
//                         </div>
//                       </article>
//                     </div>
//                   </div>

//                   <div className="sidebar-widget popular-tags">
//                     <div className="sidebar-title">
//                       <h5>Tags</h5>
//                     </div>

//                     <div className="widget-content">
//                       <a href="#">#Webdesign</a>
//                       <a href="#">#Mobileapp</a>
//                       <a href="#">#Design</a>
//                       <a href="#">#Hack</a>
//                       <a href="#">#Webdesign</a>
//                       <a href="#">#Hack</a>
//                       <a href="#">#Design</a>
//                       <a href="#">#Hack</a>
//                     </div>
//                   </div>
//                 </aside>
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           {/* <Pagination
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//             totalPages={totalPages}
//           /> */}
//         </div>
//       </div>

//       <section className="popular-courses-section">
//         <div className="auto-container">
//           <div className="sec-title">
//             <h2>Most Popular Posts</h2>
//           </div>

//           <PopularCard />
//         </div>
//       </section>

//       <ReadyToStart />
//     </>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const limit = 3;

  const fetchBlogs = async (newPage = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=9&status=2&page=${newPage}&limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
          },
        }
      );

      const newBlogs = res.data.data || [];
      const pagination = res.data.pagination || {};

      setBlogs((prev) => [...prev, ...newBlogs]);

      if (pagination.total_pages) {
        setTotalPages(pagination.total_pages);
      }

      if (newPage >= pagination.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const fetchCategories = async () => {
    try {
      const allCatIds = [...new Set(blogs.map((post) => post.category_id))];

      const categories = await Promise.all(
        allCatIds.map(async (category_id) => {
          const res = await axios.get(
            `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${category_id}`,
            {
              headers: {
                Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
              },
            }
          );

          return {
            id: category_id,
            name: res.data?.data?.name,
          };
        })
      );
      setAllCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (blogs.length > 0) {
      fetchCategories();
    }
  }, [blogs]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBlogs(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page]);

  const filteredPosts = blogs.filter((post) => {
    const categoryName = allCategories.find((cat) => cat.id === post.category_id)?.name;

    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      (categoryName && selectedCategories.includes(categoryName));

    return matchesSearch && matchesCategory;
  });

  const bannerSlides = [
    {
      image: "/image/NewBanner/blog.png",
      title: "IOS Development",
      description:
        "Create robust mobile apps for the iOS and Android operating systems.",
    },
  ];

  return (
    <>
      <div className="custom-banner">
        <div className="container banner-grid">
          <div>
            <h1 className="banner-heading">
              Master Online Learning with PvClasses
            </h1>
            <p className="banner-subtext">
              Explore expertly crafted courses in programming, design, development, and more – built to help you grow your skills and career from anywhere.
            </p>
          </div>

          <div>
            {/* <img src="/image/NewBanner/blog.png" alt="Banner" className="banner-image" /> */}
          </div>
        </div>
      </div>

      <section className="blog-section">
        <div className="container">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtext">Stay updated with our latest insights, news, and tips</p>

          <div className="filter-box">
            <input
              type="text"
              placeholder="Search articles..."
              className="filter-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* <select
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="filter-select"
            >
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select> */}

            {(selectedCategories.length > 0 || searchQuery) && (
              <button
                className="clear-button"
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="post-grid">
              {filteredPosts.map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <div className="post-card">
                    <h3 className="post-title">{post.title}</h3>
                    {/* <p className="post-slug">{post.slug}</p> */}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria.</p>
              <button
                className="clear-button"
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {loading && (
            <div className="loading-spinner"></div>
          )}

        </div>
      </section>

      {/* <style jsx>{`
        // .custom-banner {
        //   background-color: #fff2e2;
        //   height: 52vh;
        //   display: flex;
        //   align-items: center;
        //   padding: 2rem;
        // }
        // .container {
        //   max-width: 1200px;
        //   margin: 0 auto;
        //   padding: 0 1rem;
        // }
        // .banner-grid {
        //   display: grid;
        //   grid-template-columns: 1fr 1fr;
        //   gap: 2rem;
        //   align-items: center;
        // }
        // .banner-heading {
        //   font-size: 2.5rem;
        //   font-weight: bold;
        //   color: #ab6545;
        //   margin-bottom: 1rem;
        // }
        // .banner-subtext {
        //   color: #555;
        // }
        // .banner-image {
        //   width: 100%;
        // }
        // .blog-section {
        //   padding: 4rem 1rem;
        //   background-color: #f8faff;
        // }
        // .section-title {
        //   font-size: 2rem;
        //   font-weight: bold;
        //   margin-bottom: 1rem;
        // }
        // .section-subtext {
        //   color: #666;
        //   margin-bottom: 2rem;
        // }
        // .filter-box {
        //   display: flex;
        //   flex-direction: column;
        //   gap: 1rem;
        //   margin-bottom: 2rem;
        // }
        // .filter-input,
        // .filter-select {
        //   padding: 0.75rem 1rem;
        //   border: 1px solid #ccc;
        //   border-radius: 0.375rem;
        // }
        // .clear-button {
        //   color: #d33;
        //   background: none;
        //   border: none;
        //   text-decoration: underline;
        //   cursor: pointer;
        //   padding: 0.5rem 0;
        // }
        // .post-grid {
        //   display: grid;
        //   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        //   gap: 2rem;
        // }
        // .post-card {
        //   border: 1px solid #ddd;
        //   border-radius: 0.5rem;
        //   padding: 1.25rem;
        //   transition: box-shadow 0.3s ease;
        // }
        // .post-card:hover {
        //   box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        // }
        // .post-title {
        //   font-size: 1.25rem;
        //   font-weight: 600;
        //   margin-bottom: 0.5rem;
        // }
        // .post-slug {
        //   font-size: 0.875rem;
        //   color: #666;
        // }
        // .no-posts {
        //   text-align: center;
        //   padding: 3rem 0;
        // }
        // .loading-spinner {
        //   width: 2rem;
        //   height: 2rem;
        //   border: 4px solid #ab6545;
        //   border-top: 4px solid transparent;
        //   border-radius: 50%;
        //   animation: spin 1s linear infinite;
        //   margin: 2rem auto 0;
        // }
        // .end-message {
        //   text-align: center;
        //   color: #888;
        //   margin-top: 2rem;
        // }
        // @keyframes spin {
        //   to {
        //     transform: rotate(360deg);
        //   }
        // }
      `}</style> */}
    </>
  );
}

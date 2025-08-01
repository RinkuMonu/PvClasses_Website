


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";
// import Image from "next/image";

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const limit = 3;

//   const fetchBlogs = async (newPage = 1) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=9&status=2&page=${newPage}&limit=${limit}`,
//         {
//           headers: {
//             Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//           },
//         }
//       );

//       const newBlogs = res.data.data || [];
//       const pagination = res.data.pagination || {};

//       // setBlogs((prev) => [...prev, ...newBlogs]);

//       setBlogs((prev) => {
//   const existingIds = new Set(prev.map((b) => b.id));
//   const uniqueNew = newBlogs.filter((b) => !existingIds.has(b.id));
//   return [...prev, ...uniqueNew];
// });


//       if (pagination.total_pages) {
//         setTotalPages(pagination.total_pages);
//       }

//       if (newPage >= pagination.total_pages) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBlogs(1);
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const allCatIds = [...new Set(blogs.map((post) => post.category_id))];

//       const categories = await Promise.all(
//         allCatIds.map(async (category_id) => {
//           const res = await axios.get(
//             `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${category_id}`,
//             {
//               headers: {
//                 Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//               },
//             }
//           );

//           return {
//             id: category_id,
//             name: res.data?.data?.name,
//           };
//         })
//       );
//       setAllCategories(categories);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (blogs.length > 0) {
//       fetchCategories();
//     }
//   }, [blogs]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 &&
//         !loading &&
//         hasMore
//       ) {
//         const nextPage = page + 1;
//         setPage(nextPage);
//         fetchBlogs(nextPage);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loading, hasMore, page]);

//   const filteredPosts = blogs.filter((post) => {
//     const categoryName = allCategories.find((cat) => cat.id === post.category_id)?.name;

//     const matchesSearch =
//       searchQuery === "" ||
//       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       post.slug.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesCategory =
//       selectedCategories.length === 0 ||
//       (categoryName && selectedCategories.includes(categoryName));

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <>
//       <div className="custom-banner">
//         <div className="container banner-grid">
//           <div>
//             <h1 className="banner-heading">
//               Master Online Learning with PvClasses
//             </h1>
//             <p className="banner-subtext">
//               Explore expertly crafted courses in programming, design, development, and more – built to help you grow your skills and career from anywhere.
//             </p>
//           </div>
//         </div>
//       </div>

//       <section className="blog-section">
//         <div className="container">
//           <h2 className="section-title">Latest Articles</h2>
//           <p className="section-subtext">Stay updated with our latest insights, news, and tips</p>

//           <div className="filter-box">
//             <input
//               type="text"
//               placeholder="Search articles..."
//               className="filter-input"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {(selectedCategories.length > 0 || searchQuery) && (
//               <button
//                 className="clear-button"
//                 onClick={() => {
//                   setSelectedCategories([]);
//                   setSearchQuery("");
//                 }}
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>

//           {filteredPosts.length > 0 ? (
//             <div className="post-grid">
//               {filteredPosts.map((post, index) => (
//                 <Link key={index} href={`/blog/${post.slug}`}>
//                   <div className="post-card">
//                     <Image
//                       src={post.image || "/images/default-blog-image.jpg"}
//                       alt={post.title}
//                       width={400}
//                       height={240}
//                       className="rounded-t-md"
//                     />
//                     <div className="pt-3">
//                       <p className="text-gray-500 text-sm flex items-center gap-2">
//                         <span>📅 {post.created_at.split(" ")[0]}</span>
//                         <span>👤 Admin</span>
//                       </p>
//                       <h3 className="text-lg font-semibold mt-1 line-clamp-2">
//                         {post.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                         {post.summary}
//                       </p>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="no-posts">
//               <h3>No articles found</h3>
//               <p>Try adjusting your search or filter criteria.</p>
//               <button
//                 className="clear-button"
//                 onClick={() => {
//                   setSelectedCategories([]);
//                   setSearchQuery("");
//                 }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}

//           {loading && <div className="loading-spinner"></div>}
//         </div>
//       </section>
//     </>
//   );
// }



"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import Image from "next/image"

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const limit = 3

  const fetchBlogs = async (newPage = 1) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=9&status=2&page=${newPage}&limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
          },
        },
      )
      const newBlogs = res.data.data || []
      const pagination = res.data.pagination || {}

      setBlogs((prev) => {
        const existingIds = new Set(prev.map((b) => b.id))
        const uniqueNew = newBlogs.filter((b) => !existingIds.has(b.id))
        return [...prev, ...uniqueNew]
      })

      if (pagination.total_pages) {
        setTotalPages(pagination.total_pages)
      }
      if (newPage >= pagination.total_pages) {
        setHasMore(false)
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs(1)
  }, [])

  const fetchCategories = async () => {
    try {
      const allCatIds = [...new Set(blogs.map((post) => post.category_id))]
      const categories = await Promise.all(
        allCatIds.map(async (category_id) => {
          const res = await axios.get(
            `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${category_id}`,
            {
              headers: {
                Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
              },
            },
          )
          return {
            id: category_id,
            name: res.data?.data?.name,
          }
        }),
      )
      setAllCategories(categories)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (blogs.length > 0) {
      fetchCategories()
    }
  }, [blogs])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 && !loading && hasMore) {
        const nextPage = page + 1
        setPage(nextPage)
        fetchBlogs(nextPage)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, page])

  const filteredPosts = blogs.filter((post) => {
    const categoryName = allCategories.find((cat) => cat.id === post.category_id)?.name
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategories.length === 0 || (categoryName && selectedCategories.includes(categoryName))
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <div className="blog-enhanced-banner">
        <div className="blog-enhanced-banner-overlay"></div>
        <div className="blog-enhanced-container blog-enhanced-banner-grid">
          <div className="blog-enhanced-banner-content">
            <div className="blog-enhanced-badge">
              <span className="blog-enhanced-badge-icon">✨</span>
              <span>Welcome to Our Blog</span>
            </div>
            <h1 className="blog-enhanced-banner-heading">Master Online Learning with PvClasses</h1>
            <p className="blog-enhanced-banner-subtext">
              Explore expertly crafted courses in programming, design, development, and more – built to help you grow
              your skills and career from anywhere.
            </p>
            <div className="blog-enhanced-banner-stats">
              <div className="blog-enhanced-stat-item">
                <span className="blog-enhanced-stat-number">{blogs.length}+</span>
                <span className="blog-enhanced-stat-label">Articles</span>
              </div>
              <div className="blog-enhanced-stat-divider"></div>
              <div className="blog-enhanced-stat-item">
                <span className="blog-enhanced-stat-number">{allCategories.length}+</span>
                <span className="blog-enhanced-stat-label">Categories</span>
              </div>
            </div>
          </div>
          <div className="blog-enhanced-banner-decoration">
            <div className="blog-enhanced-floating-card blog-enhanced-card-1">
              <div className="blog-enhanced-card-icon">📚</div>
              <div className="blog-enhanced-card-text">Learn</div>
            </div>
            <div className="blog-enhanced-floating-card blog-enhanced-card-2">
              <div className="blog-enhanced-card-icon">🚀</div>
              <div className="blog-enhanced-card-text">Grow</div>
            </div>
            <div className="blog-enhanced-floating-card blog-enhanced-card-3">
              <div className="blog-enhanced-card-icon">💡</div>
              <div className="blog-enhanced-card-text">Innovate</div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog-enhanced-section">
        <div className="blog-enhanced-container">
          <div className="blog-enhanced-header">
            <div className="blog-enhanced-title-section">
              <h2 className="blog-enhanced-section-title">Latest Articles</h2>
              <p className="blog-enhanced-section-subtext">Stay updated with our latest insights, news, and tips</p>
            </div>

            <div className="blog-enhanced-filter-container">
              <div className="blog-enhanced-search-wrapper">
                <div className="blog-enhanced-search-icon">🔍</div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="blog-enhanced-filter-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="blog-enhanced-clear-search"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {(selectedCategories.length > 0 || searchQuery) && (
                <button
                  className="blog-enhanced-clear-button"
                  onClick={() => {
                    setSelectedCategories([])
                    setSearchQuery("")
                  }}
                >
                  <span className="blog-enhanced-clear-icon">🗑️</span>
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blog-enhanced-post-grid">
              {filteredPosts.map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`} className="blog-enhanced-post-link">
                  <article className="blog-enhanced-post-card">
                    <div className="blog-enhanced-image-container">
                      <Image
                        src={post.image || "/placeholder.svg?height=240&width=400&text=Blog+Image"}
                        alt={post.title}
                        width={400}
                        height={240}
                        className="blog-enhanced-post-image"
                      />
                      <div className="blog-enhanced-image-overlay">
                        <span className="blog-enhanced-read-more">Read Article</span>
                      </div>
                    </div>

                    <div className="blog-enhanced-post-content">
                      <div className="blog-enhanced-post-meta">
                        <span className="blog-enhanced-meta-item">
                          <span className="blog-enhanced-meta-icon">📅</span>
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="blog-enhanced-meta-item">
                          <span className="blog-enhanced-meta-icon">👤</span>
                          Admin
                        </span>
                      </div>

                      <h3 className="blog-enhanced-post-title">{post.title}</h3>

                      <p className="blog-enhanced-post-summary">{post.summary}</p>

                      <div className="blog-enhanced-read-more-section">
                        <span className="blog-enhanced-read-more-text">Read More</span>
                        <span className="blog-enhanced-arrow">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="blog-enhanced-no-posts">
              <div className="blog-enhanced-no-posts-icon">📝</div>
              <h3 className="blog-enhanced-no-posts-title">No articles found</h3>
              <p className="blog-enhanced-no-posts-text">Try adjusting your search or filter criteria.</p>
              <button
                className="blog-enhanced-clear-button blog-enhanced-clear-centered"
                onClick={() => {
                  setSelectedCategories([])
                  setSearchQuery("")
                }}
              >
                <span className="blog-enhanced-clear-icon">🔄</span>
                Reset Filters
              </button>
            </div>
          )}

          {loading && (
            <div className="blog-enhanced-loading-container">
              <div className="blog-enhanced-loading-spinner"></div>
              <p className="blog-enhanced-loading-text">Loading more articles...</p>
            </div>
          )}

          {!hasMore && blogs.length > 0 && (
            <div className="blog-enhanced-end-message">
              <div className="blog-enhanced-end-icon">🎉</div>
              <p>You've reached the end! Thanks for reading all our articles.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

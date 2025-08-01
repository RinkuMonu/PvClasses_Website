

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect, use } from "react";
// import axios from "axios";
// import { Calendar, ArrowLeft, Clock, TrendingUp, Folder, Share2, BookOpen, User, MessageSquare } from "lucide-react";

// export default function BlogPostPage({ params }) {
//   const { slug } = use(params);

//   const [allPosts, setAllPosts] = useState([]);
//   const [post, setPost] = useState(null);
//   const [trendingPosts, setTrendingPosts] = useState([]);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [readingTime, setReadingTime] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [activeTab, setActiveTab] = useState("trending");

//   // Simulated comments data
//   useEffect(() => {
//     if (post) {
//       setComments([
//         {
//           id: 1,
//           name: "Alex Johnson",
//           avatar: "/avatar1.svg",
//           date: "2 days ago",
//           comment: "This article provided valuable insights. I particularly appreciated the section about modern UI design patterns."
//         },
//         {
//           id: 2,
//           name: "Sarah Williams",
//           avatar: "/avatar2.svg",
//           date: "1 day ago",
//           comment: "The examples were very practical. I implemented some of these techniques in my current project with great success!"
//         }
//       ]);
//     }
//   }, [post]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(
//           "https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=9&status=2",
//           {
//             headers: {
//               Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//             },
//           }
//         );

//         const rawPosts = res.data?.data || [];
//         const categoryIds = [
//           ...new Set(rawPosts.map((post) => post.category_id)),
//         ];

//         const categoryMap = {};
//         await Promise.all(
//           categoryIds.map(async (id) => {
//             const categoryRes = await axios.get(
//               `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${id}`,
//               {
//                 headers: {
//                   Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//                 },
//               }
//             );
//             categoryMap[id] =
//               categoryRes.data?.data?.name || "Uncategorized";
//           })
//         );

//         const postsWithCategories = rawPosts.map((post) => ({
//           ...post,
//           categoryName: categoryMap[post.category_id] || "Uncategorized",
//         }));

//         const currentPost = postsWithCategories.find((p) => p.slug === slug);
        
//         // Calculate reading time
//         if (currentPost?.content) {
//           const wordsPerMinute = 200;
//           const textLength = currentPost.content.split(/\s+/).length;
//           setReadingTime(Math.ceil(textLength / wordsPerMinute));
//         }
        
//         setPost(currentPost);
//         setAllPosts(postsWithCategories);

//         const trending = postsWithCategories.filter((p) => p.is_trending == 1);
//         setTrendingPosts(trending.slice(0, 5));

//         const recent = [...postsWithCategories]
//           .sort((a, b) => new Date(b.date) - new Date(a.date))
//           .slice(0, 5);
//         setRecentPosts(recent);

//         const categoryCount = postsWithCategories.reduce((acc, post) => {
//           const name = post.categoryName;
//           acc[name] = (acc[name] || 0) + 1;
//           return acc;
//         }, {});
//         setCategories(categoryCount);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchData();
//   }, [slug]);

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (newComment.trim() === "") return;
    
//     const newCommentObj = {
//       id: comments.length + 1,
//       name: "You",
//       avatar: "/avatar-you.svg",
//       date: "Just now",
//       comment: newComment
//     };
    
//     setComments([newCommentObj, ...comments]);
//     setNewComment("");
//   };

//   if (isLoading) {
//     return (
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #f5f7ff 0%, #e6eeff 100%)',
//         fontFamily: "'Inter', 'Segoe UI', sans-serif"
//       }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{
//             width: '60px',
//             height: '60px',
//             margin: '0 auto 20px',
//             borderRadius: '50%',
//             background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
//             animation: 'pulse 1.5s infinite'
//           }}></div>
//           <p style={{
//             fontSize: '1.2rem',
//             fontWeight: '600',
//             color: '#334155'
//           }}>Loading article...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #f5f7ff 0%, #e6eeff 100%)',
//         padding: '20px',
//         fontFamily: "'Inter', 'Segoe UI', sans-serif"
//       }}>
//         <div style={{
//           background: 'white',
//           padding: '40px',
//           borderRadius: '20px',
//           boxShadow: '0 15px 50px rgba(112, 102, 255, 0.15)',
//           maxWidth: '500px',
//           width: '100%',
//           textAlign: 'center'
//         }}>
//           <h1 style={{
//             fontSize: '2rem',
//             fontWeight: '800',
//             color: '#1e293b',
//             marginBottom: '20px'
//           }}>Article Not Found</h1>
//           <p style={{
//             color: '#64748b',
//             marginBottom: '30px',
//             lineHeight: '1.6'
//           }}>
//             The blog post you're looking for doesn't exist or may have been removed.
//           </p>
//           <Link href="/blog" style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '8px',
//             padding: '12px 28px',
//             background: 'linear-gradient(45deg, #4f46e5, #7c3aed)',
//             color: 'white',
//             borderRadius: '12px',
//             fontWeight: '600',
//             textDecoration: 'none',
//             transition: 'all 0.3s ease',
//             boxShadow: '0 5px 15px rgba(112, 102, 255, 0.3)'
//           }}>
//             <ArrowLeft size={18} />
//             Back to Blog
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       fontFamily: "'Inter', 'Segoe UI', sans-serif",
//       background: '#f8faff',
//       color: '#334155',
//       minHeight: '100vh'
//     }}>
//       {/* Hero Section */}
//       <div style={{
//         position: 'relative',
//         height: '500px',
//         background: `linear-gradient(rgba(79, 70, 229, 0.85), rgba(124, 58, 237, 0.85)), url('${post.image || "/placeholder.svg"}')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'flex-end',
//         paddingBottom: '80px'
//       }}>
//         <div style={{
//           maxWidth: '1200px',
//           width: '100%',
//           margin: '0 auto',
//           padding: '0 20px',
//           position: 'relative',
//           zIndex: '2',
//           color: 'white'
//         }}>
//           <div style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: '8px',
//             background: 'rgba(255, 255, 255, 0.15)',
//             backdropFilter: 'blur(10px)',
//             padding: '8px 16px',
//             borderRadius: '50px',
//             fontSize: '0.9rem',
//             fontWeight: '500',
//             marginBottom: '20px'
//           }}>
//             <Folder size={16} style={{ color: '#e0e7ff' }} />
//             <span>{post.categoryName}</span>
//           </div>
          
//           <h1 style={{
//             fontSize: '3rem',
//             fontWeight: '800',
//             lineHeight: '1.2',
//             maxWidth: '800px',
//             marginBottom: '25px',
//             textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
//           }}>{post.title}</h1>
          
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '25px',
//             flexWrap: 'wrap'
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '1rem'
//             }}>
//               <User size={18} style={{ color: '#e0e7ff' }} />
//               <span>John Doe</span>
//             </div>
            
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '1rem'
//             }}>
//               <Calendar size={18} style={{ color: '#e0e7ff' }} />
//               <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
//             </div>
            
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px',
//               fontSize: '1rem'
//             }}>
//               <Clock size={18} style={{ color: '#e0e7ff' }} />
//               <span>{readingTime} min read</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         padding: '40px 20px'
//       }}>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 350px',
//           gap: '40px'
//         }}>
//           <div style={{ position: 'relative' }}>
//             <div style={{
//               background: 'white',
//               borderRadius: '20px',
//               boxShadow: '0 15px 50px rgba(112, 102, 255, 0.1)',
//               padding: '40px',
//               marginTop: '-80px'
//             }}>
//               <Link href="/blog" style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 color: '#4f46e5',
//                 fontWeight: '600',
//                 marginBottom: '25px',
//                 textDecoration: 'none',
//                 transition: 'all 0.3s ease'
//               }}>
//                 <ArrowLeft size={20} />
//                 Back to Blog
//               </Link>
              
              
              
//               {/* Article Content */}
//               <div
//                 style={{
//                   fontSize: '1.1rem',
//                   color: '#334155',
//                   lineHeight: '1.8'
//                 }}
//                 dangerouslySetInnerHTML={{ __html: post.content }}
//               />
              
//               {/* Tags */}
//               <div style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: '10px',
//                 margin: '40px 0',
//                 paddingTop: '30px',
//                 borderTop: '1px solid #e2e8f0'
//               }}>
//                 <span style={{
//                   background: '#f0f4ff',
//                   color: '#4f46e5',
//                   padding: '6px 15px',
//                   borderRadius: '50px',
//                   fontSize: '0.9rem',
//                   fontWeight: '500'
//                 }}>Web Design</span>
//                 <span style={{
//                   background: '#f0f4ff',
//                   color: '#4f46e5',
//                   padding: '6px 15px',
//                   borderRadius: '50px',
//                   fontSize: '0.9rem',
//                   fontWeight: '500'
//                 }}>UI/UX</span>
//                 <span style={{
//                   background: '#f0f4ff',
//                   color: '#4f46e5',
//                   padding: '6px 15px',
//                   borderRadius: '50px',
//                   fontSize: '0.9rem',
//                   fontWeight: '500'
//                 }}>Development</span>
//               </div>
              
//               {/* Share Buttons */}
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '15px',
//                 padding: '20px 0',
//                 borderTop: '1px solid #e2e8f0',
//                 borderBottom: '1px solid #e2e8f0',
//                 marginBottom: '40px'
//               }}>
//                 <span style={{
//                   fontWeight: '600',
//                   color: '#1e293b'
//                 }}>Share this article:</span>
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                   <button style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: '#e0f2fe',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     border: 'none',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0ea5e9">
//                       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                     </svg>
//                   </button>
//                   <button style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: '#dbeafe',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     border: 'none',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#2563eb">
//                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                     </svg>
//                   </button>
//                   <button style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: '#dbeafe',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     border: 'none',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0284c7">
//                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//                     </svg>
//                   </button>
//                 </div>
//               </div>
              
          
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '30px'
//           }}>
//             <div style={{
//               background: 'white',
//               borderRadius: '20px',
//               boxShadow: '0 15px 50px rgba(112, 102, 255, 0.1)',
//               padding: '25px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 borderBottom: '1px solid #e2e8f0',
//                 marginBottom: '20px'
//               }}>
//                 <button 
//                   onClick={() => setActiveTab("trending")}
//                   style={{
//                     padding: '10px 15px',
//                     background: activeTab === "trending" ? '#f0f4ff' : 'transparent',
//                     color: activeTab === "trending" ? '#4f46e5' : '#64748b',
//                     fontWeight: '600',
//                     border: 'none',
//                     cursor: 'pointer',
//                     borderRadius: '8px 8px 0 0',
//                     flex: '1',
//                     textAlign: 'center',
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   <TrendingUp size={18} style={{ marginRight: '8px' }} />
//                   Trending
//                 </button>
//                 <button 
//                   onClick={() => setActiveTab("recent")}
//                   style={{
//                     padding: '10px 15px',
//                     background: activeTab === "recent" ? '#f0f4ff' : 'transparent',
//                     color: activeTab === "recent" ? '#4f46e5' : '#64748b',
//                     fontWeight: '600',
//                     border: 'none',
//                     cursor: 'pointer',
//                     borderRadius: '8px 8px 0 0',
//                     flex: '1',
//                     textAlign: 'center',
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   <Clock size={18} style={{ marginRight: '8px' }} />
//                   Recent
//                 </button>
//               </div>
              
//               {activeTab === "trending" ? (
//                 <div style={{ display: 'grid', gap: '15px' }}>
//                   {trendingPosts.map((p, i) => (
//                     <Link
//                       key={p.slug}
//                       href={`/blog/${p.slug}`}
//                       style={{
//                         display: 'flex',
//                         gap: '15px',
//                         alignItems: 'center',
//                         padding: '15px',
//                         borderRadius: '12px',
//                         background: '#f8fafc',
//                         textDecoration: 'none',
//                         transition: 'all 0.3s ease'
//                       }}
//                     >
//                       <div style={{
//                         minWidth: '60px',
//                         height: '60px',
//                         borderRadius: '10px',
//                         background: `url(${p.image || "/placeholder.svg"}) center/cover no-repeat`
//                       }}></div>
//                       <div>
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '6px',
//                           marginBottom: '5px'
//                         }}>
//                           <div style={{
//                             width: '20px',
//                             height: '20px',
//                             borderRadius: '50%',
//                             background: '#e0e7ff',
//                             color: '#4f46e5',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '0.75rem',
//                             fontWeight: '700'
//                           }}>{i + 1}</div>
//                           <span style={{
//                             fontSize: '0.85rem',
//                             color: '#4f46e5',
//                             fontWeight: '500'
//                           }}>Trending</span>
//                         </div>
//                         <h4 style={{
//                           fontWeight: '600',
//                           color: '#1e293b',
//                           marginBottom: '5px',
//                           fontSize: '1rem'
//                         }}>{p.title.split(" ").slice(0, 6).join(" ")}...</h4>
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '8px',
//                           fontSize: '0.85rem',
//                           color: '#64748b'
//                         }}>
//                           <Calendar size={14} />
//                           <span>{new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               ) : (
//                 <div style={{ display: 'grid', gap: '15px' }}>
//                   {recentPosts.map((p) => (
//                     <Link
//                       key={p.slug}
//                       href={`/blog/${p.slug}`}
//                       style={{
//                         display: 'flex',
//                         gap: '15px',
//                         alignItems: 'center',
//                         padding: '15px',
//                         borderRadius: '12px',
//                         background: '#f8fafc',
//                         textDecoration: 'none',
//                         transition: 'all 0.3s ease'
//                       }}
//                     >
//                       <div style={{
//                         minWidth: '60px',
//                         height: '60px',
//                         borderRadius: '10px',
//                         background: `url(${p.image || "/placeholder.svg"}) center/cover no-repeat`
//                       }}></div>
//                       <div>
//                         <h4 style={{
//                           fontWeight: '600',
//                           color: '#1e293b',
//                           marginBottom: '8px',
//                           fontSize: '1rem'
//                         }}>{p.title.split(" ").slice(0, 6).join(" ")}...</h4>
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '8px',
//                           fontSize: '0.85rem',
//                           color: '#64748b'
//                         }}>
//                           <Calendar size={14} />
//                           <span>{new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             <div style={{
//               background: 'white',
//               borderRadius: '20px',
//               boxShadow: '0 15px 50px rgba(112, 102, 255, 0.1)',
//               padding: '25px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 marginBottom: '20px'
//               }}>
//                 <Folder size={20} color="#4f46e5" />
//                 <h3 style={{
//                   fontSize: '1.25rem',
//                   fontWeight: '700',
//                   color: '#1e293b'
//                 }}>Categories</h3>
//               </div>
              
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
//                 gap: '12px'
//               }}>
//                 {Object.entries(categories).map(([name, count]) => (
//                   <Link
//                     key={name}
//                     href="/"
//                     style={{
//                       display: 'block',
//                       background: '#f0f4ff',
//                       padding: '12px 15px',
//                       borderRadius: '10px',
//                       fontSize: '0.95rem',
//                       fontWeight: '500',
//                       color: '#4f46e5',
//                       textDecoration: 'none',
//                       position: 'relative',
//                       transition: 'all 0.3s ease'
//                     }}
//                   >
//                     {name}
//                     <span style={{
//                       position: 'absolute',
//                       top: '-8px',
//                       right: '-8px',
//                       background: '#4f46e5',
//                       color: 'white',
//                       width: '24px',
//                       height: '24px',
//                       borderRadius: '50%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '0.75rem'
//                     }}>{count}</span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
            
         
//           </div>
//         </div>
//       </div>

//       {/* Global styles for blog content */}
//       <style jsx global>{`
//         .blog-detail-page .blog-content p {
//           margin-bottom: 1.8em;
//           font-size: 1.1rem;
//           line-height: 1.8;
//           color: #334155;
//         }
        
//         .blog-detail-page .blog-content h2 {
//           font-size: 1.8rem;
//           font-weight: 700;
//           margin-top: 2.5em;
//           margin-bottom: 1em;
//           color: #1e293b;
//           padding-bottom: 0.5em;
//           border-bottom: 1px solid #e2e8f0;
//         }
        
//         .blog-detail-page .blog-content h3 {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-top: 2em;
//           margin-bottom: 1em;
//           color: #1e293b;
//         }
        
//         .blog-detail-page .blog-content a {
//           color: #4f46e5;
//           text-decoration: none;
//           font-weight: 500;
//           border-bottom: 1px solid #c7d2fe;
//           transition: all 0.2s ease;
//         }
        
//         .blog-detail-page .blog-content a:hover {
//           color: #7c3aed;
//           border-bottom-color: #a5b4fc;
//         }
        
//         .blog-detail-page .blog-content ul,
//         .blog-detail-page .blog-content ol {
//           margin-left: 1.5em;
//           margin-bottom: 1.8em;
//         }
        
//         .blog-detail-page .blog-content li {
//           margin-bottom: 0.8em;
//           position: relative;
//         }
        
//         .blog-detail-page .blog-content ul li::before {
//           content: "•";
//           color: #4f46e5;
//           font-weight: bold;
//           display: inline-block;
//           width: 1em;
//           margin-left: -1em;
//         }
        
//         .blog-detail-page .blog-content blockquote {
//           border-left: 4px solid #4f46e5;
//           background: #f0f4ff;
//           padding: 1.5rem;
//           margin: 2rem 0;
//           border-radius: 0 0.5rem 0.5rem 0;
//           font-style: italic;
//           color: #475569;
//         }
        
//         @keyframes pulse {
//           0% { opacity: 0.7; }
//           50% { opacity: 0.4; }
//           100% { opacity: 0.7; }
//         }
        
//         @media (max-width: 900px) {
//           .content-area {
//             grid-template-columns: 1fr !important;
//           }
          
//           .hero-section {
//             height: 400px !important;
//             padding-bottom: 40px !important;
//           }
          
//           .hero-title {
//             font-size: 2.2rem !important;
//           }
          
//           .article-container {
//             margin-top: -40px !important;
//             padding: 30px !important;
//           }
//         }
        
//         @media (max-width: 600px) {
//           .hero-title {
//             font-size: 1.8rem !important;
//           }
          
//           .blog-content h2 {
//             font-size: 1.5rem !important;
//           }
          
//           .blog-content h3 {
//             font-size: 1.3rem !important;
//           }
          
//           .hero-meta {
//             flex-direction: column;
//             gap: 10px !important;
//             align-items: flex-start;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import axios from "axios"
import {
  Calendar,
  ArrowLeft,
  Clock,
  TrendingUp,
  Folder,
  Share2,
  BookOpen,
  User,
  Eye,
  Heart,
  Bookmark,
} from "lucide-react"

export default function BlogPostPage({ params }) {
  const { slug } = use(params)
  const [allPosts, setAllPosts] = useState([])
  const [post, setPost] = useState(null)
  const [trendingPosts, setTrendingPosts] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [categories, setCategories] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [readingTime, setReadingTime] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("trending")

  // Simulated comments data
  useEffect(() => {
    if (post) {
      setComments([
        {
          id: 1,
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40&text=AJ",
          date: "2 days ago",
          comment:
            "This article provided valuable insights. I particularly appreciated the section about modern UI design patterns.",
        },
        {
          id: 2,
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40&text=SW",
          date: "1 day ago",
          comment:
            "The examples were very practical. I implemented some of these techniques in my current project with great success!",
        },
      ])
    }
  }, [post])

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const res = await axios.get("https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=9&status=2", {
          headers: {
            Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
          },
        })
        const rawPosts = res.data?.data || []
        const categoryIds = [...new Set(rawPosts.map((post) => post.category_id))]
        const categoryMap = {}
        await Promise.all(
          categoryIds.map(async (id) => {
            const categoryRes = await axios.get(
              `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${id}`,
              {
                headers: {
                  Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
                },
              },
            )
            categoryMap[id] = categoryRes.data?.data?.name || "Uncategorized"
          }),
        )
        const postsWithCategories = rawPosts.map((post) => ({
          ...post,
          categoryName: categoryMap[post.category_id] || "Uncategorized",
        }))
        const currentPost = postsWithCategories.find((p) => p.slug === slug)

        // Calculate reading time
        if (currentPost?.content) {
          const wordsPerMinute = 200
          const textLength = currentPost.content.split(/\s+/).length
          setReadingTime(Math.ceil(textLength / wordsPerMinute))
        }

        setPost(currentPost)
        setAllPosts(postsWithCategories)
        const trending = postsWithCategories.filter((p) => p.is_trending == 1)
        setTrendingPosts(trending.slice(0, 5))
        const recent = [...postsWithCategories].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
        setRecentPosts(recent)
        const categoryCount = postsWithCategories.reduce((acc, post) => {
          const name = post.categoryName
          acc[name] = (acc[name] || 0) + 1
          return acc
        }, {})
        setCategories(categoryCount)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [slug])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim() === "") return

    const newCommentObj = {
      id: comments.length + 1,
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40&text=You",
      date: "Just now",
      comment: newComment,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  if (isLoading) {
    return (
      <div className="blog-detail-enhanced-loading-container">
        <div className="blog-detail-enhanced-loading-content">
          <div className="blog-detail-enhanced-loading-spinner"></div>
          <div className="blog-detail-enhanced-loading-text">
            <h3>Loading article...</h3>
            <p>Please wait while we fetch the content</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="blog-detail-enhanced-error-container">
        <div className="blog-detail-enhanced-error-content">
          <div className="blog-detail-enhanced-error-icon">📄</div>
          <h1 className="blog-detail-enhanced-error-title">Article Not Found</h1>
          <p className="blog-detail-enhanced-error-text">
            The blog post you're looking for doesn't exist or may have been removed.
          </p>
          <Link href="/blog" className="blog-detail-enhanced-back-button">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-detail-enhanced-page">
      {/* Hero Section */}
      <div className="blog-detail-enhanced-hero">
        <div className="blog-detail-enhanced-hero-background">
          <Image
            src={post.image || "/placeholder.svg?height=600&width=1200&text=Blog+Hero"}
            alt={post.title}
            fill
            className="blog-detail-enhanced-hero-image"
          />
          <div className="blog-detail-enhanced-hero-overlay"></div>
        </div>

        <div className="blog-detail-enhanced-hero-content">
          <div className="blog-detail-enhanced-breadcrumb">
            <Link href="/blog" className="blog-detail-enhanced-breadcrumb-link">
              Blog
            </Link>
            <span className="blog-detail-enhanced-breadcrumb-separator">→</span>
            <span className="blog-detail-enhanced-breadcrumb-current">{post.categoryName}</span>
          </div>

          <div className="blog-detail-enhanced-category-badge">
            <Folder size={16} />
            <span>{post.categoryName}</span>
          </div>

          <h1 className="blog-detail-enhanced-hero-title">{post.title}</h1>

          <div className="blog-detail-enhanced-hero-meta">
            <div className="blog-detail-enhanced-meta-item">
              <User size={18} />
              <span>John Doe</span>
            </div>
            <div className="blog-detail-enhanced-meta-item">
              <Calendar size={18} />
              <span>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="blog-detail-enhanced-meta-item">
              <Clock size={18} />
              <span>{readingTime} min read</span>
            </div>
            <div className="blog-detail-enhanced-meta-item">
              <Eye size={18} />
              <span>1.2k views</span>
            </div>
          </div>

          <div className="blog-detail-enhanced-hero-actions">
            <button className="blog-detail-enhanced-action-btn blog-detail-enhanced-like-btn">
              <Heart size={18} />
              <span>24</span>
            </button>
            <button className="blog-detail-enhanced-action-btn blog-detail-enhanced-bookmark-btn">
              <Bookmark size={18} />
            </button>
            <button className="blog-detail-enhanced-action-btn blog-detail-enhanced-share-btn">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="blog-detail-enhanced-container">
        <div className="blog-detail-enhanced-layout">
          {/* Main Content */}
          <div className="blog-detail-enhanced-main">
            <div className="blog-detail-enhanced-article">
              <Link href="/blog" className="blog-detail-enhanced-back-link">
                <ArrowLeft size={20} />
                Back to Blog
              </Link>

              {/* Article Content */}
              <div className="blog-detail-enhanced-content">
                <div className="blog-detail-enhanced-article-body" dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="blog-detail-enhanced-tags-section">
                <h4 className="blog-detail-enhanced-tags-title">Tags:</h4>
                <div className="blog-detail-enhanced-tags">
                  <span className="blog-detail-enhanced-tag">Web Design</span>
                  <span className="blog-detail-enhanced-tag">UI/UX</span>
                  <span className="blog-detail-enhanced-tag">Development</span>
                </div>
              </div>

              {/* Share Section */}
              <div className="blog-detail-enhanced-share-section">
                <div className="blog-detail-enhanced-share-header">
                  <h4>Share this article:</h4>
                  <p>Help others discover this content</p>
                </div>
                <div className="blog-detail-enhanced-share-buttons">
                  <button className="blog-detail-enhanced-share-button blog-detail-enhanced-twitter">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span>Twitter</span>
                  </button>
                  <button className="blog-detail-enhanced-share-button blog-detail-enhanced-facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                  <button className="blog-detail-enhanced-share-button blog-detail-enhanced-linkedin">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                  <button className="blog-detail-enhanced-share-button blog-detail-enhanced-copy">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>


            </div>
          </div>

          {/* Sidebar */}
          <div className="blog-detail-enhanced-sidebar">
            {/* Table of Contents */}
            {/* <div className="blog-detail-enhanced-sidebar-card">
              <div className="blog-detail-enhanced-card-header">
                <BookOpen size={20} />
                <h3>Table of Contents</h3>
              </div>
              <div className="blog-detail-enhanced-toc">
                <a href="#introduction" className="blog-detail-enhanced-toc-item">
                  Introduction
                </a>
                <a href="#getting-started" className="blog-detail-enhanced-toc-item">
                  Getting Started
                </a>
                <a href="#best-practices" className="blog-detail-enhanced-toc-item">
                  Best Practices
                </a>
                <a href="#conclusion" className="blog-detail-enhanced-toc-item">
                  Conclusion
                </a>
              </div>
            </div> */}

            {/* Trending/Recent Posts */}
            <div className="blog-detail-enhanced-sidebar-card">
              <div className="blog-detail-enhanced-tabs">
                <button
                  onClick={() => setActiveTab("trending")}
                  className={`blog-detail-enhanced-tab ${
                    activeTab === "trending" ? "blog-detail-enhanced-tab-active" : ""
                  }`}
                >
                  <TrendingUp size={18} />
                  Trending
                </button>
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`blog-detail-enhanced-tab ${
                    activeTab === "recent" ? "blog-detail-enhanced-tab-active" : ""
                  }`}
                >
                  <Clock size={18} />
                  Recent
                </button>
              </div>

              <div className="blog-detail-enhanced-posts-list">
                {activeTab === "trending"
                  ? trendingPosts.map((p, i) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-detail-enhanced-post-item">
                        <div className="blog-detail-enhanced-post-image">
                          <Image
                            src={p.image || "/placeholder.svg?height=60&width=60&text=Post"}
                            alt={p.title}
                            width={60}
                            height={60}
                            className="blog-detail-enhanced-post-thumbnail"
                          />
                          <div className="blog-detail-enhanced-trending-badge">{i + 1}</div>
                        </div>
                        <div className="blog-detail-enhanced-post-info">
                          <h4 className="blog-detail-enhanced-post-title">
                            {p.title.split(" ").slice(0, 6).join(" ")}...
                          </h4>
                          <div className="blog-detail-enhanced-post-meta">
                            <Calendar size={14} />
                            <span>
                              {new Date(p.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  : recentPosts.map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-detail-enhanced-post-item">
                        <div className="blog-detail-enhanced-post-image">
                          <Image
                            src={p.image || "/placeholder.svg?height=60&width=60&text=Post"}
                            alt={p.title}
                            width={60}
                            height={60}
                            className="blog-detail-enhanced-post-thumbnail"
                          />
                        </div>
                        <div className="blog-detail-enhanced-post-info">
                          <h4 className="blog-detail-enhanced-post-title">
                            {p.title.split(" ").slice(0, 6).join(" ")}...
                          </h4>
                          <div className="blog-detail-enhanced-post-meta">
                            <Calendar size={14} />
                            <span>
                              {new Date(p.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </div>

            {/* Categories */}
            <div className="blog-detail-enhanced-sidebar-card">
              <div className="blog-detail-enhanced-card-header">
                <Folder size={20} />
                <h3>Categories</h3>
              </div>
              <div className="blog-detail-enhanced-categories">
                {Object.entries(categories).map(([name, count]) => (
                  <Link key={name} href="/" className="blog-detail-enhanced-category-item">
                    <span className="blog-detail-enhanced-category-name">{name}</span>
                    <span className="blog-detail-enhanced-category-count">{count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="blog-detail-enhanced-sidebar-card blog-detail-enhanced-newsletter">
              <div className="blog-detail-enhanced-newsletter-content">
                <div className="blog-detail-enhanced-newsletter-icon">📧</div>
                <h3>Stay Updated</h3>
                <p>Get the latest articles and insights delivered to your inbox.</p>
                <form className="blog-detail-enhanced-newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="blog-detail-enhanced-newsletter-input"
                  />
                  <button type="submit" className="blog-detail-enhanced-newsletter-button">
                    Subscribe
                  </button>
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

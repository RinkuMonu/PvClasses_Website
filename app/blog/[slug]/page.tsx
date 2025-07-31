
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Calendar,
//   User,
//   Tag,
//   ArrowLeft,
//   Share2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   TrendingUp,
//   Clock,
//   Folder,
// } from "lucide-react"
// import axios from "axios"
// import { useState } from "react"


// export async function generateStaticParams() {
//   const res = await axios.get("https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=2&status=2", {
//     headers: {
//       Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//     }
//   })

//   return res.data.data.map((post: any) => ({
//     slug: post.slug,
//   }))
// }


// export const fetchCategoryById = async (categoryId) => {
//   if (!categoryId) return null;

//   try {
//     const res = await axios.get(
//       `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${categoryId}`,
//       {
//         headers: {
//           Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//         },
//       }
//     );
//     return res.data?.data;
//   } catch (err) {
//     console.error("Failed to fetch category:", err);
//     return null;
//   }
// };

// export default async function BlogPostPage({ params }: { params: { slug: string } }) {
//   const res = await axios.get(
//     `https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=2&status=2`,
//     {
//       headers: {
//         Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
//       },
//     }
//   );

//   const rawPosts = res.data?.data || [];

//   const categoryIds = [...new Set(rawPosts.map((post: any) => post.category_id))];

//   const categoryMap = {};
//   await Promise.all(
//     categoryIds.map(async (id) => {
//       const category = await fetchCategoryById(id);
//       if (category) categoryMap[id] = category.name;
//     })
//   );

//   const allPosts = rawPosts.map((post: any) => ({
//     ...post,
//     categoryName: categoryMap[post.category_id] || "Uncategorized",
//   }));


//   const trendingPosts = allPosts.filter((post: any) => post?.is_trending == 1);


//   const recentPosts = allPosts
//     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
//     .slice(0, 5);

//   const post = allPosts.find((p: any) => p.slug === params.slug);

//   if (!post) {
//     return (
//       <div className="p-10 text-center">
//         <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
//         <p>This blog post does not exist or may have been removed.</p>
//       </div>
//     );
//   }
//   const categories = allPosts.reduce((acc, post) => {
//     const name = post.categoryName || "Uncategorized";
//     acc[name] = (acc[name] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   return (

//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       {/* Hero */}
//       <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
//         <Image src={post?.image || "/placeholder.svg"} alt={post?.title || 'logo'} fill className="object-cover" priority />
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="absolute inset-0 flex items-center">
//           <div className="container mx-auto px-4">
//             <div className="max-w-3xl mx-auto text-center text-white">
//               <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
//               <div className="flex flex-wrap justify-center gap-4 text-sm">
//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   {new Date(post?.created_at).toLocaleDateString()}
//                 </div>
//                 <div className="flex items-center">
//                   <User className="h-4 w-4 mr-1" />
//                   Admin
//                 </div>
//                 <div className="flex items-center">
//                   <Tag className="h-4 w-4 mr-1" />
//                   {post?.categoryName}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 py-12 ">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 bg-white p-5 shadow-sm rounded-lg" style={{ height: "max-content" }}>
//             <Link
//               href="/blog"
//               className="inline-flex items-center text-[#ab6545] dark:text-[#e8ab8f] mb-8 hover:underline"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Blog
//             </Link>

//             <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
//               <div dangerouslySetInnerHTML={{ __html: post?.content }} />
//             </article>

//             {/* Tags */}
//             {/* <div className="flex flex-wrap gap-2 mb-12">
//               {post?.tags?.map((tag) => (
//                 <Link
//                   key={tag}
//                   href={`/blog?tag=${encodeURIComponent(tag)}`}
//                   className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
//                 >
//                   #{tag}
//                 </Link>
//               ))}
//             </div> */}

//             {/* Share */}
//             <div className="border-t border-b py-6">
//               <div className="flex justify-between items-center flex-wrap gap-4">
//                 <div className="font-medium">Share this article</div>
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="icon" className="rounded-full">
//                     <Facebook className="h-4 w-4" />
//                     <span className="sr-only">Facebook</span>
//                   </Button>
//                   <Button variant="outline" size="icon" className="rounded-full">
//                     <Twitter className="h-4 w-4" />
//                     <span className="sr-only">Twitter</span>
//                   </Button>
//                   <Button variant="outline" size="icon" className="rounded-full">
//                     <Linkedin className="h-4 w-4" />
//                     <span className="sr-only">LinkedIn</span>
//                   </Button>
//                   <Button variant="outline" size="icon" className="rounded-full">
//                     <Share2 className="h-4 w-4" />
//                     <span className="sr-only">Copy Link</span>
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             {/* Author Bio */}
//             {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
//               <div className="flex items-center gap-4">
//                 <Image
//                   src={post.authorImage || "/placeholder.svg"}
//                   alt={post.author || 'logo'}
//                   width={64}
//                   height={64}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <h3 className="text-xl font-bold">{post.author}</h3>
//                   <p className="text-gray-600 dark:text-gray-400">{post.authorBio}</p>
//                 </div>
//               </div>
//             </div> */}

//             {/* Related Posts */}
//             <div>
//               <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {
//                   allPosts?.filter((p) => p.slug !== post.slug && p.category_id === post.category_id).slice(0, 2)
//                     .map((relatedPost) => (
//                       <div
//                         key={relatedPost.slug}
//                         className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
//                       >
//                         <div className="h-48 relative">
//                           <Image
//                             src={relatedPost.image || "/placeholder.svg"}
//                             alt={relatedPost.title}
//                             fill
//                             className="object-cover transition-transform duration-500 group-hover:scale-110"
//                           />
//                         </div>
//                         <div className="p-4">
//                           <Badge variant="secondary" className="mb-2">
//                             {relatedPost?.categoryName}
//                           </Badge>
//                           <h3 className="font-bold mb-2 line-clamp-2">{relatedPost.title}</h3>
//                           <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center">
//                             <Calendar className="h-3 w-3 mr-1" />
//                             {new Date(relatedPost?.created_at).toLocaleDateString()}
//                           </p>
//                           <Link
//                             href={`/blog/${relatedPost.slug}`}
//                             className="text-[#ab6545] dark:text-[#e8ab8f] text-sm hover:underline"
//                           >
//                             Read more
//                           </Link>
//                         </div>
//                       </div>
//                     ))
//                 }
//                 {allPosts?.filter((p) => p.slug !== post.slug && p.category_id === post.category_id).length === 0 && (
//                   <div className="text-center col-span-1 md:col-span-2 text-gray-500 dark:text-gray-400">
//                     No related articles found.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 space-y-8">
//             {/* Trending Posts */}
//             <Card className="shadow-sm border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="h-5 w-5 text-orange-500" />
//                   Trending Posts
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {trendingPosts?.length > 0 ?
//                   trendingPosts.slice(0, 5).map((trendingPost, index) => (
//                     <div key={trendingPost.slug} className="flex gap-3">
//                       <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden">
//                         <Image
//                           src={trendingPost.image || "/placeholder.svg"}
//                           alt={trendingPost.title}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
//                             #{index + 1}
//                           </span>
//                           <Badge variant="outline" className="text-xs">
//                             {trendingPost?.categoryName}
//                           </Badge>
//                         </div>
//                         <Link
//                           href={`/blog/${trendingPost.slug}`}
//                           className="text-sm font-medium line-clamp-2 hover:text-[#ab6545] dark:hover:text-[#e8ab8f] transition-colors"
//                         >
//                           {trendingPost?.title.split(" ").slice(0, 5).join(" ")}...
//                         </Link>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
//                           <Calendar className="h-3 w-3 mr-1" />
//                           {new Date(trendingPost?.created_at).toLocaleDateString()}
//                         </p>
//                         {/* <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                           {trendingPost?.views?.toLocaleString()} views
//                         </p> */}
//                       </div>
//                     </div>
//                   )) :
//                   <div className="text-center text-gray-500">Trending blog not found</div>
//                 }
//               </CardContent>
//             </Card>

//             {/* Recent Posts */}
//             <Card className="shadow-sm border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Clock className="h-5 w-5 text-blue-500" />
//                   Recent Posts
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {recentPosts.slice(0, 5).map((recentPost) => (
//                   <div key={recentPost.slug} className="flex gap-3">
//                     <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden">
//                       <Image
//                         src={recentPost.image || "/placeholder.svg"}
//                         alt={recentPost.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <Badge variant="outline" className="text-xs mb-1">
//                         {recentPost?.categoryName}
//                       </Badge>
//                       <Link
//                         href={`/blog/${recentPost?.slug}`}
//                         className="text-sm font-medium line-clamp-2 hover:text-[#ab6545] dark:hover:text-[#e8ab8f] transition-colors block"
//                       >
//                         {recentPost?.title.split(" ").slice(0, 5).join(" ")}...
//                       </Link>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
//                         <Calendar className="h-3 w-3 mr-1" />
//                         {new Date(recentPost?.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Categories */}
//             <Card className="shadow-sm border-0">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Folder className="h-5 w-5 text-green-500" />
//                   Categories
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {Object.entries(categories)
//                     .sort(([, a], [, b]) => b - a)
//                     .map(([category, count]) => (
//                       <Link
//                         key={category}
//                         href={`/blog`}
//                         className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
//                       >
//                         <span className="text-sm font-medium group-hover:text-[#ab6545] dark:group-hover:text-[#e8ab8f] transition-colors">
//                           {category}
//                         </span>
//                         <Badge variant="secondary" className="text-xs">
//                           {count}
//                         </Badge>
//                       </Link>
//                     ))}
//                 </div>
//               </CardContent>

//             </Card>

//             {/* Newsletter Signup */}
//             {/* <Card className="bg-gradient-to-br from-[#ab6545] to-[#8b5a3c] text-white">
//               <CardHeader>
//                 <CardTitle className="text-white">Stay Updated</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-white/90 mb-4">
//                   Subscribe to our newsletter and never miss our latest articles and insights.
//                 </p>
//                 <div className="space-y-3">
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm"
//                   />
//                   <Button className="w-full bg-white text-[#ab6545] hover:bg-gray-100">Subscribe</Button>
//                 </div>
//               </CardContent>
//             </Card> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { Calendar, ArrowLeft } from "lucide-react";

export default function BlogPostPage({ params }) {
  const { slug } = use(params);

  const [allPosts, setAllPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://cms.sevenunique.com/apis/blogs/get-blogs.php?website_id=9&status=2",
          {
            headers: {
              Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
            },
          }
        );

        const rawPosts = res.data?.data || [];
        const categoryIds = [
          ...new Set(rawPosts.map((post) => post.category_id)),
        ];

        const categoryMap = {};
        await Promise.all(
          categoryIds.map(async (id) => {
            const categoryRes = await axios.get(
              `https://cms.sevenunique.com/apis/category/get_category_by_id.php?category_id=${id}`,
              {
                headers: {
                  Authorization: "Bearer jibhfiugh84t3324fefei#*fef",
                },
              }
            );
            categoryMap[id] =
              categoryRes.data?.data?.name || "Uncategorized";
          })
        );

        const postsWithCategories = rawPosts.map((post) => ({
          ...post,
          categoryName: categoryMap[post.category_id] || "Uncategorized",
        }));

        const currentPost = postsWithCategories.find((p) => p.slug === slug);
        setPost(currentPost);
        setAllPosts(postsWithCategories);

        const trending = postsWithCategories.filter((p) => p.is_trending == 1);
        setTrendingPosts(trending.slice(0, 5));

        const recent = [...postsWithCategories]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentPosts(recent);

        const categoryCount = postsWithCategories.reduce((acc, post) => {
          const name = post.categoryName;
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});
        setCategories(categoryCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [slug]);

  if (!post)
    return (
      <div className="text-center py-20 bg-[#f8faff] min-h-screen">
        Blog Not Found
      </div>
    );

  return (
    <div className="contact-page">
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${post.image || "/placeholder.svg"})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{post.title}</h1>
          <div className="hero-meta">
            <Calendar size={16} />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="content-area">
          <div className="main-content">
            <Link
              href="/blog"
              className="back-link inline-flex items-center gap-1 mb-6 text-[#ab6545] hover:text-[#8a4f32] transition-colors"
            >
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <div
              className="blog-content bg-white p-6 rounded-lg shadow-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <aside className="sidebar">
            <div className="sidebar-section bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">
                Trending Posts
              </h3>
              <div className="space-y-3">
                {trendingPosts.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="sidebar-link block p-2 hover:bg-[#f8faff] rounded transition-colors"
                  >
                    <span className="font-medium text-[#ab6545] mr-2">
                      #{i + 1}
                    </span>
                    {p.title.split(" ").slice(0, 5).join(" ")}...
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-section bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">
                Recent Posts
              </h3>
              <div className="space-y-3">
                {recentPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="sidebar-link block p-2 hover:bg-[#f8faff] rounded transition-colors"
                  >
                    {p.title.split(" ").slice(0, 5).join(" ")}...
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-section bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">
                Categories
              </h3>
              <div className="space-y-2">
                {Object.entries(categories).map(([name, count]) => (
                  <div
                    key={name}
                    className="category-item flex justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700">{name}</span>
                    <span className="bg-[#f0f4ff] text-[#5a7cff] rounded-full px-2.5 py-0.5 text-sm">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          font-family: "Inter", "Segoe UI", sans-serif;
          background-color: #f8faff;
          color: #333;
          min-height: 100vh;
        }

        .hero-section {
          position: relative;
          height: 60vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(112, 102, 255, 0.2) 0%,
            rgba(51, 75, 255, 0.7) 100%
          );
        }

        .hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #fff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .hero-meta {
          margin-top: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .container {
          padding: 50px 20px;
          max-width: 1200px;
          margin: auto;
        }

        .content-area {
          display: flex;
          flex-direction: row;
          gap: 30px;
        }

        .main-content {
          flex: 2;
        }

        .blog-content {
          margin-top: 10px;
          line-height: 1.7;
          font-size: 1.05rem;
          padding: 20px;
        }

        .blog-content :global(p) {
          margin-bottom: 1.2em;
        }

        .blog-content :global(h2) {
          font-size: 1.8rem;
          font-weight: 700;
          margin-top: 1.8em;
          margin-bottom: 0.8em;
          color: #2d3748;
        }

        .blog-content :global(h3) {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.6em;
          margin-bottom: 0.7em;
          color: #2d3748;
        }

        .blog-content :global(a) {
          color: #ab6545;
          text-decoration: underline;
        }

        .blog-content :global(ul),
        .blog-content :global(ol) {
          margin-left: 1.5em;
          margin-bottom: 1.5em;
        }

        .blog-content :global(li) {
          margin-bottom: 0.5em;
        }

        .sidebar {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 350px;
        }

        .sidebar-section {
          transition: transform 0.2s ease;
        }

        .sidebar-section:hover {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .content-area {
            flex-direction: column;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .hero-section {
            height: 50vh;
          }

          .container {
            padding: 30px 15px;
          }

          .sidebar {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-meta {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
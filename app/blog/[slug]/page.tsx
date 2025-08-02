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
  User,
  Eye,
  Heart,
  Bookmark,
  ChevronRight,
} from "lucide-react"
import "@/app/styles/blog-post.css"

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
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

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
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">
            <h3>Loading article...</h3>
            <p>Please wait while we fetch the content</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">📄</div>
          <h1 className="error-title">Article Not Found</h1>
          <p className="error-text">The blog post you're looking for doesn't exist or may have been removed.</p>
          <Link href="/blog" className="back-button">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background">
          <Image
            src={post.image || "/placeholder.svg?height=600&width=1200&text=Blog+Hero"}
            alt={post.title}
            fill
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-inner">
              {/* Breadcrumb */}
              <div className="breadcrumb">
                <Link href="/blog" className="breadcrumb-link">
                  Blog
                </Link>
                <ChevronRight size={16} />
                <span>{post.categoryName}</span>
              </div>

              {/* Category Badge */}
              <div className="category-badge">
                <Folder size={16} />
                <span>{post.categoryName}</span>
              </div>

              {/* Title */}
              <h1 className="hero-title">{post.title}</h1>

              {/* Meta Information */}
              <div className="hero-meta">
                <div className="meta-item">
                  <User size={18} />
                  <span>John Doe</span>
                </div>
                <div className="meta-item">
                  <Calendar size={18} />
                  <span>
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="meta-item">
                  <Clock size={18} />
                  <span>{readingTime} min read</span>
                </div>
                <div className="meta-item">
                  <Eye size={18} />
                  <span>1.2k views</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hero-actions">
                <button onClick={() => setIsLiked(!isLiked)} className={`action-button ${isLiked ? "liked" : ""}`}>
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  <span>24</span>
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`action-button ${isBookmarked ? "bookmarked" : ""}`}
                >
                  <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <button className="action-button">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        <div className="content-grid">
          {/* Article Content */}
          <div className="article-column">
            <div className="article-card">
              <div className="article-content">
                <Link href="/blog" className="back-link">
                  <ArrowLeft size={20} />
                  Back to Blog
                </Link>

                {/* Article Body */}
                <div className="article-body">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Tags */}
                <div className="tags-section">
                  <h4 className="tags-title">Tags:</h4>
                  <div className="tags-container">
                    {["Web Design", "UI/UX", "Development"].map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Section */}
                {/* <div className="share-section">
                  <div className="share-header">
                    <h4>Share this article</h4>
                    <p>Help others discover this content</p>
                  </div>
                  <div className="share-buttons">
                    <button className="share-button twitter">
                      <span>𝕏</span>
                      <span>Twitter</span>
                    </button>
                    <button className="share-button facebook">
                      <span>f</span>
                      <span>Facebook</span>
                    </button>
                    <button className="share-button linkedin">
                      <span>in</span>
                      <span>LinkedIn</span>
                    </button>
                    <button className="share-button copy">
                      <span>🔗</span>
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div> */}

                {/* Comments Section */}
                <div className="comments-section">
                  <h4 className="comments-title">Comments ({comments.length})</h4>

                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="comment-textarea"
                      rows={4}
                    />
                    <button type="submit" className="comment-submit">
                      Post Comment
                    </button>
                  </form>

                  {/* Comments List */}
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <Image
                          src={comment.avatar || "/placeholder.svg"}
                          alt={comment.name}
                          width={40}
                          height={40}
                          className="comment-avatar"
                        />
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-name">{comment.name}</span>
                            <span className="comment-date">{comment.date}</span>
                          </div>
                          <p className="comment-text">{comment.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Trending/Recent Posts */}
            <div className="sidebar-card">
              <div className="tab-container">
                <div className="tab-buttons">
                  <button
                    onClick={() => setActiveTab("trending")}
                    className={`tab-button ${activeTab === "trending" ? "active" : ""}`}
                  >
                    <TrendingUp size={18} />
                    Trending
                  </button>
                  <button
                    onClick={() => setActiveTab("recent")}
                    className={`tab-button ${activeTab === "recent" ? "active" : ""}`}
                  >
                    <Clock size={18} />
                    Recent
                  </button>
                </div>

                <div className="posts-list">
                  {(activeTab === "trending" ? trendingPosts : recentPosts).map((p, i) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="post-item">
                      <div className="post-image-container">
                        <Image
                          src={p.image || "/placeholder.svg?height=60&width=60&text=Post"}
                          alt={p.title}
                          width={60}
                          height={60}
                          className="post-image"
                        />
                        {activeTab === "trending" && <div className="trending-badge">{i + 1}</div>}
                      </div>
                      <div className="post-info">
                        <h4 className="post-title">{p.title.split(" ").slice(0, 8).join(" ")}...</h4>
                        <div className="post-meta">
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
            </div>

            {/* Categories */}
            <div className="sidebar-card">
              <div className="card-header">
                <Folder size={20} className="header-icon" />
                <h3>Categories</h3>
              </div>
              <div className="categories-list">
                {Object.entries(categories).map(([name, count]) => (
                  <p key={name}  className="category-item">
                    <span className="category-name">{name}</span>
                    <span className="category-count">{count}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="newsletter-card">
              <div className="newsletter-content">
                <div className="newsletter-icon">📧</div>
                <h3>Stay Updated</h3>
                <p>Get the latest articles and insights delivered to your inbox.</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Enter your email" className="newsletter-input" />
                  <button type="submit" className="newsletter-button">
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

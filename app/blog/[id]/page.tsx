"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { useParams } from "next/navigation"
import {
    LuCalendar,
    LuClock,
    LuTag,
    LuArrowLeft,
    LuShare2,
    LuBookmark,
    LuHeart,
    LuMessageCircle,
    LuUser,
    LuChevronRight,
    LuFacebook,
    LuTwitter,
    LuLinkedin,
    LuLink,
    LuEye,
    LuThumbsUp,
} from "react-icons/lu"
import "@/app/styles/blog-details-styles.css"

// Mock blog data (in real app, this would come from API/database)
const blogPost = {
    id: 1,
    title: "The Future of Online Learning: Trends and Innovations",
    content: `
    <p>The landscape of education has undergone a dramatic transformation in recent years, with online learning emerging as a dominant force in how we acquire knowledge and skills. As we look toward the future, several key trends and innovations are shaping the next generation of digital education.</p>

    <h2>The Rise of Personalized Learning</h2>
    <p>One of the most significant developments in online education is the shift toward personalized learning experiences. Advanced algorithms and artificial intelligence are now capable of analyzing individual learning patterns, preferences, and progress to create customized educational pathways.</p>

    <p>This personalization extends beyond simple content recommendations. Modern learning platforms can adjust the pace of instruction, modify the presentation format, and even change the difficulty level of assessments based on real-time performance data.</p>

    <h2>Immersive Technologies in Education</h2>
    <p>Virtual Reality (VR) and Augmented Reality (AR) are revolutionizing how we experience educational content. These technologies allow students to:</p>

    <ul>
      <li>Take virtual field trips to historical sites and museums</li>
      <li>Conduct complex scientific experiments in safe, simulated environments</li>
      <li>Practice medical procedures without risk to patients</li>
      <li>Explore three-dimensional models of molecular structures or architectural designs</li>
    </ul>

    <h2>Microlearning and Bite-Sized Content</h2>
    <p>The modern learner's attention span and busy lifestyle have given rise to microlearning – the practice of delivering educational content in small, focused chunks. This approach offers several advantages:</p>

    <blockquote>
      "Microlearning increases retention rates by up to 80% compared to traditional long-form educational content, making it an essential component of modern educational design."
    </blockquote>

    <p>Short video lessons, interactive quizzes, and gamified learning modules are becoming the norm, allowing learners to fit education into their daily routines more easily.</p>

    <h2>The Social Learning Revolution</h2>
    <p>Online learning is no longer a solitary experience. Social learning platforms are incorporating collaborative features that mirror the social aspects of traditional classroom learning:</p>

    <p>Discussion forums, peer review systems, and group projects are being enhanced with real-time collaboration tools, making online education more engaging and interactive than ever before.</p>

    <h2>Looking Ahead</h2>
    <p>As we continue to advance into the digital age, the future of online learning looks incredibly promising. The integration of emerging technologies, combined with a deeper understanding of how people learn, is creating educational experiences that are more effective, accessible, and engaging than traditional methods.</p>

    <p>The key to success in this evolving landscape will be the ability to adapt and embrace these new technologies while maintaining the human element that makes education truly transformative.</p>
  `,
    author: "Dr. Sarah Johnson",
    authorBio:
        "Dr. Sarah Johnson is a leading expert in educational technology with over 15 years of experience in digital learning innovation. She holds a Ph.D. in Educational Psychology and has published numerous papers on online learning effectiveness.",
    authorImage: "/images/author-12.jpg",
    authorRole: "Professor of Educational Technology",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    tags: ["EdTech", "Innovation", "Future", "Online Learning", "AI"],
    image: "/images/6blog.webp",
    views: 2847,
    likes: 156,
    bookmarks: 89,
    shares: 34,
}

const relatedPosts = [
    {
        id: 2,
        title: "Effective Study Techniques for Remote Learning",
        excerpt: "Discover proven strategies to maximize your learning potential in a remote environment.",
        author: "Prof. Michael Chen",
        date: "2024-01-12",
        readTime: "6 min read",
        category: "Study Tips",
        image: "/images/2blog.webp",
    },
    {
        id: 3,
        title: "Building a Career in Data Science: A Complete Guide",
        excerpt: "Everything you need to know about starting and advancing your career in data science.",
        author: "Dr. Emily Rodriguez",
        date: "2024-01-10",
        readTime: "12 min read",
        category: "Career",
        image: "/images/3blog.webp",
    },
    {
        id: 4,
        title: "The Psychology of Learning: How Memory Works",
        excerpt: "Understanding the science behind how we learn and remember information.",
        author: "Dr. James Wilson",
        date: "2024-01-08",
        readTime: "10 min read",
        category: "Psychology",
        image: "/images/4blog.webp",
    },
]

const comments = [
    {
        id: 1,
        author: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-16",
        content:
            "This is an excellent overview of the current trends in online learning. I particularly found the section on personalized learning fascinating. As someone working in EdTech, I can confirm that AI-driven personalization is indeed the future.",
        likes: 12,
        replies: [
            {
                id: 11,
                author: "Dr. Sarah Johnson",
                avatar: "/placeholder.svg?height=40&width=40",
                date: "2024-01-16",
                content:
                    "Thank you, Alex! I'm glad you found it valuable. The personalization aspect is indeed where we're seeing the most exciting developments.",
                likes: 5,
                isAuthor: true,
            },
        ],
    },
    {
        id: 2,
        author: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-16",
        content:
            "The microlearning section really resonated with me. As a busy professional, I find it much easier to consume educational content in smaller chunks. Great article!",
        likes: 8,
        replies: [],
    },
    {
        id: 3,
        author: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2024-01-17",
        content:
            "VR and AR in education are game-changers. I've seen some amazing implementations in medical training. The future is definitely exciting!",
        likes: 15,
        replies: [],
    },
]

export default function BlogDetailsPage() {
    const params = useParams()
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [showShareMenu, setShowShareMenu] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [showCommentForm, setShowCommentForm] = useState(false)

    const handleShare = (platform: string) => {
        const url = window.location.href
        const title = blogPost.title

        switch (platform) {
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
                break
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, "_blank")
                break
            case "linkedin":
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
                break
            case "copy":
                navigator.clipboard.writeText(url)
                // You could show a toast notification here
                break
        }
        setShowShareMenu(false)
    }

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newComment.trim()) {
            // In a real app, you would submit this to your API
            console.log("New comment:", newComment)
            setNewComment("")
            setShowCommentForm(false)
        }
    }

    return (
        <div className="blog-details-wrapper">
            {/* Background Elements */}
            <div className="details-background-elements">
                <div className="floating-shape details-shape-1"></div>
                <div className="floating-shape details-shape-2"></div>
            </div>

            {/* Navigation Breadcrumb */}
            <section className="breadcrumb-section">
                <div className="breadcrumb-container">
                    <Link href="/blog" className="back-to-blog-link">
                        <LuArrowLeft className="back-icon" />
                        <span>Back to Blog</span>
                    </Link>
                    <div className="breadcrumb-trail">
                        <Link href="/" className="breadcrumb-link">
                            Home
                        </Link>
                        <LuChevronRight className="breadcrumb-separator" />
                        <Link href="/blog" className="breadcrumb-link">
                            Blog
                        </Link>
                        <LuChevronRight className="breadcrumb-separator" />
                        <span className="breadcrumb-current">{blogPost.category}</span>
                    </div>
                </div>
            </section>

            {/* Article Header */}
            <section className="article-header-section">
                <div className="header-container">
                    <div className="article-category-tag">{blogPost.category}</div>
                    <h1 className="article-main-title">{blogPost.title}</h1>

                    <div className="article-meta-section">
                        <div className="author-info-detailed">
                            <img
                                src={blogPost.authorImage || "/placeholder.svg"}
                                alt={blogPost.author}
                                className="author-profile-picture"
                            />
                            <div className="author-details-text">
                                <h3 className="author-full-name">{blogPost.author}</h3>
                                <p className="author-role-title">{blogPost.authorRole}</p>
                            </div>
                        </div>

                        <div className="article-metadata">
                            <div className="meta-item-detailed">
                                <LuCalendar className="meta-icon-detailed" />
                                <span>
                                    {new Date(blogPost.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="meta-item-detailed">
                                <LuClock className="meta-icon-detailed" />
                                <span>{blogPost.readTime}</span>
                            </div>
                            <div className="meta-item-detailed">
                                <LuEye className="meta-icon-detailed" />
                                <span>{blogPost.views.toLocaleString()} views</span>
                            </div>
                        </div>
                    </div>

                    {/* Article Actions */}
                    <div className="article-actions-bar">
                        <button className={`action-button ${isLiked ? "action-active" : ""}`} onClick={() => setIsLiked(!isLiked)}>
                            <LuHeart className="action-icon" />
                            <span>{blogPost.likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <button
                            className={`action-button ${isBookmarked ? "action-active" : ""}`}
                            onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                            <LuBookmark className="action-icon" />
                            <span>{blogPost.bookmarks + (isBookmarked ? 1 : 0)}</span>
                        </button>

                        
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="featured-image-section">
                <div className="image-container">
                    <img src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} className="featured-article-image" />
                </div>
            </section>

            {/* Main Content Area */}
            <section className="main-content-section">
                <div className="content-layout-container">
                    {/* Article Content */}
                    <article className="article-content-area">
                        <div className="article-body-content" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

                        {/* Article Tags */}
                        <div className="article-tags-section">
                            <h4 className="tags-section-title">Tags</h4>
                            <div className="tags-list-container">
                                {blogPost.tags.map((tag) => (
                                    <Link key={tag} href={`/blog?tag=${tag}`} className="article-tag-link">
                                        <LuTag className="tag-link-icon" />
                                        <span>{tag}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio Section */}
                        {/* <div className="author-bio-section">
                            <div className="author-bio-header">
                                <img
                                    src={blogPost.authorImage || "/placeholder.svg"}
                                    alt={blogPost.author}
                                    className="author-bio-image"
                                />
                                <div className="author-bio-info">
                                    <h3 className="author-bio-name">{blogPost.author}</h3>
                                    <p className="author-bio-role">{blogPost.authorRole}</p>
                                </div>
                            </div>
                            <p className="author-bio-description">{blogPost.authorBio}</p>
                            <Link
                                href={`/authors/${blogPost.author.toLowerCase().replace(" ", "-")}`}
                                className="view-author-profile"
                            >
                                View Profile
                                <LuChevronRight className="profile-arrow" />
                            </Link>
                        </div> */}
                    </article>

                    {/* Sidebar */}
                    <aside className="article-sidebar">
                        {/* Table of Contents */}
                        {/* <div className="sidebar-widget">
                            <h3 className="widget-title">Table of Contents</h3>
                            <nav className="table-of-contents">
                                <a href="#personalized-learning" className="toc-link">
                                    The Rise of Personalized Learning
                                </a>
                                <a href="#immersive-technologies" className="toc-link">
                                    Immersive Technologies in Education
                                </a>
                                <a href="#microlearning" className="toc-link">
                                    Microlearning and Bite-Sized Content
                                </a>
                                <a href="#social-learning" className="toc-link">
                                    The Social Learning Revolution
                                </a>
                                <a href="#looking-ahead" className="toc-link">
                                    Looking Ahead
                                </a>
                            </nav>
                        </div> */}

                        {/* Related Articles */}
                        <div className="sidebar-widget">
                            <h3 className="widget-title">Related Articles</h3>
                            <div className="related-articles-list">
                                {relatedPosts.slice(0, 3).map((post) => (
                                    <Link key={post.id} href={`/blog/${post.id}`} className="related-article-item">
                                        <img
                                            src={post.image || "/placeholder.svg"}
                                            alt={post.title}
                                            className="related-article-thumbnail"
                                        />
                                        <div className="related-article-content">
                                            <h4 className="related-article-title">{post.title}</h4>
                                            <div className="related-article-meta">
                                                <span className="related-meta-item">{post.readTime}</span>
                                                <span className="related-meta-separator">•</span>
                                                <span className="related-meta-item">{post.category}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        {/* <div className="sidebar-widget newsletter-widget">
                            <h3 className="widget-title">Stay Updated</h3>
                            <p className="newsletter-widget-description">Get the latest articles delivered to your inbox.</p>
                            <form className="newsletter-sidebar-form">
                                <input type="email" placeholder="Your email address" className="newsletter-sidebar-input" />
                                <button type="submit" className="newsletter-sidebar-button">
                                    Subscribe
                                </button>
                            </form>
                        </div> */}
                    </aside>
                </div>
            </section>

            {/* Comments Section */}
            <section className="comments-section">
                <div className="comments-container">
                    <div className="comments-header">
                        <h2 className="comments-title">
                            <LuMessageCircle className="comments-icon" />
                            Comments ({comments.length})
                        </h2>
                        <button className="add-comment-button" onClick={() => setShowCommentForm(!showCommentForm)}>
                            Add Comment
                        </button>
                    </div>

                    {/* Comment Form */}
                    {showCommentForm && (
                        <form className="comment-form" onSubmit={handleCommentSubmit}>
                            <div className="comment-form-header">
                                <LuUser className="comment-user-icon" />
                                <h3>Share your thoughts</h3>
                            </div>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                className="comment-textarea"
                                rows={4}
                            />
                            <div className="comment-form-actions">
                                <button type="button" onClick={() => setShowCommentForm(false)} className="comment-cancel-button">
                                    Cancel
                                </button>
                                <button type="submit" className="comment-submit-button">
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Comments List */}
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-avatar-container">
                                    <img
                                        src={comment.avatar || "/placeholder.svg"}
                                        alt={comment.author}
                                        className="comment-author-avatar"
                                    />
                                </div>
                                <div className="comment-content-container">
                                    <div className="comment-header-info">
                                        <h4 className="comment-author-name">
                                            {comment.author}
                                            {comment.author && <span className="author-badge">Author</span>}
                                        </h4>
                                        <span className="comment-date">{new Date(comment.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="comment-text">{comment.content}</p>
                                    <div className="comment-actions">
                                        <button className="comment-like-button">
                                            <LuThumbsUp className="comment-like-icon" />
                                            <span>{comment.likes}</span>
                                        </button>
                                        <button className="comment-reply-button">Reply</button>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="comment-replies">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="reply-item">
                                                    <div className="reply-avatar-container">
                                                        <img
                                                            src={reply.avatar || "/placeholder.svg"}
                                                            alt={reply.author}
                                                            className="reply-author-avatar"
                                                        />
                                                    </div>
                                                    <div className="reply-content-container">
                                                        <div className="reply-header-info">
                                                            <h5 className="reply-author-name">
                                                                {reply.author}
                                                                {reply.isAuthor && <span className="author-badge">Author</span>}
                                                            </h5>
                                                            <span className="reply-date">{new Date(reply.date).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="reply-text">{reply.content}</p>
                                                        <div className="reply-actions">
                                                            <button className="reply-like-button">
                                                                <LuThumbsUp className="reply-like-icon" />
                                                                <span>{reply.likes}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Articles Section */}
            <section className="related-articles-section">
                <div className="related-container">
                    <h2 className="related-section-title">You Might Also Like</h2>
                    <div className="related-articles-grid">
                        {relatedPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.id}`} className="related-post-card">
                                <div className="related-post-image-container">
                                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="related-post-image" />
                                    <div className="related-post-category">{post.category}</div>
                                </div>
                                <div className="related-post-content">
                                    <h3 className="related-post-title">{post.title}</h3>
                                    <p className="related-post-excerpt">{post.excerpt}</p>
                                    <div className="related-post-meta">
                                        <span className="related-post-author">{post.author}</span>
                                        <span className="related-post-separator">•</span>
                                        <span className="related-post-date">{new Date(post.date).toLocaleDateString()}</span>
                                        <span className="related-post-separator">•</span>
                                        <span className="related-post-read-time">{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

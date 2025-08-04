"use client"
import { useState } from "react"
import Link from "next/link"
import {
  LuSearch,
  LuCalendar,
  LuClock,
  LuTag,
  LuArrowRight,
  LuBookOpen,
  LuTrendingUp,
  LuChevronRight,
  LuFilter,
} from "react-icons/lu"
import "@/app/styles/blog-styles.css"
import ReadyToStart from "@/component/ReadyToStart"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Learning: Trends and Innovations",
    excerpt:
      "Explore the latest trends shaping the future of digital education and how they're transforming the learning experience.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Dr. Sarah Johnson",
    authorImage: "/images/author-12.jpg",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    tags: ["EdTech", "Innovation", "Future"],
    image: "/images/1blog.webp",
    featured: true,
  },
  {
    id: 2,
    title: "Effective Study Techniques for Remote Learning",
    excerpt: "Discover proven strategies to maximize your learning potential in a remote environment.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Prof. Michael Chen",
    authorImage: "/images/author-12.jpg",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Study Tips",
    tags: ["Remote Learning", "Productivity", "Tips"],
    image: "/images/2blog.webp",
    featured: false,
  },
  {
    id: 3,
    title: "Building a Career in Data Science: A Complete Guide",
    excerpt: "Everything you need to know about starting and advancing your career in data science.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Dr. Emily Rodriguez",
    authorImage: "/images/author-12.jpg",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Career",
    tags: ["Data Science", "Career", "Guide"],
    image: "/images/3blog.webp",
    featured: false,
  },
  {
    id: 4,
    title: "The Psychology of Learning: How Memory Works",
    excerpt: "Understanding the science behind how we learn and remember information.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Dr. James Wilson",
    authorImage: "/images/author-12.jpg",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Psychology",
    tags: ["Learning", "Memory", "Psychology"],
    image: "/images/4blog.webp",
    featured: false,
  },
  {
    id: 5,
    title: "Top Programming Languages to Learn in 2024",
    excerpt: "Stay ahead of the curve with these in-demand programming languages for the new year.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Alex Thompson",
    authorImage: "/images/author-12.jpg",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Programming",
    tags: ["Programming", "Languages", "2024"],
    image: "/images/5blog.webp",
    featured: false,
  },
  {
    id: 6,
    title: "Creating Inclusive Learning Environments",
    excerpt: "Best practices for fostering diversity and inclusion in educational settings.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    author: "Dr. Maria Garcia",
    authorImage: "/images/author-12.jpg",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Education",
    tags: ["Inclusion", "Diversity", "Education"],
    image: "/images/6blog.webp",
    featured: false,
  },
]

const categories = ["All", "Technology", "Study Tips", "Career", "Psychology", "Programming", "Education"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="edu-blog-wrapper">
      {/* Background Elements */}
      <div className="blog-background-elements">
        <div className="floating-shape blog-shape-1"></div>
        <div className="floating-shape blog-shape-2"></div>
        <div className="floating-shape blog-shape-3"></div>
      </div>

      {/* Hero Section */}
      <section className="blog-hero-section">
        <div className="hero-content-container">
          <div className="hero-badge">
            <LuBookOpen className="hero-badge-icon" />
            <span className="hero-badge-text">Educational Insights</span>
          </div>
          <h1 className="blog-hero-title">Knowledge Hub</h1>
          <p className="blog-hero-description">
            Discover the latest insights, tips, and trends in education and technology. Stay informed with expert
            articles from our community of educators and industry professionals.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="blog-search-section">
        <div className="search-container">
          <div className="search-bar-wrapper">
            <div className="search-input-container">
              <LuSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-field"
              />
            </div>
            <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
              <LuFilter className="filter-icon" />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className={`category-filters-container ${showFilters ? "filters-visible" : ""}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter-btn ${selectedCategory === category ? "filter-active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="featured-article-section">
          <div className="featured-container">
            <div className="featured-badge">
              <LuTrendingUp className="featured-badge-icon" />
              <span>Featured Article</span>
            </div>
            <div className="featured-article-card">
              <div className="featured-image-container">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="featured-article-image"
                />
                <div className="featured-category-tag">{featuredPost.category}</div>
              </div>
              <div className="featured-content-area">
                <div className="featured-meta-info">
                  <div className="author-info">
                    <img
                      src={featuredPost.authorImage || "/placeholder.svg"}
                      alt={featuredPost.author}
                      className="author-avatar"
                    />
                    <span className="author-name">{featuredPost.author}</span>
                  </div>
                  <div className="article-meta">
                    <span className="meta-item">
                      <LuCalendar className="meta-icon" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    <span className="meta-item">
                      <LuClock className="meta-icon" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
                <h2 className="featured-article-title">{featuredPost.title}</h2>
                <p className="featured-article-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-tags-container">
                  {featuredPost.tags.map((tag) => (
                    <span key={tag} className="article-tag">
                      <LuTag className="tag-icon" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${featuredPost.id}`} className="featured-read-more-btn">
                  <span>Read Full Article</span>
                  <LuArrowRight className="read-more-icon" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="articles-grid-section">
        <div className="articles-container">
          <div className="section-header">
            <h2 className="section-title">
              {searchTerm
                ? `Search Results for "${searchTerm}"`
                : selectedCategory === "All"
                  ? "Latest Articles"
                  : `${selectedCategory} Articles`}
            </h2>
            <p className="section-subtitle">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="articles-grid">
            {regularPosts.map((post) => (
              <article key={post.id} className="blog-article-card">
                <div className="article-image-container">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="article-thumbnail" />
                  <div className="article-category-badge">{post.category}</div>
                </div>

                <div className="article-content-section">
                  <div className="article-meta-data">
                    <div className="author-details">
                      <img
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        className="author-profile-image"
                      />
                      <span className="author-display-name">{post.author}</span>
                    </div>
                    <div className="publication-info">
                      <span className="publication-date">
                        <LuCalendar className="date-icon" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="reading-time">
                        <LuClock className="time-icon" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="article-card-title">
                    <Link href={`/blog/${post.id}`} className="article-title-link">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="article-card-excerpt">{post.excerpt}</p>

                  <div className="article-tags-list">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag-item">
                        <LuTag className="tag-item-icon" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.id}`} className="article-read-more-link">
                    <span>Read More</span>
                    <LuChevronRight className="chevron-icon" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="no-results-container">
              <div className="no-results-icon">
                <LuBookOpen size={48} />
              </div>
              <h3 className="no-results-title">No articles found</h3>
              <p className="no-results-text">Try adjusting your search terms or browse different categories.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="reset-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <ReadyToStart />
    </div>
  )
}

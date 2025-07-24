"use client"
import React, { useState } from 'react'
import '@/app/styles/bootstrap.css'
import '@/app/styles/main.css'
import '@/app/styles/responsive.css'
import '@/app/styles/font-awesome.css'
import {  FaLink, FaBookmark, FaExpand } from "react-icons/fa";
import Link from 'next/link';
import ReadyToStart from '@/component/ReadyToStart'
import Pagination from '@/component/Pagination'

// Data arrays
const categories = ['HTML', 'UI/UX', 'JavaScript', 'Coding', 'Typography'];
const books = [
  { title: "Don't make me think", category: "html", image: "images/book-1.jpg" },
    { title: "Don't make me think", category: "typography", image: "images/book-1.jpg" },
  { title: "101 Design Methods", category: "uiux", image: "images/book-2.jpg" },
  { title: "Lean UX", category: "uiux", image: "images/book-1.jpg" },
  { title: "The Elements of UX", category: "html", image: "images/book-2.jpg" },
  { title: "Designed for Use", category: "uiux", image: "images/book-1.jpg" },
  { title: "Design of Everyday", category: "coding", image: "images/book-2.jpg" },
  { title: "Undercover UX", category: "javascript", image: "images/book-1.jpg" },
  { title: "Interaction Design", category: "javascript", image: "images/book-2.jpg" }
];

const bookImages = [
  "images/book-1.jpg",
  "images/book-2.jpg",
  "images/book-1.jpg",
  "images/book-2.jpg",
  "images/book-1.jpg",
  "images/book-2.jpg",
  "images/book-1.jpg",
  "images/book-2.jpg"
];
const popularBooks = [
  { title: "Don't Make Me <br> Think", author: "Steve Krug", image: "images/book-1.jpg" },
  { title: "Essential of <br> Interaction Design", author: "Alan Cooper", image: "images/book-2.jpg" },
  { title: "Non Designers <br> Design Book", author: "Robin Williams", image: "images/book-3.jpg" },
  { title: "Sketching User <br> Experience", author: "Bill Buxton", image: "images/book-4.jpg" },
  { title: "Rocket Surgery <br> Made Easy", author: "Steve Krug", image: "images/book-5.jpg" }
];

const relatedBooks = [
  "Don't make me think",
  "Design of Everyday",
  "Undercover UX Design",
  "Interaction Design"
];

interface BookBlockProps {
  title: string;
  imageSize?: string;
  imageSrc?: string;
}

const BookBlock = ({ title, imageSize = '170x220', imageSrc = 'images/book-1.jpg' }: BookBlockProps) => (
  <div className="book-block col-lg-3 col-md-4 col-sm-12">
    <div className="inner-box">
      <figure className="image-box">
        <img src={imageSrc} alt={title} />
        <div className="overlay-box">
          <div className="overlay-inner">
            <div className="content">
              <Link href="/books-detail" className="link">
                <FaLink className="icon" />
              </Link>
              <a
                href={`https://via.placeholder.com/${imageSize}`}
                data-fancybox="books"
                data-caption=""
                className="link"
              >
                <FaExpand className="icon" />
              </a>
            </div>
          </div>
        </div>
      </figure>
      <div className="lower-box">
        <h6><Link href="/books-detail">{title}</Link></h6>
      </div>
    </div>
  </div>
);

interface PopularBookWidgetProps {
  title: string;
  author: string;
  image: string;
}

const PopularBookWidget = ({ title, author, image }: PopularBookWidgetProps) => (
  <div className="book-widget">
    <div className="widget-inner">
      <div className="image">
        <Link href="/books-detail">
          <img src={image} alt={title.replace(/<br>/g, ' ')} />
        </Link>
      </div>
      <Link className="tag" href="/books-detail">
        <FaBookmark className="icon" />
      </Link>
      <h6 dangerouslySetInnerHTML={{ __html: title }}></h6>
      <div className="author">By {author}</div>
    </div>
  </div>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState('html');

  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Notes</h1>

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

      <section className="books-page-section">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Category</h2>
          </div>

          <div className="row clearfix">
            <div className="category-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="books-info-tabs">
                  <div className="books-tabs tabs-box">
                    <ul className="tab-btns tab-buttons clearfix">
                      {categories.map((category, index) => {
                        const tabId = category.toLowerCase().replace('/', '');
                        return (
                          <li
                            key={index}
                            data-tab={`#prod-${tabId}`}
                            className={`tab-btn ${activeTab === tabId ? 'active-btn' : ''}`}
                            onClick={() => setActiveTab(tabId)}
                          >
                            {category}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="tabs-content">
                      {categories.map((category, index) => {
                        const tabId = category.toLowerCase().replace('/', '');
                        return (
                          <div
                            key={index}
                            className={`tab ${activeTab === tabId ? 'active-tab' : ''}`}
                            id={`prod-${tabId}`}
                          >
                            <div className="content">
                              <div className="row clearfix">
                               {books
  .filter(book => book.category === activeTab)
  .map((book, bookIndex) => (
    <BookBlock
      key={bookIndex}
      title={book.title}
      imageSrc={book.image}
    />
))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                   <Pagination/>
              </div>
            </div>

            <div className="widgets-column col-lg-4 col-md-12 col-sm-12">
              <div className="inner-column">
                <h5>Important Notes</h5>
                <div className="widgets-outer">
                  {popularBooks.map((book, index) => (
                    <PopularBookWidget
                      key={index}
                      title={book.title}
                      author={book.author}
                      image={book.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related-projects">
          <div className="auto-container">
            <div className="sec-title">
              <h2>All Courses by Stephane</h2>
            </div>
            <div className="row clearfix">
              {relatedBooks.map((book, index) => (
                <BookBlock
                  key={index}
                  title={book}
                  imageSize="270x300"
                  imageSrc={bookImages[index % bookImages.length]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReadyToStart/>
    </>
  );
}

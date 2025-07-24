import React from 'react'
import { LuChevronRight } from 'react-icons/lu'

export default function HomeNews() {
    return (
        <>
        <section className="news-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="title-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="sec-title">
                  <h2>Our Latest blog posts</h2>
                  <div className="text">
                    Replenish him third creature and meat blessed void a fruit
                    gathered you’re, they’re two waters own morning gathered
                    greater shall had behold had seed.
                  </div>
                </div>
                <a href="/blog" className="theme-btn btn-style-three">
                  <span className="txt">
                    All Blog Post <LuChevronRight  />
                  </span>
                </a>
              </div>
            </div>

            <div className="news-block col-lg-6 col-md-12 col-sm-12">
              <div className="inner-box">
                <div className="image">
                  <a href="/blog-detail">
                    <img src="/images/resource/news-1.jpg" alt="" />
                  </a>
                </div>
                <div className="lower-content">
                  <h3>
                    <a href="/blog-detail">To apply signal detection theory</a>
                  </h3>
                  <div className="text">
                    Replenish him third creature and meat blessed void a fruit
                    gathered you’re, they’re two waters
                  </div>
                  <a href="/blog-detail" className="read-more">
                    Continue Reading
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            
        </>
    )
}

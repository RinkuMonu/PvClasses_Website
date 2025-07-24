"use-client"
import { FaSearch, FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaGithub, FaAngleRight } from 'react-icons/fa';
import '@/app/styles/bootstrap.css'
import '@/app/styles/main.css'
import '@/app/styles/responsive.css'
import '@/app/styles/font-awesome.css'
import Pagination from '@/component/Pagination';
import { FaCalendar } from "react-icons/fa";	

export default function BlogSinglePage() {
  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Blogs Single</h1>
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
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        ></div>
        <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="auto-container">
          <div className="row clearfix" style={{ display: 'flex' }}>
            <div className="sidebar-side style-two blog-sidebar col-lg-3 col-md-12 col-sm-12" style={{ alignSelf: 'flex-start' }}>
              <div className="sidebar-inner sticky-top" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <aside className="sidebar">
                  <div className="sidebar-widget popular-posts">
                    <div className="sidebar-title">
                      <h5>Recent Posts</h5>
                    </div>
                    <div className="widget-content">
                      {[1, 2, 3].map((_, i) => (
                        <article className="post" key={i}>
                          <div className="post-inner">
                            <figure className="post-thumb">
                              <a href="blog-detail.html">
                                <img src="images/post-thumb-1.jpg" alt="" />
                              </a>
                            </figure>
                            <div className="text">
                              <a href="blog-detail.html">Writing a Simple App</a>
                            </div>
                            <div className="post-info">By Steve Krug</div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar-widget popular-tags">
                    <div className="sidebar-title">
                      <h5>Tags</h5>
                    </div>
                    <div className="widget-content">
                      {["#Webdesign", "#Mobileapp", "#Design", "#Hack", "#Webdesign", "#Hack", "#Design", "#Hack"].map((tag, i) => (
                        <a key={i} href="#">{tag}</a>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            <div className="content-side blog-detail-column col-lg-9 col-md-12 col-sm-12">
              <div className="blog-detail">
                <div className="inner-box">
                  <h2>10 Amazing web of demos and <br /> developers</h2>
                  <ul className="author-info">
                    <li>By David Smith</li>
                    <li><span className="theme_color">11 January 2020</span></li>
                    <li>15 Commnets</li>
                  </ul>
                  <div className="image">
                    <img src="images/news-2.jpg" alt="" />
                  </div>
                  <h4>10 amazing web of demos Developers</h4>
                  <p>Lorem ipsum dolor sit amet...And meat blessed void a fruit gathered waters.</p>
                  <h4>25 That Prevent Job Seekers From Overcoming Failure</h4>
                  <p>Phasellus enim magna...et aliquam odio.</p>
                  <div className="social-box">
                    <span>Share this article on </span>
                    <a href="#"><FaFacebookSquare /></a>
                    <a href="#"><FaTwitterSquare /></a>
                    <a href="#"><FaLinkedin /></a>
                    <a href="#"><FaGithub /></a>
                  </div>
                </div>

              <Pagination/>

                <div className="comments-area">
                  <div className="group-title">
                    <h4>Recent Comments</h4>
                  </div>

                  {["Anna Sthesia", "Paul Molive", "Mouna Sthesia"].map((author, i) => (
                    <div className={`comment-box${i === 1 ? " reply-comment" : ""}`} key={i}>
                      <div className="comment">
                        <div className="author-thumb">
                          <img src="images/author-12.jpg" alt="" />
                        </div>
                        <div className="comment-info clearfix">
                          <strong>{author}</strong>
                          <div className="float-right">	<FaCalendar className='text-success me-2'/>{i === 1 ? "July 01, 2019" : "June 28, 2019"}</div>
                        </div>
                        <div className="text">
                          It is a long established fact that a reader will be distracted by the readable content...
                        </div>
                        <a className="theme-btn reply-btn" href="#"> Reply</a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="comment-form">
                  <div className="group-title">
                    <h4>Leave Comment</h4>
                  </div>
                  <form method="post" action="blog.html">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input type="text" name="username" placeholder="Full Name*" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                        <input type="email" name="email" placeholder="Email Address*" required />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <textarea name="message" placeholder="Write your comment..."></textarea>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                        <button
                          className="theme-btn btn-style-three"
                          type="submit"
                          name="submit-form"
                        >
                          <span className="txt">
                            Submit Your Comment <FaAngleRight />
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <section
        className="call-to-action-section-two"
        style={{ backgroundImage: 'url(images/background/3.png)' }}
      >
        <div className="auto-container">
          <div className="content">
            <h2>Ready to get started?</h2>
            <div className="text">
              Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two <br /> waters own
              morning gathered greater shall had behold had seed.
            </div>
            <div className="buttons-box">
              <a href="course.html" className="theme-btn btn-style-one">
                <span className="txt">
                  Get Stared <FaAngleRight />
                </span>
              </a>
              <a href="course.html" className="theme-btn btn-style-two">
                <span className="txt">
                  All Courses <FaAngleRight />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

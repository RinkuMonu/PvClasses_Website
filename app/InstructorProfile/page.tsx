"use client";
import React from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import Link from "next/link";
import ReadyToStart from "@/component/ReadyToStart";
import { FaStar } from "react-icons/fa";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
// import Pagination from "@/component/Pagination";

export default function InstructorProfileSection() {
  const courses = [
    {
      title: "Interaction Design",
      instructor: "John Doe",
      price: "$49",
      rating: 4.5,
      image: "images/course-6.jpg",
    },
    {
      title: "Visual Design",
      instructor: "Jane Smith",
      price: "$39",
      rating: 4.2,
      image: "images/course-6.jpg",
    },
    {
      title: "Wireframe Protos",
      instructor: "Alice Johnson",
      price: "Free",
      rating: 4.8,
      image: "images/course-6.jpg",
    },
    {
      title: "Color Theory",
      instructor: "David Brown",
      price: "$29",
      rating: 4.0,
      image: "images/course-6.jpg",
    },
    {
      title: "Typography",
      instructor: "Maria Garcia",
      price: "$19",
      rating: 3.9,
      image: "images/course-6.jpg",
    },
    {
      title: "Picture Selection",
      instructor: "Michael Lee",
      price: "$59",
      rating: 4.6,
      image: "images/course-6.jpg",
    },
  ];
  return (
    <>
      <section className="page-title">
        <div className="auto-container">
          <h1>Instructor Profile</h1>
          {/* <div className="search-boxed">
            <div className="search-box">
              <form method="post" action="contact">
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

      <section className="profile-section">
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: "url(images/icons/icon-1.png)" }}
        ></div>

        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: "url(images/icons/icon-2.png)" }}
        ></div>

        <div className="circle-one"></div>
        <div className="circle-two"></div>

        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <h2>Stephane Smith</h2>
                <h4>A certified instructor From Bootcamp</h4>

                <ul className="student-list">
                  <li>23,564 Total Students</li>
                  <li>
                    <span className="theme_color">
                      4.5{" "}
                      <span className="text-success ">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                      </span>
                    </span>
                    (1254 Rating)
                  </li>
                  <li>256 Reviews</li>
                </ul>

                <h5>About Me</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat. Nam liber tempor cum soluta
                  nobis eleifend option congue nihil imperdiet doming id quod
                  mazim placerat
                </p>

                <h5>25 That Prevent Job Seekers From Overcoming Failure</h5>
                <p>
                  Phasellus enim magna, varius et commodo ut, ultricies vitae
                  velit. Ut nulla tellus, eleifend euismod pellentesque vel,
                  sagittis vel justo. In libero urna, venenatis sit amet ornare
                  non, suscipit nec risus. Sed consequat justo non mauris
                  pretium at tempor justo sodales. Quisque tincidunt laoreet
                  malesuada. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur.
                </p>
              </div>
            </div>

            <div className="image-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src="images/student-1.jpg" alt="" />
                </div>
                <h3>Stephane Smith</h3>
                <div className="text">
                  Certified instructor Architecture <br /> & Developer
                </div>
                <div className="social-box">
                  <Link href="#" className="me-2">
                    <FaFacebookSquare size={30} />
                  </Link>
                  <Link href="#" className="me-2">
                    <FaTwitterSquare size={30} />
                  </Link>
                  <Link href="#" className="me-2">
                    <FaLinkedin size={30} />
                  </Link>
                  <Link href="#">
                    <FaGithub size={30} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="browse-course-section pt-5">
          <div className="auto-container">
            <div className="sec-title">
              <h2>All Courses by Stephane</h2>
            </div>

            <div className="row clearfix">
              {courses.map((course, index) => (
                <div
                  className="cource-block-two col-lg-3 col-md-6 col-sm-12"
                  key={index}
                >
                  <Link href="/coursedetails">
                    <div className="inner-box">
                      <div className="image">
                        <img src={course.image} alt={course.title} />
                      </div>
                      <div className="lower-content">
                        <h5>{course.title}</h5>
                        <div className="instructor">By {course.instructor}</div>
                        <div className="price-rating d-flex justify-content-between">
                          <span className="price">{course.price}</span>
                          <span className="rating">
                            {course.rating} <FaStar className="text-warning" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {/* <Pagination /> */}
          </div>
        </div>
      </section>

      <ReadyToStart />
    </>
  );
}

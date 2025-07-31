import React from 'react'
import { FaGraduationCap } from 'react-icons/fa';
// import { LuChevronRight } from 'react-icons/lu';
// import Tilt from "react-parallax-tilt";
import { TfiWorld } from "react-icons/tfi";
import { IoHome } from "react-icons/io5";
import { GiBlackBook } from "react-icons/gi";
import "@/app/styles/main.css"
export default function EducationSection() {
  return (
    <>
      {/* <section className="education-section">
          <div className="patern-layer-one paroller" style={{ backgroundImage: "url(/images/icons/icon-1.png)" }}></div>
          <div className="patern-layer-two paroller" style={{ backgroundImage: "url(/images/icons/icon-2.png)" }}></div>
          <div className="auto-container">
            <div className="row clearfix">
              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column parallax-scene-1">
                  <Tilt glareEnable={false} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={300}>
                    <div className="image parallax-layer" data-depth="0.30">
                      <img src="/images/resource/education.png" alt="Education" />
                    </div>
                  </Tilt>
                </div>
              </div>

              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h2>
                    Our education system <br /> works for you
                  </h2>
                  <div className="text">
                    Replenish him third creature and meat blessed void a fruit
                    gathered you’re, they’re two waters own morning gathered
                    greater shall had behold had seed.
                  </div>
                  <a href="/course" className="theme-btn btn-style-two">
                    <span className="txt">
                      Learn More
                      <LuChevronRight />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <FaGraduationCap style={{fontSize:"50px", color:"#06BBCC"}} />
                  <h5 style={{fontSize:"1.25rem", color:"#000", fontWeight:"600"}} className="mb-3">Skilled Instructors</h5>
                  <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <TfiWorld style={{fontSize:"40px", color:"#06BBCC"}} />
                  <h5 style={{fontSize:"1.25rem", color:"#000", fontWeight:"600"}} className="mb-3 mt-2">Online Classes</h5>
                  <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <IoHome style={{fontSize:"40px", color:"#06BBCC"}} />
                  <h5 style={{fontSize:"1.25rem", color:"#000", fontWeight:"600"}} className="mb-3 mt-2">Home Projects</h5>
                  <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <GiBlackBook style={{fontSize:"42px", color:"#06BBCC"}} />
                  <h5 style={{fontSize:"1.25rem", color:"#000", fontWeight:"600"}} className="mb-3 mt-2">Book Library</h5>
                  <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

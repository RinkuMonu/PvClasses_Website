import React from 'react'
import { LuChevronRight } from 'react-icons/lu';
import Tilt from "react-parallax-tilt";

export default function EducationSection() {
    return (
        <>
             <section className="education-section">
        <div
          className="patern-layer-one paroller"
          style={{ backgroundImage: "url(/images/icons/icon-1.png)" }}
        ></div>
        <div
          className="patern-layer-two paroller"
          style={{ backgroundImage: "url(/images/icons/icon-2.png)" }}
        ></div>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column parallax-scene-1">
                <Tilt
                  glareEnable={false}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  scale={1.05}
                  transitionSpeed={300}
                >
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
                    Learn More <LuChevronRight  />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
            
        </>
    )
}

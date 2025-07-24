"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { LuChevronRight } from "react-icons/lu";
import Tilt from "react-parallax-tilt";

export default function HeroBanner() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="banner-section">
      <div
        className="pattern-layer"
        style={{ backgroundImage: "url(/images/background/1.png)" }}
      ></div>
      <div className="auto-container">
        <div className="content-boxed">
          <div className="inner-column">
            <h1>
              Learn Math, Science, English and Test <br /> Prep from our Experts
            </h1>
            <div className="buttons-box">
              <a href="/course" className="theme-btn btn-style-one">
                <span className="txt">
                  Get Started <LuChevronRight />
                </span>
              </a>
              <a href="/course" className="theme-btn btn-style-two">
                <span className="txt">
                  All Courses <LuChevronRight />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="image titlt" data-tilt data-tilt-max="4">
          <a href="/" data-fancybox="banner" data-caption="">
            <Tilt
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              perspective={1000}
              scale={1.02}
              transitionSpeed={250}
            >
              <div className="image">
                <img src="/images/resource/banner.png" alt="" />
              </div>
            </Tilt>
          </a>
        </div>

        {/* ✅ Search box updated */}
        <div className="search-boxed">
          <div className="search-box">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="search"
                  name="search-field"
                  placeholder="What do you want to learn?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                />
                <button type="submit">
                  <span className="icon">
                    <FiSearch />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

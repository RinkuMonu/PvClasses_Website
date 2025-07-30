"use client";

import { useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@/app/styles/main.css";

export default function TestimonialSection() {
  useEffect(() => {
    const loadScripts = async () => {
      const jQuery = (await import("jquery")).default;
      window.$ = window.jQuery = jQuery;

      require("owl.carousel");

      setTimeout(() => {
        if (jQuery(".single-item-carousel").length > 0) {
          jQuery(".single-item-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            items: 1,
            smartSpeed: 600,
          });
        }
      }, 0);
    };

    loadScripts();
  }, []);

  return (
    <section className="testimonial-section">
      <div className="auto-container">
        <div className="sec-title centered">
          <h2>Students &amp; Parents Opinion</h2>
        </div>

        {/* Authors Circle */}
        <div className="authors-box">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={`now-in-view author-${index + 1}`}>
              <img
                src={`/images/resource/author-${index + 1}.jpg`}
                alt={`Author ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="single-item-carousel owl-carousel owl-theme owl-loaded owl-drag relative">
          {[1, 2, 3].map((i) => (
            <div className="testimonial-block" key={i}>
              <div className="inner-box">
                <div className="image-box">
                  {i === 1 && (
                    <div className="quote-icon flaticon-quote-5"></div>
                  )}
                  <div className="image">
                    <img
                      src={`/images/resource/author-${i}.jpg`}
                      alt={`Author ${i}`}
                    />
                  </div>
                </div>
                <div className="text">
                  {i === 1
                    ? `“Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it”`
                    : i === 2
                    ? `“As a parent, I feel confident that my child is learning from the best. Great platform and support!”`
                    : `“I never thought online learning could be this interactive and effective. Highly recommended!”`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

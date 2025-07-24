'use client';

import { useEffect } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '@/app/styles/main.css'
export default function TestimonialSection() {
  useEffect(() => {
    const loadScripts = async () => {
      const jQuery = (await import('jquery')).default;
      window.$ = window.jQuery = jQuery;
      await import('owl.carousel');

      jQuery('.single-item-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        items: 1,
        smartSpeed: 600,
      });
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
          <div className="now-in-view author-one">
            <img src="/images/resource/author-1.jpg" alt="Author 1" />
          </div>
          <div className="now-in-view author-two">
            <img src="/images/resource/author-2.jpg" alt="Author 2" />
          </div>
          <div className="now-in-view author-three">
            <img src="/images/resource/author-3.jpg" alt="Author 3" />
          </div>
          <div className="now-in-view author-four">
            <img src="/images/resource/author-4.jpg" alt="Author 4" />
          </div>
          <div className="now-in-view author-five">
            <img src="/images/resource/author-5.jpg" alt="Author 5" />
          </div>
          <div className="now-in-view author-six">
            <img src="/images/resource/author-6.jpg" alt="Author 6" />
          </div>
          <div className="now-in-view author-seven">
            <img src="/images/resource/author-7.jpg" alt="Author 7" />
          </div>
          <div className="now-in-view author-eight">
            <img src="/images/resource/author-8.jpg" alt="Author 8" />
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="single-item-carousel owl-carousel owl-theme">
          <div className="testimonial-block">
            <div className="inner-box">
              <div className="image-box">
                <div className="quote-icon flaticon-quote-5"></div>
                <div className="image">
                  <img src="/images/resource/author-1.jpg" alt="Author 1" />
                </div>
              </div>
              <div className="text">
                “Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two waters own morning gathered greater shall had behold had seed. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it”
              </div>
            </div>
          </div>

          <div className="testimonial-block">
            <div className="inner-box">
              <div className="image-box">
                <div className="image">
                  <img src="/images/resource/author-2.jpg" alt="Author 2" />
                </div>
              </div>
              <div className="text">
                “As a parent, I feel confident that my child is learning from
                the best. Great platform and support!”
              </div>
            </div>
          </div>

          <div className="testimonial-block">
            <div className="inner-box">
              <div className="image-box">
                <div className="image">
                  <img src="/images/resource/author-3.jpg" alt="Author 3" />
                </div>
              </div>
              <div className="text">
                “I never thought online learning could be this interactive and
                effective. Highly recommended!”
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

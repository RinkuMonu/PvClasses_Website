import React from 'react'
import { PiPlayFill } from 'react-icons/pi'

export default function HomeVideo() {
    return (
        <>
         <section
        className="video-section"
        style={{
          backgroundImage: "url(/images/resource/2.jpg)",
        }}
      >
        <div className="auto-container">
          <a
            href="https://www.youtube.com/watch?v=kxPCFljwJws"
            className="lightbox-image video-box"
          >
                         <PiPlayFill  />

              <i className="ripple"></i>
            {/* </span> */}
          </a>
          <h4>Watch Intro Video</h4>
        </div>
      </section>
            
        </>
    )
}

import React, { useState } from 'react';
import { PiPlayFill } from 'react-icons/pi';

const HomeVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <section
        className="video-section"
        style={{
          backgroundImage: "url(/images/resource/2.jpg)",
        }}
      >
        <div className="auto-container">
          {!isPlaying ? (
            <a
              href="#"
              className="lightbox-image video-box"
              onClick={playVideo}
            >
              <PiPlayFill />
              <i className="ripple"></i>
            </a>
          ) : (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/2A3FfAiNN-M?si=RJw8P2EQzHJzFrrn"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{zIndex:999, position:"relative"}}
            ></iframe>
          )}
          <h4>Watch Intro Video</h4>
        </div>
      </section>
    </>
  );
};

export default HomeVideo;

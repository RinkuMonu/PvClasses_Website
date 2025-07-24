import React from 'react'
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
export default function UpcomingEvents() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <>
            <section className="fluid-section-one">
                <div
                    className="patern-layer-one paroller"
                    style={{ backgroundImage: "url(/images/icons/icon-1.png)" }}
                ></div>
                <div className="outer-container clearfix">
                    <div
                        className="image-column"
                        style={{
                            backgroundImage: "url(images/resource/image-1.jpg)",
                        }}
                    >
                        <figure className="image-box">
                            <img src="https://via.placeholder.com/845x830" alt="" />
                        </figure>
                    </div>

                    <div ref={ref}
                        className={`content-column ${inView ? "now-in-view" : ""}`}>
                        <div className="inner-column">
                            <div className="clearfix">
                                <div className="pull-left">
                                    <h2>Upcoming events</h2>
                                </div>
                                <div className="pull-right">
                                    <a href="/course-detail" className="events">
                                        All Events
                                    </a>
                                </div>
                            </div>

                            <div className="blocks-outer">
                                {/* Event Block */}
                                <div className="event-block">
                                    <div className="inner-box">
                                        <div className="clearfix">
                                            <div className="event-date clearfix">
                                                <span className="date">21</span>JAN 2020
                                            </div>
                                            <ul className="event-list">
                                                <li>
                                                    <a href="/course-detail">ART & DESIGN</a>
                                                </li>
                                                <li>
                                                    <a href="/course-detail">PAINTING</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <h3>
                                            <a href="/course-detail">Workshop on UI/ UX</a>
                                        </h3>
                                    </div>
                                </div>

                                <div className="event-block">
                                    <div className="inner-box">
                                        <div className="clearfix">
                                            <div className="event-date clearfix">
                                                <span className="date">15</span>Mar 2020
                                            </div>
                                            <ul className="event-list">
                                                <li>
                                                    <a href="/course-detail">ART & DESIGN</a>
                                                </li>
                                                <li>
                                                    <a href="/course-detail">PAINTING</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <h3>
                                            <a href="/course-detail">Amsterdam art weekend</a>
                                        </h3>
                                    </div>
                                </div>

                                <div className="event-block">
                                    <div className="inner-box">
                                        <div className="clearfix">
                                            <div className="event-date clearfix">
                                                <span className="date">21</span>mar 2020
                                            </div>
                                            <ul className="event-list">
                                                <li>
                                                    <a href="/course-detail">ART & DESIGN</a>
                                                </li>
                                                <li>
                                                    <a href="/course-detail">PAINTING</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <h3>
                                            <a href="/course-detail">
                                                Outside fashion - Group exhibition
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

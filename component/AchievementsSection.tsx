import React from 'react'
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { PiBookOpenUserBold, PiStudentBold } from 'react-icons/pi';
import { GiWorld } from 'react-icons/gi';

export default function AchievementsSection() {
    const [ref1, inView1] = useInView({ triggerOnce: true });
    const [ref2, inView2] = useInView({ triggerOnce: true });
    const [ref3, inView3] = useInView({ triggerOnce: true });
    return (
        <>
            <section className="achievements-section">
                <div className="auto-container">
                    <div className="sec-title centered">
                        <h2>Our achievements</h2>
                        <div className="text">
                            Replenish him third creature and meat blessed void a fruit gathered
                            you’re, they’re two waters own morning gathered greater shall had
                            behold had seed.
                        </div>
                    </div>

                    <div className="fact-counter">
                        <div className="row clearfix">

                            {/* Total Courses */}
                            <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                                <div className="inner wow fadeInLeft" ref={ref1}>
                                    <div className="content">
                                        <div className="icon-box">
                                            <span className="icon flaticon-course"><PiBookOpenUserBold />
                                            </span>
                                        </div>
                                        <h4 className="counter-title">Total Courses</h4>
                                        <div className="count-outer count-box">
                                            <span className="count-text">
                                                {inView1 && <CountUp end={50} duration={2} />}
                                            </span>
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Total Students */}
                            <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                                <div className="inner wow fadeInUp" ref={ref2}>
                                    <div className="content">
                                        <div className="icon-box">
                                            <span className="icon flaticon-course-1"><PiStudentBold  /></span>
                                        </div>
                                        <h4 className="counter-title">Total Students</h4>
                                        <div className="count-outer count-box alternate">
                                            <span className="count-text">
                                                {inView2 && <CountUp end={45} duration={3} />}
                                            </span>
                                            K+
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Global Position */}
                            <div className="column counter-column col-lg-4 col-md-6 col-sm-12">
                                <div className="inner wow fadeInRight" ref={ref3}>
                                    <div className="content">
                                        <div className="icon-box">
                                            <span className="icon flaticon-world"><GiWorld  /></span>
                                        </div>
                                        <h4 className="counter-title">Global Position</h4>
                                        <div className="count-outer count-box">
                                            <span className="count-text">
                                                {inView3 && <CountUp end={115} duration={4} />}
                                            </span>
                                        </div>
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

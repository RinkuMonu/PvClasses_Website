"use client";
import React, { useEffect } from "react";
import api from "@/utils/axios";
import Link from "next/link";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  lecturer: string;
  hours: string;
}
function PopularCard() {
  const [popularCourses, setpopularCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        const allCourses = res?.data?.data || [];
        const popularOnly = allCourses.filter(
          (course: any) => course?.ispropular === "popular"
        );
        setpopularCourses(popularOnly);
        // console.log("Popular Courses:", popularOnly);
      } catch (e) {
        console.error("Error fetching courses:", e);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="row clearfix">
        {popularCourses.map((course: Course, index) => (
          <div
            className={`cource-block-two col-lg-4 col-md-6 col-sm-12 wow ${
              index === 0
                ? "fadeInLeft"
                : index === 1
                ? "fadeInUp"
                : "fadeInRight"
            }`}
            data-wow-delay="0ms"
            data-wow-duration="1500ms"
            key={course?._id}
          >
            <Link href={`/coursedetails/${course?.slug}`}>
              <div className="inner-box">
                <div className="image">
                  <Image
                    src={course?.thumbnail}
                    alt={course?.title}
                    width={350}
                    height={350}
                    className="img-fluid"
                  />
                </div>
                <div className="lower-content">
                  <h5>{course?.title}</h5>
                  <div className="text">
                    Replenish him third creature and meat blessed void a fruit
                    gathered you’re, they’re two waters.
                  </div>
                  <div className=" d-flex justify-content-between">
                    <div className="pull-left">
                      <div className="students">{course?.lecturer}</div>
                    </div>
                    <div className="pull-right">
                      <div className="hours">{course?.hours}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCard;

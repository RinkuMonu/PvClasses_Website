"use client";
import api from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  instructor?: {
    name: string;
  };
  price: number;
  averageRating?: number;
}

interface CourseCardProps {
  viewType: "grid" | "list";
}

const CourseCard: React.FC<CourseCardProps> = ({ viewType }) => {
  const [courses, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourse(res?.data?.data || []);
      } catch (e) {
        console.error("Error fetching courses:", e);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div
      className={viewType === "grid" ? "row clearfix" : "course-list-container"}
    >
      {courses.map((course) => (
        <div
          className={
            viewType === "grid"
              ? "cource-block-two col-lg-4 col-md-6 col-sm-12"
              : "course-list-item col-12 mb-4"
          }
          key={course._id}
        >
          <Link href={`/coursedetails/${course?.slug}`}>
            <div className={`inner-box ${viewType === "list" ? "d-flex" : ""}`}>
              <div
                className={`image ${
                  viewType === "list" ? "flex-shrink-0 me-4" : ""
                }`}
              >
                <Image
                  src={
                    course?.thumbnail ||
                    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                  }
                  alt={course?.title || "Course Image"}
                  width={250}
                  height={250}
                  className="img-fluid object-cover w-100"
                  style={{
                    maxHeight: viewType === "list" ? "150px" : "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="lower-content">
                <h5 className="cousrcardHeading">{course?.title}</h5>
                <div className="instructor">
                  By {course?.instructor?.name || "Unknown Instructor"}
                </div>
                <div className="price-rating d-flex justify-content-between">
                  <span className="price">{course?.price} INR</span>
                  <span className="rating">
                    {course?.averageRating || 0}{" "}
                    <FaStar className="text-warning" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseCard;

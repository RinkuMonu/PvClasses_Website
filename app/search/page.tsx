"use client";
import React, { useState, useEffect } from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import { useSearchParams } from "next/navigation";
import api from "@/utils/axios";
import "./searchcss.css";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
  };
  totalLessons: number;
  enrollmentCount: number;
}

const CourseSearch = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(`/courses?keyword=${keyword}`);
        console.log(res.data);

        setCourses(res.data.data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) fetchCourses();
  }, [keyword]);

  return (
    <>
      <section className="page-title"></section>
      <div className="container py-5">
        <h2>
          Search Results for: <strong>{keyword}</strong>
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : courses.length > 0 ? (
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-4 mb-4" key={course._id}>
                <div className="card h-100">
                  <Image
                    src={course?.thumbnail}
                    className="card-img-top"
                    alt={course.title}
                    width={500}
                    height={500}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">
                      {course.description?.slice(0, 80)}...
                    </p>
                    <a
                      href={`/coursedetails/${course.slug}`}
                      className="btn btn-primary"
                    >
                      View Course
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </>
  );
};

export default CourseSearch;

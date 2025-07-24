import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaUser, FaPlayCircle } from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
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

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-thumbnail">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={300}
          height={200}
          className="thumbnail-image"
        />
        <div className="play-icon-overlay">
          <FaPlayCircle />
        </div>
      </div>
      <div className="course-details">
        <h3 className="course-title">
          <Link href={`/coursedetails/${course._id}`}>{course.title}</Link>
        </h3>
        <p className="course-description">{course.description}</p>

        <div className="course-meta">
          <div className="instructor-info">
            <Image
              src={course.instructor.avatar || "/default-avatar.png"}
              alt={course.instructor.name}
              width={30}
              height={30}
              className="instructor-avatar"
            />
            <span>{course.instructor.name}</span>
          </div>

          <div className="course-stats">
            <span className="lessons-count">
              <FaPlayCircle /> {course.totalLessons} lessons
            </span>
            <span className="students-count">
              <FaUser /> {course.enrollmentCount} students
            </span>
          </div>
        </div>

        <div className="course-footer">
          <div className="rating">
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <FaStar className="star-icon" />
            <span>(0)</span>
          </div>
          <div className="course-price">₹{course.price}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
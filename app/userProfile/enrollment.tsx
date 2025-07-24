import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./enrollment.css"; // Assuming you have a CSS file for styling
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine,
  FaPlay,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { toast } from "react-hot-toast";
import api from "@/utils/axios";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  instructor: string;
  totalReviews: number;
  slug: string;
}

interface Enrollment {
  _id: string;
  course: Course;
  enrolledAt: string;
  isCompleted: boolean;
  progress: number;
  completedAt: string | null;
}

interface CourseProgressCardProps {
  enrollment: Enrollment;
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
  enrollment,
}) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateProgressStyle = (progress: number) => {
    return {
      width: `${progress}%`,
      backgroundColor: progress === 100 ? "#4CAF50" : "#2196F3",
    };
  };

  const handleSubmitReview = async (slug) => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post(`/courses/${slug}/reviews`, {
        rating,
        comment,
      });

      if (response.status === 201) {
        toast.success("❤️ Thank you...Review submitted successfully!");
        setOpenReviewModal(false);
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="course-card">
        <div className="course-thumbnail">
          <Link href={`/coursedetails/${enrollment?.course?.slug}`}>
            <Image
              src={enrollment?.course?.thumbnail}
              alt={enrollment?.course?.title}
              width={350}
              height={350}
              className="thumbnail-image"
            />
          </Link>
        </div>
        <div className="course-details">
          <Link href={`/coursedetails/${enrollment?.course?.slug}`}>
            <h3 className="course-title">{enrollment?.course?.title}</h3>
            <p className="course-description">
              {enrollment?.course?.description.split(" ").slice(0, 7).join(" ")}
              ...
            </p>
          </Link>

          <div className="course-meta">
            <span className="price">
              <FaMoneyBillWave /> ₹{enrollment?.course?.price}
            </span>
            <span className="enrolled-date">
              <FaCalendarAlt /> {formatDate(enrollment?.enrolledAt)}
            </span>
          </div>

          <div className="progress-container">
            <div className="progress-label">
              <FaChartLine /> Progress: {enrollment?.progress}%
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={calculateProgressStyle(enrollment?.progress)}
              ></div>
            </div>
          </div>

          <div className="course-actions">
            {enrollment?.progress === 100 ? (
              <button
                className="continue-btn"
                onClick={() => setOpenReviewModal(true)}
              >
                <MdReviews /> Review Course
              </button>
            ) : (
              <>
                <Link href={`/coursedetails/${enrollment?.course?.slug}`}>
                  <button className="continue-btn">
                    <FaPlay /> Continue Learning
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {openReviewModal && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <button
              className="close-modal"
              onClick={() => setOpenReviewModal(false)}
            >
              <FaTimes />
            </button>
            <h3>Review {enrollment.course.title}</h3>
            <div className="rating-section">
              <p>How would you rate this course?</p>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`star ${star <= rating ? "filled" : ""}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="review-section">
              <label htmlFor="review">Your Review</label>
              <textarea
                id="review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this course..."
                rows={5}
              />
            </div>
            <button
              className="submit-review-btn"
              onClick={() => handleSubmitReview(enrollment?.course?.slug)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseProgressCard;

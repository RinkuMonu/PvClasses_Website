"use client";
import React, { useState, useEffect } from "react";
import "../styles/UserProfile.css";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import Image from "next/image";
import {
  FaSearch,
  FaUserEdit,
  FaTimes,
  FaSignOutAlt,
  FaSave,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaUserTag,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "@/utils/axios";
import toast, { Toaster } from "react-hot-toast";
import CourseProgressCard from "./enrollment";
import { Link } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
    gender: "",
    role: "student",
    createdAt: new Date(),
  });

  const userdetails = JSON.parse(localStorage.getItem("user"));
  // const token = localStorage.getItem("token");
  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const response = await api.get("/enrollments");
        const data = response.data;
        setEnrolledCourses(data.data || []);

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    getEnrolledCourses();
  }, []);
  useEffect(() => {
    if (userdetails) {
      setUser(userdetails);
      setFormData({
        name: userdetails?.name,
        email: userdetails?.email,
        bio: userdetails?.bio || "",
        avatar: userdetails?.avatar || "",
        phoneNumber: userdetails?.phoneNumber || "",
        gender: userdetails?.gender || "",
        role: userdetails?.role || "student",
        createdAt: userdetails?.createdAt || new Date(),
      });
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("gender", formData.gender);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
      const response = await api.put("/auth/updateprofile", formDataToSend);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Failed to update profile");
      }
      // Update local storage with new user data
      const updatedUser = { ...userdetails, ...data.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log("Profile update error:", err);
      setError(err.message);
      toast.error(`Error updating profile: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <>
      <Toaster />
      <section className="page-title">
        <div className="auto-container">
          <h1>User Profile</h1>

          {/* Search Box */}
          {/* <div className="search-boxed">
            <div className="search-box">
              <form method="post">
                <div className="form-group">
                  <input
                    type="search"
                    name="search-field"
                    placeholder="What do you want to learn?"
                    required
                  />
                  <button type="submit">
                    <span className="icon">
                      <FaSearch />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </section>

      <div className="profile-container">
        <div className="profile-header">
          <h2>Welcome! {user?.name} </h2>
          <div className="header-actions">
            {!editMode ? (
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                <FaUserEdit /> Edit Profile
              </button>
            ) : null}
            <button
              className="edit-btn"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          {editMode ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-columns">
                <div className="form-left">
                  <div className="form-group avatar-group">
                    <label htmlFor="avatar" className="avatar-label">
                      <img
                        src={
                          typeof formData.avatar === "string"
                            ? formData.avatar
                            : URL.createObjectURL(formData.avatar)
                        }
                        alt="Profile"
                        className="profile-avatar editable"
                      />

                      <div className="avatar-edit-overlay">
                        <span className="avatar-edit-text">Change Photo</span>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="avatar-input"
                    />
                  </div>
                </div>

                <div className="form-right">
                  <div className="form-group">
                    <label htmlFor="name">
                      <FaUser /> Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">
                      <FaPhone /> Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">
                      <FaVenusMars /> Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="bio">About Me</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      maxLength="500"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    />
                    <div className="character-count">
                      {formData.bio.length}/500 characters
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                  disabled={isLoading}
                >
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="save-btn" disabled={isLoading}>
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <FaSave /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              <div className="profile-info">
                <Image
                  src={user?.avatar || "/default-avatar.png"}
                  alt="Profile"
                  className="profile-avatar"
                  width={150}
                  height={150}
                  priority
                />
                <div className="profile-details">
                  <h3>
                    <FaUser /> {user?.name}
                  </h3>
                  <p className="detail-item">
                    <FaEnvelope /> {user?.email}
                  </p>
                  {user?.phoneNumber && (
                    <p className="detail-item">
                      <FaPhone /> {user?.phoneNumber}
                    </p>
                  )}
                  {user?.gender && (
                    <p className="detail-item">
                      <FaVenusMars /> {user?.gender}
                    </p>
                  )}
                  <p className="detail-item">
                    <FaUserTag /> {user?.role}
                  </p>
                  {user?.createdAt && (
                    <p className="detail-item">
                      <FaCalendarAlt /> Member since:{" "}
                      {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {user?.bio && (
                <div className="profile-bio">
                  <h4>About Me</h4>
                  <p>{user?.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
        {enrolledCourses.length === 0 ? (
          <div className="no-courses-message">
            <p>You haven't enrolled in any courses yet.</p>
            <Link href="/courses" className="browse-courses-btn">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="courses-grid">
            {enrolledCourses.map((enrollment) => (
              <CourseProgressCard
                key={enrollment._id}
                enrollment={enrollment}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;

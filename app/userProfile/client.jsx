"use client"
import { useState, useEffect } from "react"
import "@/app/styles/bootstrap.css"
import "@/app/styles/main.css"
import "@/app/styles/responsive.css"
import "@/app/styles/font-awesome.css"
import "@/app/styles/user-profile.css"
import Image from "next/image"
import { FaTimes, FaSave, FaUser, FaCheck, FaCrown, FaGraduationCap } from "react-icons/fa"
import api from "@/utils/axios"
import toast, { Toaster } from "react-hot-toast"
import CourseProgressCard from "./enrollment"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
    gender: "",
    role: "student",
    createdAt: new Date(),
  })

  const userdetails = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        const response = await api.get("/enrollments")
        const data = response.data
        setEnrolledCourses(data.data || [])
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user profile")
        }
      } catch (err) {
        console.error("Error fetching user profile:", err)
      }
    }
    getEnrolledCourses()
  }, [])

  useEffect(() => {
    if (userdetails) {
      setUser(userdetails)
      setFormData({
        name: userdetails?.name,
        email: userdetails?.email,
        bio: userdetails?.bio || "",
        avatar: userdetails?.avatar || "",
        phoneNumber: userdetails?.phoneNumber || "",
        gender: userdetails?.gender || "",
        role: userdetails?.role || "student",
        createdAt: userdetails?.createdAt || new Date(),
      })
    } else {
      window.location.href = "/login"
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("bio", formData.bio)
      formDataToSend.append("phoneNumber", formData.phoneNumber)
      formDataToSend.append("gender", formData.gender)

      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar)
      }

      const response = await api.put("/auth/updateprofile", formDataToSend)
      const data = response.data

      if (!data.success) {
        throw new Error(data.message || "Failed to update profile")
      }

      const updatedUser = { ...userdetails, ...data.data }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setEditMode(false)
      toast.success("Profile updated successfully!")
    } catch (err) {
      setError(err.message)
      toast.error(`Error updating profile: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Split name into first and last name
  const getFirstName = () => {
    return user?.name?.split(" ")[0] || ""
  }

  const getLastName = () => {
    return user?.name?.split(" ").slice(1).join(" ") || ""
  }

  if (isLoading || !user) {
    return (
      <div className="user-profile-enhanced-profile-loading">
        <div className="user-profile-enhanced-loading-spinner"></div>
        <p>Loading your amazing profile...</p>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="user-profile-enhanced-container">
        {/* Attractive Page Header */}
        <div className="user-profile-enhanced-page-header">
          <h1 className="user-profile-enhanced-page-title">✨ User Profile ✨</h1>
          <p className="user-profile-enhanced-page-subtitle">
            Manage your details, view your tier status and unlock your potential
          </p>
        </div>

        {/* Main Layout */}
        <div className="user-profile-enhanced-main-layout">
          {/* Attractive Left Profile Card */}
          <div className="user-profile-enhanced-profile-card">
            <div className="user-profile-enhanced-avatar-section">
              {editMode ? (
                <div className="user-profile-enhanced-avatar-upload">
                  <label htmlFor="avatar-input">
                    <div className="user-profile-enhanced-avatar-preview">
                      {formData.avatar ? (
                        <img
                          src={
                            typeof formData.avatar === "string" ? formData.avatar : URL.createObjectURL(formData.avatar)
                          }
                          alt="Profile"
                          className="user-profile-enhanced-editable-avatar"
                        />
                      ) : (
                        <div className="user-profile-enhanced-avatar-placeholder">
                          <FaUser size={32} />
                        </div>
                      )}
                      <div className="user-profile-enhanced-avatar-overlay">
                        <span>✨ Change Photo</span>
                      </div>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="avatar-input"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="user-profile-enhanced-avatar-input"
                  />
                </div>
              ) : (
                <Image
                  src={user?.avatar || "/placeholder.svg?height=120&width=120&text=Profile"}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="user-profile-enhanced-profile-avatar"
                  priority
                />
              )}

              <h2 className="user-profile-enhanced-user-name">{user?.name}</h2>
              <p className="user-profile-enhanced-user-phone">
                {user?.phoneNumber || "+965 1234 5678"}
                <FaCheck className="user-profile-enhanced-verified-icon" />
              </p>
              <div className="user-profile-enhanced-user-badge">
                <FaCrown />
                Premium Member
              </div>
            </div>

            {/* Attractive Navigation */}
            <nav className="user-profile-enhanced-nav">
              <button
                className={`user-profile-enhanced-nav-item ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                👤 Profile Information
              </button>
              <button
                className={`user-profile-enhanced-nav-item ${activeTab === "courses" ? "active" : ""}`}
                onClick={() => setActiveTab("courses")}
              >
                📚 My Courses ({enrolledCourses.length})
              </button>
              <button
                className="user-profile-enhanced-nav-item"
                onClick={() => {
                  localStorage.removeItem("user")
                  localStorage.removeItem("token")
                  window.location.href = "/login"
                }}
              >
                🚪 Sign Out
              </button>
            </nav>
          </div>

          {/* Attractive Right Content Area */}
          <div className="user-profile-enhanced-content-area">
            {activeTab === "profile" ? (
              <>
                {error && <div className="user-profile-enhanced-error-message">❌ {error}</div>}


                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    {/* General Information Section - Edit Mode */}
                    <div className="user-profile-enhanced-section">
                      <h3 className="user-profile-enhanced-section-title">✨ General Information</h3>
                      <div className="user-profile-enhanced-info-grid">
                        <div className="user-profile-enhanced-field-group">
                          <label className="user-profile-enhanced-field-label">👤 First Name</label>
                          <input
                            type="text"
                            value={formData.name.split(" ")[0] || ""}
                            onChange={(e) => {
                              const lastName = formData.name.split(" ").slice(1).join(" ")
                              setFormData((prev) => ({
                                ...prev,
                                name: `${e.target.value} ${lastName}`.trim(),
                              }))
                            }}
                            className="user-profile-enhanced-field-input"
                            required
                          />
                        </div>
                        <div className="user-profile-enhanced-field-group">
                          <label className="user-profile-enhanced-field-label">👤 Last Name</label>
                          <input
                            type="text"
                            value={formData.name.split(" ").slice(1).join(" ") || ""}
                            onChange={(e) => {
                              const firstName = formData.name.split(" ")[0] || ""
                              setFormData((prev) => ({
                                ...prev,
                                name: `${firstName} ${e.target.value}`.trim(),
                              }))
                            }}
                            className="user-profile-enhanced-field-input"
                          />
                        </div>
                      </div>

                      <div className="user-profile-enhanced-info-grid">
                        <div className="user-profile-enhanced-field-group">
                          <label className="user-profile-enhanced-field-label">📱 Phone Number</label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="user-profile-enhanced-field-input"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="user-profile-enhanced-field-group">
                          <label className="user-profile-enhanced-field-label">⚧ Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="user-profile-enhanced-field-input"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* Bio Section */}
                      {formData.bio !== undefined && (
                        <div className="user-profile-enhanced-bio-section">
                          <div className="user-profile-enhanced-field-group">
                            <label className="user-profile-enhanced-field-label">📝 About Me</label>
                            <textarea
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              maxLength="500"
                              className="user-profile-enhanced-field-input user-profile-enhanced-bio-textarea"
                              placeholder="Tell us about yourself..."
                            />
                            <div className="user-profile-enhanced-character-count">
                              {formData.bio.length}/500 characters
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Security Section - Edit Mode */}
                    <div className="user-profile-enhanced-section">
                      <h3 className="user-profile-enhanced-section-title">🔒 Security</h3>
                      <div className="user-profile-enhanced-security-grid">
                        <div className="user-profile-enhanced-security-field">
                          <label className="user-profile-enhanced-security-label">📧 Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="user-profile-enhanced-field-input"
                            required
                          />
                        </div>
                        <div className="user-profile-enhanced-security-field">
                          <label className="user-profile-enhanced-security-label">🔐 Password</label>
                          <div className="user-profile-enhanced-security-value user-profile-enhanced-password-dots">
                            ••••••
                          </div>
                        </div>
                        <div className="user-profile-enhanced-security-field">
                          <label className="user-profile-enhanced-security-label">📱 Phone</label>
                          <div className="user-profile-enhanced-security-value">
                            {formData.phoneNumber || user?.phoneNumber || "+965 1234 5678"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Edit Mode Buttons */}
                    <div className="user-profile-enhanced-edit-buttons">
                      <button
                        type="button"
                        className="user-profile-enhanced-btn secondary"
                        onClick={() => setEditMode(false)}
                        disabled={isLoading}
                      >
                        <FaTimes /> Cancel
                      </button>
                      <button type="submit" className="user-profile-enhanced-btn primary" disabled={isLoading}>
                        {isLoading ? (
                          "✨ Saving..."
                        ) : (
                          <>
                            <FaSave /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {/* General Information Section - View Mode */}
                    <div className="user-profile-enhanced-section">
                      <h3 className="user-profile-enhanced-section-title">✨ General Information</h3>
                      <div className="user-profile-enhanced-info-grid">
                        <div className="user-profile-enhanced-field-group">
                          <label className="user-profile-enhanced-field-label">👤 First Name</label>
                          <div className="user-profile-enhanced-field-value">{getFirstName()}</div>
                        </div>
                        <div className="user-profile-enhanced-field-group">
                          <label className="user-profile-enhanced-field-label">👤 Last Name</label>
                          <div className="user-profile-enhanced-field-value">{getLastName()}</div>
                        </div>
                      </div>

                      <button className="user-profile-enhanced-update-btn" onClick={() => setEditMode(true)}>
                        ✨ Update Profile
                      </button>
                    </div>

                    {/* Security Section - View Mode */}
                    <div className="user-profile-enhanced-section">
                      <h3 className="user-profile-enhanced-section-title">🔒 Security</h3>
                      <div className="user-profile-enhanced-security-grid">
                        <div className="user-profile-enhanced-security-field">
                          <label className="user-profile-enhanced-security-label">📧 Email</label>
                          <div className="user-profile-enhanced-security-value">{user?.email}</div>
                        </div>
                        <div className="user-profile-enhanced-security-field">
                          <label className="user-profile-enhanced-security-label">🔐 Password</label>
                          <div className="user-profile-enhanced-security-value user-profile-enhanced-password-dots">
                            ••••••
                          </div>
                        </div>
                        <div className="user-profile-enhanced-security-field">
                          <label className="user-profile-enhanced-security-label">📱 Phone</label>
                          <div className="user-profile-enhanced-security-value">
                            {user?.phoneNumber || "+965 1234 5678"}
                          </div>
                        </div>
                      </div>

                     
                    </div>

                    {/* Bio Section if exists */}
                    {user?.bio && (
                      <div className="user-profile-enhanced-section">
                        <h3 className="user-profile-enhanced-section-title">📝 About Me</h3>
                        <div className="user-profile-enhanced-field-value">{user.bio}</div>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              /* Courses Section */
              <div className="user-profile-enhanced-courses-section">
                <h3 className="user-profile-enhanced-section-title">📚 My Learning Journey</h3>

                {enrolledCourses.length === 0 ? (
                  <div className="user-profile-enhanced-no-courses">
                    <Image
                      src="/placeholder.svg?height=120&width=120&text=📚"
                      alt="No courses"
                      width={120}
                      height={120}
                    />
                    <h3>🚀 Ready to Start Learning?</h3>
                    <p>Discover amazing courses and unlock your potential!</p>
                    <a href="/course" className="user-profile-enhanced-btn primary">
                      <FaGraduationCap /> Explore Courses
                    </a>
                  </div>
                ) : (
                  <div className="user-profile-enhanced-courses-grid">
                    {enrolledCourses.map((enrollment) => (
                      <CourseProgressCard key={enrollment._id} enrollment={enrollment} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile

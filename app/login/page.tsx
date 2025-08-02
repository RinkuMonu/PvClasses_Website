"use client"
import { useState } from "react"
import type React from "react"
import ReadyToStart from "@/component/ReadyToStart"
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaUserPlus,
  FaGraduationCap,
  FaBook,
  FaUsers,
  FaAward,
  FaChartLine,
} from "react-icons/fa"
import ForgotPasswordModal from "@/component/ForgotpasswordModal"
import toast, { Toaster } from "react-hot-toast"
import api from "@/utils/axios"
import "@/app/styles/education-login.css"

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  interface AxiosError {
    response?: {
      data?: {
        message?: string
      }
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const formErrors = { email: "", password: "" }

    if (!email.trim()) {
      formErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Please enter a valid email"
    }

    if (!password.trim()) {
      formErrors.password = "Password is required"
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters"
    }

    setErrors(formErrors)

    if (formErrors.email || formErrors.password) {
      setIsLoading(false)
      return
    }

    const payload = {
      email: email,
      password: password,
    }

    try {
      const res = await api.post("/auth/login", payload)
      if (res?.data?.success) {
        toast.success(res.data.message || "Login successful!")
        localStorage.setItem("token", res?.data?.token)
        localStorage.setItem("user", JSON.stringify(res?.data?.user))
        setTimeout(() => {
          window.location.href = "/userProfile"
        }, 1000)
      }
    } catch (error: unknown) {
      const err = error as AxiosError
      toast.error(err?.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setErrors({ ...errors, email: "" })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setErrors({ ...errors, password: "" })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="edu-login-wrapper">
      <Toaster position="top-center" />

      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="main-login-container">
        {/* Left Educational Information Panel */}
        <div className="info-panel">
          <div className="info-content">
            <div className="brand-section">
              <div className="brand-logo">
                <FaGraduationCap size={48} />
              </div>
              <h1 className="brand-title">PV Classes</h1>
              {/* <p className="brand-subtitle">Your Gateway to Knowledge</p> */}
            </div>

            <div className="welcome-message">
              <h2>Welcome Back, Scholar!</h2>
              <p>
                Continue your learning journey with access to world-class courses, interactive content, and a community
                of passionate learners.
              </p>
            </div>

            <div className="feature-highlights">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaBook className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h3>Rich Content Library</h3>
                  <p>Access thousands of courses and resources</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaUsers className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h3>Collaborative Learning</h3>
                  <p>Connect with peers and instructors</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaAward className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h3>Certified Programs</h3>
                  <p>Earn recognized certificates</p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <FaChartLine className="feature-icon" />
                </div>
                <div className="feature-text">
                  <h3>Progress Tracking</h3>
                  <p>Monitor your learning journey</p>
                </div>
              </div>
            </div>

            <div className="decorative-elements">
              <div className="book-illustration">
                <div className="book-spine book-spine-1"></div>
                <div className="book-spine book-spine-2"></div>
                <div className="book-spine book-spine-3"></div>
                <div className="book-spine book-spine-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Form Panel */}
        <div className="login-panel">
          <div className="login-form-container">
            <div className="form-header-section">
              <div className="security-badge">
                <FaLock size={20} />
              </div>
              <h2 className="form-title">Student Login</h2>
              <p className="form-description">Sign in to access your personalized learning dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="authentication-form">
              <div className="form-field-group">
                <div className="field-icon-container">
                  <FaEnvelope className="field-icon" />
                </div>
                <div className="input-container">
                  <label htmlFor="student-email" className="field-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="student-email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`form-input ${errors.email ? "input-error" : ""}`}
                    autoComplete="email"
                  />
                  {errors.email && <div className="validation-error">{errors.email}</div>}
                </div>
              </div>

              <div className="form-field-group">
                <div className="field-icon-container">
                  <FaLock className="field-icon" />
                </div>
                <div className="input-container">
                  <label htmlFor="student-password" className="field-label">
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="student-password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className={`form-input password-input ${errors.password ? "input-error" : ""}`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-visibility-toggle"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="validation-error">{errors.password}</div>}
                </div>
              </div>

              <div className="form-options-row">
                <label className="remember-checkbox">
                  <input type="checkbox" id="remember-session" />
                  <span className="checkbox-label">Keep me signed in</span>
                </label>
                <button type="button" className="forgot-password-link" onClick={() => setShowModal(true)}>
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="primary-login-button" disabled={isLoading}>
                {isLoading ? <span className="loading-spinner"></span> : "Sign In to Portal"}
              </button>

              <div className="form-divider">
                <span className="divider-text">or</span>
              </div>

              <div className="registration-prompt">
                <FaUserPlus className="prompt-icon" />
                <span className="prompt-text">
                  New to EduPortal?{" "}
                  <a href="/register" className="registration-link">
                    Create your account
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ReadyToStart />
      <ForgotPasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

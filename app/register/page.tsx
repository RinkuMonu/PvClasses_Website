"use client"
import { useState } from "react"
import type { ChangeEvent } from "react"
import ReadyToStart from "@/component/ReadyToStart"
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGraduationCap,
  FaUpload,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"
import api from "../../utils/axios.js"
import toast, { Toaster } from "react-hot-toast"
import "@/app/styles/education-login.css"

interface FormDataType {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  gender: string
  agree: boolean
  role: string
  bio: string
  avatar: File | null
}

interface FormErrorsType {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  gender?: string
  agree?: string
  role?: string
  bio?: string
}

export default function RegisterPage() {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  interface AxiosError {
    response?: {
      data?: {
        message?: string
      }
    }
  }

  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agree: false,
    role: "",
    bio: "",
    avatar: null,
  })

  const [errors, setErrors] = useState<FormErrorsType>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const { name, value, type } = target

    if (name === "firstName" || name === "lastName") {
      if (/^[A-Za-z]*$/.test(value)) {
        setFormData({ ...formData, [name]: value })
      }
    } else if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, phone: value })
      }
    } else if (type === "checkbox" && target instanceof HTMLInputElement) {
      setFormData({ ...formData, [name]: target.checked })
    } else if (type === "radio") {
      setFormData({ ...formData, gender: value })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const newErrors: FormErrorsType = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.gender) newErrors.gender = "Please select a gender"
    if (!formData.agree) newErrors.agree = "You must agree to terms"
    if (!formData.role) newErrors.role = "Please select a role"

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const payload = new FormData()
      payload.append("name", `${formData.firstName} ${formData.lastName}`)
      payload.append("email", formData.email)
      payload.append("phoneNumber", formData.phone)
      payload.append("password", formData.password)
      payload.append("role", formData.role)
      payload.append("bio", formData.bio || "")
      payload.append("gender", formData.gender)

      if (formData.avatar) {
        payload.append("avatar", formData.avatar)
      }

      try {
        const res = await api.post("/auth/register", payload)
        if (res?.data?.success) {
          toast.success("Registration successful!")
          window.location.href = "/login"
        }
      } catch (err: unknown) {
        const error = err as AxiosError
        toast.error(error?.response?.data?.message || "Registration failed. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="edu-register-wrapper">
      <Toaster position="top-center" />

      {/* Background Elements */}
      <div className="register-background-elements">
        <div className="floating-shape register-shape-1"></div>
        <div className="floating-shape register-shape-2"></div>
        <div className="floating-shape register-shape-3"></div>
        <div className="floating-shape register-shape-4"></div>
      </div>

      {/* Header Section */}
      <section className="register-hero-section">
        <div className="hero-content-container">
          <div className="hero-brand-logo">
            <FaGraduationCap size={40} />
          </div>
          <h1 className="hero-main-title">Join PV Classes</h1>
          <p className="hero-subtitle">Create your account and start your learning journey today</p>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="registration-form-section">
        <div className="form-section-container">
          <div className="registration-card">
            <div className="card-header-section">
              <div className="welcome-badge">
                <FaUser size={20} />
              </div>
              <h2 className="card-title">Create Your Account</h2>
              <p className="card-description">Fill in your details to join our educational community</p>
            </div>

            <form
              className="student-registration-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              {/* Role Selection */}
              <div className="form-field-wrapper full-width">
                <label className="field-label-text">
                  Role <span className="required-asterisk">*</span>
                </label>
                <div className="custom-select-container">
                  <select
                    name="role"
                    className={`custom-select-input ${errors.role ? "field-error" : ""}`}
                    value={formData.role || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value })
                      setIsSelectOpen(false)
                    }}
                    onFocus={() => setIsSelectOpen(true)}
                    onBlur={() => setIsSelectOpen(false)}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                  <div className="select-icon-wrapper">
                    {isSelectOpen ? (
                      <FaAngleUp className="select-dropdown-icon" />
                    ) : (
                      <FaAngleDown className="select-dropdown-icon" />
                    )}
                  </div>
                </div>
                {errors.role && <div className="field-error-message">{errors.role}</div>}
              </div>

              {/* Name Fields */}
              <div className="form-fields-row">
                <div className="form-field-wrapper half-width">
                  <label className="field-label-text">
                    First Name <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaUser className="input-field-icon" />
                    <input
                      className={`form-text-input ${errors.firstName ? "field-error" : ""}`}
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  {errors.firstName && <div className="field-error-message">{errors.firstName}</div>}
                </div>

                <div className="form-field-wrapper half-width">
                  <label className="field-label-text">
                    Last Name <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaUser className="input-field-icon" />
                    <input
                      className={`form-text-input ${errors.lastName ? "field-error" : ""}`}
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  {errors.lastName && <div className="field-error-message">{errors.lastName}</div>}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="form-fields-row">
                <div className="form-field-wrapper half-width">
                  <label className="field-label-text">
                    Email Address <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaEnvelope className="input-field-icon" />
                    <input
                      className={`form-text-input ${errors.email ? "field-error" : ""}`}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@university.edu"
                      required
                    />
                  </div>
                  {errors.email && <div className="field-error-message">{errors.email}</div>}
                </div>

                <div className="form-field-wrapper half-width">
                  <label className="field-label-text">
                    Phone Number <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaPhone className="input-field-icon" />
                    <input
                      className={`form-text-input ${errors.phone ? "field-error" : ""}`}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        const input = e.target.value
                        const onlyNumbers = input.replace(/[^0-9]/g, "")
                        if (onlyNumbers === "" || /^[6-9][0-9]{0,9}$/.test(onlyNumbers)) {
                          setFormData({ ...formData, phone: onlyNumbers })
                        }
                      }}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  {errors.phone && <div className="field-error-message">{errors.phone}</div>}
                </div>
              </div>

              {/* Password Fields */}
              <div className="form-fields-row">
                <div className="form-field-wrapper half-width">
                  <label className="field-label-text">
                    Password <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaLock className="input-field-icon" />
                    <input
                      className={`form-text-input ${errors.password ? "field-error" : ""}`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="field-error-message">{errors.password}</div>}
                </div>

                <div className="form-field-wrapper half-width">
                  <label className="field-label-text">
                    Confirm Password <span className="required-asterisk">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FaLock className="input-field-icon" />
                    <input
                      className={`form-text-input ${errors.confirmPassword ? "field-error" : ""}`}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="field-error-message">{errors.confirmPassword}</div>}
                </div>
              </div>

              {/* Bio Field */}
              <div className="form-field-wrapper full-width">
                <label className="field-label-text">Bio (Optional)</label>
                <textarea
                  className="form-textarea-input"
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  placeholder="Tell us about your educational background and interests..."
                  rows={3}
                ></textarea>
              </div>

              {/* Profile Picture */}
              <div className="form-field-wrapper full-width">
                <label className="field-label-text">Profile Picture (Optional)</label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="file-upload-input"
                    id="avatar-upload"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        avatar: e.target.files?.[0] || null,
                      })
                    }}
                  />
                  <label htmlFor="avatar-upload" className="file-upload-label">
                    <FaUpload className="upload-icon" />
                    <span className="upload-text">
                      {formData.avatar ? formData.avatar.name : "Choose profile picture"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Gender Selection */}
              <div className="form-field-wrapper full-width">
                <label className="field-label-text">
                  Gender <span className="required-asterisk">*</span>
                </label>
                <div className="gender-selection-container">
                  <label className="gender-option-label">
                    <input
                      className="gender-radio-input"
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    <span className="gender-radio-custom"></span>
                    <span className="gender-text">Male</span>
                  </label>

                  <label className="gender-option-label">
                    <input
                      className="gender-radio-input"
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    <span className="gender-radio-custom"></span>
                    <span className="gender-text">Female</span>
                  </label>

                  <label className="gender-option-label">
                    <input
                      className="gender-radio-input"
                      type="radio"
                      name="gender"
                      value="Others"
                      checked={formData.gender === "Others"}
                      onChange={handleChange}
                    />
                    <span className="gender-radio-custom"></span>
                    <span className="gender-text">Others</span>
                  </label>
                </div>
                {errors.gender && <div className="field-error-message">{errors.gender}</div>}
              </div>

              {/* Terms Agreement */}
              <div className="form-field-wrapper full-width">
                <label className="terms-agreement-label">
                  <input
                    className="terms-checkbox-input"
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <span className="terms-checkbox-custom"></span>
                  <span className="terms-text">
                    I agree to the{" "}
                    <a href="/privacy" className="terms-link">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="terms-link">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agree && <div className="field-error-message">{errors.agree}</div>}
              </div>

              {/* Submit Button */}
              <div className="form-field-wrapper full-width">
                <button type="submit" className="registration-submit-btn" disabled={isSubmitting}>
                  <span className="submit-btn-content">
                    {isSubmitting ? (
                      <>
                        <span className="submit-loading-spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <FaAngleRight className="submit-btn-icon" />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Login Link */}
              <div className="form-field-wrapper full-width text-center">
                <div className="login-redirect-text">
                  Already have an account?{" "}
                  <a href="/login" className="login-redirect-link">
                    Sign In
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <ReadyToStart />
    </div>
  )
}

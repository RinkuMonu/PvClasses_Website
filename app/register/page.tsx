"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import ReadyToStart from "@/component/ReadyToStart";
import { FaAngleDown, FaAngleUp, FaAngleRight } from "react-icons/fa";
import api from "../../utils/axios.js";
import toast, { Toaster } from "react-hot-toast";
import "./register.css";

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agree: boolean;
  role: string;
  bio: string;
  avatar: File | null;
}

interface FormErrorsType {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  agree?: string;
  role?: string;
  bio?: string;
}

export default function RegisterPage() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  interface AxiosError {
    response?: {
      data?: {
        message?: string;
      };
    };
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
  });

  const [errors, setErrors] = useState<FormErrorsType>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (name === "firstName" || name === "lastName") {
      if (/^[A-Za-z]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "phone") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, phone: value });
      }
    } else if (type === "checkbox" && target instanceof HTMLInputElement) {
      setFormData({ ...formData, [name]: target.checked });
    } else if (type === "radio") {
      setFormData({ ...formData, gender: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newErrors: FormErrorsType = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.agree) newErrors.agree = "You must agree to terms";
    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = new FormData();
      payload.append("name", `${formData.firstName} ${formData.lastName}`);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phone);
      payload.append("password", formData.password);
      payload.append("role", formData.role);
      payload.append("bio", formData.bio || "");
      payload.append("gender", formData.gender);
      if (formData.avatar) {
        payload.append("avatar", formData.avatar);
      }

      try {
        const res = await api.post("/auth/register", payload);

        if (res?.data?.success) {
          toast.success("Registration successful!");
          window.location.href = "/login";
        }
      } catch (err: unknown) {
        const error = err as AxiosError;

        toast.error(
          error?.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="page-title">
        <div className="auto-container pb-5">
          <h1 className="text-center">Create Your Account</h1>
          <p className="text-center">Join our community today</p>
        </div>
      </section>

      <section className="register-section pt-3 pb-5">
        <div className="auto-container">
          <div className="register-box shadow-sm rounded-3">
            <div className="title-box text-center mb-4">
              <div className="text">
                <span className="theme_color">Welcome!</span> Please confirm
                that you are visiting
              </div>
            </div>

            <div className="styled-form">
              <form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="row clearfix">
                  <div className="form-group col-lg-12 col-md-12 col-sm-12 position-relative mb-4">
                    <div>
                      <label className="form-label fw-bold mb-2">Role</label>
                      <span className="text-danger">*</span>
                    </div>
                    <div className="position-relative">
                      <select
                        name="role"
                        className={`form-select pe-5 ${
                          errors.role ? "is-invalid" : ""
                        }`}
                        value={formData.role || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, role: e.target.value });
                          setIsSelectOpen(false);
                        }}
                        onFocus={() => setIsSelectOpen(true)}
                        onBlur={() => setIsSelectOpen(false)}
                        required
                      >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </select>
                      {isSelectOpen ? (
                        <FaAngleUp className="position-absolute end-0 top-50 translate-middle-y me-3" />
                      ) : (
                        <FaAngleDown className="position-absolute end-0 top-50 translate-middle-y me-3" />
                      )}
                    </div>
                    {errors.role && (
                      <div className="invalid-feedback d-block">
                        {errors.role}
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div>
                        <label className="form-label fw-bold mb-2">
                          First Name
                        </label>
                        <span className="text-danger">*</span>
                      </div>

                      <input
                        className={`form-control ${
                          errors.firstName ? "is-invalid" : ""
                        }`}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div>
                        <label className="form-label fw-bold mb-2">
                          Last Name
                        </label>{" "}
                        <span className="text-danger">*</span>
                      </div>
                      <input
                        className={`form-control ${
                          errors.lastName ? "is-invalid" : ""
                        }`}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback d-block">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div>
                        <label className="form-label fw-bold mb-2">
                          Email Address
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <input
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@domain.com"
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div>
                        <label className="form-label fw-bold mb-2">
                          Phone Number
                        </label>
                        <span className="text-danger">*</span>
                      </div>
                      <input
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const input = e.target.value;
                          const onlyNumbers = input.replace(/[^0-9]/g, "");
                          if (
                            onlyNumbers === "" ||
                            /^[6-9][0-9]{0,9}$/.test(onlyNumbers)
                          ) {
                            setFormData({ ...formData, phone: onlyNumbers });
                          }
                        }}
                        placeholder="Phone Number*"
                        required
                      />
                      {errors.phone && (
                        <div className="invalid-feedback d-block">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div>
                        <label className="form-label fw-bold mb-2">
                          Password
                        </label>{" "}
                        <span className="text-danger">*</span>
                      </div>
                      <div className="position-relative">
                        <input
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                          required
                        />
                        <span className="position-absolute end-0 top-50 translate-middle-y me-3 eye-icon flaticon-eye"></span>
                      </div>
                      {errors.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-lg-6 col-md-6 col-sm-12 mb-4">
                      <div>
                        <label className="form-label fw-bold mb-2">
                          Confirm Password
                        </label>{" "}
                        <span className="text-danger">*</span>
                      </div>
                      <div className="position-relative">
                        <input
                          className={`form-control ${
                            errors.confirmPassword ? "is-invalid" : ""
                          }`}
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                        />
                        <span className="position-absolute end-0 top-50 translate-middle-y me-3 eye-icon flaticon-eye"></span>
                      </div>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12 mb-4">
                    <label className="form-label fw-bold mb-2">
                      Bio (Optional)
                    </label>
                    <textarea
                      className="form-control border-1"
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      placeholder="Tell us something about yourself..."
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12 mb-4">
                    <label className="form-label fw-bold mb-2">
                      Profile Picture (Optional)
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          avatar: e.target.files?.[0] || null,
                        });
                      }}
                    />
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 mb-4">
                    <div>
                      <label className="form-label fw-bold mb-2">Gender</label>
                      <span className="text-danger">*</span>
                    </div>
                    <div className="row">
                      <div className="col-md-2 mb-2">
                        <div className="gendar-check">
                          <input
                            className="gendar-check-input"
                            type="radio"
                            name="gender"
                            id="type-1"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="type-1">
                            Male
                          </label>
                        </div>
                      </div>
                      <div className="col-md-2 mb-2">
                        <div className="gendar-check">
                          <input
                            className="gendar-check-input"
                            type="radio"
                            name="gender"
                            id="type-2"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="type-2">
                            Female
                          </label>
                        </div>
                      </div>
                      <div className="col-md-2 mb-2">
                        <div className="gendar-check">
                          <input
                            className="gendar-check-input"
                            type="radio"
                            name="gender"
                            id="type-3"
                            value="Others"
                            checked={formData.gender === "Others"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="type-3">
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                    {errors.gender && (
                      <div className="invalid-feedback d-block">
                        {errors.gender}
                      </div>
                    )}
                  </div>

                  <div className=" col-lg-12 col-md-12 col-sm-12 mb-4 ml-4">
                    <div className="gendar-chec">
                      <input
                        className={`form-check-input ${
                          errors.agree ? "is-invalid" : ""
                        }`}
                        type="checkbox"
                        name="agree"
                        id="type-4"
                        checked={formData.agree}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="type-4">
                        I agree to the{" "}
                        <a href="/privacy" className="theme_color">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="theme_color">
                          Privacy Policy
                        </a>
                      </label>
                      {errors.agree && (
                        <div className="invalid-feedback d-block">
                          {errors.agree}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center mb-4">
                    <button
                      type="submit"
                      className="theme-btn btn-style-three w-100 py-3"
                      disabled={isSubmitting}
                    >
                      <span className="txt">
                        {isSubmitting ? "Processing..." : "Create Account"}
                        {!isSubmitting && <FaAngleRight className="ms-2" />}
                      </span>
                    </button>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                    <div className="users">
                      Already have an account?{" "}
                      <a href="/login" className="theme_color fw-bold">
                        Sign In
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ReadyToStart />
    </>
  );
}

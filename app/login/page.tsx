"use client";
import { useState } from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import ReadyToStart from "@/component/ReadyToStart";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgotPasswordModal from "@/component/ForgotpasswordModal";
import { FaAngleRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import api from "@/utils/axios";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  interface AxiosError {
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formErrors = { email: "", password: "" };

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);

    if (formErrors.email || formErrors.password) {
      setIsLoading(false);
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    try {
      const res = await api.post("/auth/login", payload);
      console.log(res.data);

      if (res?.data?.success) {
        toast.success(res.data.message || "Login successful!");
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error: unknown) {
      const err = error as AxiosError;

      toast.error(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="page-title">
        <div className="auto-container pb-3">
          <h1 className="text-center">Welcome Back</h1>
          <p className="text-center">Login to access your account</p>
        </div>
      </section>

      <section className="login-section pt-3 pb-5">
        <div className="auto-container">
          <div className="login-box shadow-sm rounded-3">
            <div className="title-box text-center mb-4">
              <div className="text">
                <span className="theme_color">Secure Login</span> Please enter
                your credentials
              </div>
            </div>

            <div className="styled-form">
              <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                  <label className="form-label fw-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4">
                  <label className="form-label fw-bold mb-2">Password</label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      required
                    />
                    <span
                      className="position-absolute end-0 top-50 translate-middle-y me-3"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="form-group mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="remember-password"
                        id="remember-me"
                        className="form-check-input"
                      />
                      <label htmlFor="remember-me" className="form-check-label">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="btn btn-link text-decoration-none theme_color p-0"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <div className="form-group text-center mb-4">
                  <button
                    type="submit"
                    className="theme-btn btn-style-three w-100 py-3"
                    disabled={isLoading}
                  >
                    <span className="txt">
                      {isLoading ? "Logging in..." : "Login"}
                      {!isLoading && <FaAngleRight className="ms-2" />}
                    </span>
                  </button>
                </div>

                <div className="form-group text-center">
                  <div className="users">
                    New User?{" "}
                    <a href="/register" className="theme_color fw-bold">
                      Sign Up
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ReadyToStart />
      <ForgotPasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

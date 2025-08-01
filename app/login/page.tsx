// "use client";
// import { useState } from "react";
// import "@/app/styles/bootstrap.css";
// import "@/app/styles/main.css";
// import "@/app/styles/responsive.css";
// import "@/app/styles/font-awesome.css";
// import ReadyToStart from "@/component/ReadyToStart";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import ForgotPasswordModal from "@/component/ForgotpasswordModal";
// import { FaAngleRight } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
// import api from "@/utils/axios";

// export default function LoginPage() {
//   const [showModal, setShowModal] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   interface AxiosError {
//     response?: {
//       data?: {
//         message?: string;
//       };
//     };
//   }

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     const formErrors = { email: "", password: "" };

//     if (!email.trim()) {
//       formErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       formErrors.email = "Please enter a valid email";
//     }

//     if (!password.trim()) {
//       formErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       formErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(formErrors);

//     if (formErrors.email || formErrors.password) {
//       setIsLoading(false);
//       return;
//     }

//     const payload = {
//       email: email,
//       password: password,
//     };

//     try {
//       const res = await api.post("/auth/login", payload);
//       // console.log(res.data);

//       if (res?.data?.success) {
//         toast.success(res.data.message || "Login successful!");
//         localStorage.setItem("token", res?.data?.token);
//         localStorage.setItem("user", JSON.stringify(res?.data?.user));
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1000);
//       }
//     } catch (error: unknown) {
//       const err = error as AxiosError;

//       toast.error(
//         err?.response?.data?.message || "Login failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//     setErrors({ ...errors, email: "" });
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//     setErrors({ ...errors, password: "" });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       <Toaster position="top-center" />
//       <section className="page-title">
//         <div className="auto-container pb-3">
//           <h1 className="text-center">Welcome Back</h1>
//           <p className="text-center">Login to access your account</p>
//         </div>
//       </section>

//       <section className="login-section pt-3 pb-5">
//         <div className="auto-container">
//           <div className="login-box shadow-sm rounded-3">
//             <div className="title-box text-center mb-4">
//               <div className="text">
//                 <span className="theme_color">Secure Login</span> Please enter
//                 your credentials
//               </div>
//             </div>

//             <div className="styled-form">
//               <form onSubmit={handleLogin}>
//                 <div className="form-group mb-4">
//                   <label className="form-label fw-bold mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     placeholder="Enter your email"
//                     className={`form-control ${
//                       errors.email ? "is-invalid" : ""
//                     }`}
//                     required
//                   />
//                   {errors.email && (
//                     <div className="invalid-feedback d-block">
//                       {errors.email}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group mb-4">
//                   <label className="form-label fw-bold mb-2">Password</label>
//                   <div className="position-relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={password}
//                       onChange={handlePasswordChange}
//                       placeholder="Enter your password"
//                       className={`form-control ${
//                         errors.password ? "is-invalid" : ""
//                       }`}
//                       required
//                     />
//                     <span
//                       className="position-absolute end-0 top-50 translate-middle-y me-3"
//                       onClick={togglePasswordVisibility}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </span>
//                   </div>
//                   {errors.password && (
//                     <div className="invalid-feedback d-block">
//                       {errors.password}
//                     </div>
//                   )}
//                 </div>

//                 <div className="form-group mb-4">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         name="remember-password"
//                         id="remember-me"
//                         className="form-check-input"
//                       />
//                       <label htmlFor="remember-me" className="form-check-label">
//                         Remember me
//                       </label>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => setShowModal(true)}
//                       className="btn btn-link text-decoration-none theme_color p-0"
//                     >
//                       Forgot Password?
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-group text-center mb-4">
//                   <button
//                     type="submit"
//                     className="theme-btn btn-style-three w-100 py-3"
//                     disabled={isLoading}
//                   >
//                     <span className="txt">
//                       {isLoading ? "Logging in..." : "Login"}
//                       {!isLoading && <FaAngleRight className="ms-2" />}
//                     </span>
//                   </button>
//                 </div>

//                 <div className="form-group text-center">
//                   <div className="users">
//                     New User?{" "}
//                     <a href="/register" className="theme_color fw-bold">
//                       Sign Up
//                     </a>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ReadyToStart />
//       <ForgotPasswordModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//       />
//     </>
//   );
// }





"use client";
import { useState } from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";
import ReadyToStart from "@/component/ReadyToStart";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";
import ForgotPasswordModal from "@/component/ForgotpasswordModal";
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
      if (res?.data?.success) {
        toast.success(res.data.message || "Login successful!");
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        setTimeout(() => {
          window.location.href = "/userProfile";
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
    <div className="modern-login-container">
      <Toaster position="top-center" />
      
      <div className="login-layout">
        {/* Left Decorative Panel */}
        <div className="login-panel">
          <div className="panel-content">
            <div className="logo-placeholder">
              {/* <div className="logo-circle"></div> */}
            </div>
            <h2>Welcome Back!</h2>
            <p>Sign in to access your personalized dashboard and continue your journey with us.</p>
            <div className="graphic-element">
              <div className="circle c1"></div>
              <div className="circle c2"></div>
              <div className="circle c3"></div>
            </div>
          </div>
        </div>
        
        {/* Right Form Panel */}
        <div className="form-panel">
          <div className="form-container">
            <div className="form-header">
              <div className="lock-icon">
                <FaLock size={24} />
              </div>
              <h2>Sign In to Your Account</h2>
              <p>Enter your credentials to continue</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <div className="input-icon">
                  <FaEnvelope />
                </div>
                <div className="input-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>
              </div>
              
              <div className="input-group">
                <div className="input-icon">
                  <FaLock />
                </div>
                <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className={errors.password ? "error" : ""}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="error-message">{errors.password}</div>
                  )}
                </div>
              </div>
              
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" id="remember-me" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => setShowModal(true)}
                >
                  Forgot Password?
                </button>
              </div>
              
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  "Sign In"
                )}
              </button>
              
              <div className="divider">
                <span>or</span>
              </div>
              
              <div className="signup-link">
                <FaUserPlus className="icon" />
                <span>Don't have an account? <a href="/register">Create account</a></span>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <ReadyToStart />
      <ForgotPasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      
      <style jsx global>{`
        .modern-login-container {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background-color: #f8faff;
          min-height: 100vh;
          display: flex;
          margin-top: 120px;
          flex-direction: column;
        }
        
        .login-layout {
          display: flex;
          min-height: calc(100vh - 80px);
        }
        
        .login-panel {
          flex: 1;
          background: linear-gradient(135deg, #233dffff 0%, #b6d9ffff 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .panel-content {
          max-width: 500px;
          z-index: 2;
          text-align: center;
        }
        
        .panel-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .panel-content p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .logo-placeholder {
          margin-bottom: 40px;
        }
        
        .logo-circle {
          width: 100px;
          height: 100px;
          border: 3px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
        }
        
        .graphic-element {
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
        }
        
        .circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(79, 111, 255, 0.1);
        }
        
        .circle.c1 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          right: -150px;
        }
        
        .circle.c2 {
          width: 200px;
          height: 200px;
          bottom: -100px;
          right: -100px;
        }
        
        .circle.c3 {
          width: 100px;
          height: 100px;
          bottom: -50px;
          right: -50px;
        }
        
        .form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: white;
        }
        
        .form-container {
          max-width: 450px;
          width: 100%;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .lock-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f8faff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #3b54f9ff;
        }
        
        .form-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
        }
        
        .form-header p {
          color: #3b54f9ff;
          font-size: 1rem;
        }
        
        .login-form {
          width: 100%;
        }
        
        .input-group {
          display: flex;
          margin-bottom: 25px;
          position: relative;
        }
        
        .input-icon {
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8faff;
          border: 1px solid #e2e8f0;
          border-right: none;
          border-radius: 8px 0 0 8px;
          color: #3b54f9ff;
        }
        
        .input-field {
          flex: 1;
        }
        
        .input-field label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
          color: #2d3748;
          font-size: 0.9rem;
        }
        
        .input-field input {
          width: 100%;
          padding: 14px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 0 8px 8px 0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .input-field input:focus {
          border-color: #3b54f9ff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(171, 101, 69, 0.15);
        }
        
        .input-field input.error {
          border-color: #e53e3e;
        }
        
        .error-message {
          color: #e53e3e;
          font-size: 0.85rem;
          margin-top: 6px;
        }
        
        .password-wrapper {
          position: relative;
        }
        
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #3b54f9ff;
          cursor: pointer;
          padding: 5px;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
          color: #4a5568;
          font-size: 0.95rem;
          cursor: pointer;
        }
        
        .remember-me input {
          margin-right: 8px;
          width: 16px;
          height: 16px;
          accent-color: #3b54f9ff;
        }
        
        .forgot-password {
          background: none;
          border: none;
          color: #3b54f9ff;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .forgot-password:hover {
          color: #8a4f32;
          text-decoration: underline;
        }
        
        .login-button {
          width: 100%;
          padding: 16px;
          background: linear-gradient(to right, #3b54f9ff, #0055ffff);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .login-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 14px rgba(171, 101, 69, 0.25);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 30px 0;
          color: #3b54f9ff;
        }
        
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .divider span {
          padding: 0 15px;
          font-size: 0.9rem;
        }
        
        .signup-link {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          color: #3b54f9ff;
          font-size: 1rem;
        }
        
        .signup-link a {
          color: #3b54f9ff;
          font-weight: 600;
          text-decoration: none;
        }
        
        .signup-link a:hover {
          text-decoration: underline;
        }
        
        .signup-link .icon {
          color: #3b54f9ff;
        }
        
        @media (max-width: 992px) {
          .login-layout {
            flex-direction: column;
          }
          
          .login-panel {
            padding: 30px 20px;
          }
          
          .panel-content {
            max-width: 100%;
          }
          
          .panel-content h2 {
            font-size: 2rem;
          }
          
          .form-panel {
            padding: 40px 20px;
          }
        }
        
        @media (max-width: 576px) {
          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .panel-content h2 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
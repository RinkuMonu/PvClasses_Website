// "use client";

// import React, { useState, ChangeEvent, FormEvent } from "react";
// import "@/app/styles/bootstrap.css";
// import "@/app/styles/main.css";
// import "@/app/styles/responsive.css";
// import "@/app/styles/font-awesome.css";

// import { FaArrowRight, FaPhoneAlt, FaHandshake } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { FaHouse } from "react-icons/fa6";
// import toast, { Toaster } from "react-hot-toast";
// import api from "@/utils/axios";

// type FormData = {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   message: string;
// };

// export default function ContactPage() {
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const { fullName, email, phoneNumber, message } = formData;
//     if (!fullName || !email || !phoneNumber || !message) {
//       toast.error("All fields are required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/query/send-query", formData);

//       if (res.data?.success) {
//         setShowModal(true);
//         setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
//       } else {
//         toast.error(res.data?.message || "Failed to send message.");
//       }
//     } catch {
//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <section
//         className="page-title"
//         style={{ backgroundImage: "url(/assets/images/background/11.jpg)" }}
//       >
//         <div className="auto-container">
//           <h1>Contact Us</h1>
//         </div>
//       </section>

//       <section className="contact-page-section">
//         <div className="auto-container">
//           <div className="inner-container">
//             <div className="sec-title centered">
//               <h2>
//                 <FaHandshake className="me-3 mb-1" /> Get in touch
//               </h2>
//             </div>

//             <form className="contact-form" onSubmit={handleSubmit}>
//               <div className="row clearfix">
//                 <div className="col-lg-6 col-md-6 col-sm-12 form-group">
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={(e) => {
//                       const onlyLetters = e.target.value.replace(
//                         /[^a-zA-Z\s]/g,
//                         ""
//                       ); // Allow letters and space
//                       setFormData({ ...formData, fullName: onlyLetters });
//                     }}
//                     placeholder="Full Name*"
//                     required
//                   />
//                 </div>

//                 <div className="col-lg-6 col-md-6 col-sm-12 form-group">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email Address*"
//                     required
//                   />
//                 </div>

//                 <div className="col-lg-6 col-md-6 col-sm-12 form-group">
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       const onlyNumbers = value.replace(/[^0-9]/g, "");
//                       if (
//                         onlyNumbers === "" ||
//                         /^[6-9][0-9]{0,9}$/.test(onlyNumbers)
//                       ) {
//                         setFormData({ ...formData, phoneNumber: onlyNumbers });
//                       }
//                     }}
//                     placeholder="Phone Number*"
//                     required
//                   />
//                 </div>

//                 <div className="col-lg-12 col-md-12 col-sm-12 form-group">
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Send Message"
//                     required
//                   ></textarea>
//                 </div>

//                 <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
//                   <button
//                     className="theme-btn btn-style-three"
//                     type="submit"
//                     disabled={loading}
//                   >
//                     <span className="txt">
//                       {loading ? "Sending..." : "Send Message"} <FaArrowRight />
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>

//           <div className="contact-info-section">
//             <div className="row clearfix">
//               <div className="info-column col-lg-4 col-md-6 col-sm-12">
//                 <div className="inner-box">
//                   <div className="icon-box">
//                     <FaHouse />
//                   </div>
//                   <h6>Office</h6>
//                   <p>
//                     Plot no. 308, Pratap Nagar,
//                     <br />
//                     Jaipur, Rajasthan - 302033
//                   </p>
//                 </div>
//               </div>

//               <div className="info-column col-lg-4 col-md-6 col-sm-12">
//                 <div className="inner-box">
//                   <div className="icon-box">
//                     <MdEmail />
//                   </div>
//                   <h6>Email</h6>
//                   <p>
//                     <a href="mailto:support@abdks.in">support@abdks.in</a>
//                   </p>
//                 </div>
//               </div>

//               <div className="info-column col-lg-4 col-md-6 col-sm-12">
//                 <div className="inner-box">
//                   <div className="icon-box">
//                     <FaPhoneAlt />
//                   </div>
//                   <h6>Call Us</h6>
//                   <p>
//                     <a href="tel:+918058993661">+91-8058993661</a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="map-boxed">
//             <div className="map-outer">
//               <iframe
//                 title="Location Map"
//                 width="100%"
//                 height="400"
//                 frameBorder="0"
//                 src="https://www.google.com/maps?q=Pratap+Nagar,+Jaipur,+Rajasthan&output=embed"
//                 allowFullScreen
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </section>
//       {showModal && (
//         <div className="modal-over">
//           <div className="modal-content">
//             <h4>Thank You!</h4>
//             <p>Our team will contact you soon.</p>
//             <button onClick={() => setShowModal(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .modal-over {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.4);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 10000;
//         }
//         .modal-content {
//           background: #fff;
//           padding: 50px 30px;
//           border-radius: 10px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
//           max-width: 400px;
//         }
//         .modal-content button {
//           margin-top: 15px;
//           background: #333;
//           color: #fff;
//           padding: 8px 16px;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//       `}</style>
//     </>
//   );
// }






"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaArrowRight, FaPhoneAlt, FaHandshake, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaHouse } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import api from "@/utils/axios";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({...prev, [name]: ""}));
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^[6-9][0-9]{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid Indian phone number";
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message is too short";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/query/send-query", formData);

      if (res.data?.success) {
        setShowModal(true);
        setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
      } else {
        toast.error(res.data?.message || "Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Toaster />
      
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you. Reach out with any questions or feedback.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container contact-container">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-card">
            <div className="form-header">
              <FaPaperPlane className="form-icon" />
              <h2>Send us a message</h2>
              <p>Fill out the form and we'll get back to you soon</p>
            </div>
            
            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => {
                    const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                    setFormData({ ...formData, fullName: onlyLetters });
                  }}
                  placeholder="John Doe"
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && <div className="error-message">{errors.fullName}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyNumbers = value.replace(/[^0-9]/g, "");
                      if (onlyNumbers === "" || /^[6-9][0-9]{0,9}$/.test(onlyNumbers)) {
                        setFormData({ ...formData, phoneNumber: onlyNumbers });
                      }
                    }}
                    placeholder="+91 1234567890"
                    className={errors.phoneNumber ? "error" : ""}
                  />
                  {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className={errors.message ? "error" : ""}
                ></textarea>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? (
                  <span className="loading-spinner">
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <FaArrowRight className="arrow-icon" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>
                  Plot no. 308, Pratap Nagar,
                  <br />
                  Jaipur, Rajasthan - 302033
                </p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <MdEmail />
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <a href="mailto:support@abdks.in">support@abdks.in</a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>
              <div className="info-content">
                <h3>Call Us</h3>
                <a href="tel:+918058993661">+91-8058993661</a>
              </div>
            </div>
            
            <div className="map-container">
              <h3>Find Us on Map</h3>
              <div className="map-outer">
                <iframe
                  title="Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps?q=Pratap+Nagar,+Jaipur,+Rajasthan&output=embed"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="modal-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </svg>
            </div>
            <h4>Thank You!</h4>
            <p>Our team will contact you soon.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Global Contact Page Styles */
        .contact-page {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background-color: #f8faff;
          color: #333;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Hero Section */
        .contact-hero {
          background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .contact-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233a56e6' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.2;
        }
        
        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
        }
        
        .hero-content p {
          font-size: 1.25rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.9;
        }
        
        /* Main Container */
        .contact-container {
          padding: 80px 0;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        
        @media (min-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }
        }
        
        /* Contact Form Card */
        .contact-form-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(73, 93, 207, 0.1);
          padding: 40px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .contact-form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #4f6df5, #3a56e6);
          z-index: 2;
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .form-icon {
          font-size: 3rem;
          color: #4f6df5;
          margin-bottom: 15px;
          background: rgba(79, 109, 245, 0.1);
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 20px;
        }
        
        .form-header h2 {
          font-size: 2rem;
          margin-bottom: 10px;
          color: #1a237e;
        }
        
        .form-header p {
          color: #666;
          font-size: 1.1rem;
        }
        
        /* Form Styles */
        .modern-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .form-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .form-row .form-group {
          flex: 1;
          min-width: 250px;
        }
        
        .form-group {
          position: relative;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 16px 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #f9fbfd;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f6df5;
          box-shadow: 0 0 0 3px rgba(79, 109, 245, 0.2);
          background-color: white;
        }
        
        .form-group input.error,
        .form-group textarea.error {
          border-color: #ff4d4f;
        }
        
        .error-message {
          color: #ff4d4f;
          font-size: 0.85rem;
          margin-top: 6px;
          font-weight: 500;
        }
        
        .submit-btn {
          background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 18px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(79, 109, 245, 0.3);
        }
        
        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(79, 109, 245, 0.4);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 5px 15px rgba(79, 109, 245, 0.2);
        }
        
        .arrow-icon {
          transition: transform 0.3s ease;
        }
        
        .submit-btn:hover .arrow-icon {
          transform: translateX(5px);
        }
        
        /* Loading Spinner */
        .loading-spinner {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .spinner {
          animation: rotate 1.5s linear infinite;
          width: 24px;
          height: 24px;
        }
        
        .spinner .path {
          stroke: white;
          stroke-linecap: round;
          animation: dash 1.5s ease-in-out infinite;
        }
        
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
        
        /* Contact Info Section */
        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        
        .info-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          box-shadow: 0 10px 30px rgba(73, 93, 207, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #f0f3ff;
        }
        
        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(73, 93, 207, 0.15);
          border-color: #e1e8ff;
        }
        
        .info-icon {
          background: rgba(79, 109, 245, 0.1);
          color: #4f6df5;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .info-content h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: #1a237e;
        }
        
        .info-content p,
        .info-content a {
          color: #555;
          line-height: 1.6;
          font-size: 1.05rem;
        }
        
        .info-content a {
          color: #4f6df5;
          text-decoration: none;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        
        .info-content a:hover {
          color: #3a56e6;
          text-decoration: underline;
        }
        
        /* Map Section */
        .map-container {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(73, 93, 207, 0.08);
          margin-top: 10px;
        }
        
        .map-container h3 {
          padding: 20px 25px;
          margin: 0;
          font-size: 1.25rem;
          color: #1a237e;
          border-bottom: 1px solid #f0f3ff;
        }
        
        .map-outer {
          height: 300px;
          position: relative;
        }
        
        .map-outer iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        
        /* Success Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease;
        }
        
        .success-modal {
          background: white;
          border-radius: 20px;
          padding: 50px 40px 40px;
          text-align: center;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          position: relative;
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .modal-icon {
          width: 80px;
          height: 80px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
        }
        
        .modal-icon svg {
          width: 50px;
          height: 50px;
          fill: #4caf50;
        }
        
        .success-modal h4 {
          font-size: 2rem;
          margin-bottom: 15px;
          color: #1a237e;
        }
        
        .success-modal p {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }
        
        .success-modal button {
          background: linear-gradient(135deg, #4f6df5 0%, #3a56e6 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 14px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(79, 109, 245, 0.3);
        }
        
        .success-modal button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(79, 109, 245, 0.4);
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
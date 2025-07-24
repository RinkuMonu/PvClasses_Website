"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";

import { FaArrowRight, FaPhoneAlt, FaHandshake } from "react-icons/fa";
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

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, message } = formData;
    if (!fullName || !email || !phoneNumber || !message) {
      toast.error("All fields are required.");
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
    <>
      <Toaster />
      <section
        className="page-title"
        style={{ backgroundImage: "url(/assets/images/background/11.jpg)" }}
      >
        <div className="auto-container">
          <h1>Contact Us</h1>
        </div>
      </section>

      <section className="contact-page-section">
        <div className="auto-container">
          <div className="inner-container">
            <div className="sec-title centered">
              <h2>
                <FaHandshake className="me-3 mb-1" /> Get in touch
              </h2>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      const onlyLetters = e.target.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      ); // Allow letters and space
                      setFormData({ ...formData, fullName: onlyLetters });
                    }}
                    placeholder="Full Name*"
                    required
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address*"
                    required
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      const onlyNumbers = value.replace(/[^0-9]/g, "");
                      if (
                        onlyNumbers === "" ||
                        /^[6-9][0-9]{0,9}$/.test(onlyNumbers)
                      ) {
                        setFormData({ ...formData, phoneNumber: onlyNumbers });
                      }
                    }}
                    placeholder="Phone Number*"
                    required
                  />
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Send Message"
                    required
                  ></textarea>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 form-group text-right">
                  <button
                    className="theme-btn btn-style-three"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="txt">
                      {loading ? "Sending..." : "Send Message"} <FaArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="row clearfix">
              <div className="info-column col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <FaHouse />
                  </div>
                  <h6>Office</h6>
                  <p>
                    Plot no. 308, Pratap Nagar,
                    <br />
                    Jaipur, Rajasthan - 302033
                  </p>
                </div>
              </div>

              <div className="info-column col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <MdEmail />
                  </div>
                  <h6>Email</h6>
                  <p>
                    <a href="mailto:support@abdks.in">support@abdks.in</a>
                  </p>
                </div>
              </div>

              <div className="info-column col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="icon-box">
                    <FaPhoneAlt />
                  </div>
                  <h6>Call Us</h6>
                  <p>
                    <a href="tel:+918058993661">+91-8058993661</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="map-boxed">
            <div className="map-outer">
              <iframe
                title="Location Map"
                width="100%"
                height="400"
                frameBorder="0"
                src="https://www.google.com/maps?q=Pratap+Nagar,+Jaipur,+Rajasthan&output=embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div className="modal-over">
          <div className="modal-content">
            <h4>Thank You!</h4>
            <p>Our team will contact you soon.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-over {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .modal-content {
          background: #fff;
          padding: 50px 30px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          max-width: 400px;
        }
        .modal-content button {
          margin-top: 15px;
          background: #333;
          color: #fff;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

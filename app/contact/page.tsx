"use client"
import { useState, type ChangeEvent, type FormEvent } from "react"
import "@/app/styles/bootstrap.css"
import "@/app/styles/main.css"
import "@/app/styles/responsive.css"
import "@/app/styles/font-awesome.css"
import "@/app/styles/education-contact.css"
import { FaArrowRight, FaPhoneAlt, FaHandshake } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FaHouse } from "react-icons/fa6"
import toast, { Toaster } from "react-hot-toast"
import api from "@/utils/axios"

type FormData = {
  fullName: string
  email: string
  phoneNumber: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { fullName, email, phoneNumber, message } = formData

    if (!fullName || !email || !phoneNumber || !message) {
      toast.error("All fields are required.")
      return
    }

    setLoading(true)
    try {
      const res = await api.post("/query/send-query", formData)
      if (res.data?.success) {
        setShowModal(true)
        setFormData({ fullName: "", email: "", phoneNumber: "", message: "" })
      } else {
        toast.error(res.data?.message || "Failed to send message.")
      }
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" />

      {/* Compact Header */}
  

      {/* Split Layout Main Section */}
      <section className="contact-page-section">
        <div className="contact-split-container">
          {/* Left Side - Contact Form */}
          <div className="contact-form-side">
            <div className="form-header">
              <h2>
                <FaHandshake style={{ color: "#87b105", marginRight: "15px" }} />
                Send us a Message
              </h2>
              <p>
                Ready to start your educational journey? Fill out the form below and our team will get back to you
                within 24 hours.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, "")
                      setFormData({ ...formData, fullName: onlyLetters })
                    }}
                    placeholder="Your Full Name *"
                    required
                  />
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value
                      const onlyNumbers = value.replace(/[^0-9]/g, "")
                      if (onlyNumbers === "" || /^[6-9][0-9]{0,9}$/.test(onlyNumbers)) {
                        setFormData({ ...formData, phoneNumber: onlyNumbers })
                      }
                    }}
                    placeholder="Phone Number *"
                    required
                  />
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-field">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your educational goals and how we can help you achieve them..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="submit-section">
                <button className="theme-btn btn-style-three" type="submit" disabled={loading}>
                  <span className="txt">
                    {loading ? "Sending Your Message..." : "Send Message"} <FaArrowRight />
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Contact Info & Map */}
          <div className="contact-info-side">
            <div className="info-header">
              <h3>Get in Touch with PV Classes</h3>
              <p>
                We're here to support your educational journey. Reach out to us through any of the channels below, and
                let's discuss how we can help you achieve your learning goals.
              </p>
            </div>

            <div className="contact-info-cards">
              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">
                    <FaHouse />
                  </div>
                  <h4>Visit Our Campus</h4>
                </div>
                <p>
                  Plot no. 308, Pratap Nagar,
                  <br />
                  Jaipur, Rajasthan - 302033
                  <br />
                  <small style={{ color: "#87b105" }}>Open Mon-Sat: 9:00 AM - 7:00 PM</small>
                </p>
              </div>

              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">
                    <MdEmail />
                  </div>
                  <h4>Email Support</h4>
                </div>
                <p>
                  <a href="mailto:support@abdks.in">support@abdks.in</a>
                  <br />
                  <small style={{ color: "#87b105" }}>Response within 24 hours</small>
                </p>
              </div>

              <div className="info-card">
                <div className="info-card-header">
                  <div className="info-icon">
                    <FaPhoneAlt />
                  </div>
                  <h4>Call Us Now</h4>
                </div>
                <p>
                  <a href="tel:+918058993661">+91-8058993661</a>
                  <br />
                  <small style={{ color: "#87b105" }}>Available Mon-Fri: 9:00 AM - 6:00 PM</small>
                </p>
              </div>
            </div>

            <div className="compact-map">
              <iframe
                title="PV Classes Location"
                width="100%"
                height="200"
                frameBorder="0"
                src="https://www.google.com/maps?q=Pratap+Nagar,+Jaipur,+Rajasthan&output=embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Success Modal */}
      {showModal && (
        <div className="modal-over">
          <div className="modal-content">
            <h4>Message Sent Successfully! 🎓</h4>
            <p>
              Thank you for reaching out to PV Classes! Our education specialists will review your message and contact
              you within 24 hours to discuss your learning journey.
            </p>
            <button onClick={() => setShowModal(false)}>Continue Exploring</button>
          </div>
        </div>
      )}
    </>
  )
}

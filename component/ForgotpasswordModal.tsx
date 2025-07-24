"use client"
import React, { useEffect, useState } from "react"


const ForgotPasswordModal = (
    {
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [stage, setStage] = useState<"email" | "password">("email")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleSubmit = () => {
    if (stage === "email") {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.")
        return
      }
      setEmailError("")
      setStage("password")
    } else {
      if (!validatePassword(newPassword)) {
        setPasswordError("Password must be at least 6 characters.")
        return
      }
      setPasswordError("")
      console.log("Reset for:", email, "→", newPassword)
      setEmail("")
      setNewPassword("")
      setStage("email")
      onClose()
    }
  }

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header border-0">
            <h5 className="modal-title">
              {stage === "email" ? "Forgot Password" : "Set New Password"}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {stage === "email" ? (
              <>
                <p className="text-muted small mb-2">Enter your registered email:</p>
                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError("")
                  }}
                />
                {emailError && (
                  <div className="text-danger small mt-1">{emailError}</div>
                )}
              </>
            ) : (
              <>
                <p className="text-muted small mb-2">
                  Enter a new password for <strong>{email}</strong>:
                </p>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setPasswordError("")
                  }}
                />
                {passwordError && (
                  <div className="text-danger small mt-1">{passwordError}</div>
                )}
              </>
            )}
          </div>

          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-success w-100"
              onClick={handleSubmit}
            >
              {stage === "email" ? "Verify Email" : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordModal

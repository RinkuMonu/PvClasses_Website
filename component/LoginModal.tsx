"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = () => {
    let formErrors = { username: "", password: "" };

    if (!/^[A-Za-z]+$/.test(username)) {
      formErrors.username = "Username must contain only letters";
    }

    if (password.trim() === "") {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    if (!formErrors.username && !formErrors.password) {
      router.push("/dashboard");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z]*$/.test(value)) {
      setUsername(value);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section className="login-section pt-5">
      <div className="auto-container">
        <div className="login-box">
          <div className="title-box">
            <div className="text">
              <span className="theme_color">Welcome!</span> Please confirm that
              you are visiting
            </div>
          </div>

          <div className="styled-form">
            <form method="post" action="/index">
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="User Name"
                  className="bg-white"
                  required
                />
                {errors.username && (
                  <small style={{ color: "red" }}>{errors.username}</small>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <span className="eye-icon flaticon-eye"></span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="bg-white"
                  required
                />
                {errors.password && (
                  <small style={{ color: "red" }}>{errors.password}</small>
                )}
              </div>
              <div className="form-group">
                <div className="clearfix">
                  <div className="pull-left">
                    <div className="check-box">
                      <input
                        type="checkbox"
                        name="remember-password"
                        id="type-1"
                      />
                      <label htmlFor="type-1">Remember Password</label>
                    </div>
                  </div>
                  <div className="pull-right">
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-success bg-white"
                    >
                      Forget Password?
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group text-center">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="theme-btn btn-style-three"
                >
                  <span className="txt">
                    Login <i className="fa fa-angle-right"></i>
                  </span>
                </button>
              </div>
              <div className="form-group">
                <div className="users">
                  New User? <a href="/register">Sign Up</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;

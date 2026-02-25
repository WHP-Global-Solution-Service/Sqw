// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPasswordAPI } from "../api/auth";
import "../css/Login.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const emailParam = query.get("email");
  const otpParam = query.get("otp");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      await resetPasswordAPI({
        email: emailParam,
        otp: otpParam,
        password,
        confirmPassword: confirm
      });

      navigate("/reset-password-success");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <div className="login-logo">SQW</div>

          <div className="login-form-block">
            <h1 className="login-title">Create new password</h1>
            <p className="login-subtitle">
              Your new password must be different from previously used passwords
            </p>

            <form onSubmit={handleSubmit}>
              <label className="login-label">New Password</label>
                <div className="password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((p) => !p)}
                    >
                        {showPassword
                        ? <AiOutlineEyeInvisible size={18}/>
                        : <AiOutlineEye size={18}/>
                        }
                    </button>
                </div>


              <label className="login-label">Confirm Password</label>
                <div className="password-group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="password-input"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                    >
                        {showConfirmPassword
                        ? <AiOutlineEyeInvisible size={18}/>
                        : <AiOutlineEye size={18}/>
                        }
                    </button>
                </div>
              <button className="signin-btn" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>

        <div className="login-right">
          <img src="/login-bg.jpg" alt="bg" className="login-image" />
        </div>
      </div>
    </div>
  );
}

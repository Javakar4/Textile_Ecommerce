import React, { useState, useEffect } from "react";
import useAuthService from "../hooks/useAuthService";
import Loader from "../components/common/Loader";
import endPoints  from "@config/constants";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const {
    signup,
    login,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    loading,
  } = useAuthService();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (isSignup && !passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 chars, include uppercase, lowercase, number, and special char.";
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (isSignup && (!formData.name || formData.name.length < 3)) {
      newErrors.name = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -- FORGOT PASSWORD FLOW --
    if (showForgotPassword) {
      if (!formData.email) {
        setErrors({ email: "Email is required" });
        return;
      }
      const res = await forgotPassword(formData.email);
      if (res.ok) {
        setShowForgotPassword(false);
        setShowResetPassword(true);
        setFormData({ ...formData, otp: "" });
        setTimer(10);
        setCanResend(false);
      }
      return;
    }

    // -- RESET PASSWORD FLOW --
    if (showResetPassword) {
      if (!formData.otp || formData.otp.length < 6) {
        setErrors({ otp: "Please enter a valid 6-digit OTP" });
        return;
      }
      if (!formData.password) {
        setErrors({ password: "New password is required" });
        return;
      }
      const res = await resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.password,
      });
      if (res.ok) {
        setShowResetPassword(false);
        // Redirect to login or auto-login? Let's go to login view
        setIsSignup(false);
        setFormData({ ...formData, password: "", otp: "" });
      }
      return;
    }

    // -- VERIFY OTP FLOW --
    if (showOtp) {
      if (!formData.otp || formData.otp.length < 6) {
        setErrors({ otp: "Please enter a valid 6-digit OTP" });
        return;
      }
      const res = await verifyOtp({ email: formData.email, otp: formData.otp });
      if (res.ok) {
        setShowOtp(false);
        setIsSignup(false);
        setFormData({ ...formData, otp: "" });
      }
      return;
    }

    if (!validate()) return;

    if (isSignup) {
      const res = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (res.ok) {
        setShowOtp(true);
        setTimer(10);
        setCanResend(false);
      }
    } else {
      await login({ email: formData.email, password: formData.password });
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    const res = await resendOtp(formData.email);
    if (res.ok) {
      setTimer(10);
      setCanResend(false);
    }
  };

  const handleResendForgot = async () => {
    if (!canResend) return;
    // reusing forgotPassword to resend OTP
    const res = await forgotPassword(formData.email);
    if (res.ok) {
      setTimer(10);
      setCanResend(false);
    }
  };

  return (
    <div className="flex h-[700px] w-full mt-7">
      {loading && <Loader />}
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full object-cover w-full"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">
            {showResetPassword
              ? "Reset Password"
              : showForgotPassword
                ? "Forgot Password"
                : showOtp
                  ? "Verify Email"
                  : isSignup
                    ? "Sign up"
                    : "Sign in"}
          </h2>

          <p className="text-sm text-gray-500/90 mt-3 text-center">
            {showResetPassword
              ? "Enter OTP and your new password"
              : showForgotPassword
                ? "Enter your email to receive an OTP"
                : showOtp
                  ? `Enter the OTP sent to ${formData.email}`
                  : isSignup
                    ? "Create a new account to get started"
                    : "Welcome back! Please sign in to continue"}
          </p>

          {!isSignup && !showOtp && !showForgotPassword && !showResetPassword && (
            <button
              type="button"
              onClick={() => {
                // Redirect to server OAuth endpoint
                window.location.href = `${endPoints.BASE_URL}${endPoints.AUTH.GOOGLE_AUTH_ENDPOINT}`;
              }}
              className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full hover:bg-gray-500/20 transition-colors"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
            </button>
          )}

          {!isSignup && !showOtp && !showForgotPassword && !showResetPassword && (
            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-gray-500/90 text-center">
                or sign in with email
              </p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>
          )}

          {!showOtp && !showForgotPassword && !showResetPassword && (
            <>
              {isSignup && (
                <>
                  <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-3 mb-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="User name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                      required
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs ml-6 mt-1 mb-2 text-left w-full">{errors.name}</p>}
                </>
              )}

              <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email id"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs ml-6 mt-1 mb-2 text-left w-full">{errors.email}</p>}

              <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs ml-6 mt-1 mb-2 text-left w-full">{errors.password}</p>}

              {isSignup && (
                <>
                  <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                      required
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs ml-6 mt-1 mb-2 text-left w-full">{errors.confirmPassword}</p>}
                </>
              )}
            </>
          )}

          {/* FORGOT PASSWORD EMAIL INPUT */}
          {showForgotPassword && !showResetPassword && (
             <>
               <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs ml-6 mt-1 mb-2 text-left w-full">{errors.email}</p>}
             </>
          )}

          {/* RESET PASSWORD INPUTS */}
           {showResetPassword && (
            <div className="flex flex-col items-center w-full gap-4 mt-8">
               <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                  maxLength={6}
                />
              </div>
              {errors.otp && <p className="text-red-500 text-xs text-center w-full">{errors.otp}</p>}

              <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs text-center w-full">{errors.password}</p>}
              
              <button
                type="button"
                onClick={handleResendForgot}
                disabled={!canResend}
                className={`text-sm mt-2 ${canResend ? "text-indigo-500 hover:underline" : "text-gray-400 cursor-not-allowed"}`}
              >
                {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
              </button>
            </div>
          )}

          {showOtp && (
            <div className="flex flex-col items-center w-full gap-4 mt-8">
              <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                  maxLength={6}
                />
              </div>
              {errors.otp && <p className="text-red-500 text-xs text-center w-full">{errors.otp}</p>}
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm ${canResend ? "text-indigo-500 hover:underline" : "text-gray-400 cursor-not-allowed"}`}
              >
                {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
              </button>
            </div>
          )}

          {!isSignup && !showOtp && !showForgotPassword && !showResetPassword && (
            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="checkbox" />
                <label className="text-sm" htmlFor="checkbox">
                  Remember me
                </label>
              </div>
              <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading
              ? "Processing..."
              : showResetPassword
                ? "Reset Password"
                : showForgotPassword
                  ? "Send OTP"
                  : showOtp
                    ? "Verify"
                    : isSignup
                      ? "Sign up"
                      : "Login"}
          </button>

          {!showOtp && !showForgotPassword && !showResetPassword && (
            <p className="text-gray-500/90 text-sm mt-4">
              {isSignup ? (
                <>
                  Click here to{" "}
                  <button
                    type="button"
                    className="text-indigo-400 hover:underline"
                    onClick={() => setIsSignup(false)}
                  >
                    login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="text-indigo-400 hover:underline"
                    onClick={() => setIsSignup(true)}
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          )}

          {(showOtp || showForgotPassword || showResetPassword) && (
            <button
              type="button"
              className="text-gray-400 text-sm mt-4 hover:underline"
              onClick={() => {
                setShowOtp(false);
                setShowForgotPassword(false);
                setShowResetPassword(false);
              }}
            >
              {showResetPassword ? "Back to Login" : "Back to Login"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({
        text: "Please enter your email address",
        type: "error",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: "Please enter a valid email address",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.httpStatus === "OK") {
        setMessage({
          text: data.message || "Password reset code has been sent",
          type: "success",
        });
      } else {
        setMessage({
          text: data.message || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again later.",
        type: "error",
      });
      console.error("Forgot password error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">Reset Password</h1>

              {message.text && (
                <div
                  className={`alert ${
                    message.type === "success"
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
                  {message.text}
                </div>
              )}

              <p className="text-center mb-4">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Reset Password"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Remember your password?{" "}
                  <Link href="/login" className="text-decoration-none">
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

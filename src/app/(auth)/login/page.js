"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { formatPhoneNumber } from "../../../lib/helpers";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { login, error: authError, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setFormData({
      ...formData,
      phoneNumber: formattedValue,
    });

    if (errors.phoneNumber) {
      setErrors({
        ...errors,
        phoneNumber: null,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginError(null);

    const result = await login(formData.phoneNumber, formData.password);

    if (result.success) {
      router.push("/");
    } else {
      setLoginError(
        result.error || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">Sign In</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="(123) 456-7890"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    required
                  />
                  {errors.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3 text-end">
                  <Link
                    href="/forgot-password"
                    className="text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {(loginError || authError) && (
                  <div className="alert alert-danger" role="alert">
                    {loginError || authError}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={authLoading}
                  >
                    {authLoading ? "Signing In..." : "Sign In"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Don't have an account?{" "}
                  <Link href="/register" className="text-decoration-none">
                    Create Account
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { formatPhoneNumber } from "../../../lib/helpers";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "MALE",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError(null);
    setApiSuccess(null);

    const registrationData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    };

    const result = await register(registrationData);

    if (result.success) {
      setApiSuccess(result.data.message || "Kullanıcı başarıyla oluşturuldu");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setApiError(
        result.error || "Kayıt başarısız oldu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div className="container py-5 vh-100">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">Hesap Oluştur</h1>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstname" className="form-label">
                      Ad
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.firstname ? "is-invalid" : ""
                      }`}
                      id="firstname"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                    />
                    {errors.firstname && (
                      <div className="invalid-feedback">{errors.firstname}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Soyad
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.lastname ? "is-invalid" : ""
                      }`}
                      id="lastname"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                    />
                    {errors.lastname && (
                      <div className="invalid-feedback">{errors.lastname}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Cinsiyet
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="MALE">Erkek</option>
                    <option value="FEMALE">Kadın</option>
                    <option value="OTHER">Diğer</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.dateOfBirth ? "is-invalid" : ""
                    }`}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                  {errors.dateOfBirth && (
                    <div className="invalid-feedback">{errors.dateOfBirth}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Telefon Numarası
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

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Şifre
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
                  <div className="form-text">
                    Şifre en az 8 karakter uzunluğunda olmalı ve büyük harf,
                    küçük harf, sayı ve özel karakter içermelidir.
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">
                    Şifreyi Onaylayın
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {apiSuccess && (
                  <div className="alert alert-success" role="alert">
                    {apiSuccess}
                  </div>
                )}

                {apiError && (
                  <div className="alert alert-danger" role="alert">
                    {apiError}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={authLoading}
                  >
                    {authLoading ? "Hesap Oluşturuluyor..." : "Kayıt Ol"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Zaten hesabınız var mı?{" "}
                  <Link href="/login" className="text-decoration-none">
                    Giriş Yap
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

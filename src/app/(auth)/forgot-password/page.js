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
        text: "Lütfen e-posta adresinizi girin",
        type: "error",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        text: "Lütfen geçerli bir e-posta adresi girin",
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
          text: data.message || "Şifre sıfırlama kodu gönderildi",
          type: "success",
        });
      } else {
        setMessage({
          text:
            data.message || "Bir şeyler yanlış gitti. Lütfen tekrar deneyin.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        type: "error",
      });
      console.error("Şifre sıfırlama hatası:", error);
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
              <h1 className="card-title text-center mb-4">Şifre Sıfırlama</h1>

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
                E-posta adresinizi girin ve şifrenizi sıfırlamak için size
                talimatlar göndereceğiz.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E-posta adresinizi girin"
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
                    {isSubmitting ? "Gönderiliyor..." : "Şifreyi Sıfırla"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Şifrenizi Unuttunuz mu?{" "}
                  <Link href="/login" className="text-decoration-none">
                    Giriş Sayfasına Dön
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

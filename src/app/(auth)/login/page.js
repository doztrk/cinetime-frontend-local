"use client";
import React, { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için `next/navigation` kullanıyoruz.
import { Alert, Card, Col, Container, Form, Row } from "react-bootstrap";
import { loginAction } from "@/actions/auth-action";
import { initialState } from "@/helpers/form-validation";
import {
  PasswordInput,
  SubmitButton,
  TextInput,
} from "@/components/form-fields";
import { formatPhoneNumber } from "@/lib/helpers";
import "./login-form.scss";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const router = useRouter(); // Next.js yönlendirme için `useRouter`

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phoneNumber: formattedValue,
    }));
  };

  const handlePasswordChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  // Başarılı login sonrası yönlendirme
  useEffect(() => {
    if (state.ok) {
      router.push("/"); // Ana sayfaya yönlendiriyoruz
    }
  }, [state.ok, router]); // state.ok değiştiğinde yönlendirme yapılır

  return (
    <Container className="login-form">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h4>Giriş Yap</h4>

              {state.ok === false && state.message && (
                <Alert variant="danger">{state.message}</Alert>
              )}

              <Form action={formAction}>
                <TextInput
                  label="Telefon Numarası"
                  name="phoneNumber"
                  error={state?.errors?.phoneNumber}
                  value={formData.phoneNumber}
                  placeholder="(123) 456-7890"
                  onChange={handlePhoneChange}
                  required
                />
                <PasswordInput
                  label="Şifre"
                  name="password"
                  error={state?.errors?.password}
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                />
                <SubmitButton title="Giriş Yap" />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

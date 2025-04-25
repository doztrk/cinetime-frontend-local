"use client";
import React, { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için `next/navigation` kullanıyoruz.
import { Alert, Card, Col, Container, Form, Row } from "react-bootstrap";
import { loginAction } from "@/actions/auth-action";
import { initialState } from "@/helpers/form-validation";
import { useSession } from "next-auth/react";
import {
  FormContainer,
  PasswordInput,
  SubmitButton,
  TextInput,
  PhoneInput, // PhoneInput bileşenini dahil ettik
} from "@/components/form-fields";
import { formatPhoneNumber } from "@/lib/helpers";
import "./login-form.scss";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const { data: session, status, update } = useSession(); // Session hook'u
  const router = useRouter(); // Next.js yönlendirme için `useRouter`

  const handlePasswordChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  // Başarılı login sonrası yönlendirme
  useEffect(() => {
    if (state.ok) {
      update();
      router.push("/");
    }
  }, [state.ok, router]);

  return (
    <FormContainer className="login-form">
      <h4>Giriş Yap</h4>

      {state.ok === false && state.message && (
        <Alert variant="danger">{state.message}</Alert>
      )}

      <Form action={formAction}>
        {/* Telefon numarası input */}
        <PhoneInput
          label="Telefon Numarası"
          name="phoneNumber"
          error={state?.errors?.phoneNumber}
          value={formData.phoneNumber}
          placeholder="(123) 456-7890"
          required
        />

        {/* Şifre input */}
        <PasswordInput
          label="Şifre"
          name="password"
          error={state?.errors?.password}
          defaultValue={formData.password}
          onChange={handlePasswordChange}
          required
        />

        {/* Giriş yap butonu */}
        <SubmitButton title="Giriş Yap" />
      </Form>
    </FormContainer>
  );
};

export default LoginForm;

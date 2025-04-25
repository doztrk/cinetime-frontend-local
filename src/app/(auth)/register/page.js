"use client";

import { createUserAction } from "@/actions/user-action";
import {
  BackButton,
  DateInput,
  FormContainer,
  PasswordInput,
  PhoneInput,
  SelectInput,
  SubmitButton,
  TextInput,
} from "@/components/form-fields";
import { appConfig } from "@/helpers/config";
import { initialState } from "@/helpers/form-validation";
import { swAlert } from "@/helpers/swal";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { ButtonGroup, Form } from "react-bootstrap";
import "./register-form.scss";

const RegisterForm = () => {
  const [state, formAction, isLoading] = useActionState(
    createUserAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      swAlert(state.message, state.ok ? "success" : "error");
      if (state.ok) {
        router.push("/login");
      }
    }
  }, [state]);

  return (
    <FormContainer>
      <h4>Kayıt Ol</h4>
      <Form action={formAction}>
        <TextInput
          label="Ad"
          name="firstname"
          error={state?.errors?.firstname}
          defaultValue={state?.data?.firstname ?? ""}
        />

        <TextInput
          label="Soyad"
          name="lastname"
          error={state?.errors?.lastname}
          defaultValue={state?.data?.lastname ?? ""}
        />

        <TextInput
          label="E-posta"
          name="email"
          type="email"
          error={state?.errors?.email}
          defaultValue={state?.data?.email ?? ""}
        />

        <SelectInput
          name="gender"
          label="Cinsiyet"
          error={state?.errors?.gender}
          options={appConfig.genders}
          optionLabel="label"
          optionValue="value"
          defaultValue={state?.data?.gender ?? ""}
          key={`gender-${isLoading}`}
        />

        <DateInput
          label="Doğum Tarihi"
          name="dateOfBirth"
          dateFormat="yy-mm-dd"
          error={state?.errors?.dateOfBirth}
          defaultValue={state?.data?.dateOfBirth ?? ""}
          key={`dateOfBirth-${isLoading}`}
        />

        <PhoneInput
          label="Telefon Numarası"
          name="phoneNumber"
          error={state?.errors?.phoneNumber}
          value={state?.data?.phoneNumber ?? ""}
          placeholder="(123) 456-7890"
        />

        <PasswordInput
          label="Şifre"
          name="password"
          error={state?.errors?.password}
          defaultValue={state?.data?.password ?? ""}
        />

        <ButtonGroup className="w-100">
          <BackButton />
          <SubmitButton title="Kayıt Ol" />
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;

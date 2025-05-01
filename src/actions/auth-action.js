"use server";

import {
  convertFormDataToJSON,
  response,
  transformYupErrors,
  YupValidationError,
} from "@/helpers/form-validation";
import { AuthSchema } from "@/helpers/schemes/auth-schema";
import { login } from "@/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (prevState, formData) => {
  const fields = convertFormDataToJSON(formData);

  try {
    AuthSchema.validateSync(fields, { abortEarly: false });

    const req = await login(fields);
    const result = await req.json();

    if (result.errors) {
      return response(false, fields, result.error, result.errors);
    }

    if (result.error) {
      return response(false, fields, result.error);
    }

    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set("authToken", result.token.replace("Bearer ", ""));
      return response(true, fields, "Login successful");
    }

    return response(false, fields, "Login failed");
  } catch (err) {
    if (err instanceof YupValidationError) {
      return transformYupErrors(err.inner, fields);
    } else if (err instanceof AuthError) {
      return response(false, fields, "Invalid credentials");
    }

    throw err;
  }
};

export const logoutAction = async (redirectTo = "/") => {
  const cookieStore = await cookies();
  cookieStore.delete("authToken");
  return true;
};

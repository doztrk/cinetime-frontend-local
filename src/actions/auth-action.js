"use server";

import { signIn, signOut } from "@/auth";
import {
  convertFormDataToJSON,
  response,
  transformYupErrors,
  YupValidationError,
} from "@/helpers/form-validation";
import { AuthSchema } from "@/helpers/schemes/auth-schema";
import { AuthError } from "next-auth";

export const loginAction = async (prevState, formData) => {
  const fields = convertFormDataToJSON(formData);
  console.log("Temizlenmiş Form Verileri:", fields); // Artık sadece gerçek alanlar var

  try {
    AuthSchema.validateSync(fields, { abortEarly: false });

    const result = await signIn("credentials", {
      ...fields,
      redirect: false, // BU ÇOK KRİTİK
    });

    if (result.error) {
      return response(true, fields, result.error);
    }

    return response(true, fields, "Login successful");
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
  await signOut({ redirectTo });
};

"use server";

import {
  convertFormDataToJSON,
  response,
  transformYupErrors,
  YupValidationError,
} from "@/helpers/form-validation";
import { UserSchema } from "@/helpers/schemes/user-schema";
import { createUser, deleteUser } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export const createUserAction = async (prevState, formData) => {
  const fields = convertFormDataToJSON(formData);

  try {
    UserSchema.validateSync(fields, { abortEarly: false });

    const res = await createUser(fields);
    const data = await res.json();

    if (!res.ok) {
      return response(false, fields, data?.message, data?.validations);
    }

    // Burada message içerik kontrolü yapıyoruz
    if (data?.message?.toLowerCase().includes("already exists")) {
      return response(false, fields, data.message, data?.validations);
    }

    revalidatePath("/login");
    return response(true, fields, data?.message);
  } catch (err) {
    if (err instanceof YupValidationError) {
      return transformYupErrors(err.inner, fields);
    }

    throw err;
  }
};

export const deleteUserAction = async (id) => {
  if (!id) throw new Error("Id is missing");

  const res = await deleteUser(id);
  const data = await res.text();

  if (!res.ok) {
    return response(false, {}, "User could not be deleted");
  }

  revalidatePath("/dashboard/admin");

  return response(true, {}, data);
};

import * as Yup from "yup";
import { getGenderValues } from "../misc";

const genderValues = getGenderValues();

export const UserSchema = Yup.object({
  firstname: Yup.string()
    .min(2, "Too short")
    .max(15, "Too long")
    .required("First name is required"),

  lastname: Yup.string()
    .min(2, "Too short")
    .max(15, "Too long")
    .required("Last name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Invalid phone number format")
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Too short")
    .max(30, "Too long")
    .matches(/\d+/, "Must contain at least one number")
    .matches(/[a-z]+/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]+/, "Must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?:;~%-_]+/,
      "Must contain at least one special character"
    )
    .required("Password is required"),

  gender: Yup.string()
    .oneOf(genderValues, "Invalid gender")
    .required("Gender is required"),

  dateOfBirth: Yup.date()
    .typeError("Invalid date")
    .max(new Date(), "Date of birth must be in the past")
    .required("Date of birth is required"),
});

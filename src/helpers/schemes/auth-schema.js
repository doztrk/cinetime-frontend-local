import * as Yup from "yup";

export const AuthSchema = Yup.object({
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
});

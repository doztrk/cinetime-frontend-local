export { ValidationError as YupValidationError } from "yup";

export const convertFormDataToJSON = (formData) => {
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$")) {
      data[key] = value;
    }
  }
  return data;
};

export const response = (ok, data, message, errors = []) => {
  let formattedErrors = {};
  if (Array.isArray(errors)) {
    formattedErrors = errors?.reduce((acc, error) => {
      acc[error.field] = error.defaultMessage;
      return acc;
    }, {});
  } else if (typeof errors === "object" && errors !== null) {
    formattedErrors = errors;
  }

  return {
    ok,
    data,
    message: message || (ok ? "İşlem başarılı" : "Bir hata oluştu"),
    errors: formattedErrors,
  };
};

export const initialState = {
  ok: null,
  data: {},
  message: "",
  errors: {},
};

export const transformYupErrors = (errors, data) => {
  const errObject = {};
  errors.forEach((error) => {
    errObject[error.path] = error.message;
  });

  return response(false, data, "", errObject);
};

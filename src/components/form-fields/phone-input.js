"use client";
import { formatPhoneNumber } from "@/lib/helpers";
import React, { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export const PhoneInput = ({ label, error, className = "mb-3", ...rest }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhone); // Formatlanmış değeri state'e kaydet
  };

  return (
    <FormGroup className={className} controlId={rest.name}>
      <FormLabel>{label}</FormLabel>
      <FormControl
        {...rest}
        value={phoneNumber} // Formatlanmış telefon numarası
        onChange={handlePhoneChange} // Değişiklik olduğunda formatla
        isInvalid={!!error}
        size="lg"
      />
      <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
    </FormGroup>
  );
};

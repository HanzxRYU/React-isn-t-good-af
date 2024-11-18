import React from "react";
import FormField from "../Molecules/FormField";
import Button from "../Atom/Button";

const RegisterForm = () => (
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <FormField
      labelText="Full Name"
      inputType="text"
      inputProps={{ placeholder: "Enter your full name" }}
    />
    <FormField
      labelText="Email"
      inputType="email"
      inputProps={{ placeholder: "Enter your email" }}
    />
    <FormField
      labelText="Password"
      inputType="password"
      inputProps={{ placeholder: "Create a password" }}
    />
    <Button label="Register" type="submit" />
  </form>
);

export default RegisterForm;

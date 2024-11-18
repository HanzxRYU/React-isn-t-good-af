import React from "react";
import FormField from "../Molecules/FormField";
import Button from "../Atom/Button";

const LoginForm = () => (
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <FormField
      labelText="Email"
      inputType="email"
      inputProps={{ placeholder: "Enter your email" }}
    />
    <FormField
      labelText="Password"
      inputType="password"
      inputProps={{ placeholder: "Enter your password" }}
    />
    <Button label="Login" type="submit" />
  </form>
);

export default LoginForm;

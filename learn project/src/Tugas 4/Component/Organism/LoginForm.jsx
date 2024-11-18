import React from "react";
import FormField from "../Molecules/FormField";
import Button from "../atoms/Button";

const LoginForm = () => (
  <form className="login-form">
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

import React from "react";
import AuthLayout from "../Templates/AuthLayout";
import RegisterForm from "../organisms/RegisterForm";

const RegisterPage = () => (
  <AuthLayout>
    <h2>Register</h2>
    <RegisterForm />
  </AuthLayout>
);

export default RegisterPage;

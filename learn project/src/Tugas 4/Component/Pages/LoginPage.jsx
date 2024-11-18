import React from "react";
import AuthLayout from "../Templates/AuthLayout";
import LoginForm from "../organisms/LoginForm";

const LoginPage = () => (
  <AuthLayout>
    <h2>Login</h2>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;

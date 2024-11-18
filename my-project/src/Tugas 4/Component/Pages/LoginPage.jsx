import React from "react";
import AuthLayout from "../Templates/AuthLayout";
import LoginForm from "../Organism/LoginForm";

const LoginPage = () => (
  <AuthLayout>
    <h2 className="text-xl font-semibold mb-4">Login</h2>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;

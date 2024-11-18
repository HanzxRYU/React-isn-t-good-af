import React from 'react';

const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <header className="mb-4 text-2xl font-bold">My App</header>
    <main className="w-full max-w-md">{children}</main>
    <footer className="mt-4 text-sm text-gray-600">© 2024 My App</footer>
  </div>
);

export default AuthLayout;

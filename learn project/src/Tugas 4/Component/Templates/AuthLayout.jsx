import React from 'react';

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <header>My App</header>
    <main>{children}</main>
    <footer>© 2024 My App</footer>
  </div>
);

export default AuthLayout;

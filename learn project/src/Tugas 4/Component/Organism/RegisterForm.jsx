import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const RegisterForm = () => (
  <form className="register-form">
    <FormField labelText="Full Name" inputType="text" inputProps={{ placeholder: 'Enter your full name' }} />
    <FormField labelText="Email" inputType="email" inputProps={{ placeholder: 'Enter your email' }} />
    <FormField labelText="Password" inputType="password" inputProps={{ placeholder: 'Create a password' }} />
    <Button label="Register" type="submit" />
  </form>
);

export default RegisterForm;

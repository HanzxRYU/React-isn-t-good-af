import React from 'react';

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="label">
    {children}
  </label>
);

export default Label;

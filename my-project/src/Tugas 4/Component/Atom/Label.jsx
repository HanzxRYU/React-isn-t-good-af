import React from 'react';

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-gray-700 mb-1">
    {children}
  </label>
);

export default Label;

import React from "react";
import Label from "../Atom/Label";
import Input from "../Atom/Input";

const FormField = ({ labelText, inputType, inputProps }) => {
  return (
    <div className="mb-4">
      <Label>{labelText}</Label>
      <Input type={inputType} {...inputProps} />
    </div>
  );
};

export default FormField;

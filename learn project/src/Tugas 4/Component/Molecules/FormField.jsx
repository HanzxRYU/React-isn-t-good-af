import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

const FormField = ({ labelText, inputType, inputProps }) => {
  return (
    <div className="form-field">
      <Label>{labelText}</Label>
      <Input type={inputType} {...inputProps} />
    </div>
  );
};

export default FormField;

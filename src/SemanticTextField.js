import React from "react";
import { Input } from 'semantic-ui-react'

export default props => {
  const {
    onChange,
    validateField,
    value,
    error,
    name,
    validationText,
    label,
    className,
    ...otherProps
  } = props;
  return (
    <div className={className}>
      <label>{label}</label>
      <Input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={e => validateField(e.target.value)}
        {...otherProps}
      />
      {error ? (
        <label className="validationMessage">{validationText}</label>
      ) : null}
    </div>
  );
};

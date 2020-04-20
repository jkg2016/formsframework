import React from "react";

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
      <input
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

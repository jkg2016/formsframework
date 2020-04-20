import React from "react";
import FormContext from "./FormContext";

class FormField extends React.Component {
  async componentDidMount() {
    let { name, validators = [] } = this.props;
    const { validateField, getFieldValue } = this.context;

    // set default value
    const newValue = getFieldValue({ name });

    //update validation state
    await validateField(newValue, name, validators);
  }
  render() {
    const { name, validators, Component, ...otherProps } = this.props;
    const {
      setFieldValue,
      getFieldValue,
      validateField,
      getFieldValidationState,
      getFieldTouchedState,
      setFieldTouchState,
      submitOccurred
    } = this.context;

    const value = getFieldValue({ name }) || "";
    const validationState = getFieldValidationState({ name });
    const touchedState = getFieldTouchedState({ name });

    const error =
      validationState &&
      !validationState.valid &&
      (touchedState || submitOccurred);
    const validationText =
      validationState &&
      (touchedState || submitOccurred) &&
      validationState.validationText;
    const onChange = newValue => {
      setFieldValue(name, newValue);
    };
    return (
      <Component
        {...otherProps}
        onChange={onChange}
        validateField={newValue => {
          validateField(newValue, name, validators);
          setFieldTouchState(name);
        }}
        value={value}
        error={error}
        name={name}
        validationText={validationText}
      />
    );
  }
}
FormField.contextType = FormContext;
export default FormField;

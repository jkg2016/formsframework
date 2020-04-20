import React from "react";
import FormContext from "./FormContext";
import _ from "lodash";

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      validationState: {},
      touchState: {},
      submitOccurred: false,
      valid: false
    };
  }
  getFieldValue = ({ name }) => {
    const fieldValue = _.get(this.state.formValues, name, "");
    return fieldValue;
  };
  getFieldValidationState = ({ name }) => {
    const fieldValidationState = this.state.validationState[name];
    return fieldValidationState;
  };
  getFieldTouchedState = ({ name }) => {
    return this.state.touchState[name];
  };

  setFieldValue = async (fieldName, newValue) => {
    this.setState(state => ({
      formValues: { ...state.formValues, [fieldName]: newValue }
    }));
  };
  setFieldTouchState = (fieldName, touched = true) => {
    this.setState(state => ({
      touchState: { ...state.touchState, [fieldName]: touched }
    }));
  };
  setFieldValidationState = (fieldName, validationState, validators = []) => {
    this.setState(state => ({
      validationState: {
        ...state.validationState,
        [fieldName]: { ...validationState, validators: validators }
      }
    }));
  };
  validateField = async (newValue, fieldName, validationRules = []) => {
    let validationResult = await Promise.all(
      validationRules.map(validationFunction =>
        validationFunction(newValue, fieldName, this.state.formValues)
      )
    ).catch(e => {
      console.log(`error : ${e.message}`);
    });
    const validationAggrigation = validationResult.reduce(
      (status, validatorResult) => {
        if (!status.valid) {
          return status;
        }
        return {
          valid: validatorResult.valid && status.valid,
          validationText: validatorResult.valid
            ? status.validationText
            : status.validationText
            ? `${status.validationText}, ${validatorResult.validationText}`
            : validatorResult.validationText
        };
      },
      { valid: true, validationText: "" }
    );

    this.setFieldValidationState(
      fieldName,
      validationAggrigation,
      validationRules
    );

    return validationAggrigation;
  };
  onSubmit = async event => {
    // validate all forms field and set validation status
    event.preventDefault();
    let valid = Object.keys(this.state.validationState).reduce(
      (accu, field) => accu & this.state.validationState[field].valid,
      true
    );

    // set submited to true
    this.setState({ valid: valid, submitOccurred: true });
    if (this.props.onSubmit) {
      this.props.onSubmit(valid, this.state.formValues);
    }
  };

  render() {
    const { formValues, submitOccurred, valid } = this.state;

    return (
      <FormContext.Provider
        value={{
          getFieldValue: this.getFieldValue,
          getFieldValidationState: this.getFieldValidationState,
          getFieldTouchedState: this.getFieldTouchedState,
          setFieldValue: this.setFieldValue,
          setFieldTouchState: this.setFieldTouchState,
          validateField: this.validateField,
          submitOccurred: submitOccurred
        }}
      >
        <form noValidate onSubmit={this.onSubmit}>
          {this.props.children({
            values: formValues,
            submitOccurred: submitOccurred,
            valid: valid
          })}
          <pre
            style={{
              direction: "ltr",
              textAlign: "left",
              marginTop: "101px"
            }}
          >
            <h4>This is our form container state</h4>
            <code>{JSON.stringify(this.state, null, 4)}</code>
          </pre>
        </form>
      </FormContext.Provider>
    );
  }
}
export default FormContainer;

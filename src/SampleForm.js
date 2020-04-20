import React from "react";
import FormContainer from "./formframework/FormContainer";
import FormField from "./formframework/FormField";
import SimpeTextField from "./SimpleTextField";

class SampleForm extends React.Component {
  onSubmitEventHandler = (validatioState, form) => {
    console.log(validatioState, form);
    if (validatioState) {
      console.log("form is valid and ready to be send to server!");
    }
  };
  requireValidator = fieldValue => {
    fieldValue = fieldValue && fieldValue.trim ? fieldValue.trim() : fieldValue;

    return {
      valid:
        fieldValue !== null &&
        fieldValue !== "" &&
        typeof fieldValue !== "undefined",
      validationText: "This field is mandatory"
    };
  };
  emailValidator = fieldValue => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
      valid: re.test(fieldValue),
      validationText: "the email address is not valid"
    };
  };
  render() {
    return (
      <FormContainer onSubmit={this.onSubmitEventHandler}>
        {(values, submitOccurred) => (
          <div>
            <h1>Contact Us Form</h1>
            <FormField
              label="First Name:"
              placeholder="First Name"
              name="FirstName"
              Component={SimpeTextField}
              validators={[this.requireValidator]}
              className="formTextField"
            />
            <FormField
              label="Last Name:"
              placeholder="Last Name"
              name="LastName"
              Component={SimpeTextField}
              validators={[this.requireValidator]}
              className="formTextField"
            />
            <FormField
              label="Email:"
              placeholder="Email"
              name="Email"
              Component={SimpeTextField}
              validators={[this.requireValidator, this.emailValidator]}
              className="formTextField"
            />
            <div className="formFotter">
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </FormContainer>
    );
  }
}
export default SampleForm;

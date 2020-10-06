import React, { Component } from "react";
import "../App.css";
import axios from "axios";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate form errors be empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate that the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: "11111111",
      phoneNumber: "12321423wa4234",
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (formValid(this.state)) {
      console.log(`
     --Submitting--
     FIrst Name = ${this.state.firstName}
     Last Name = ${this.state.lastName}
     Email = ${this.state.email}
     Password = ${this.state.password}
     `);
      const obj = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        phone_number: this.state.phoneNumber,
      };
      const response = await axios.post("/api/register", obj);
      console.log(response);
      if (
        response.data.status === 200 
      ) {
        console.log("loggin in");
        setTimeout(() => {
          window.location.replace(`/login`);
        }, 2000);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 && value.length > 0
            ? "minimum of 3 characters are required"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 && value.length > 0
            ? "minimum of 3 characters are required"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length < 8 && value.length > 0
            ? "minimum of 8 characters are required"
            : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "invalid email address";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      console.log(this.state);
    });
  };

  state = {};
  render() {
    const { formErrors } = this.state;
    return (
      <div>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className=""
                  placeholder="First Name"
                  name="firstName"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className=""
                  placeholder="Last Name"
                  name="lastName"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>

              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className=""
                  placeholder="Email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className=""
                  placeholder="Password"
                  name="password"
                  noValidate
                  autoComplete="on"
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              <div className="createAccount">
                <button type="submit">Create Account</button>
                <small> Already have an account?</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

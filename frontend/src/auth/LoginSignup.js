import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from './UserContext';
import { Formik, Form, Field } from 'formik';

const INITIAL_VALUES = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: ""
};

const loginFields = [
  { input: "username", label: "Username", type: "text"},
  { input: "password", label: "Password", type: "password"}
];

const signupFields = [
  { input: "username", label: "Username", type: "text" },
  { input: "password", label: "Password", type: "password" },
  { input: "first_name", label: "First name", type: "text" },
  { input: "last_name", label: "Last name", type: "text" },
  { input: "email", label: "Email", type: "text" }
];

function LoginSignUpForm({ login, signup}){
  const { currentUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [formFields, setFormFields] = useState(loginFields);


  if (currentUser !== null) {
    return <Redirect to="/companies" />
  }

  const handleButton = (value) => {
    if(value === "login"){
      setFormFields(loginFields);
      setToggle(false);
    } else {
      setFormFields(signupFields);
      setToggle(true);
    }
  }

  return (
    <div>
    <div className="col-lg-3 col-lg-offset-4 mx-auto mb-2">
      <button className={toggle ? "btn btn-light" : "btn btn-primary"} onClick={() => handleButton("login")}>Login</button>
      <button className={toggle ? "btn btn-primary" : "btn btn-light"}  onClick={() => handleButton("signup")}>Sign up</button>
    </div>
    <Formik 
      initialValues={{ ...INITIAL_VALUES }}
      onSubmit={async (data) => {

        if(data.email){
          await signup(data);
        } else {
          await login(data);
        }
        
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form className="col-lg-3 col-lg-offset-4 mx-auto">
          {formFields.map(field => (
            <Field
              key={field.input}
              className="form-control mb-2"
              name={field.input}
              placeholder={field.label}
              type={field.type}
            />
          ))}
          <input
            className="btn btn-primary mr-1"
            id="submit-button"
            type="submit"
            name="submit"
            value="Submit"
          />
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default LoginSignUpForm;
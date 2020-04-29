import React, { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { authActions } from "../../actions";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import "./Auth.scss";

const Auth = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  return (
    <>
      {profile ? (
        <Redirect to="/game" />
      ) : (
        <div className="auth">
          <h1>Please log in</h1>
          <Formik
            initialValues={{ email: "test@test.com", password: "1qazxsW@" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                authActions.loginAsync({
                  email: values.email,
                  password: values.password,
                })
              );
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Auth;

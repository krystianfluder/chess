import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../actions";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import * as Yup from "yup";

const modes = {
  login: "Login",
  register: "Register",
  reset: "Reset",
};

let validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
});

const AuthForm = ({ authMode }) => {
  const dispatch = useDispatch();

  if (authMode === "reset") {
    validationSchema = Yup.object().shape({
      email: Yup.string().email().required("Required"),
    });
  }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (authMode === modes.login) {
            dispatch(
              authActions.loginAsync({
                email: values.email,
                password: values.password,
              })
            );
          } else if (authMode === modes.register) {
            dispatch(
              authActions.registerAsync({
                email: values.email,
                password: values.password,
              })
            );
          }
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
            <h2>{authMode}</h2>
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              errorMessage={errors.email && touched.email && errors.email}
            />
            {authMode !== modes.register ? (
              <Input
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorMessage={
                  errors.password && touched.password && errors.password
                }
              />
            ) : null}

            <Button type="submit" disabled={isSubmitting} variant="secondary">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;

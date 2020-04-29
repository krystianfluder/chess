import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../actions";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";

const Register = (props) => {
  const dispatch = useDispatch();

  return (
    <>
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
            authActions.registerAsync({
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
            <h1>Register</h1>
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
            <Button onClick={props.toggleMode}>Toggle mode</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;

import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../actions";
import Input from "../../components/Form/Input/Input";
import * as Yup from "yup";

import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";

const Register = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{ email: "test@test.com", password: "1qazxsW@" }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string().min(8, "Too Short!").required("Required"),
        })}
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
          <form onSubmit={handleSubmit} novalidate>
            <h1>Register</h1>
            <Input
              placeholder="Enter Email"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              errorMessage={errors.email && touched.email && errors.email}
            />
            <Input
              placeholder="Password"
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
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button onClick={props.toggleMode} variant="secondary">
              Toggle mode
            </Button>
            <Link to="/">Home</Link>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;

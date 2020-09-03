import React, { useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../actions";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import * as Yup from "yup";
import Layout from "../../components/Layout/Layout";

const NewPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      dispatch(authActions.removeErrorMessage());
    }
  }, [dispatch]);

  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const changePassword = (code, password, history) => {
    dispatch(authActions.removeErrorMessage());
    dispatch(authActions.newPasswordAsync(code, password, history));
  };

  return (
    <Layout title="New password" description="lorem">
      <Formik
        initialValues={{ code: "", password: "" }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          changePassword(values.code, values.password, history);
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
            {errorMessage ? errorMessage : null}
            <Input
              label="Code"
              type="text"
              name="code"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.code}
              errorMessage={errors.code && touched.code && errors.code}
            />
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

            <Button type="submit" disabled={isSubmitting} variant="secondary">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default NewPassword;

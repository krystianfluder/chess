import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.scss";
import AuthForm from "./AuthForm";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";

import modes from "../../assets/js/authModes";
import { authActions } from "../../actions";

const Auth = (props) => {
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState("Register");

  const toggleMode = (mode) => {
    setAuthMode(mode);
  };

  useEffect(() => {
    if (errorMessage) {
      dispatch(authActions.removeErrorMessage());
    }
  }, [dispatch]);

  return (
    <>
      <Layout title="Auth" description="short description">
        <AuthForm authMode={authMode} />
        <Button onClick={toggleMode.bind(null, modes.register)}>
          switch to register
        </Button>
        <Button onClick={toggleMode.bind(null, modes.login)}>
          switch to login
        </Button>
        <Button onClick={toggleMode.bind(null, modes.reset)}>
          switch to reset
        </Button>
      </Layout>
    </>
  );
};

export default Auth;

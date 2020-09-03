import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Auth.scss";
import AuthForm from "./AuthForm";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";

import modes from "../../assets/js/authModes";
import { Redirect } from "react-router-dom";
import { authActions } from "../../actions";

const Auth = (props) => {
  const dispatch = useDispatch();
  const reseted = useSelector((state) => state.auth.reseted);
  const [authMode, setAuthMode] = useState("Register");

  const toggleMode = (mode) => {
    setAuthMode(mode);
  };

  useEffect(() => {
    dispatch(authActions.removeErrorMessage());
  }, []);

  return (
    <>
      {/* {!reseted ? ( */}
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
      {/* ) : (
        <Redirect to="/auth/new-password" />
      )} */}
    </>
  );
};

export default Auth;

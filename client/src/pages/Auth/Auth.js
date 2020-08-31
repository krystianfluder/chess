import React, { useState } from "react";
import "./Auth.scss";
import AuthForm from "./AuthForm";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";

import modes from "../../assets/js/authModes";

const Auth = (props) => {
  const [authMode, setAuthMode] = useState("Register");

  const toggleMode = (mode) => {
    setAuthMode(mode);
  };

  return (
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
  );
};

export default Auth;

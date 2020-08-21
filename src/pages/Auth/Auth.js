import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Auth.scss";
import AuthForm from "./AuthForm";
import Button from "../../components/Button/Button";
// import Login from "./Login";
// import Register from "./Register";
import Layout from "../../components/Layout/Layout";

const Auth = (props) => {
  const profile = useSelector((state) => state.auth.profile);
  const [authMode, setAuthMode] = useState("Register");

  const toggleMode = (mode) => {
    setAuthMode(mode);
  };

  return (
    <Layout title="Auth">
      {profile ? (
        <Redirect to="/game" />
      ) : (
        <>
          <AuthForm authMode={authMode} />
          <Button onClick={toggleMode.bind(null, "Register")}>
            switch to register
          </Button>
          <Button onClick={toggleMode.bind(null, "Login")}>
            switch to login
          </Button>
          <Button onClick={toggleMode.bind(null, "Reset")}>
            switch to reset
          </Button>

          {/* {loginMode ? (
            <Login toggleMode={toggleMode} />
          ) : (
            <Register toggleMode={toggleMode} />
          )} */}
        </>
      )}
    </Layout>
  );
};

export default Auth;

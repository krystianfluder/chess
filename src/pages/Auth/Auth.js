import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Auth.scss";
import Login from "./Login";
import Register from "./Register";
import Layout from "../../components/Layout/Layout";

const Auth = (props) => {
  const profile = useSelector((state) => state.auth.profile);
  const [loginMode, setLoginMode] = useState(false);

  const toggleMode = () => {
    setLoginMode((prev) => {
      return !prev;
    });
  };

  return (
    <Layout title="Auth">
      {profile ? (
        <Redirect to="/game" />
      ) : (
        <>
          {loginMode ? (
            <Login toggleMode={toggleMode} />
          ) : (
            <Register toggleMode={toggleMode} />
          )}
        </>
      )}
    </Layout>
  );
};

export default Auth;

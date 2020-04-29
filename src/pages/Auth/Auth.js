import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Auth.scss";
import Login from "./Login";
import Register from "./Register";

const Auth = (props) => {
  const profile = useSelector((state) => state.auth.profile);
  const [loginMode, setLoginMode] = useState(false);

  const toggleMode = () => {
    setLoginMode((prev) => {
      return !prev;
    });
  };

  return (
    <>
      {profile ? (
        <Redirect to="/game" />
      ) : (
        <div className="auth">
          {loginMode ? (
            <Login toggleMode={toggleMode} />
          ) : (
            <Register toggleMode={toggleMode} />
          )}
        </div>
      )}
    </>
  );
};

export default Auth;

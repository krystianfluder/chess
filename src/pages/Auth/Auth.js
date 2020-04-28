import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../actions";

const Auth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("1qazxsW@");

  const loginHandler = () => {
    dispatch(
      authActions.loginAsync({
        email,
        password,
      })
    );
  };

  return (
    <div>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Auth;

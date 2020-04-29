import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { authActions } from "../../actions";

const Logout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.logoutAsync());
  }, [dispatch]);

  return (
    <>
      <Redirect to="/" />
    </>
  );
};

export default Logout;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { authActions } from "../../actions";

const Logout = () => {
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logoutAsyncRemote(refreshToken));
  }, [dispatch, refreshToken]);

  return <Redirect to="/" />;
};

export default Logout;

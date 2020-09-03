import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../../components/Alert/Alert";
import PropTypes from "prop-types";

import "./Layout.scss";
import { commonActions } from "../../actions";

const Layout = ({ children, title, description }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.common.message);

  const removeMessage = useCallback(() => {
    dispatch(commonActions.removeMessage());
  }, [dispatch]);

  useEffect(() => {
    document.title = title;
    return () => {
      if (message) {
        removeMessage();
      }
    };
  }, [title, description, message, removeMessage]);

  return (
    <main className="layout">
      {message ? (
        <Alert onClick={removeMessage} variant="secondary">
          {JSON.stringify(message)}
        </Alert>
      ) : null}
      <h1>{title}</h1>
      {children}
    </main>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Layout;

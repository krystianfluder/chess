import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../actions";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import ListGroup from "../../components/ListGroup/ListGroup";
import ListGroupItem from "../../components/ListGroup/ListGroupItem";

const Profile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const tokens = useSelector((state) => state.auth.tokens);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const logoutAll = () => {
    dispatch(authActions.logoutAllAsync(accessToken));
  };

  useEffect(() => {
    dispatch(authActions.asyncFetchProfile(accessToken));
    dispatch(authActions.fetchTokensAsync());
  }, []);

  return (
    <Layout title="Profile" description="short description">
      <h2>Information: </h2>
      {JSON.stringify(profile)}
      <h2>Tokens: </h2>
      <Button onClick={logoutAll}>Logout all</Button>
      <ListGroup>
        {tokens.map((token) => (
          <ListGroupItem key={token._id}>{JSON.stringify(token)}</ListGroupItem>
        ))}
      </ListGroup>
    </Layout>
  );
};

export default Profile;

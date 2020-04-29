import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const profile = useSelector((state) => JSON.parse(state.auth.profile));
  return (
    <>
      {profile ? (
        <div className="profile">
          {profile.kind}
          {profile.localId}
          {profile.email}
          {profile.displayName}
          {profile.idToken}
          {profile.registered}
        </div>
      ) : (
        <Redirect to="/auth" />
      )}
    </>
  );
};

export default Profile;

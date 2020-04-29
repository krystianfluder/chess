import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Profile = () => {
  const profile = useSelector((state) => state.auth.profile);
  return (
    <>
      {profile ? <div className="profile">sdf</div> : <Redirect to="/auth" />}
    </>
  );
};

export default Profile;

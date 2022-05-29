import React from "react";
// import { Link } from "react-router-dom";
// import ImageAvatars from "./avatar";
import Dashboard from "./Dashboard";
import ProfileImage from "./ProfileImage";

const Profile = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Dashboard />
      <ProfileImage />
    </div>
  );
};

export default Profile;

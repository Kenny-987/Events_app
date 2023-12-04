import React from "react";
import "./dashboard.css";
import { useState, useEffect } from "react";
import MyEvents from "./MyEvents";
import Liked from "./Liked";
import Delete from "./Delete";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faHeart,
  faSignOut,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../authContext";
const Dashboard = () => {
  const [selectLink, setSelectLink] = useState(() => {
    // Retrieve selectLink state from localStorage or use a default value
    return localStorage.getItem("selectLink") || "events";
  });
  const { data, logout } = useAuth();
  const { user, token } = data;
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("selectLink", selectLink);
  }, [selectLink]);
  const showComponent = (comp) => {
    setSelectLink(comp);
  };
  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dash-container">
      <div className="dashlinks">
        <h3>{user}</h3>
        <div className="dashlink" onClick={() => showComponent("events")}>
          <FontAwesomeIcon icon={faSitemap} /> My Events
        </div>
        {/* <div className="dashlink" onClick={() => showComponent("liked")}>
          <FontAwesomeIcon icon={faHeart} /> Liked Events
        </div> */}
        <div className="dashlink" onClick={signOut}>
          <FontAwesomeIcon icon={faSignOut} /> Sign Out
        </div>
        <div
          className="dashlink delete-account"
          onClick={() => showComponent("delete")}
        >
          <FontAwesomeIcon icon={faWarning} /> Delete Account
        </div>
      </div>
      <div className="dashcontent">
        {selectLink === null && <MyEvents />}
        {selectLink === "events" && <MyEvents />}
        {/* {selectLink === "liked" && <Liked />} */}
        {selectLink === "delete" && <Delete />}
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import "./dashboard.css";
import { useState, useEffect } from "react";
import MyEvents from "./MyEvents";
import Logout from "./Logout"
import Delete from "./Delete";
import Profile from "./Profile";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSitemap,
  faSignOut,
  faWarning,
  faArrowDown,
  faGears,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../authContext";


const Dashboard = () => {
  // const [selectLink, setSelectLink] = useState(() => {
  //   return localStorage.getItem("selectLink") || "events";
  // });
  const [selectLink, setSelectLink] = useState("events");
  const { data, logout } = useAuth();
  const [showNav,setShowNav]=useState(false)
  const { user, token,organizerDetails } = data;
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
        <h3>{user}  <div className="expand" onClick={()=>{
          setShowNav(!showNav)
        }}>
        < FontAwesomeIcon icon={faArrowDown} className="arrow"/>
        </div></h3> 
        <div className={showNav ? "": "mobilenav"}  >
        {/* Link */}
        <div className="dashlink" onClick={()=>{
 showComponent("events")
 setShowNav(!showNav)
        }}>
          <FontAwesomeIcon icon={faSitemap} /> My Events
        </div>
        
        {organizerDetails.isOrganizer && <div className="dashlink" onClick={()=>{
        showComponent("profile")
        setShowNav(!showNav)
        }}>
          <FontAwesomeIcon icon={faUser} /> Profile
        </div> }
         

              
         <div className="dashlink" onClick={()=>{
          showComponent("settings")
          setShowNav(!showNav)
        }}>
          <FontAwesomeIcon icon={faGears} /> Account Settings
        </div>


        <div className="dashlink" onClick={()=>{
          showComponent("logout")
          setShowNav(!showNav)
        }}>
          <FontAwesomeIcon icon={faSignOut} /> Sign Out
        </div>


        <div  className="dashlink delete-account"
          onClick={() => {
            showComponent("delete")
          setShowNav(!showNav)
        }}
        >
          <FontAwesomeIcon icon={faWarning} /> Delete Account
        </div>
       
        </div>
       
      </div>
      <div className="dashcontent">
        {selectLink === null && <MyEvents />}
        {selectLink === "events" && <MyEvents />}
        {selectLink === "settings" && <Settings />}
        {selectLink === "profile" && <Profile />}
        {selectLink === "logout" && <Logout signOut={signOut} />}
        {selectLink === "delete" && <Delete />}
      </div>
    </div>
  );
};

export default Dashboard;

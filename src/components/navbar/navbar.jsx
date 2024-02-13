import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlusCircle,
  faClose,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { useAuth } from "../../authContext";
import { useEffect, useState } from "react";
// import Theme from "./Theme";
const Navbar = () => {
  const [verifiedUser, setVerifiedUser] = useState(false);
  const { data } = useAuth();
  const [displayMsg, SetDisplayMsg] = useState(false);
  const { user, token } = data;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toAddEventPage = () => {
    setMobileMenuOpen(false);
    if (!token) {
      setVerifiedUser(true);
    } else {
      navigate("/addevent");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <header className="navbar">
      <div className="logo">EventFlow</div>
      <div
        className='menu-icon'
        onClick={toggleMobileMenu}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <nav className={`${mobileMenuOpen ? "showlinks" : "links"}`}>
        <div
          className="link parent"
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        >
          <Link to="/" className="nav-link">
          <FontAwesomeIcon icon={faHome} /> Home 
          </Link>
        </div>
        <div className="link linktoevent" onClick={toAddEventPage}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Event 
        </div>
        {/* div to show login icon or  show use name when user logs in */}
        <div
          className="link parent"
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        >
          {!token ? (
            <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faUser} />  Login 
            </Link>
          ) : (
            <p className="account-username">
              <FontAwesomeIcon icon={faUser} />{" "}
              <Link to="/dashboard" className="nav-link">
                {user}
              </Link>
              
            </p>
          )}
        </div>
      </nav>

      {verifiedUser && (
        <div className="warning">
          <p>Create an Account or Login to Add an Event</p>
          <FontAwesomeIcon
            icon={faClose}
            className="closeWarning"
            onClick={() => {
              setVerifiedUser(!verifiedUser);
            }}
          />
        </div>
      )}
    </header>
  );
};
export default Navbar;

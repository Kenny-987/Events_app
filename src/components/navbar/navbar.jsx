import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlusCircle,
  faClose,
  faHome,
  faBars,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { useAuth } from "../../authContext";
import logo from '../../assets/logo.jpg'
import { useState } from "react";
const Navbar = () => {
  const [verifiedUser, setVerifiedUser] = useState(false);
  const { data } = useAuth();
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
      <div className="logo">
      <Link to="/" >
        <img src={logo} alt="" />
         </Link>

      </div>
      <div
        className='menu-icon'
        onClick={toggleMobileMenu}
      >
       {mobileMenuOpen ?  <FontAwesomeIcon icon={faClose} />:<FontAwesomeIcon icon={faBars} /> } 
      </div>
      <nav className={`${mobileMenuOpen ? "showlinks" : "links"}`}>
        <div
          className="link parent"
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        >
          <p  className="nav-link" onClick={()=>{
            navigate("/")
          }}>
          <FontAwesomeIcon icon={faHome} /> Home 
          </p>
          
        </div>
        <div className="link linktoevent" onClick={toAddEventPage}>
        <FontAwesomeIcon icon={faPlusCircle} /> Add Event 
        </div>
        <div
          className="link parent"
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        >
          <p  className="nav-link" onClick={()=>{
            navigate("/about")
          }}>
          <FontAwesomeIcon icon={faCircleInfo} /> About
          </p>
          
        </div>
        {/* div to show login icon or  show use name when user logs in */}
        <div
          className="link parent"
          onClick={() => {
            setMobileMenuOpen(false);
          }}
        >
          {!token ? (
             <p  className="nav-link" onClick={()=>{
              navigate("/login")
            }}>
            <FontAwesomeIcon icon={faUser} /> Login
            </p>
            
          ) : (
            <div className="account-username">
              
              <p to="/dashboard" className="nav-link" onClick={()=>{
                navigate("/dashboard")
              }}><FontAwesomeIcon icon={faUser} />{" "}
                {user}
              </p>
              
            </div>
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

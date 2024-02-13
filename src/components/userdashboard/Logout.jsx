import React from "react";

const Logout = ({signOut}) => {
  return    <div className="delete-account-text">
  <p>
    Proceed To Logout
  </p>
  <div className="dashlink delete-account" onClick={()=>{
  signOut(); 
  }}>
    Logout
  </div>
</div>;
};

export default Logout;

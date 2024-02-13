import React from "react";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const { data, logout } = useAuth();
  const { token } = data;
  const navigate = useNavigate();
  const deleteAccount = async () => {
    try {
      // Send DELETE request to the server to delete the account
      const response = await fetch(
        `https://localhost:3000/auth/delaccount`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        logout();
        response.json().then(() => {
          navigate("/");
        });
      } else {
        throw new Error("Account deletion failed");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle error, show error message to the user, etc.
    }
  };
  return (
    <div className="delete-account-text">
      <p>
        you are about to delete your account along with any events you may have
        posted. This action cannot be undone. All user info will be erased from
        the server.
      </p>
      <div className="dashlink delete-account" onClick={deleteAccount}>
        Delete Account
      </div>
    </div>
  );
};

export default Delete;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../authContext";

const UserEvents = ({ userData, handleDeleteEvent }) => {
  const { data } = useAuth();
  const { token } = data;
  if (userData.length === 0) {
    return <div className="nodata">You Haven't Added Any Events Yet</div>;
  }

  const handleDelete = (_id) => {
    // Send DELETE request to the server to delete the event
    fetch(`https://events-server-2d4h.onrender.com/event/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // If the request was successful, call the onDelete callback to update the UI
          // onDelete(_id);
          handleDeleteEvent(_id);
        } else {
          throw new Error("Event deletion failed");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        // Handle error, show error message to the user, etc.
      });
  };

  return (
    <div className="usereventscontainer">
      {userData.length > 0 ? (
        userData.map((post) => {
          const { title, location, _id, author, imagePath, date } = post;
          const inputDate = new Date(date);
          const options = { day: "2-digit", month: "2-digit", year: "numeric" };
          const formattedDate = inputDate.toLocaleDateString("en-GB", options);
          return (
            <div className="user-event" key={_id}>
              <div className="usereventimage">
                <img src={imagePath} alt="" />
              </div>
              <div className="details">
                <p className="username">{author}</p>
                <div className="attr-wrapper event-name">
                  <p>
                    <FontAwesomeIcon className="icon" icon={faCloudSun} />
                    Activity
                  </p>
                  <p>{title}</p>
                </div>
                <div className="attr-wrapper date">
                  <p>
                    <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                    Date
                  </p>
                  <p>{formattedDate}</p>
                </div>
                <div className="attr-wrapper location">
                  <p>
                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                    Location
                  </p>
                  <p>{location}</p>
                </div>
              </div>
              <div className="delete-event">
                <button
                  onClick={() => {
                    handleDelete(_id);
                    handleDeleteEvent(_id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="loading-message">Loading events...</div>
      )}
    </div>
  );
};

export default UserEvents;

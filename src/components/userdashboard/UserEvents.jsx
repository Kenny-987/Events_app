import React, { useState } from "react";
import EditEvent from "./EditEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faCalendarDays,
  faCloudSun,
  faEdit,
  faTrash,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../authContext";

const UserEvents = ({ userData, handleDeleteEvent }) => {
  const { data } = useAuth();
  //const [option,setOption] = useState(false)
  const { token } = data;
const [showDelete,setShowDelete] = useState(null)
const [showEditForm,setShowEditForm]= useState(false)
const [editEvent,setEditEvent]= useState(null)

  if (userData.length === 0) {
    return <div className="nodata">You Haven't Added Any Events Yet</div>;
  }

  const handleDelete = async(_id) => {
    // Send DELETE request to the server to delete the event
    try{
      
      const response = await fetch(`https://events-server-2d4h.onrender.com/event/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        if (response.ok) {
            // If the request was successful, call the onDelete callback to update the UI
            // onDelete(_id);
            handleDeleteEvent(_id);
            setShowDelete(null)
            console.log("event deleted")
          } else {
            throw new Error("Event deletion failed");
          }
    }catch(error){
      console.error("Error deleting event:", error)
    }


  };

const handleEdit = (event)=>{
setEditEvent(event)
setShowEditForm(true)
}
  return (
    <div className={`usereventscontainer ${showEditForm ? "noscroll":""}`}>

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
              <div className="edit">
                {/* delete icon */}
                <button className="delete-event"
                onClick={()=>{
                  setShowDelete(_id)
                }}
                >
                  <p>
                    <FontAwesomeIcon className="icon" icon={faTrash} />
                  </p>
                </button>
                  {/* delete icon */}
                  {/* edit icon */}
                <button className="edit-event" onClick={()=>{handleEdit(post)}}>
                <FontAwesomeIcon className="icon" icon={faEdit} />
                </button>
                 {/* edit icon */}

                {/* confirm delete modal*/}
                { showDelete ===_id &&   <div className="confirmDelete">
                  Proceed to delete the event
                  <div className="deleteOptions">
                    <button   onClick={() => {
                    handleDelete(_id);
                    handleDeleteEvent(_id);
                  }}>Yes</button>
                    <button onClick={()=>{setShowDelete(null)}}>Cancel</button>
                  </div>
                </div>}
              {/* confirm delete modal*/}
             
              </div>
            </div>
          );
        })
      ) : (
        <div className="nodata">You Haven't Added Any Events Yet</div>
      )}


      {showEditForm && <EditEvent event={editEvent} setShowEditForm={setShowEditForm}/>}
    </div>
    
  );
};





export default UserEvents;

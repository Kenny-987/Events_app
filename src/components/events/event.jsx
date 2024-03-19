import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import {
  faLocationDot,
  faCalendarDays,
  faDollarSign,
  faCloudSun,
  faHeart,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { set } from "date-fns";

const Event = ({ eventdata ,loading,length}) => {
  const [likedEvents, setLikedEvents] = useState([]);
  const [loginPrompt,setLoginPrompt]= useState(null)
  const { data } = useAuth();
  const { token, user } = data;
  const navigate = useNavigate();
  const handleEventClick = (singleEvent) => {
   navigate("/eventdetails",{state:{singleEvent:singleEvent}})
  };
  const today = new Date();
  //check and compare code on github i dont remember what was here
if(length.length===0){
  return ""
}

  if (eventdata.length === 0 && !loading) {
    return (
      <div className="nodata">
        No Matching Event
      </div>
    );
  }

//to be implemented properly
  // const likeEvent = async (eventId) => {
  //   if (!token) {
  //     setLoginPrompt(eventId); 
  //   } else {
  //     try {
  //       const response = await fetch(`http://localhost:3000/event/like/${eventId}`, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         },
  //       });

  //       if (response.ok) {
  //         // Update the likedEvents state
  //         setLikedEvents([...likedEvents, eventId]);
  //         console.log("liked suksessfully")
  //       } else {
  //         // Handle error
  //         console.error('Failed to like the event');
  //       }
  //     } catch (error) {
  //       console.error('Error occurred while liking the event:', error);
  //     }
  //   }
  // };


  return (
    <div className="events-container">
      {eventdata.map((singleEvent) => {
        const {
          title,
          location,
          date,
          fee,
          _id,
          description,
          category,
          author,
          imagePath,
        } = singleEvent;
        const inputDate = new Date(date);
        // if (inputDate < today) {
        //   return null; 
        // }
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const formattedDate = inputDate.toLocaleDateString("en-GB", options);
        const isLiked = likedEvents.includes(_id);
        const showLoginPrompt = loginPrompt === _id;
        return (
          <div
            className="event"
            key={_id}
           
          >
            <div className="image">
              {/* div containing loke icon */}
              {/* <div className="like">
              <p><FontAwesomeIcon className={isLiked ? "likedcolor":"likedefault"} icon={faHeart}  onClick={()=>{
               likeEvent(_id);
              setLikedEvents(!isLiked)
            }}  /> </p>
              </div> */}
            
              <img src={imagePath} alt=""  onClick={() => {
              handleEventClick(singleEvent);
            }} />
            </div>
            <div className="details"  onClick={() => {
              handleEventClick(singleEvent);
            }}>
              <p className="username">{author}</p>
              <div className="attr-wrapper event-name">
                {/* <p>
                  <FontAwesomeIcon className="icon" icon={faCloudSun} />
                  Activity
                </p> */}
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
              <div className="attr-wrapper entry-fee">
                <p>
                  <FontAwesomeIcon className="icon" icon={faDollarSign} />
                  Entry Fee
                </p>
                {fee == null ? (
                  <p className="price">free</p>
                ) : (
                  <p className="price">${fee}</p>
                )}
              </div>
            </div>
            {/* this shows a message and prompt to login if user tries to like event without logging in */}
            {showLoginPrompt && <div className="notoken">
              <div className="close">
              <FontAwesomeIcon className="icon" icon={faClose} onClick={()=>{
                setLoginPrompt(null)
              }}
               />
              </div>
              <p>
              <Link to="/login" className="login-link">
               Login  
            </Link>{" "}
               or <Link to="/login" className="login-link">
                Signup
            </Link> to Like events
              </p>
            </div> }
           
          </div>
        );
      })}
  
    </div>
  );
};
export default Event;


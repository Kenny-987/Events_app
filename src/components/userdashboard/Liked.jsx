import React from "react";
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

const Liked = () => {
  return <div className="liked-events-container">
    <h3>Events you Like</h3>
    <div className="events-container">
      <div className="likd-event event">
            <div className="image">
              <img src="" alt=""  onClick={() => {
            }} />
            </div>
            <div className="details"  onClick={() => {
            
            }}>
              <p className="username">{"author"}</p>
              <div className="attr-wrapper event-name">
                <p>
                  <FontAwesomeIcon className="icon" icon={faCloudSun} />
                  Activity
                </p>
                <p>title</p>
              </div>
              <div className="attr-wrapper date">
                <p>
                  <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                  Date
                </p>
                <p>today</p>
              </div>
              <div className="attr-wrapper location">
                <p>
                  <FontAwesomeIcon className="icon" icon={faLocationDot} />
                  Location
                </p>
                <p>{"here"}</p>
              </div>
              <div className="attr-wrapper entry-fee">
                <p>
                  <FontAwesomeIcon className="icon" icon={faDollarSign} />
                  Entry Fee
                </p>
                  <p className="price">free</p>
              </div>
            </div>
          </div>
    </div>
  </div>;
};

export default Liked;

// {eventdata.map((singleEvent) => {
//   const {
//     title,
//     location,
//     date,
//     fee,
//     _id,
//     description,
//     category,
//     author,
//     imagePath,
//   } = singleEvent;
//   const inputDate = new Date(date);
//   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
//   const formattedDate = inputDate.toLocaleDateString("en-GB", options);
//   const isLiked = likedEvents.includes(_id);
//   const showLoginPrompt = loginPrompt === _id;
//   return (
//     <div
//       className="event"
//       key={_id}
     
//     >
//       <div className="image">
//         <div className="like">
//         <p><FontAwesomeIcon className={isLiked ? "likedcolor":"likedefault"} icon={faHeart}  onClick={()=>{
//          likeEvent(_id);
//         // setLikedEvents(!isLiked)
//       }}  /> </p>
//         </div>
      
//         <img src={imagePath} alt=""  onClick={() => {
//         handleEventClick(singleEvent);
//       }} />
//       </div>
//       <div className="details"  onClick={() => {
//         handleEventClick(singleEvent);
//       }}>
//         <p className="username">{author}</p>
//         <div className="attr-wrapper event-name">
//           <p>
//             <FontAwesomeIcon className="icon" icon={faCloudSun} />
//             Activity
//           </p>
//           <p>{title}</p>
//         </div>
//         <div className="attr-wrapper date">
//           <p>
//             <FontAwesomeIcon className="icon" icon={faCalendarDays} />
//             Date
//           </p>
//           <p>{formattedDate}</p>
//         </div>
//         <div className="attr-wrapper location">
//           <p>
//             <FontAwesomeIcon className="icon" icon={faLocationDot} />
//             Location
//           </p>
//           <p>{location}</p>
//         </div>
//         <div className="attr-wrapper entry-fee">
//           <p>
//             <FontAwesomeIcon className="icon" icon={faDollarSign} />
//             Entry Fee
//           </p>
//           {fee == null ? (
//             <p className="price">free</p>
//           ) : (
//             <p className="price">${fee}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// })}
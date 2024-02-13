import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import {
  faLocationDot,
  faCalendarDays,
  faDollarSign,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Event = ({ data ,loading,length}) => {
  const navigate = useNavigate();
  const handleEventClick = (singleEvent) => {
   navigate("/eventdetails",{state:{singleEvent:singleEvent}})
  };

if(length.length===0){
  return ""
}

  if (data.length === 0 && !loading) {
    return (
      <div className="nodata">
        No Matching Event
      </div>
    );
  }
  return (
    <div className="events-container">
      {data.map((singleEvent) => {
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
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const formattedDate = inputDate.toLocaleDateString("en-GB", options);
        return (
          <div
            className="event"
            key={_id}
            onClick={() => {
              handleEventClick(singleEvent);
            }}
          >
            <div className="image">
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
          </div>
        );
      })}
  
    </div>
  );
};
export default Event;


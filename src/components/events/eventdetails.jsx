import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";


const EventDetails = () => {
  const pagelocation = useLocation()
  const singleEvent = pagelocation.state.singleEvent
  const navigate = useNavigate()
  const {
    title,
    location,
    date,
    imagePath,
    fee,
    description,
    category,
    author,
    phone,
    email
  } = singleEvent;
  const inputDate = new Date(date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-GB", options);

  const toMaps=()=>{
const mapsUrl=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
window.open(mapsUrl,"_blank")
  }
  return (
  
      <div className="event-details" >
        <div className="closediv"  onClick={() => {
             navigate("/")
            }}>
          <FontAwesomeIcon
            className={"close-eventdetailsbtn"}
            icon={faArrowLeft}
           
          /> Back
        </div>

        <div className="detailsbody">
          <img className="details-image" src={imagePath} alt="" />
          <div className="more-details">
            <div className="details-info">
              <p>Event Organiser:</p> <p>{author}</p>
              
            </div>
            <div className="details-info">
              <p>Event Title:</p> <p>{title}</p>
            </div>
            <div className="details-info location" onClick={toMaps}>
              <p>Location: <small>click to show on map</small></p> <p>{location}</p>
            </div>
            <div className="details-info">
              <p>Date:</p>
              <p>{formattedDate}</p>
            </div>
            <div className="details-info">
              <p>Entry Fee</p>
              {fee == null ? <p>$0.00</p> : <p>${fee}</p>}
            </div>
           
            <div className="details-info">
              <p>Category:</p>
              {category == "" ? <p>All</p> : <p>{category}</p>}
            </div>
          </div>
        </div>
        <div className="aboutevent">
          <h3>About This Event</h3>
          {description == "" ? <p>No extra details about this event</p>: <p>{description}</p>}
          <h3>Contacts</h3>
          <p>Email :{email ? <span>{email}</span>: <span>No Email</span>}</p>
          <p>Phone :{phone ? <span>{phone}</span>: <span>No Phone Details</span>}</p>
          <div className="socialmedia">

          </div>
        </div>
      </div>
    
  );
};

export default EventDetails;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
const EventDetails = ({ closeDetails, data }) => {
  const {
    title,
    location,
    date,
    imagePath,
    fee,
    description,
    category,
    author,
  } = data;
  const inputDate = new Date(date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-GB", options);
  return (
    <div className="eventdetailscon">
      <div className="event-details">
        <div className="closediv">
          <FontAwesomeIcon
            className={"close-eventdetailsbtn"}
            icon={faClose}
            onClick={() => {
              closeDetails();
            }}
          />
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
            <div className="details-info">
              <p>Location:</p> <p>{location}</p>
            </div>
            <div className="details-info">
              <p>Date:</p>
              <p>{formattedDate}</p>
            </div>
            <div className="details-info">
              <p>Entry Fee</p>
              {fee == null ? <p>$0.00</p> : <p>${fee}</p>}
            </div>
            {}
            <div className="details-info">
              <p>Description</p>
              {description == "" ? <p>No Desription</p> : <p>{description}</p>}
            </div>
            <div className="details-info">
              <p>Category:</p>
              {category == "" ? <p>All</p> : <p>{category}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

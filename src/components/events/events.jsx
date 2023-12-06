import Event from "./event";
import "./events.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import Footer from "../footer/footer";
const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const { eventsInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const api = "https://events-server-2d4h.onrender.com/event/activities";
  //const webapi
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(api);
        const events = await response.json();
        setEventsData(events);
        eventsInfo(eventsData);
      } catch (error) {
        console.error("error getting events", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="loadingdatabox">
        <div className="loadingdata"></div>
      </div>
    );
  }

  return (
    <section className="events">
      <div className="heading">
        <h3>Upcoming Events </h3>
        {/* <div className="sorting">
          <div className="sort-box filter">
            <button>
              <p>Sort By</p>
            </button>
          </div>
        </div> */}
      </div>

      {error == true ? (
        <div className="apiError">Server Error, try reloading page</div>
      ) : (
        <Event data={eventsData} />
      )}
      <Footer />
    </section>
  );
};
export default Events;

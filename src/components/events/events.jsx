import Event from "./event";
import "./events.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";


const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const[filteredEvent,setFilteredEvent]=useState([])
  const { eventsInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter,setShowFilter]=useState(false)
  const [error, setError] = useState(false);
  const api = "https://events-server-2d4h.onrender.com/event/activities";

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(api);
        const events = await response.json();
        setEventsData(events);
        setFilteredEvent(events)
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

const filterEventsFunc  = (category)=>{
  if (category ===""||category==="all"){
    setFilteredEvent(eventsData)
  }else{
     setFilteredEvent(eventsData.filter((event)=> event.category === category))
  }
}

 
  return (
    <section className="events">
      <section className="categorybox">
        <p>Filter By Category</p>
      <div className="categories">
        <div className="cat" onClick={()=>{
        filterEventsFunc("all")
          
        }}>All</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Art</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Music</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Business</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Education</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Technology</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }} >Film</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Health</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Fundraising</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Food</div>
      </div>
      </section>
  
      <div className="heading">
        <h3>Upcoming Events </h3>
        <div className="sorting">
          <div className="sort-box ">
              <p onClick={()=>{
                setShowFilter(!showFilter)
              }}>Sort By <span> <FontAwesomeIcon className="icon" icon={faArrowDown} /></span></p>
              {showFilter && 
              <div className="filter">
              <button>
              Date
           </button>
           <button>
              Price
           </button>
              </div> }
        
           
          
          </div>
        </div>
      </div>
      {eventsData.length === 0 && !isLoading && <div className="nodata">
        No Events Yet... Check again Later or Add your own Event
      </div> }
{isLoading && !error &&  <div className="loadingdatabox">
        <div className="loadingdata"></div>
      </div>}
      {error == true && !isLoading  ? (
        <div className="apiError">Server Error, try reloading page</div>
      ) : (
        <Event data={filteredEvent} loading={isLoading} length={eventsData} />
      )}
    </section>
  );
};
export default Events;

import Event from "./event";
import { Link, useNavigate } from "react-router-dom";

import "./events.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faClose,
  faArrowDown,faArrowUp,
  faArrowRight,
  faLocationCrosshairs,
  faSoccerBall,
  faBullseye
} from "@fortawesome/free-solid-svg-icons";



const Events = () => {
  const [eventsData, setEventsData] = useState([]);
  const[filteredEvent,setFilteredEvent]=useState([])
  const [verifiedUser, setVerifiedUser] = useState(false);
  const { eventsInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter,setShowFilter]=useState(false)
  const [showCities,setShowCities]=useState(false)
  const [error, setError] = useState(false);
  const [searchItem,setSearchItem]= useState("")
  const { data } = useAuth();
  const { token } = data;
  const [cityLoading, setCityLoading] = useState(true);
  const navigate = useNavigate();
 const [position,setPosition]=useState({latitude:null,longitude:null})
const [userCity,setUserCity]=useState(null)

//function to get user location, latitude and longitude
useEffect(()=>{
  console.log("fetching coordinates")
  const GetUserLocation = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
     setPosition({latitude:position.coords.latitude,longitude:position.coords.longitude})

      })
    }else{
      console.log("geolocation not available")
    }
    }
    GetUserLocation()
},[])


const {latitude,longitude}=position
//function to get user city 
const apiKey = "AuZRaa5NUz6I7It4H_YVC4I0_-joUkxVuwlooTxK_4KJvT7fhjT6fd-cxtg842GP"
const bingMapsUrl = `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?o=json&key=${apiKey}`

//function to get user city
const getUserCity = async()=>{
  console.log("fetching city")
  if(latitude && longitude){
    try {
      const response = await fetch(bingMapsUrl)
      const usersCity = await response.json()
      const city = usersCity.resourceSets[0].resources[0].address.locality;
      console.log(city)
      setUserCity(city)
    } catch (error) {
      console.error("error: ",error)
    }finally{
      setCityLoading(false);
    }
  }
}

useEffect(()=>{
   if (position.latitude && position.longitude) {
    getUserCity();
  }
},[])


  const toAddEventPage = () => {
    if (!token) {
      setVerifiedUser(true);
    } else {
      navigate("/addevent");
    }
  };

  // production api dont forget to uncomment before commiting
const api = "https://events-server-2d4h.onrender.com/event/activities";
//testing api 
 //const api = "http://localhost:3000/event/activities"
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(api);
        const events = await response.json();
        setEventsData(events);
        const filteredEvents = events.filter(event => new Date(event.date) > new Date());
        setFilteredEvent(filteredEvents)
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

const sortEventsByDate = () => {
  const sortedEvents = [...filteredEvent].sort((a, b) => new Date(a.date) - new Date(b.date));
  setFilteredEvent(sortedEvents);
  // setSortBy("date");
};

const sortEventsByPrice = () => {
  const sortedEvents = [...filteredEvent].sort((a, b) => {
    // Convert prices to numbers for comparison
    const priceA = a.fee != null ? parseFloat(a.fee) : 0;
    const priceB = b.fee != null ? parseFloat(b.fee) : 0;
    return priceA - priceB;
  });
  setFilteredEvent(sortedEvents);
};
 
const cities=['Harare','Bulawayo','Chitungwiza','Gweru','Victoria Falls','Mutare','Kwekwe','Kadoma','Marondera','Beitbridge','Gwanda','Hwange','Chegutu','Karoi']

const filteredCities = cities.filter(city=>city.toLowerCase().startsWith(searchItem.toLowerCase()))
const handleKeyPress=(e)=>{
if(e.key==="Enter"){
  cityFilter(searchItem.toLowerCase())
  console.log("this is city: ",searchItem.toLowerCase())
}
}

//function to display events matching city
const cityFilter = (city)=>{
  if (city ===""||city==="all"){
    setFilteredEvent(eventsData)
  }else{
    setFilteredEvent(eventsData.filter((event)=> event.city.toLowerCase() === city.toLowerCase()))
    console.log(filteredEvent)
    console.log(city)
  }
}

//function to show events matching user city
const userCityFilter=()=>{
  
  if( userCity){
    cityFilter(userCity)
    setShowCities(false)
    setSearchItem(userCity)
  }else{
    cityFilter("")
    setShowCities(false)
    setSearchItem("cannot get location")
    console.log("no city")
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
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Party</div>
        <div className="cat" onClick={(e)=>{
        filterEventsFunc(e.currentTarget.innerHTML.toLocaleLowerCase())
        }}>Festival</div>
      </div>
      </section>
  
{/* <div className="extras">
<button>Show Nearby Restuarants <FontAwesomeIcon icon={faLocationCrosshairs} /></button>
<button>Sporting Events <FontAwesomeIcon icon={faSoccerBall} /></button>
</div> */}

      <div className="heading">
        <h3>Upcoming Events: </h3>

<div className="filterparent">
  {/* div to sort events */}
        <div className="sorting">
          <div className="sort-box ">
              <p onClick={()=>{
                setShowFilter(!showFilter)
              }}>Sort By <span> {showFilter?<FontAwesomeIcon  icon={faArrowUp} />:<FontAwesomeIcon  icon={faArrowDown} />}</span></p>
              {showFilter && 
              <div className="filter">
              <button onClick={()=>{
                sortEventsByDate()
                setShowFilter(!showFilter)
                }}>
              Date
           </button>
           <button onClick={()=>{
            sortEventsByPrice()
            setShowFilter(!showFilter)
            }}>
              Price
           </button>
              </div> }
          </div>
        </div>
        {/* div to sort events */}

 {/* div to filter events according to city */}
 
 <div className="sorting">
          <div className="sort-box ">
              <input type="text" 
               placeholder="Select City"
               value={searchItem}
               onChange={(e)=>{
                setSearchItem(e.target.value)
                setShowCities(true)
                getUserCity()
               }}
               onKeyDown={handleKeyPress}
               
              />
              {searchItem.length!==0 &&
              <div className="filter">
                {showCities && 
                  <ul>
                  <li onClick={()=>{
                    cityFilter("all")
                    setShowCities(false)
                    setSearchItem("all")
                  }} >All</li>
                  <li onClick={()=>{
                    userCityFilter()
                  }} >In My City</li>
                  {filteredCities.map((city,index)=>{
                  return <li key={index} onClick={()=>{
                    console.log("the city:",city)
                    cityFilter(city)
                    setSearchItem(city)
                    setShowCities(false)
                  }}>{city}</li>
                 })}</ul>
                }
           
              </div> }
          </div>
        </div>
        {/* div to filter events */}
        </div>

      </div>
      {eventsData.length === 0 && !isLoading && !error&& <div className="nodata">
        No Events Yet... Check again Later or Add your own Event
      </div> }
{isLoading && !error &&  <div className="loadingdatabox">
        <div className="loadingdata"></div>
      </div>}
      {error == true && !isLoading  ? (
        <div className="apiError">Network Error, try reloading page</div>
      ) : (
        
        <Event eventdata={filteredEvent} loading={isLoading} length={eventsData} />
      )}

      <div className="toprofiles">
        <button onClick={()=>navigate("/profiles")}>View Organizers and Planners <FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      <div className="addeventbtn">
        <button onClick={toAddEventPage}>Add Your Own Events <FontAwesomeIcon icon={faPlusCircle} /></button>
        {verifiedUser && (
        <div className="noauth">
          <p> <span onClick={()=>{
            navigate('/login')
        setVerifiedUser(false)
        }}>Login</span> to Add an Event </p>
          <FontAwesomeIcon
            icon={faClose}
            className="closenoauth"
            onClick={() => {
              setVerifiedUser(!verifiedUser);
            }}
          />
        </div>
      )}
      </div>
    </section>
  );
};
export default Events;

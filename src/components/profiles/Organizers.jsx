import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./organizers.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'; 
import image3 from "../../assets/rainbow-vortex.svg"




const Organizers = () => {

const [organizersData,setOrganizers]=useState([])
const [isLoading,setIsLoading]=useState(true)
const [error,setError] = useState(false)
const navigate = useNavigate();

const showOrgarnizerDetails=(organizer)=>{
  navigate("/organizerdetails",{state:{organizer:organizer}})
}

  useEffect(() => {
    const getOrganizers = async () => {
      try {
        const response = await fetch("https://events-server-2d4h.onrender.com/profile/organizers");
        const organizers = await response.json();
        if(response.ok){
          setOrganizers(organizers);
          setIsLoading(false)
        } else{
          console.log("not okay", response.statusText);
          setIsLoading(false)
          setError(true)
        }
          
      } catch (error) {
        console.error("error getting events", error);
        setIsLoading(false)
        setError(true);
      } finally {
       setIsLoading(false);
      }
    };
    getOrganizers();
  }, []); 

if(organizersData.length < 1 || organizersData.length === 0){
return  <div className="nodata">
No Profiles yet... Try creating your own profile page
</div> 
}


  return (
    <div className='profiles'> 
    <div className="back" onClick={()=>{
        navigate("/")
       }}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
    <h3>Discover Profiles: Event Organizers and Planners
    </h3> 
    <div className="profilecards">
    {isLoading && !error &&  <div className="loadingdatabox">
        <div className="loadingdata"></div>
      </div>}
      {error == true && !isLoading ? <div className="apiError">Network Error, try reloading page</div> :
          <>
{organizersData.map((organizer) => {    


const{businessName,coverImage,location} = organizer  


 return ( <div className="profilecard" key= {organizer._id} onClick={()=>{showOrgarnizerDetails(organizer)}}>
  {coverImage ? <div className="cardImage">
    <img src={organizer.coverImage + "?alt=media"} alt="" />
  </div> : <div className="cardImage">
    <img src={image3} alt="" />
  </div> }
  
  <div className="cardname">
    <p>{businessName.charAt(0).toUpperCase() + organizer.businessName.slice(1)}
    {location ? <small>{organizer.location}</small> : <small>{""}</small>}
    
    </p>
    
  </div>
</div>)
      })} 
</>
       
      }
 
    </div> 
    
    </div>
  )
}

export default Organizers
import React,{useEffect,useState} from 'react'
import fixtures from "./fixtures.json"



const Football = () => {
const location = localStorage.getItem("location").replace(/"/g,"")
//let location = "Bulawayo";
// const [upComingMatches,setUpComingMatches] = useState(fixtures)
const [filteredFixtures,setFilteredFixtures] = useState(fixtures)
const [showAll,setShowAll]=useState(false)



const filterFixtureFunc  = (city)=>{

  if (city === null || city==="all" || city===""){
    setFilteredFixtures(fixtures)
  }else{
    console.log(fixtures)
     setFilteredFixtures(fixtures.filter((fixture)=> fixture.city === city ))
  }
}

console.log(fixtures)

  return (
    <div className='football-container'>
      <h3>Upcoming Matches</h3>
      <div className="filter-div">
        {showAll == true ? <button className='location-filter' onClick={()=>{
          filterFixtureFunc("all")
          setShowAll(false)
        }}>Show All</button> : <button className='location-filter' onClick={()=>{
        filterFixtureFunc(location)
        setShowAll(true)
      }}>Show matches near me</button> }
      
      </div>
      {showAll == true && <p className='matchcity'>{location!==null ? <span>Matches in: {location}</span>:<span>Cannot get your location</span>}</p>}
      <div className='fixture-box'>
  {filteredFixtures.map((fixture)=>{
    return <div className="fixture" key={fixture.index}>
    <p>Date: <span>{fixture.date}</span> <span>Time: {fixture.time}</span></p>
    <div className="teams">
      <p><span>{fixture.teams.home}</span> vs <span>{fixture.teams.away}</span></p>
    </div>
    <p>Venue: <span className='matchvenue'>{fixture.venue}</span>, <span>Matchday:{fixture.matchday} </span></p>
    <p>{fixture.competition}</p>
  </div>
    
    
  })}
  </div>

    </div>
   
  )
}

export default Football
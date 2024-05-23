import React, { useState,useEffect } from 'react'
import "./sports.css"
import Football from './sports/football'
import Cricket from './sports/cricket'
import Basketball from './sports/basketball'
import Rugby from './sports/rugby'
import Other from './sports/other'
import { useNavigate } from "react-router";

const Sports = () => {
const [sportSection,setSportSection]=useState("football")
const navigate = useNavigate()
const setSection = (section)=>{
setSportSection(section)
}
useEffect(()=>{
  window.scroll(0,0)
},[navigate])

  return (
    <section className='sports-container'>
      <h1>Sports</h1>
<div className="sport-types">
  <button onClick={()=>setSection("football")}>Football</button>
  <button onClick={()=>setSection("basketball")}>Basketball</button>
  <button onClick={()=>setSection("cricket")}>Cricket</button>
  <button onClick={()=>setSection("rugby")}>Rugby</button>
  <button onClick={()=>setSection("other")}>Other</button>
</div>

<div className="sport-body">
{sportSection == "football" &&  <Football/>}
{sportSection == "cricket" &&  <Cricket/>}
{sportSection == "rugby" &&  <Rugby/>}
{sportSection == "basketball" &&  <Basketball/>}
{sportSection == "other" &&  <Other/>}
</div>
      </section>
  )
}

export default Sports
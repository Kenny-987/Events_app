import React, { useState } from 'react'
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import image3 from "../../assets/rainbow-vortex.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowCircleLeft,faArrowCircleRight,faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import {faFacebook,faInstagramSquare,faWhatsapp} from "@fortawesome/free-brands-svg-icons"



const Organizerdetails = () => {
    const pagelocation = useLocation()
    const organizer = pagelocation.state.organizer
    const{businessName,description,coverImage,email,location,socialMedia,number,website,address,services,portfolio} = organizer
    const {facebook,instagram,whatsApp}=socialMedia
    const navigate = useNavigate() 
    const [showGallery,setShowGallery]=useState(false)
    


  return (
    <div className='organizerdetails' >
        <div className="back" onClick={()=>{
        navigate("/profiles")
       }}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
<div className="profilecard" key= {organizer._id}>
  {coverImage ? <div className="cardImage">
    <img src={coverImage} alt="coverImage" />
  </div> : <div className="cardImage">
    <img src={image3} alt="" />
  </div> }
  
  <div className="carddetails">
  <div className="carddetail">
    <p className="header businessname">{businessName.charAt(0).toUpperCase() + businessName.slice(1)}
    {location ? <small><FontAwesomeIcon icon={faLocationDot} /> {organizer.location}</small> : <small>{""}</small>}
    </p>
  </div>

    <div className="carddetail bio" >
    <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
    </div>
    <div className="carddetail ">
        <p className="header">Services</p>
    {services.map((service,index)=>{
                return <li key={index} className='service'>{service}</li>
              })}
    </div>
    <div className="portfolio">
      {showGallery && <div className="expandImage">
        <div className="close" onClick={()=>{setShowGallery(!showGallery)}} ><FontAwesomeIcon icon={faClose}/></div>
        {/* <div className="moveleft move"><FontAwesomeIcon icon={faArrowCircleLeft}/> </div>
        <div className="moveright move"><FontAwesomeIcon icon={faArrowCircleRight}/></div> */}
        {portfolio.map((img,index)=>{
      return  <div className="expandedImage" key={index}>
           <img src={img} alt="" />
        </div>
      })}
      </div> }
      
    <p className="header">Portfolio</p>
      <div className="portfolioImagesa">
      {portfolio.length > 0 ?    <>
      {portfolio.map((img,index)=>{
      return  <div className="portfolioImagea" key={index}>
           <img src={img} alt="" onClick={()=>{setShowGallery(!showGallery)}} />
        </div>
      })}
      </> : <div className='noimages'>No portfolio images to show</div> }
   
      </div>
    </div>
    
    <div className="contactdetails">
    <p className="header">Contact Details</p> 
    <div className="cardcontacts">
    <p>{number}</p>
    </div>
    <div className="cardcontacts">
    <p> <a href={`mailto:${email}`}>{email}</a></p>
    </div>
    <div className="cardcontacts">
    <p><a href={website} target='_blank'></a>{website}</p>
    </div>
    <div className="cardcontacts">
      {address && <>
      <p className="header address">Address</p> 
    <p>{address}</p>
    </> }
    
    </div>
    </div>
    <div className="linkstopages">
       {/* facebook link */}
       <div className="linktopage">
          {facebook ? <p> <a href={facebook} target="_blank" ><FontAwesomeIcon icon={faFacebook} /></a> </p> : <p>{""}</p> }
        </div>
         {/* whatsapp link */}
       <div className="linktopage whatsapp" >
          { whatsApp ? <p> <a href= {`https://wa.me/${whatsApp}`}target="_blank" ><FontAwesomeIcon icon={faWhatsapp} /></a> </p> : <p>{""}</p> }
        </div>
         {/* instagram link */}
       <div className="linktopage insta">
          {instagram ? <p> <a href={instagram} target="_blank" ><FontAwesomeIcon icon={faInstagramSquare} /></a> </p> : <p>{""}</p> }
        </div>
    </div>
   
  </div>
</div>

    </div>
  )
}

export default Organizerdetails


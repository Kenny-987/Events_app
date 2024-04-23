import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit,faPen,faSquarePlus,faCamera,faTrash,faUpload,faClose, faAdd, faCirclePlus, faL} from "@fortawesome/free-solid-svg-icons";
import {faFacebook,faInstagram,faWhatsapp,faWhatsappSquare} from "@fortawesome/free-brands-svg-icons"
import { useAuth } from '../../authContext';
import "./profile.css"
import Portfolio from './Portfolio';


const Profile = () => {
const [isLoading,setIsLoading]=useState(false)
const [showEdit,setShowEdit]=useState(null)
const {data}=useAuth()
const {token} = data
const [error,setError]=useState(false)
const [name,setName]=useState("")
const [inputnumber,setNumber]=useState("")
const [inputemail,setEmail]=useState("")
const [inputwebsite,setWebsite]=useState("")
const [inputaddress,setAddresss]=useState("")
const [inputlocation,setLocation]=useState("")
const [bio,setBio]=useState("")
const [userservices,setServices]=useState("")
const [editImageDiv,setEditImageDiv]=useState(false)
const [image, setImage] = useState(null);
const [inputfacebook,setFacebook]=useState("")
const [inputwhatsapp,setWhatsapp]=useState("")
const [inputinstagram,setInstagram]=useState("")
const [dataLoading, setDataLoading] = useState(true);
const [organizerDetails,setOrganizerDetails]=useState([])




//function to show edit form
const handleShowForm=(field)=>{
setShowEdit(field)
}


//function that returns an edit form
const editForm =(value,setValue,bio, setBio, field)=>{
return (

  <form onSubmit={handleSubmit}>
 { field ==="input" && <input
    type="text"
    id="username"
    required
    className="edit-input"
    value={value}
    onChange={(e) => {
      setValue(e.target.value);
    }}
  />}

  {field ==="textarea" && <textarea
            name="description"
                id="description"
                cols="10"
                rows="10"
                value={bio}
                onChange={(e) => {
                    setBio(e.target.value);
                }}
                placeholder="Tell us about your business..."
            ></textarea>}
   <div className="edit-button">
  {isLoading ? (
    <div className="loaderbox">
      <div className="loader"></div>
    </div>
  ) : ( <div className='editbtns'>
  <button type="submit" className="btn">
      save
    </button>
    <button className="btn cancel" onClick={()=>handleShowForm(null)}>
      Cancel
    </button>
  </div>
  )}
</div>
</form>
)
}

//fetching user profile data
const getProfileData = async()=>{
  try {
    const response = await fetch("https://events-server-2d4h.onrender.com/auth/profiledata",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if(response.ok){

      const Apidata= await response.json()
      setOrganizerDetails(Apidata)
      
    }else{
      console.log("couldn't fetch: ",response.statusText)
    }
    
  } catch (error) {
    console.error("error geting data", error);
    setError(true)
  } finally{
    setDataLoading(false)
  }

}

useEffect(()=>{
getProfileData()
},[])

//form submit of edited info
const handleSubmit = async (e)=>{
    console.log("data sent");
e.preventDefault()
setIsLoading(true)
try {
    const response = await fetch("https://events-server-2d4h.onrender.com/auth/editprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({name,inputaddress,inputnumber,inputemail,inputwebsite,bio,userservices,inputlocation,inputfacebook,inputwhatsapp,inputinstagram})
      });
      if (response.ok){
        const result = await response.json()
      console.log("changes saved");
      setIsLoading(false)
      setShowEdit(null)
      getProfileData()
       //console.log(result);
       setServices("")
      }else{
        console.log(response.statusText);
        setIsLoading(false)
      }
} catch (error) {
    console.log(error);
    setIsLoading(false)
}
}


//code to add cover image
const coverImageUpload = async (e)=>{
e.preventDefault()
setIsLoading(true)
if(!image){
  console.error("no file")
  return
}
const formData = new FormData()
 formData.append("image", image)

try {
  const response = await fetch("https://events-server-2d4h.onrender.com/auth/addcoverimage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  })

  if(response.ok){
    const result = await response.json()
    setEditImageDiv(false)
    setIsLoading(false)
    setImage(false)
    getProfileData()
  }else{
    setIsLoading(false)
    setError(true)}
} catch (error) {
  
  setIsLoading(false)
  setError(true)
}

}


//code to delete cover image
const deleteCoverImage = async(e)=>{
e.preventDefault()
setIsLoading(true)
try {
  const response = await fetch(`https://events-server-2d4h.onrender.com/auth/delcoverimage`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({coverImage})
  })

  if(response.ok){
    console.log("image gone")
    // const result = await response.json()
    getProfileData()
    setIsLoading(true)
  }else{
    console.log(response.statusText)
    setIsLoading(true)
  }
}catch(error){
console.error(error)
setIsLoading(true)
}
}



// code to remove a service item
const removeFromServices = async (indexToRemove) => {
    try {
        // Send a request to the backend to delete the service item
        const response = await fetch(`https://events-server-2d4h.onrender.com/auth/deleteService/${indexToRemove}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.ok) {
          //const result = await response.json()
          getProfileData()
        } else {
            console.error("Failed to delete service item");
        }
    } catch (error) {
        console.error("Error deleting service item:", error);
    }
};
if (dataLoading) {
  return (
    <div className="loadingdatabox">
      <div className="loadingdata"></div>
    </div>
  );
}

if(error && !dataLoading){
  return <div className="apiError">Network Error, try reloading page</div>
}

const {_id,businessName,location,description,services,number,email,website,address,coverImage,socialMedia} = organizerDetails;
let workingImage
if(coverImage){
   workingImage = coverImage.split('?')[0]
}
const {facebook,instagram,whatsApp}=socialMedia



  return (
    <div className='profile-container' >
    
    {/* cover image section */}
    <div className="cover-image">
    {coverImage !==null && coverImage !=="" ? ( <div className='image'><FontAwesomeIcon icon={faCamera} className='editimageicon' onClick={()=>{
          setEditImageDiv(!editImageDiv)
        }}/>
    <img src={workingImage + "?alt=media"} alt="" />
    {editImageDiv &&    <div className="editImage">
      
    {isLoading  ?  <div className="loaderbox">
      <div className="loader"></div>
    </div> : <div className="imgoptions">
        
        <div className='new' >
          <label htmlFor="fileInput">
          <FontAwesomeIcon icon={faCirclePlus}/> New Image 
        <input type="file" id="fileInput" accept="image/*" name='image' style={{ display: 'none' }} onChange={(e) => {
                setImage(e.target.files[0]);
              }} />
          </label>
        <span>{image && image.name}</span>
        {image && <button type='submit' onClick={coverImageUpload}>save</button>}
  
         </div>
        <button className='remove' onClick={deleteCoverImage}><FontAwesomeIcon icon={faTrash}/> Delete Image</button>
        <button className='cancelupload' onClick={()=>{
          setEditImageDiv(!editImageDiv)
          setImage(null)
          setError(false)
        }}> <FontAwesomeIcon icon={faClose}/> </button>
        {error && <p className='err'>Couldn,t update image, network error</p>}
        </div > }
        
      
    </div>}
 
    </div>) :(
    
      <div className='skeleton'>
      {isLoading ? <div className="loaderbox">
      <div className="loader"></div>
    </div> : <form onSubmit={coverImageUpload}>
        <label htmlFor="file-upload" className='custom-upload'>
        <FontAwesomeIcon icon={faCamera} />
          Add cover image
        </label>
        <input
            type="file"
            id="file-image"
            required
            name="image"
            // className="input input-image"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
<button type="submit"> <FontAwesomeIcon icon={faUpload}/> Upload</button>
        </form>}
        
    </div>)  }
</div>


    {/* this section is profile details */}
     <div className="profile-details">

    {/* business name section */}
     <div className="prof-detail name">
       <h3>{businessName.charAt(0).toUpperCase() + businessName.slice(1)} <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('name')}/> </h3>             
        {showEdit === 'name' && <div className="edit-profile">
              {editForm(name,setName,"","","input")} 
              </div>}
      </div>

  {/*location section  */}
  <div className="prof-detail">
            <h3>City <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('location')} /></h3>
           
            {location ?  <p>{location}</p> : <small>Edit your base of operations</small> }
           
           {showEdit === "location" && <div className="edit-profile">
           {editForm( inputlocation,setLocation,"", "","input")}
        </div>}
        </div>

        {/*bio/description section  */}
        <div className="prof-detail">
            <h3>Bio <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('bio')} /></h3>
            
            {description ?<p>{description}</p> : <small>Tell us about your business</small>}
           
           {showEdit === "bio" && <div className="edit-profile">
           {editForm("", "", bio, setBio,"textarea")}
        </div>}
        </div>
      
        
          {/* services section */}
        <div className="prof-detail">
            <h3 onClick={()=>handleShowForm("services")}>Services <FontAwesomeIcon icon={faSquarePlus} /><small>Add services you provide</small></h3>
            <div className="services">
              {services.map((service,index)=>{
                return <li key={index} className='service'>{service} <FontAwesomeIcon icon={faTrash} onClick={()=>{
                  removeFromServices(index)
                }}/></li>
              })}
            </div>
            {showEdit === "services" && <div className="edit-profile">
            {editForm(userservices, setServices, "", "","input")}
        </div>}   
        </div>

            {/* portfolio images */}
            <Portfolio organizerDetails={organizerDetails} getProfileData={getProfileData}/>

        <div className="prof-detail prof-contacts">
             <h3>Contact details</h3>
             <div className="prof-contact">
             <p>Number: <span>{number}</span> <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('number')}/></p>
            {showEdit === 'number' &&  <div className="edit-profile">
               {editForm(inputnumber,setNumber,"","","input")}
         </div>}
         </div>
     
        {/* contact detail email*/}
        <div className="prof-contact">
            <p>Email: <span>{email}</span> <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('email')}/></p>
            {showEdit === 'email' &&  <div className="edit-profile">
                {editForm(inputemail,setEmail,"","","input")}
        </div>}
        </div>
     
           
           {/* contact detail website*/}
           <div className="prof-contact">
            <p>Website: <span>{website}</span> <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('website')}/></p>
            {showEdit === 'website' &&  <div className="edit-profile">
               {editForm(inputwebsite,setWebsite,"","","input")}
        </div>}
        </div>
      
           {/* contact detail address */}
            <div className="prof-contact">
            <p>Address: <span>{address}</span> <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('address')}/></p>
            {showEdit === 'address' &&  <div className="edit-profile">
               {editForm(inputaddress,setAddresss,"","","input")}
        </div>}
        </div>

          <div className="socialLinks">
            {/* facebook link */}
          <div className="socialLink">
           
          {facebook!==""&&facebook!==null ? <p><FontAwesomeIcon icon={faFacebook}/> {facebook} <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('facebook')}/></p> : 
                 <div onClick={()=>{handleShowForm("facebook")}}> 
                 <p>Add to link to your FaceBook page</p> 
               </div> 
                 }
                 {showEdit === 'facebook' &&  <div className="edit-profile">
                  {console.log(inputfacebook)}
                 {editForm(inputfacebook,setFacebook,"","","input")}
                    </div>}
        </div>
                 
                 {/* whats app link */}
        <div className="socialLink">
          {whatsApp!==""&&whatsApp!==null ? <p><FontAwesomeIcon icon={faWhatsapp}/> {whatsApp}  <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('whatsapp')} /></p> : 
                 <div onClick={()=>{handleShowForm("whatsapp")}}> 
                 <p>Add your WhatsApp number <span>Include Country Code: <small>eg.+263712345678</small></span></p> 
               </div> 
                 }
                 {showEdit === 'whatsapp' &&  <div className="edit-profile">
                 {editForm(inputwhatsapp,setWhatsapp,"","","input")}
                    </div>}
        </div>
                 

                  {/*instagram link */}
        <div className="socialLink">
          {instagram!==""&&instagram!==null ? <p><FontAwesomeIcon icon={faInstagram}/> {instagram} <FontAwesomeIcon icon={faPen} className='editicon' onClick={()=>handleShowForm('instagram')}/></p> : 
                 <div onClick={()=>{handleShowForm("instagram")}}> 
                 <p>Add link to your Instagram</p> 
               </div> 
                 }
                 {showEdit === 'instagram' &&  <div className="edit-profile">
                  {console.log(inputfacebook)}
                 {editForm(inputinstagram,setInstagram,"","","input")}
                    </div>}
        </div>

          </div>
        </div>


    </div>
    </div>
  )
}

export default Profile


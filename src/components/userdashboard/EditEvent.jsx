import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faClose} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../authContext";

const EditEvent=({setShowEditForm,event})=>{

    const [title, setTitle] = useState(event.title);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date);
    const [fee, setFee] = useState(event.fee);
    const [description, setDescription] = useState(event.description);
    const [category, setCategory] = useState(event.category);
    const [email,setEmail]=useState(event.email)
    const [phone,setPhone]=useState(event.phone)
    const [success, setSuccess] = useState(false);
    // const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitErr,setSubmitErr]=useState(false)
    const { data } = useAuth();
    const { token, user } = data;
    const navigate = useNavigate();



const handleSubmit= async(e)=>{
e.preventDefault()
setIsLoading(true)
const updatedData = {
    title, location, date, fee, description, category, email, phone
}


try {
    const response = await fetch(`https://events-server-2d4h.onrender.com/event/edit/${event._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if(response.ok){
        setIsLoading(false)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false);
          setShowEditForm(false)
          
        }, 1000);
        console.log('update complete');
      }else {
        console.log(response.statusText);
        setIsLoading(false)
      }
} catch (error) {
    console.log(error);
    setSubmitErr(true)
    setIsLoading(false)
}

}


  return (
  <div className="editEventdiv">
    <div className="close">
    <FontAwesomeIcon className="icon" icon={faClose} onClick={()=>{setShowEditForm(false)}}/>
    </div>
    <div className="addevents">
        <form className="addform" onSubmit={handleSubmit} >
          <div className="head">
            <h4>Edit Your Event</h4>
          </div>
          <div className="form-input">
            <label htmlFor="event-title" className="label">
              Edit Title
            </label>
            <input
              type="text"
              id="event-title"
              className="input"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="location" className="label">
             Edit Location 
            </label>
            <input
              type="text"
              id="location"
              className="input"
              required
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="date" className="label">
             Edit Date 
            </label>
            <input
              type="date"
              id="date"
              className="input"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              min = {new Date().toISOString().split("T")[0]}
            />
          </div>
          {/* <div className="form-input">
            <label htmlFor="image" className="label">
              Cover Image 
            </label>
            <input
              type="file"
              id="image"
              required
              name="image"
              className="input input-image"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div> */}
          <div className="form-input">
            <label htmlFor="fee" className="label">
              Edit Admission Fee
            </label>
            <input
              type="number"
              id="fee"
              className="input"
              placeholder="$0.00"
              value={fee}
              onChange={(e) => {
                setFee(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="description" className="label">
              Edit The description.
            </label>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="10"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-input">
            <label htmlFor="email" className="label">
              Edit Email
            </label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="jondoe@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="phone" className="label">
            Edit Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="input"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <label htmlFor="category" className="label">
              Category
            </label>
             <select
          id="category"
          className="input"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">Select a category</option>
          <option value="art">Art</option>
          <option value="music">Music</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
          <option value="technology">Technology</option>
          <option value="film">Film</option>
          <option value="health">Health</option>
          <option value="fundraising">Fundraising</option>
          <option value="food">Food</option>
          <option value="party">Party/Festival</option>
          {/* Add more options as needed */}
        </select>
          </div>
          <div className="submitbtn">
            {isLoading ? (
              <div className="loaderbox">
                <div className="loader"></div>
              </div>
            ) : (
              <button type="submit" className="btn">
                Save Changes
              </button>
            )}
          </div>
        </form>
        {success && (
          <div className="submitsuccess">
            <p>Changes Saved, and will be update on page refresh</p>
          </div>
        )}
          {submitErr && (
            <div className="error">
              <p>Could'nt Save Changes Check Internet Connection And Try Again</p>
            </div>
          )}
      </div>
  </div>
  
  )
  
  }

  
  export default EditEvent
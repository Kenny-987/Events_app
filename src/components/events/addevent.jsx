import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../authContext";
import "./addevent.css";

const AddEvent = () => {
  // setting defaul states
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [city,setCity]=useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [submitErr,setSubmitErr]=useState(false)
  const { data } = useAuth();
  const { token, user } = data;
  const navigate = useNavigate();

  //code to submit data
  const handleSubmit = async (e) => {

    //production api
   const api = "https://events-server-2d4h.onrender.com/event/create";
    // const api = "http://localhost:3000/event/create"
    const author = user;
    e.preventDefault();
    setIsLoading(true);
    if (date < new Date()){
      return alert("please select a date from today onwards.")
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("city", city);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("fee", fee);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", author);
      formData.append("image", image);
      formData.append("email", email);
      formData.append("phone", phone);
      
      const response = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data added ");

        setTitle("");
        setLocation("");
        setDate("");
        setFee("");
        setDescription("");
        setCategory("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 1500);
      } else {
        setIsLoading(false);
        setSubmitErr(true)
        console.log(response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      setSubmitErr(true)
      console.error("Error:", error);
    }
  };
  return (
    <div className="addevents">
      <form className="addform" onSubmit={handleSubmit}>
        <div className="head">
          <h4>Your Event Details</h4>
        </div>
        <div className="form-input">
          <label htmlFor="event-title" className="label">
            Event Title <span className="required">*</span>
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
          <label htmlFor="city" className="label">
            City <span className="required">*</span>
          </label>
          <input
            type="text"
            id="city"
            className="input"
            required
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <label htmlFor="location" className="label">
            Address <span className="required">*</span>
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
            Date <span className="required">*</span>
          </label>
          <input
            type="date"
            id="date"
            className="input"
            required
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            min = {new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="form-input">
          <label htmlFor="image" className="label">
            Cover Image <span className="required">*</span>
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
        </div>
        <div className="form-input">
          <label htmlFor="fee" className="label">
            Admission Fee
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
            A short description about your event.
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
            Email
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
           Phone
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
        <option value="conference">Conference</option>
        <option value="music">Music</option>
        <option value="business">Business</option>
        <option value="education">Education</option>
        <option value="technology">Technology</option>
        <option value="film">Film</option>
        <option value="health">Health</option>
        <option value="fundraising">Fundraising</option>
        <option value="food">Food</option>
        <option value="party">Party</option>
        <option value="party">Festival</option>
     
      </select>
        </div>
        <div className="submitbtn">
          {isLoading ? (
            <div className="loaderbox">
              <div className="loader"></div>
            </div>
          ) : (
            <button type="submit" className="btn">
              Submit
            </button>
          )}
        </div>
      </form>
      {success && (
        <div className="submitsuccess">
          <p>Event Added</p>
        </div>
      )}
        {submitErr && (
          <div className="error">
            <p>Could'nt Post Event Check Internet Connection And Try Again</p>
          </div>
        )}
    </div>
  );
};

export default AddEvent;

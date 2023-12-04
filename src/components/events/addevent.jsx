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
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useAuth();
  const { token, user } = data;
  const navigate = useNavigate();

  //code to submit data
  const handleSubmit = async (e) => {
    const api = "http://localhost:3000/event/create";
    const author = user;
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("fee", fee);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("author", author);
      formData.append("image", image);
      const response = await fetch(api, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data added ", data);

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
        console.log("error");
      }
    } catch (error) {
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
          <label htmlFor="location" className="label">
            Location <span className="required">*</span>
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
            placeholder="$1.00"
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
          <label htmlFor="category" className="label">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="input"
            placeholder="festival, conference, music, art etc..."
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
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
    </div>
  );
};

export default AddEvent;

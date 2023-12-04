import React from "react";
import UserEvents from "./UserEvents";
import { useState, useEffect } from "react";
import { useAuth } from "../../authContext";

const MyEvents = () => {
  const api = "http://localhost:3000/event/myposts";
  const [userEventsData, setUserEventsData] = useState([]);
  const handleDeleteEvent = (eventId) => {
    setUserEventsData((prevEvents) =>
      prevEvents.filter((event) => event._id !== eventId)
    );
  };
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useAuth();
  const { token } = data || {};
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const userEvents = await response.json();
        setUserEventsData(userEvents);
      } catch (error) {
        console.error("error getiing events", error);
      } finally {
        setIsLoading(false);
      }
    };
    getEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="loadingdatabox">
        <div className="loadingdata"></div>
      </div>
    );
  }

  return (
    <div className="myevents">
      <h3>My Event Posts</h3>
      <div className="posts">
        <UserEvents
          userData={userEventsData}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default MyEvents;

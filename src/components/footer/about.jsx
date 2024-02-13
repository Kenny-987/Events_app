import React, { useState } from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";


const About = () => {
const navigate = useNavigate()
  return (
    <div className="about-page">
       <span className="close-modal" onClick={()=>{
        navigate("/")
       }}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </span>
      <h3>About the project</h3>
      <p>
        Welcome to our local events website, a digital hub designed exclusively
        for the vibrant community that makes our town unique. We understand the
        pulse of our local residents, and that's why our platform is
        meticulously curated to bring you events that resonate with the spirit
        of our community. Unlike generic event websites that inundate you with
        information from around the world, we pride ourselves on being
        hyper-local, focusing solely on the happenings that matter most to you.
        Our commitment is to empower local businesses, artists, and organizers
        by providing them with a dedicated space to showcase their events. By
        doing so, we contribute to the growth and prosperity of our own
        community. Whether you're seeking the latest art exhibition, live music
        performances, or neighborhood festivals, you can navigate through our
        website with ease, confident that every event is tailored to your
        interests and located right in your backyard. The simplicity of our
        platform sets us apart. We've eliminated the noise of international
        events, allowing you to quickly find what you're looking for without the
        distraction of irrelevant information. The intuitive design ensures that
        you can effortlessly explore upcoming events, discover hidden gems, and
        engage with the heartbeat of our town. For local businesses and event
        organizers, our platform serves as a powerful tool to reach the right
        audience. By focusing solely on local events, we provide a targeted and
        effective way for businesses to connect with their community. Our
        website is not just about promoting events; it's about fostering a sense
        of belonging and community pride. Join us on this digital journey where
        local events come to life, and community bonds are strengthened. Embrace
        the simplicity of navigating through events that matter to you, and
        experience the richness of our local culture and talent. Together, let's
        celebrate the essence of our town, one event at a time.
      </p>
    </div>
  );
};

export default About;

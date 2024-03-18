import "./banner.css";
import React, { useState, useEffect } from "react";
const Banner = () => {
  const textArray = [
    "Parties",
    "Conferences",
    "Festivals",
    "Concerts",
    "WorkShops",
    "AnyEvents",
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Increment the index to get the next text from the array
      const nextIndex = (currentTextIndex + 1) % textArray.length;
      setCurrentTextIndex(nextIndex);
    }, 1500); 

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex, textArray.length]);

  return (
    <div className="banner">
      <div className="intro"> 
        <h1>
         Discover concerts, festivals, workshops, and more happening in Bulawayo. With our local events website, you'll never miss out on the latest happenings.
        </h1>
      </div>
      <div className="event-listings">
        <h4 className="text-containeer">
          <span className="text-fade">{textArray[currentTextIndex]}</span>
        </h4>
      </div>
    </div>
  );
};
export default Banner;

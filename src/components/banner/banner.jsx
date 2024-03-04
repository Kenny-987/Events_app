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
    }, 3000); 

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex, textArray.length]);

  return (
    <div className="banner">
      <div className="intro">
        <h3>
          Stay in the loop with our Local Events Website. Discover concerts, festivals, workshop, and more happening in Bulawayo. With a user friendly interface and filters, you'll never miss out on the latest happenings.
        </h3>
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

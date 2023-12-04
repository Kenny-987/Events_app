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
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clear the timeout when the component unmounts or when the effect is re-run
    return () => clearTimeout(timeoutId);
  }, [currentTextIndex, textArray.length]);

  return (
    <div className="banner">
      <div className="intro">
        <h2>
          From Festivals to Workshops: Find the next activity for you and your
          team.
        </h2>
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

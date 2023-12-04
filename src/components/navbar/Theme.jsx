import React, { useState, useEffect } from "react";

// const DarkModeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedMode = localStorage.getItem("darkMode");
//     if (savedMode) {
//       setIsDarkMode(JSON.parse(savedMode));
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     localStorage.setItem("darkMode", JSON.stringify(newMode));
//     // Apply dark mode styles to the whole application here (see step 3)
//   };

//   return (
//     <div className="dark-mode-toggle">
//       <label>
//         <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
//         Dark Mode
//       </label>
//     </div>
//   );
// };

// export default DarkModeToggle;

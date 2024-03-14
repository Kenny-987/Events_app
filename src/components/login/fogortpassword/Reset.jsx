
import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
const Reset = () => {
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isMatching, setIsMatching] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
          // Validate password and confirm password
    if (password !== confirmPassword) {
      setIsMatching(true);
      setTimeout(() => {
        setIsMatching(false);
      }, 3000);
      setIsLoading(false);
      return;
    }
      const api = "https://events-server-2d4h.onrender.com/mail-reset/resetpassword";
      try {
          const response = await fetch(api, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ password }),
          });
          if (response.ok) {
         
              setIsLoading(false);
              navigate("/login")
              console.log("password changed")
          } else{
            setIsLoading(false);
            setError(false)
          }
      } catch (error) {
          console.error("Error:", error);
          setError(true);
          setTimeout(() => {
              setError(false);
          }, 3000);
          setIsLoading(false);
      }
    };
    
  return (
    <div>
         <form className="form" onSubmit={handleSubmit}>
    {error && (
      <div className="error">
        <p>server error, try again</p>
      </div>
    )}
    <div className="head">
      <p>New Password</p>
    </div>
    <div className="form-input">
      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        type="password"
        id="password"
        required
        className="input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
    <div className="form-input">
      <label htmlFor="confirmpassword" className="label">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmpassword"
        required
        className="input"
        value={confirmPassword}
        onChange={(e) => {
        setConfirmPassword(e.target.value);
        }}
      />
    </div>
    {isMatching && (
            <div className="notmatching">Passwords do not match</div>
          )}
    <div className="button">
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
    </div>
  )
}

export default Reset
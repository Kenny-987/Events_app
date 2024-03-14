import React, { useState } from 'react'
import Otpform from './Otpform';
import {useNavigate } from "react-router-dom";
const Emailform = () => {
    const [email,setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [notFound, setNotFound] = useState(false); 
    const [messageSent, setMessageSent] = useState(false);
    const [status,SetStatus]=useState("")
    const [webStatus,setWebStatus]=useState(false)
    const [isOtp,setIsOtp]= useState(false)
    const [userotp,setOtp] = useState("")
    const navigate = useNavigate()



const handleEmailSubmit= async(e)=>{
    e.preventDefault()
    setWebStatus(false)
setIsLoading(true)

    const api = "https://events-server-2d4h.onrender.com/mail-reset/resetemail";
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmail("");
        setMessageSent(true);
        setIsLoading(false);
      } else if(response.status === 404){
        const resMsg = await response.json()

        SetStatus(resMsg.message);
        setWebStatus(true)
        setIsLoading(false);
      }else{
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setIsLoading(false);
    }
}


const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const api =   "https://events-server-2d4h.onrender.com/mail-reset/otp";
  try {
      const response = await fetch(api, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ userotp }),
      });
      if (response.ok) {
          setMessageSent(true);
       setIsOtp(true)
          setIsLoading(false);
      } else if (response.status === 401) {
          const resMsg = await response.json();
          setNotFound(true);
          SetStatus(resMsg.message);
          setWebStatus(true);
          setIsLoading(false);
      }else{
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
    <div> {!messageSent && <form className="form" onSubmit={handleEmailSubmit}>
    {error && (
      <div className="error">
        <p>server error, try again</p>
      </div>
    )}
    {notFound && (
      <div className="error">
        <p>{status}</p>
      </div>
    )}

    <div className="head">
      <p>Enter registered email</p>
    </div>
    <div className="form-input">
      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        type="email"
        id="email"
        required
        className="input"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>
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
    {messageSent && (
            <div className="done">Message Sent Successfully</div>
          )}
           { webStatus && (
            <div className="done">{status}</div>
          )}
          
  </form>}
        
      {messageSent && <Otpform handleSubmit={handleOtpSubmit} userotp={userotp} setOtp={setOtp} status={status} error={error} notFound={notFound} isOtp={isOtp} isLoading={isLoading}/>}
      </div>
  )
}

export default Emailform
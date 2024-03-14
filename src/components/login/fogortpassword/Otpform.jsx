import React, { useState } from 'react'
import Reset from './Reset';

const Otpform = ({handleSubmit,status,error,notFound,isOtp,isLoading,userotp,setOtp}) => {
  
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(false);
    // const [notFound, setNotFound] = useState(false); 
    // const [messageSent, setMessageSent] = useState(false);
    // const [status,SetStatus]=useState("")
    // const [webStatus,setWebStatus]=useState(false)

  return (
    <div> {!isOtp &&  <form className="form" onSubmit={handleSubmit}>
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
      <p>Enter PIN sent to your email </p>
    </div>
    <div className="form-input">
      <label htmlFor="otp" className="label">
        Code: <small>(Check spam folder if email is not in Primary Inbox)</small>
      </label>
      <input
        type="number"
        id="otp"
        required
        className="input"
        value={userotp}
        onChange={(e) => {
          setOtp(e.target.value);
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
  </form>}
        
  {isOtp && <Reset/>}
  </div>
  )
}

export default Otpform
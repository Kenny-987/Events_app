import React, { useState } from 'react'
import { useAuth } from '../../authContext'
const Settings = () => {
  const { data} = useAuth();
  const { user,email,token } = data;
    const [name,setName]=useState(user)
    const [useremail,setEmail]=useState(email)
    const [notFound, setNotFound] = useState(false); // for displaying error message if user account not found
    const [error, setError] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false); // for displaying error message if password incorrect
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2,setIsLoading2]=useState(false)
    const [currentPassword,setCurrentPassword]=useState("")
    const [newPasssword,setNewPassword]=useState("")
    const [confirm,setConfirm]=useState("")
    const [isConfirmed,setIsConfirmed]=useState(false)
    const [changeSuccess,setChangeSuccess]=useState(false)
  


const handleUserInfo= async(e)=>{
  e.preventDefault()
  setIsLoading(true)
  const updatedFields = {
      name,useremail
  }

  try {
    const response = await fetch(`https://events-server-2d4h.onrender.com/auth/editdetails`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields)
  });
    if(response.ok){
      console.log("data updated suksesfully")
      setChangeSuccess(true)
      setIsLoading(false)
    }else{
      console.log(response.statusText);
      console.log("something wrong")
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false)
  }
}

  return (
    <div>
        <h3>Manage My Account</h3>
        <div className="settings">
        <form className="form" onSubmit={handleUserInfo}>
        {error && (
          <div className="error">
            <p>server error, try again</p>
          </div>
        )}
        {notFound && (
          <div className="error">
            <p>Sorry, User Not Found</p>
          </div>
        )}
    
        <div className="head">
          <p>Account Details</p>
        </div>
        <div className="form-input">
          <label htmlFor="username" className="label">
            Username <small>(Use on your next login)</small>
          </label>
          <input
            type="text"
            id="username"
            required
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form-input">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            className="input"
            value={useremail}
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
              Save Changes
            </button>
          )}
        </div>
        {changeSuccess && <div className='done'>Changes Saved</div>}
      </form>
  {/* form to update password */}
      {/* <form className="form">
        {error && (
          <div className="error">
            <p>server error, try again</p>
          </div>
        )}
        {notFound && (
          <div className="error">
            <p>Sorry, User Not Found</p>
          </div>
        )}
    
        <div className="head">
          <p>Update Password</p>
        </div>
        <div className="form-input">
          <label htmlFor="currentpassword" className="label">
            Current Password
          </label>
          <input
            type="password"
            id="currentpassword"
            required
            className="input"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
    </div> */}
    {/* this section is unclickable if password is not confirmed */}
        {/* <section className={isConfirmed ? "":"awaitconfirmation"}>
        <div className="form-input">
          <label htmlFor="newpassword" className="label">
            New Password
          </label>
          <input
            type="password"
            id="newpassword"
            required
            className="input"
            value={newPasssword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <label htmlFor="confirm" className="label">
            Confirm New Password
          </label>
          <input
            type="password"
            required
            id="confirm"
            className="input"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
        
        </div>
   
        </section>
        <div className="button">
          {isLoading2 ? (
            <div className="loaderbox">
              <div className="loader"></div>
            </div>
          ) : (
            <button type="submit" className="btn">
              {isConfirmed ? "Update Password":"Confirm Password"}
            </button>
          ) }
        </div>
      </form> */}
        </div>
    </div>
  )
}

export default Settings
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../authContext";
import "./signup.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [islogged, setIslogged] = useState(false); // for displaying div to comfirm login
  const [notFound, setNotFound] = useState(false); // for displaying error message if user account not found
  const [error, setError] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false); // for displaying error message if password incorrect
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // getting login fuction from context api to set user values

  // const setCookie = (name, value, days) => {
  //   const expires = new Date();
  //   expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  //   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  // };




  const handleSubmit = async (e) => {
  if(username.split("")==="" || password.split("")===""){
    return setEmptyVals(!emptyVals)
  }
    e.preventDefault();
    setIsLoading(true);
    //production api dont forget to uncomment before commit
   const api = "https://events-server-2d4h.onrender.com/auth/login";
   //testing api
    //const api = "http://localhost:3000/auth/login"
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const dataToStore = JSON.stringify(data);
        const { user, token } = data;
console.log(data)
        sessionStorage.setItem("userData", dataToStore); //storing data in session storage
        setIslogged(true);

        setTimeout(() => {
          setIslogged(false);
          navigate("/");
          login(data.user, data.token, data.email,data.organizerDetails);
        }, 1000);
      } else if (response.status === 401) {
        setInvalidPassword(true);
        setIsLoading(false);
        setTimeout(() => {
          setInvalidPassword(false);
        }, 3000);
      } else {
        setNotFound(true);
        setIsLoading(false);
        setTimeout(() => {
          setNotFound(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000); 
    }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
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
          <p>Login</p>
        </div>
        <div className="form-input">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            className="input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="form-input">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {invalidPassword && (
            <p className="invalid">invalid password, or username</p>
          )}
        </div>
        <div className="button">
          {isLoading ? (
            <div className="loaderbox">
              <div className="loader"></div>
            </div>
          ) : (
            <button type="submit" className="btn">
              Login
            </button>
          )}
        </div>

        <div className="policy">
         By Logging in you confirm that you agree to our <span onClick={()=>{
          navigate("/policy")
         }}>Privacy Policy</span> and <span onClick={()=>{
          navigate("/policy")
         }}>Terms of Use</span>
         
        </div>
        <div className="signup">
          No Account yet?{" "}
          <Link to="/signup" className="nav-link signingup">
            SignUp
          </Link>
        </div>
        <div className="signup">
          <Link to="/forgotpassword" className="pass-link">
            Forgot password?
          </Link>
        </div>
      
      </form>
      {islogged && <div className="done">Login Successful</div>}
    </>
  );
};

export default Login;

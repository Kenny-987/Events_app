import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signup.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //production api
    const api = "https://events-server-2d4h.onrender.com/auth/register";
    // const api = "http://localhost:3000/auth/register"
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

    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        setDone(true);
        const data = await response.json();
        console.log(data); // Handle the response data as needed
        setUsername("");
        setEmail("");
        setPassword("");
        setComfirmPassword("");
        setTimeout(() => {
          setDone(false);
          navigate("/login");
        }, 1500);
      } else {
        const data = await response.json();
        if (response.status === 400) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage(data.message || "An error occurred");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        setIsLoading(false);
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
        <div className="head">
          <h4>Sign Up</h4>
        </div>
        {error && (
          <div className="error">
            <p>server error, try again</p>
          </div>
        )}
        {errorMessage !== "" && (
          <div className="exists">
            <p>{errorMessage}</p>
          </div>
        )}
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
          <label htmlFor="email" className="label">
            Email <small>(Used for account recovery and notifications)</small>
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
          <label htmlFor="comfirmpassword" className="label">
            Comfirm Password
          </label>
          <input
            type="password"
            id="comfirmpassword"
            className="input"
            required
            value={confirmPassword}
            onChange={(e) => {
              setComfirmPassword(e.target.value);
            }}
          />
          {isMatching && (
            <div className="notmatching">Passwords do not match</div>
          )}
        </div>
        <div className="button">
          {isLoading ? (
            <div className="loaderbox">
              <div className="loader"></div>
            </div>
          ) : (
            <button type="submit" className="btn">
              Sign Up
            </button>
          )}
        </div>
        <div className="signup">
          Already Have An Account?{" "}
          <Link to="/login" className="nav-link signingup">
            Login
          </Link>
        </div>
      </form>
      {done && <div className="done">Account creation Successful</div>}
    </>
  );
};

export default SignUp;

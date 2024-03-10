import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faInfoCircle,
  faEdit,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";
const Footer = () => {
  const navigate = useNavigate()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState(false);
  const openFeedbackForm = () => {
    setIsFeedbackOpen(true);
  };

  const closeFeedbackForm = () => {
    setIsFeedbackOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const api = "https://events-server-2d4h.onrender.com/mail/send-email";
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });
      if (response.ok) {
        setMessage("");
        setSubject("");
        setEmail("");
        setMessageSent(true);
        setTimeout(() => {
          setMessageSent(false);
          closeFeedbackForm();
        }, 3000);
        setIsLoading(false);
      } else {
        console.log(response.status);
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
  };
  return (
    <section className="footer">
      <div className="footer-item contacts">
        <h4>Contact EventFlow</h4>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +263789644097
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> kennethmadondo01@gmail.com
        </p>
        <div className="footer-policy">
        <p onClick={()=>{
          navigate("/policy")
         }}>Privacy Policy</p>
         {" "}
         <p onClick={()=>{
          navigate("/policy")
         }}>Terms of Use</p>
         
        </div>
      </div>
      <div className="footer-item about">
        {" "}
        <a href="#">Developed by Kenneth Madondo</a>
      </div>
      <div className="footer-item feedback">
        <p>
          <FontAwesomeIcon icon={faInfoCircle} />{" "}
          <Link to="/about" className="about-link">
            About This Project
          </Link>
        </p>
        <h4 className="feeback-link" onClick={openFeedbackForm}>
          <FontAwesomeIcon icon={faEdit} /> Feedback
        </h4>
      </div>

      {isFeedbackOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-modal" onClick={closeFeedbackForm}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </span>
            <h2>Feedback</h2>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="error">Error Sending Feedback, Try again</div>
              )}
              <p>
                {" "}
                Leave feedback and let us know about bugs, features you'd like
                to see or improvements we can make on the site to enhance user
                experience. Any feedback is greatly appreciated.
              </p>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                required
              />
              <textarea
                rows="4"
                placeholder="Type your feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="button">
                {isLoading ? (
                  <div className="loaderbox">
                    <div className="loader"></div>
                  </div>
                ) : (
                  <button type="submit" className="btn">
                    Submit Feedback
                  </button>
                )}
              </div>
              {messageSent && (
                <div className="done">Message Sent Successfully</div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
export default Footer;

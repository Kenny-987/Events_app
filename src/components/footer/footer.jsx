import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faInfoCircle,
  faEdit,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";
const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const openFeedbackForm = () => {
    setIsFeedbackOpen(true);
  };

  const closeFeedbackForm = () => {
    setIsFeedbackOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    setIsLoading(true);
    const api = "http://localhost:3000/mail/send-email";
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });
      if (response.ok) {
        console.log("Feedback submitted:", feedback);
        closeFeedbackForm();
      } else {
        console.log(response.status);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="footer">
      <div className="footer-item contacts">
        <h4>Contact Us</h4>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +263789644097
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> kennethmadondo01@gmail.com
        </p>
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
              <FontAwesomeIcon icon={faClose} />
            </span>
            <h2>Feedback</h2>
            <form onSubmit={handleSubmit}>
              <p>
                {" "}
                Leave feedback and let us know about bugs, features you'd like
                to see or improvements we can make on the site
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
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
export default Footer;

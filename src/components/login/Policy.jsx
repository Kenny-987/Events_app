import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Policy = () => {
    const navigate = useNavigate()

  return (
    <div className='policy-container'>
  <span className="close-modal" onClick={()=>{
        navigate("/")
       }}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </span>
            
        <h3>Privacy Policy</h3>
        <p>Thank you gor using EventFlow. This Privacy Policy outlines how we collect, use, dsiclose,and manage your information when you use our services. Byusing EventFlow you consent to the practises described in this policy</p>
        <h4>Information we collect:</h4>
        <p><span>Personal Information: </span>We may collect personal information such as your name, email address, and payment details when you register or make a purchase</p>
        <p><span>Usage Data: </span>We collect information about how you interact with our app/website, including your device information, IP address, and browsing activity.</p>
        <p><span>Cookies: </span>We may use cookies and similar tracking technologies to enhance your experience and analyze usage patterns.</p>

        <h4>How We Use Your Information:</h4>
        <p><span>Providing Services:</span> We use your information to deliver and improve our services, personalize your experience, and communicate with you</p>
        <p><span>Analytics:</span>We may analyze usage data to improve our app/website and tailor our marketing efforts.</p>
        <p><span>Legal Compliance:</span>We may use your information to comply with legal obligations or protect our rights and interests.</p>
        <h4>Data Sharing:</h4>
        <p><span>Legal Requirements:</span>We may disclose your information in response to legal requests or to protect against fraud or security threats.</p>

        <h4>Your Choices:</h4>
        <p><span>Opt-Out:</span>You can opt-out of certain data collection and processing activities by adjusting your device settings or contacting us directly.</p>
        <p><span>Access:</span>You may request access to the personal information we hold about you and request corrections or deletions as appropriate.</p>
        <h4>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our app/website.</h4>
        <h4>If you have any questions or concerns about our Privacy Policy, please contact us at [+263789644097].</h4>

        <h3>Terms of Use</h3>
        <p>By accessing or using our services, you agree to comply with these Terms of Use. If you do not agree with these terms, please do not use our app/website.</p>
        <h4>Use of Services:</h4>
        <p>You agree to use our services only for lawful purposes and in accordance with these terms and any applicable laws or regulations.</p>
        <h4>Intellectual Property:</h4>
        <p>All content and materials available on our app/website are the property of EventFlow or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
        <h4>User Content:</h4>
        <p>You retain ownership of any content you submit or upload to our app/website. By posting or sharing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.</p>
        <h4>Prohibited Activities:</h4>
        <p>You agree not to engage in any activities that violate these terms or any applicable laws, including but not limited to:</p>
        <p>Using our services for unlawful purposes.</p>
        <p>Impersonating another person or entity.</p>
        <p>Interfering with the operation of our services.</p>
        <p>Uploading inappropriate content such as pornographic material, gory or violent content. We reserve the right to delete such content and to block user accounts that ulpoad it, from using our services.</p>
        <p>You are not to advertise unless cleared to do so by the owners, you can only post events and event related content.</p>
        <h4>Disclaimer of Warranties:</h4>
        <p>Our services are provided on an "as is" and "as available" basis without any warranties of any kind. We do not guarantee that our services will be error-free or uninterrupted.</p>
        <h4>Limitation of Liability:</h4>
        <p>EventFlow and its affiliates will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.</p>
        <h4>We may update these Terms of Use from time to time. You are responsible for reviewing the latest version. Your continued use of our services after any changes constitutes acceptance of the revised terms.</h4>
    </div>
  )
}

export default Policy
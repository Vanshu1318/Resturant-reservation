import React from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/feed');
  }
  return (
    <footer>
      <div className="container">
      <button className="menuBtn" onClick={handleClick}>Feedback!</button>
      <br/><br/>
        <div className="banner">
          <div className="left">𝐴ⁿէʳ𝙞𝓀ȿĥ</div>
          <div className="right">
            <p>SharanPur</p>
            <p>Open: 07:00 AM - 12:00 AM</p>
          </div>
        </div>
        <div className="banner">
          <div className="left">
            <p>Developed By 𝐴ⁿէãʳ𝙞𝓀ȿĥ</p>
          </div>
          <div className="right">
            <p>All Rights Reserved By 𝐴ⁿէãʳ𝙞𝓀ȿĥ.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
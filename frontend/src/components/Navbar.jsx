import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate=useNavigate();
  const handleMenuClick=()=>{
    navigate('/menu');
  }
const userHandler=()=>{
  navigate('/login');
}
  return (
    <>
      <nav>
        <div className="logo">𝐴ⁿէʳ𝙞𝓀ȿĥ</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          {localStorage.getItem('auth-token')
           ?<button className="menuBtn" onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:

          <button className="menuBtn" onClick={userHandler}>Login/SignUP</button>}
        {/* now add code to handle login signup and logout here in UserHandler function  and first login then registration 
          and it will also contain what dishes we are ordered most so for this we have to store dishes
           in each selction and also selection of dishes and payment n all and i also want email verification in it */}
          <button className="menuBtn" onClick={handleMenuClick}>OUR MENU</button>
        </div>
        <div className="hamburger" onClick={()=> setShow(!show)}>
                <GiHamburgerMenu/>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

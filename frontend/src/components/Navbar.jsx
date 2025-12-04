import React from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className={navbarStyles.nav}>
        <div
        style={{backgroundImage:navbarStyles.decorativePatternBackground,}}
         className={navbarStyles.decorativePattern}>
           
        </div>
        <div className={navbarStyles.bubble1}></div>
        <div className={navbarStyles.bubble2}></div> 
        <div className={navbarStyles.bubble3}></div> 
        <div className={navbarStyles.container}> 
            <div className={navbarStyles.logoContainer}>
                <Link to="/" className={navbarStyles.logoButton}>
                <div className={navbarStyles.logoInner}>

                </div>


                </Link>
        </div>
        </div>
    </nav>
    );  
};

export default Navbar;
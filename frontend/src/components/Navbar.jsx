import React from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { Link, NavLink } from "react-router-dom";
import { Award } from 'lucide-react';
const Navbar = ({ logoSrc }) => {
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
              <img
                src={
                  logoSrc ||
                  "https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"
                }
                alt="QuizMaster logo"
                className={navbarStyles.logoImage}
              />
            </div>
          </Link>
        </div>

        <div className={navbarStyles.titleContainer}>
            <div className={navbarStyles.titleBackground}>
                <h1 className={navbarStyles.titleText}>QuizMaster</h1>

                
            </div>
        </div>

        <div className={navbarStyles.desktopButtonsContainer}>
            <div className={navbarStyles.spacer}></div>
            <NavLink to="/result" className={navbarStyles.resultsButton}>
            <Award className={navbarStyles.buttonIcon}/>
                my results
            
            </NavLink>


        </div>
        </div>
    </nav>
    );  
};

export default Navbar;
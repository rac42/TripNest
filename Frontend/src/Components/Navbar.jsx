import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  // State to control the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  // GSAP animation for opening and closing the menu
  useGSAP(() => {
    if (isMenuOpen) {
      // When opening the menu
      gsap.fromTo(
        menuRef.current,
        { x: '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out', // Smooth easing for entry
        }
      );
    } else {
      // When closing the menu
      gsap.to(menuRef.current, {
        x: '100%', // Move off screen
        duration: 0.5,
        ease: 'power1.in', // Smooth easing for exit
        onComplete: () => {
          // Set opacity to 1 before resetting position for next opening
          gsap.set(menuRef.current, { opacity: 1, x: '100%' }); // Reset position
        },
      });
    }
  }, [isMenuOpen]);
  
  

  return (
    <nav className="bg-white px-4 py-1 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/">
            <img 
              src={logo} 
              alt="Tripnest Logo" 
              className="h-15" 
            />
          </NavLink>
        </div>
        <div className="hidden lg:flex space-x-24">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "text-black font-gilroy font-semibold " : "hover:text-black font-gilroy"}
          >
            HOME
          </NavLink>
          <NavLink 
            to="/searchFlights" 
            className={({ isActive }) => isActive ? "text-black font-gilroy  font-semibold" : "hover:text-black font-gilroy"}
          >
            SEARCH FLIGHT
          </NavLink>
          <NavLink 
            to="/contact-us" 
            className={({ isActive }) => isActive ? "text-black font-gilroy font-semibold" : "hover:text-black font-gilroy"}
          >
          QUERY SUPPORT
          </NavLink>
        </div>
        <Link to="/searchFlights" className="hidden lg:block">
          <button  className="bg-black text-white font-semibold py-2 px-4 rounded-xl hover:bg-gray-700 font-gilroy">
            BOOK NOW
          </button>
        </Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div 
        ref={menuRef} 
        className={`lg:hidden bg-white shadow-md z-50 absolute top-0 right-0 h-full w-2/3 transition-transform ${isMenuOpen ? 'block' : 'hidden'}`}
        style={{ transform: 'translateX(100%)' }} // Initially hidden off the screen
      >
        <div className="flex justify-between items-center  px-4 py-3">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col space-y-2 px-4 py-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-gilroy"}
            onClick={toggleMenu} // Close menu on click
          >
            HOME
          </NavLink>
          <NavLink 
            to="/book-now" 
            className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-gilroy"}
            onClick={toggleMenu} // Close menu on click
          >
            BOOK NOW
          </NavLink>
          <NavLink 
            to="/contact-us" 
            className={({ isActive }) => isActive ? "text-black font-semibold" : "hover:text-black font-gilroy"}
            onClick={toggleMenu} // Close menu on click
          >
            CONTACT US
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

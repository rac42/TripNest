import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '/assets/Photos/logo.svg';
import Popup from '../Components/Pop'; // Adjust the path according to your project structure
import axios from '../utils/axios';
const SummaryPage = () => {
  const location = useLocation();
  const { bookingSummary } = location.state || {}; // Access bookingSummary
  const { 
    flightNumber, 
    airline, 
    departure, 
    arrival, 
    price, 
    date, 
    class: passengerClass, 
    from, 
    to,
    email, 
    passengers 
  } = bookingSummary || {};

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); // Show popup when the component mounts
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  
  console.log(flightNumber,passengers.length)
  

  return (
    <div className="max-w-5xl mx-auto p-12 font-gilroy rounded-lg shadow-lg">
      <img src={logo} alt="Logo" className="w-32 mb-10 mx-auto" />
      
      {showPopup && (
        <Popup message="You have successfully booked your flight!" onClose={handleClosePopup} />
      )}

      <h1 className="text-6xl font-semibold text-center mb-10 text-gray-800">Summary</h1>

      <div className="border border-gray-300 rounded-3xl p-10 bg-white shadow-md">
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src='/src/assets/check.png' className='w-10' alt="Check icon"/>
              <span className="font-semibold text-2xl text-gray-700">Flight Number: {flightNumber || 'N/A'}</span>
            </div>
            <div className="text-2xl text-gray-700">Airline: {airline || 'N/A'}</div>

            <div className="text-2xl text-gray-700 font-semibold">Passenger Details:</div>
            {passengers?.map((passenger, index) => (
              <div key={index} className="ml-4 text-xl mb-2 text-gray-600">
                <p>Name: {passenger.name || 'N/A'}</p>
                <p>Age: {passenger.age || 'N/A'}</p>
                <p>Type: {passenger.type.charAt(0).toUpperCase() + passenger.type.slice(1) || 'N/A'}</p>
              </div>
            ))}

            <div className="flex gap-16 text-2xl text-gray-700 mt-6">
              <div>Departure: {departure || 'N/A'}</div>
              <div>Date: {date || 'N/A'}</div>
            </div>
            <div className="flex gap-16 text-2xl text-gray-700">
              <div>Class: {passengerClass || 'Economy'}</div>
            </div>
            <div className="flex items-center gap-6 text-2xl text-gray-700 mt-6">
              <span>From: {from || 'N/A'}</span>
              <span>To: {to || 'N/A'}</span>
            </div>

            {/* Divider */}
            <div className="border-b border-dashed border-gray-300 my-8"></div>

            {/* Total */}
            <div className="flex justify-between items-center text-2xl text-gray-800 font-semibold">
              <span>Total Price:</span>
              <span className="text-lg text-green-600">₹{price || '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;

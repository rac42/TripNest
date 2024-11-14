import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const AddDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchParams } = location.state || {};

  const [passengers, setPassengers] = useState([]);

  // Initialize passengers based on the travelers specified in searchParams
  useEffect(() => {
    if (searchParams && searchParams.travelers) {
      const initialPassengers = Array.from({ length: searchParams.travelers }, () => ({
        name: '',
        age: '',
        type: 'adult',
      }));
      setPassengers(initialPassengers);
    }
  }, [searchParams]);

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', type: 'adult' }]);
  };

  const removePassenger = (index) => {
    const newPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(newPassengers);
  };

  const updatePassenger = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };
  const [email, setEmail] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();

    const bookingSummary = {
      flightNumber: flight?.flightNumber || '',
      airline: flight?.airline || '',
      departure: flight?.departureCity || '',
      arrival: flight?.arrivalCity || '',
      price: flight?.price || 0,
      date: searchParams?.departDate || '',
      class: searchParams?.passengerClass || 'Economy',
      from: searchParams?.from || '',
      to: searchParams?.to || '',
      email: email || '' ,
      passengers: passengers.map(({ name, age, type }) => ({ name, age, type })),
    };
    try{
      const token = localStorage.getItem('token');
      console.log(bookingSummary);
      
      const response = await axios.post('/api/users/bookTicket', {bookingSummary}, { headers: { Authorization: `Bearer ${token}` } } );
      
      
      // bookingdetails1=JSON.stringify(response.data.booking)
      
      if (response.status === 201) {
        console.log('Booking data received from backend:', response.data.booking);
        // localStorage.setItem("bookingDetails", JSON.stringify(response.data.booking));
      }
      // console.log(bookingSummary, passengers.length);
      navigate('/searchFlights/adddetails/summarypage', { state: { bookingSummary } });
    }catch (error) {
      console.log(error.message);
      
      console.error(error);
      alert('An error occurred while booking the flight');
    }
    
    // navigate('/searchFlights/adddetails/summarypage', { state: { bookingSummary } });
};


  return (
    <div className="min-h-screen bg-gray-50 p-8 font-gilroy">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-semibold mb-6">Flight Booking Portal</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Flight Information */}
          {flight && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Flight Information</h2>
              <p className='font-semibold'>Airline: {flight.airline}</p>
              <p className='font-semibold'>Flight No: {flight.flightNumber}</p>
              <p className='font-semibold'>Departure: {flight.departureCity}</p>
              <p className='font-semibold'>Arrival: {flight.arrivalCity}</p>
              <p className='font-semibold'>Price: ₹{flight.price}</p>
            </div>
          )}

          {/* Personal Information and Address (unchanged) */}
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile No.</label>
              <input
                type="tel"
                placeholder="+91"
                className="w-full p-2 border rounded-md"
              />
            </div>
            
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                placeholder="Street Address"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="City"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                placeholder="State"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                type="text"
                placeholder="ZIP Code"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Flight Details */}
          {searchParams && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">From</label>
                <input
                  type="text"
                  value={searchParams.from}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">To</label>
                <input
                  type="text"
                  value={searchParams.to}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Departure Date</label>
                <input
                  type="date"
                  value={searchParams.departDate}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {searchParams.returnDate && (
                <div>
                  <label className="block text-sm font-medium mb-1">Return Date</label>
                  <input
                    type="date"
                    value={searchParams.returnDate}
                    readOnly
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1">Passenger Class</label>
                <input
                  type="text"
                  value={searchParams.passengerClass}
                  readOnly
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {searchParams.specialFare && (
                <div>
                  <label className="block text-sm font-medium mb-1">Special Fare</label>
                  <input
                    type="text"
                    value={searchParams.specialFare}
                    readOnly
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              )}
            </div>
          )}
 

          {/* Passenger Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Passenger Details</h3>
              {passengers.length < (searchParams.travelers || 0) && (
                <button
                  type="button"
                  onClick={addPassenger}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Passenger
                </button>
              )}
            </div>

            {passengers.map((passenger, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-1">Passenger Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={passenger.name}
                    onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={passenger.age}
                    onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                      value={passenger.type}
                      onChange={(e) => updatePassenger(index, 'type', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                      <option value="infant">Infant</option>
                    </select>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 mb-0.5"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-[#6e6e6e]" >
              Submit Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;

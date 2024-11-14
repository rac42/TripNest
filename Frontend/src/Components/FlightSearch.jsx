import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Search, Repeat } from 'lucide-react';
import axios from '../utils/axios';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('ONE_WAY');
  const [errors, setErrors] = useState({});
  const [flights,setFlights] = useState([])

  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengerClass: 'Economy',
    specialFare: '',
    travelers: 1
  });

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai", "Kolkata"];

  const handleSwap = () => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      from: prevParams.to,
      to: prevParams.from,
    }));
  };

  const navigate = useNavigate();

  const handleSearch = async() => {
    const newErrors = {};
    const requiredFields = ['from', 'to', 'departDate'];

    requiredFields.forEach(field => {
      if (!searchParams[field]) {
        newErrors[field] = `${field} is required.`;
      }
    });

    // Check if "From" and "To" cities are the same
    if (searchParams.from === searchParams.to) {
      newErrors.from = "Departure and destination cities cannot be the same.";
      newErrors.to = "Departure and destination cities cannot be the same.";
    }

    if (tripType === 'ROUND_WAY' && !searchParams.returnDate) {
      newErrors.returnDate = 'Return date is required for round trips.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        console.log('Search parameters:', searchParams);
        const response = await axios.get("/api/users/searchFlights", {
          params: {
            departureCity: searchParams.from,
            arrivalCity: searchParams.to,
            departureDate: searchParams.departDate,
            returnDate: tripType === 'ROUND_WAY' ? searchParams.returnDate : undefined, // Only send returnDate if round trip
          },
          headers: {
            'Content-Type': 'application/json', // Optional for GET, but included for clarity
          },
        });
  
        setFlights(response.data.flights); // Store flights in state
        console.log(response.data.flights);
      } catch (error) {
        console.error(error);
        setErrors({ api: 'Failed to fetch flights. Please try again later.' });
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-semi font-gilroy">
      {/* Trip Type Selection */}
      <div className="flex gap-4 mb-6">
        <button 
          className={`px-6 py-2 rounded-full ${tripType === 'ONE_WAY' ? 'bg-black text-white' : 'bg-gray-100'}`}
          onClick={() => setTripType('ONE_WAY')}
        >
          ONE WAY
        </button>
        <button 
          className={`px-6 py-2 rounded-full ${tripType === 'ROUND_WAY' ? 'bg-black text-white' : 'bg-gray-100'}`}
          onClick={() => setTripType('ROUND_WAY')}
        >
          ROUND WAY
        </button>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-lg font-semibold text-black">From</label>
            <select 
              className="w-full bg-[#efeeef] p-2 border rounded"
              value={searchParams.from}
              onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
            >
              <option value="" disabled>Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.from && <p className="text-red-500 text-lg font-semibold">{errors.from}</p>}
          </div>

          <div className="flex items-center justify-center mt-6">
            <button onClick={handleSwap} className="text-black hover:text-black">
              <Repeat size={24} />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold text-black">To</label>
            <select 
              className="w-full bg-[#efeeef] p-2 border rounded"
              value={searchParams.to}
              onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
            >
              <option value="" disabled>Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.to && <p className="text-red-500 text-lg font-semibold">{errors.to}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-lg font-semibold text-black">Departure Date</label>
            <input
              type="date"
              className="w-full p-2 bg-[#efeeef] border rounded"
              min={new Date().toISOString().split('T')[0]}
              value={searchParams.departDate}
              onChange={(e) => 
                setSearchParams({...searchParams, departDate: e.target.value})
              }
            />
            {errors.departDate && <p className="text-red-500 text-lg font-semibold">{errors.departDate}</p>}
          </div>
          {tripType === 'ROUND_WAY' && (
            <div className="space-y-2">
              <label className="text-lg font-semibold text-black">Return Date</label>
              <input
                type="date"
                className="w-full bg-[#efeeef] p-2 border rounded"
                min={searchParams.departDate || new Date().toISOString().split('T')[0]}
                value={searchParams.returnDate}
                onChange={(e) => 
                  setSearchParams({...searchParams, returnDate: e.target.value})
                }
              />
              {errors.returnDate && <p className="text-red-500 text-lg font-semibold">{errors.returnDate}</p>}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-lg font-semibold text-black">Travelers</label>
            <input 
              type="number"
              min="1"
              className="w-full bg-[#efeeef] p-2 border rounded"
              value={searchParams.travelers}
              onChange={(e) => setSearchParams({...searchParams, travelers: parseInt(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-lg font-semibold text-black">Class</label>
            <select 
              className="w-full p-2 bg-[#efeeef] border rounded"
              value={searchParams.passengerClass}
              onChange={(e) => setSearchParams({...searchParams, passengerClass: e.target.value})}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-lg font-semibold text-black">Special Fares:</label>
          <div className="flex gap-4 flex-wrap">
            {['Student', 'Senior Citizen', 'Armed Forces'].map((fare) => (
              <button
                key={fare}
                className={`px-4 py-1 rounded-full border ${
                  searchParams.specialFare === fare ? 'border-black' : 'border-gray-300'
                }`}
                onClick={() => setSearchParams({...searchParams, specialFare: fare})}
              >
                {fare}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="bg-black text-white px-8 py-2 rounded-full float-right flex items-center gap-2"
        >
          Search
          <Search size={18} />
        </button>
      </div>

        
        {/* Filters and Listings */}
      <div className="col-span-3 space-y-4">
      {flights.map((flight, index) => (
    <div key={index} className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <img 
                    src={flight.ImageUrl}
                    alt={flight.airline}
                    className="w-10 h-10 object-contain"
                />
                <div>
                    <h3 className="font-semibold">{flight.airline}</h3>
                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                </div>
            </div>

            <div className="text-center">
                {/* Convert the departureTime string to a Date object first */}
                <p className="font-semibold">
                    {new Date(flight.departureTime).toISOString().split('T')[1].split(':').slice(0, 2).join(':')}
                </p>
                <p className="text-sm text-gray-500">{flight.departureCity}</p>
            </div>

            <div className="text-center text-sm text-gray-500">
                <p>{flight.duration}</p>
                <p>Non-Stop</p>
            </div>

            <div className="text-center">
                <p className="font-semibold">
                {new Date(flight.arrivalTime).toISOString().split('T')[1].split(':').slice(0, 2).join(':')}</p>
                <p className="text-sm text-gray-500">{flight.arrivalCity}</p>
            </div>

            <div className="text-right">
                <p className="font-semibold text-lg">₹{flight.price}</p>
                <button
                    onClick={() => {
                        const token = localStorage.getItem("token"); // Check for token
                        if (token) {
                            navigate('/searchFlights/adddetails', { state: { flight, searchParams } }); // Redirect to add details
                        } else {
                            navigate('/login'); // Redirect to login page
                        }
                    }}
                    className="bg-black text-white px-4 py-2 rounded-full mt-2"
                >
                    Book Now
                </button>
            </div>
        </div>
    </div>
))}


    </div>


    </div>
  );
};

export default FlightSearch;

import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import video from '../../public/landingvideo.mp4';
import facebook from '../assets/facebook.png'
import insta from '../assets/instagram.png'
import airbnb from '../assets/airbnb.png'
import booking from '../assets/booking.com.png'
import trivago from '../assets/Trivago.png'
import ixigo from  '../assets/ixigo.png'
import udaipur from '../assets/udaipur.jpg'
import agra from '../assets/agra.png'
import Newdelhi  from '../assets/Newdelhi.png'


const LandingPageContent = () => {
  const destinations = [
    { name: 'Udaipur', rating: '4.5/5', image: udaipur },
    { name: 'Agra', rating: '4.8/5', image: agra },
    { name: 'New Delhi', rating: '4.6/5', image: Newdelhi },
  ];

  const navigate = useNavigate();
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[800px] w-full overflow-hidden rounded-3xl mx-auto my-4 max-w-[90%]">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={video}
          autoPlay
          loop
          muted
        />

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <div className="ml-32 max-w-2xl">
              <h2 className="text-2xl text-white mb-4 font-gilroy font-light">
                Get The Experience
              </h2>
              <h1 className="text-6xl font-semibold font-gilroy text-white mb-8 leading-tight">
                Experience<br />
                The Magic Of<br />
                Flight!
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/searchFlights')}
                  className="px-6 py-3 bg-black z-10 font-gilroy text-white rounded-full font-semibold hover:bg-gray-900 transition-colors"
                >
                  BOOK A TICKET NOW
                </button>
                <button className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Section */}
      <section className="max-w-7xl mx-auto py-12 hidden md:block"> {/* Added hidden md:block for responsive visibility */}
        <div className="flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <span className="font-medium font-gilroy">Handels</span>
            <div className="flex space-x-2">
              <span><img src={facebook} alt="Facebook" /></span>
              <span><img src={insta} alt="Instagram" /></span>
            </div>
          </div>
          <img src={airbnb} alt="Airbnb" className="h-10 object-contain" />
          <img src={booking} alt="Booking.com" className="h-8 object-contain" />
          <img src={trivago} alt="Trivago" className="h-8 object-contain" />
          <img src={ixigo} alt="Ixigo" className="h-8 object-contain" />
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="max-w-7xl mx-auto py-12 px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold font-gilroy mb-2">Popular Destination</h2>
            <p className="text-gray-600 font-gilroy">Some Of These Are Here</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Made the grid responsive */}
          {destinations.map((dest, index) => (
            <div key={index} className="rounded-3xl overflow-hidden">
              <div className="relative h-64">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <h3 className="text-2xl font-semibold font-gilroy text-white">{dest.name}</h3>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    {dest.rating} ★
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Section */}
      <section className="max-w-7xl mx-auto py-16 px-8 text-center">
        <h2 className="text-4xl font-semibold mb-4 font-gilroy">Journey To The Skies Made Simple!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto font-gilroy">
          With our easy booking process and seamless travel solutions, your next
          adventure is just a few clicks away.
        </p>
      </section>
    </main>
  );
};

export default LandingPageContent;

import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa'; // Install react-icons
import { SiAirbnb, SiBookingdotcom, SiTrivago, SiIxigo } from 'react-icons/si';

export default function HandelsBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
      {/* Social Media Icons */}
      <div className="flex space-x-4">
        <span className="font-semibold">Handels</span>
        <FaXTwitter className="text-xl text-black hover:text-blue-500 cursor-pointer" />
        <FaFacebook className="text-xl text-black hover:text-blue-600 cursor-pointer" />
        <FaInstagram className="text-xl text-black hover:text-pink-500 cursor-pointer" />
      </div>

      {/* Other Platform Logos */}
      <div className="flex space-x-8 text-gray-400">
        <div className="hover:text-black">
          <SiAirbnb className="text-2xl cursor-pointer" />
        </div>
        <div className="hover:text-black">
          <SiBookingdotcom className="text-2xl cursor-pointer" />
        </div>
        <div className="hover:text-black">
          <SiTrivago className="text-2xl cursor-pointer" />
        </div>
        <div className="hover:text-black">
          <SiIxigo className="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import logowhite from '/assets/Photos/logowhite.svg';
const Footer = () => {
  return (
    <div className="bg-black px-4 rounded-t-3xl">
      <div className="flex flex-col md:flex-row">
        <section className="w-full md:w-2/5 flex flex-col justify-center gap-3 items-center md:items-start text-center md:text-left">
          <img src={logowhite} alt="logo" className="w-32 mt-20 md:w-auto" />
          <pre className="font-gilroy text-white text-lg md:text-xl font-extralight">
            Army Institute of Technology,<br />
            Alandi Rd, Dighi, Pune,<br />
            Maharashtra 411015
          </pre>
        </section>
        
        <section className="w-full md:w-3/5 flex flex-col gap-10 pt-10 md:pt-20 items-center md:items-start">  
          <p className='font-gilroy text-white font-semibold text-5xl md:text-9xl text-center md:text-left'>
            TRAVEL<br />
            WITH US!!
          </p>

          <div className="flex flex-col md:flex-row items-center w-full">
            <input
              type="text"
              placeholder="Enter your email"
              className="border rounded-md px-3 py-2 w-full md:w-[60%] mb-2 md:mb-0"
            />
            <input
              type="submit"
              value="Submit"
              className="px-4 py-2 border border-[#575454] text-white font-semibold rounded-md hover:bg-[#0c0c0d] cursor-pointer"
            />
          </div>
        </section>
      </div>
      
      <hr className="border-t border-gray-600 my-4" /> {/* Bottom line */}
      
      <div className="flex flex-col md:flex-row justify-between text-white text-sm py-2">
        <span className="text-center md:text-left">© Tripnest</span>
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="/terms" className="hover:underline">Terms and Conditions</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/cookies" className="hover:underline">Cookies</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
